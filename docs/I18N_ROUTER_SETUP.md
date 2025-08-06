# Next.js i18n Router Setup Documentation

## Cấu hình hoàn tất

Dự án đã được cấu hình thành công với `next-i18n-router` cho routing đa ngôn ngữ.

## Cấu trúc thư mục

```
app/
├── layout.tsx          # Root layout (không có providers)
├── page.tsx           # Root page (redirect to default locale)
└── [lang]/
    ├── layout.tsx     # Locale layout (có tất cả providers)
    ├── page.tsx       # Locale-specific pages
    ├── about/
    ├── contact/
    └── ...            # Tất cả pages khác
```

## Cấu hình chính

### 1. i18nConfig.ts
- Tự động lấy locales từ `language-config.ts`
- Đồng bộ với hệ thống ngôn ngữ hiện có
- Tắt `localeDetector` vì đã có logic riêng

### 2. middleware.ts
- Sử dụng `i18nRouter` từ `next-i18n-router`
- Matcher loại trừ API routes, static files
- Thêm security headers

### 3. LanguageContext (updated)
- Đọc locale từ URL params
- Sync với server session
- Navigation tự động khi đổi ngôn ngữ
- Fallback handling

## URL Structure

```
/ hoặc /vi        → Vietnamese (default)
/en              → English
/vi/about        → Vietnamese About page  
/en/about        → English About page
```

## Cách sử dụng

### 1. Trong Components

```tsx
import { useParams } from 'next/navigation';
import { getDefaultLanguageConfig } from '@/lib/i18n/language-config';

function MyComponent() {
  const params = useParams();
  const currentLocale = (params?.lang as string) || getDefaultLanguageConfig().code;
  
  // Helper function to create localized URLs
  const createLocalizedUrl = (path: string) => {
    const defaultLang = getDefaultLanguageConfig().code;
    if (currentLocale === defaultLang) {
      return path; // Default language doesn't need prefix
    }
    return `/${currentLocale}${path}`;
  };
  
  return (
    <Link href={createLocalizedUrl('/about')}>
      About
    </Link>
  );
}
```

### 2. Language Switching

```tsx
import { useLanguage } from '@/contexts/LanguageContext';

function LanguageSwitcher() {
  const { language, setLanguage, availableLanguages } = useLanguage();
  
  const handleLanguageChange = async (newLang) => {
    await setLanguage(newLang); // Tự động navigate to new URL
  };
  
  return (
    <select value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
      {availableLanguages.map(lang => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
}
```

## Tính năng

### ✅ Hoàn tất
- [x] Middleware routing
- [x] URL structure với locale prefixes
- [x] Language context integration
- [x] Footer navigation updates
- [x] Fallback handling
- [x] Server session sync

### 🔄 Cần kiểm tra
- [ ] API routes vẫn hoạt động bình thường
- [ ] Static files serve đúng
- [ ] SEO meta tags per locale
- [ ] Sitemap generation

### 📝 Cần làm tiếp
- [ ] Update Navigation component
- [ ] Update tất cả Link components trong app
- [ ] Generate sitemap với multiple locales
- [ ] Update robots.txt

## Debugging

### 1. Kiểm tra URL routing:
```bash
# Các URL này nên hoạt động:
http://localhost:3000/        # → Redirect to /vi
http://localhost:3000/vi      # → Vietnamese homepage
http://localhost:3000/en      # → English homepage
http://localhost:3000/vi/about # → Vietnamese about page
http://localhost:3000/en/about # → English about page
```

### 2. Kiểm tra Language Context:
```tsx
import { useLanguage } from '@/contexts/LanguageContext';

function DebugLanguage() {
  const { language, isLoading, isDetectedLanguage } = useLanguage();
  
  return (
    <div>
      <p>Current language: {language}</p>
      <p>Is loading: {isLoading}</p>
      <p>Is detected: {isDetectedLanguage}</p>
    </div>
  );
}
```

### 3. Console logs để debug:
- Middleware: console.log trong middleware.ts
- Language Context: console.log trong useEffect
- Navigation: console.log trong setLanguage function

## Migration từ next-i18next

### Đã thay đổi:
- ❌ Không dùng `next-i18next.config.js` nữa
- ❌ Không dùng `i18n` config trong `next.config.js`
- ✅ Dùng `next-i18n-router` middleware
- ✅ URL structure với [lang] dynamic route

### Tương thích:
- ✅ `useTranslation()` hook vẫn hoạt động
- ✅ Translation files trong `/public/locales/` vẫn dùng được
- ✅ Server-side translations với `getTranslations()`

## Troubleshooting

### Lỗi thường gặp:

1. **404 khi access /vi hoặc /en**
   - Kiểm tra `app/[lang]/page.tsx` có tồn tại
   - Kiểm tra `generateStaticParams()` function

2. **Language context không sync với URL**
   - Kiểm tra `useParams()` import
   - Kiểm tra `getCurrentLanguageFromUrl()` function

3. **Middleware không hoạt động**
   - Kiểm tra `matcher` config
   - Kiểm tra `i18nConfig` import

4. **Links không redirect đúng**
   - Dùng `createLocalizedUrl()` helper
   - Check `useParams()` để lấy current locale

## Next Steps

1. **Cập nhật Navigation component** để dùng localized URLs
2. **Cập nhật tất cả Link components** trong app
3. **Test thoroughly** tất cả routes và language switching
4. **Update SEO components** cho multiple locales
5. **Generate sitemap** với multiple languages
