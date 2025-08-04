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

// In-memory storage (in production, use Redis or database)
const luckyBoxResults = new Map<string, LuckyBoxResult>();

// Clean expired data every hour
let lastCleanup = Date.now();
const CLEANUP_INTERVAL = 60 * 60 * 1000; // 1 hour

// Clean expired data (older than current date)
function cleanExpiredData() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) {
    return; // Skip if cleaned recently
  }
  
  const today = new Date().toISOString().split('T')[0];
  const expiredKeys: string[] = [];
  
  luckyBoxResults.forEach((result, key) => {
    if (result.date !== today) {
      expiredKeys.push(key);
    }
  });
  
  expiredKeys.forEach(key => {
    luckyBoxResults.delete(key);
  });
  
  lastCleanup = now;
  
  if (expiredKeys.length > 0) {
    console.log(`Cleaned up ${expiredKeys.length} expired lucky box results`);
  }
}

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
    // Clean expired data first
    cleanExpiredData();
    
    const clientIP = getClientIP(request);
    const today = new Date().toISOString().split('T')[0];
    const key = `${clientIP}_${today}`;
    
    // Check if user already has a result for today
    let result = luckyBoxResults.get(key);
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
      
      luckyBoxResults.set(key, result);
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
