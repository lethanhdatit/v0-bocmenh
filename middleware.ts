import { i18nRouter } from 'next-i18n-router';
import { NextRequest } from 'next/server';
import i18nConfig from './i18nConfig';

export function middleware(request: NextRequest) {
  // Thêm custom headers để track request info
  const response = i18nRouter(request, i18nConfig);
  
  // Thêm security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  return response;
}

// Cấu hình matcher - chỉ áp dụng middleware cho các routes cần thiết
export const config = {
  matcher: [
    // Match tất cả paths NGOẠI TRỪ:
    // - API routes (/api/*)
    // - Next.js internal files (_next/*)
    // - Static files
    // - Public files
    // - Favicon và các file thường gặp
    '/((?!api|_next|static|public|favicon\\.ico|robots\\.txt|sitemap\\.xml|manifest\\.json|.*\\.(?:ico|svg|png|jpg|jpeg|webp|js|css|map|json|xml|txt)$).*)',
  ],
};
