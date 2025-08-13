import { type NextRequest } from "next/server";
import type { UserSession } from "@/lib/session/sessionOptions";
import {
  withServerBase,
  baseResponse,
  handleApiServerError,
} from "@/lib/api/apiServerBase";
import { IronSession } from "iron-session";
import { getTranslations } from "@/i18n/server";

interface LuckyBoxResult {
  ip: string;
  date: string;
  luckyNumber: number;
  messageIndex: number;
  timestamp: number;
}

// In-memory storage organized by date for efficient cleanup
const luckyBoxResults = new Map<string, Map<string, LuckyBoxResult>>();

// Cleanup tracking
let lastCleanup = Date.now();
const CLEANUP_INTERVAL = 4 * 60 * 60 * 1000; // 4 hours (reduced frequency)
const MAX_ENTRIES_PER_DAY = 10000; // Limit entries per day to prevent memory bloat
const MAX_DAYS_TO_KEEP = 1; // Only keep today's data

// Background cleanup timer (only in Node.js environment)
let backgroundCleanupTimer: NodeJS.Timeout | null = null;

// Initialize background cleanup
function initializeBackgroundCleanup() {
  if (typeof window === 'undefined' && !backgroundCleanupTimer) {
    // Run cleanup every 6 hours
    backgroundCleanupTimer = setInterval(() => {
      forceCleanExpiredData();
    }, 6 * 60 * 60 * 1000);
  }
}

// Get today's date string
function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

// Force cleanup (used by background timer)
function forceCleanExpiredData() {
  const today = getTodayDateString();
  const keysToDelete: string[] = [];
  
  for (const dateKey of luckyBoxResults.keys()) {
    if (dateKey !== today) {
      keysToDelete.push(dateKey);
    }
  }
  
  keysToDelete.forEach(dateKey => {
    const deletedEntries = luckyBoxResults.get(dateKey)?.size || 0;
    luckyBoxResults.delete(dateKey);
    if (deletedEntries > 0) {
      console.log(`Cleaned up ${deletedEntries} lucky box entries for date: ${dateKey}`);
    }
  });
  
  lastCleanup = Date.now();
}

// Lazy cleanup - only clean when needed
function cleanExpiredDataLazy() {
  const now = Date.now();
  const today = getTodayDateString();
  
  // Only cleanup if interval passed AND we have data from previous days
  if (now - lastCleanup < CLEANUP_INTERVAL) {
    return;
  }
  
  // Quick check if cleanup is needed
  if (luckyBoxResults.size <= 1 && luckyBoxResults.has(today)) {
    lastCleanup = now;
    return; // Only today's data exists, no cleanup needed
  }
  
  forceCleanExpiredData();
}

// Get or create today's data bucket
function getTodayDataBucket(): Map<string, LuckyBoxResult> {
  const today = getTodayDateString();
  
  if (!luckyBoxResults.has(today)) {
    luckyBoxResults.set(today, new Map<string, LuckyBoxResult>());
  }
  
  return luckyBoxResults.get(today)!;
}

// Initialize background cleanup on module load
initializeBackgroundCleanup();

function getClientIP(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const clientIP = request.headers.get('x-client-ip');
  
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  if (clientIP) {
    return clientIP;
  }
  
  // Fallback to connection remote address
  return request.ip || 'unknown';
}

async function luckyBoxApiGetHandler(
  _data: any,
  request: NextRequest,
  session: IronSession<UserSession>
) {
  const { t } = await getTranslations(["common"]);

  try {
    // Lazy cleanup of expired data
    cleanExpiredDataLazy();
    
    const clientIP = getClientIP(request);
    const today = getTodayDateString();
    const todayBucket = getTodayDataBucket();
    
    // Check if today's bucket is getting too large
    if (todayBucket.size > MAX_ENTRIES_PER_DAY) {
      // Optional: Log warning or implement rate limiting
      console.warn(`Lucky box entries for ${today} exceeded ${MAX_ENTRIES_PER_DAY} entries`);
    }
    
    // Check if user already has a result for today
    let result = todayBucket.get(clientIP);
    let isFirstTime = false;
    
    if (!result) {
      // Generate new result for today
      const luckyNumber = Math.floor(Math.random() * 90) + 10; // 2-digit number (10-99)
      const messageIndex = Math.floor(Math.random() * 50); // 0-49 for 50 messages
      
      result = {
        ip: clientIP,
        date: today,
        luckyNumber,
        messageIndex,
        timestamp: Date.now()
      };
      
      todayBucket.set(clientIP, result);
      isFirstTime = true;
    }

    return baseResponse({
      status: 200,
      message: "ok",
      data: {
        luckyNumber: result.luckyNumber,
        messageIndex: result.messageIndex,
        isFirstTime
      },
    });
  } catch (error) {
    return handleApiServerError(
      error,
      {
        error400Message: t("luckyBox.error.failed"),
        errorCommonMessage: t("luckyBox.systemFailed"),
      },
      session,
      _data
    );
  }
}

export const GET = withServerBase(luckyBoxApiGetHandler, {
  isAuthenRequired: false,
});
