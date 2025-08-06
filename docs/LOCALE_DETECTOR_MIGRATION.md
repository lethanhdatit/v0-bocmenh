# Migration to next-i18n-router Built-in Locale Detection

## Overview
This document outlines the migration from custom language detection logic to using next-i18n-router's built-in `localeDetector` functionality.

## Changes Made

### 1. Updated `i18nConfig.ts`
- **Before**: `localeDetector: false` with custom logic in LanguageContext
- **After**: `localeDetector: true` with custom detector function that:
  - Checks `NEXT_LOCALE` cookie first
  - Falls back to browser Accept-Language header detection
  - Uses the same browser language mapping logic from `detectBrowserLanguage`
  - Always returns a valid locale from the configured locales list

### 2. Simplified `LanguageContext.tsx`
- **Removed**: Complex server-side language synchronization
- **Removed**: Custom language cookies handling
- **Added**: Simple `NEXT_LOCALE` cookie reading function
- **Simplified**: Language initialization to rely on URL params and NEXT_LOCALE cookie
- **Updated**: `setLanguage` function to be synchronous (no more Promise)

### 3. Created `lib/i18n/server-utils.ts`
- **Purpose**: Replacement for `lib/languageActions.ts` with simplified NEXT_LOCALE cookie reading
- **Functions**:
  - `getCurrentLanguage()`: Read current language from NEXT_LOCALE cookie
  - `getLanguage()`: Legacy compatibility function for existing code

### 4. Updated `i18n/server.ts`
- **Changed**: Import path from `@/lib/languageActions` to `@/lib/i18n/server-utils`
- **Result**: Server-side translations now use NEXT_LOCALE cookie

### 5. Fixed `components/layout/Footer.tsx`
- **Fixed**: Removed `async/await` from `handleLanguageChange` since `setLanguage` is now synchronous
- **Result**: Language switching in footer now works correctly

## Benefits

### 1. Reduced Complexity
- No more custom language cookies (`boc-menh-language`, `boc-menh-language-detected`, `boc-menh-language-user-set`)
- Single source of truth: `NEXT_LOCALE` cookie managed by next-i18n-router
- Simplified state management in LanguageContext

### 2. Better Integration
- Native next-i18n-router middleware handles all language routing
- Built-in locale detection works seamlessly with routing
- Automatic cookie management

### 3. Improved Performance
- Eliminated server-side language synchronization calls
- Reduced client-server round trips for language changes
- Simplified initialization process

## Migration Notes

### Files that can be removed:
- `lib/languageActions.ts` (replaced by `lib/i18n/server-utils.ts`)
- `lib/session/language-cookies.ts` (functionality moved to next-i18n-router)

### Files no longer needed for language detection:
- Custom cookie logic is now handled by next-i18n-router middleware
- Language detection happens at the middleware level before pages load

## Configuration

### Current i18nConfig.ts settings:
```typescript
{
  locales: ['vi', 'en'],
  defaultLocale: 'vi',
  localeDetector: (request, config) => {
    // 1. Check NEXT_LOCALE cookie
    // 2. Detect from Accept-Language header
    // 3. Fallback to default locale
  },
  prefixDefault: false,
  serverSetCookie: 'always'
}
```

### Cookie Management:
- `NEXT_LOCALE`: Automatically managed by next-i18n-router
- Contains the current user's language preference
- Set by middleware on every request
- Used by both client and server-side code

## Testing

### Scenarios to verify:
1. ✅ First-time visit: Browser language should be auto-detected
2. ✅ Language switching: Should update URL and cookie
3. ✅ Direct URL access: Should respect language in URL
4. ✅ Server-side rendering: Should use correct language for SSR
5. ✅ Cookie persistence: Language choice should persist across sessions

### Expected behavior:
- Users visiting without language preference get auto-detected language
- Language changes are reflected immediately in URL and cookie
- No more duplicate cookies or complex synchronization logic
- Faster page loads due to simplified language initialization
