# Language System Documentation

## Tổng quan

Hệ thống ngôn ngữ đã được cơ cấu lại để dễ dàng mở rộng, quản lý và bảo trì. Tất cả cấu hình ngôn ngữ được tập trung tại `lib/i18n/language-config.ts`.

## Kiến trúc

### 1. Centralized Configuration (`lib/i18n/language-config.ts`)

- **SUPPORTED_LANGUAGES**: Array chứa tất cả ngôn ngữ được hỗ trợ
- **LanguageConfig**: Interface định nghĩa cấu trúc một ngôn ngữ
- Auto-detection dựa trên browser language
- Mapping Accept-Language headers cho API requests
- Date/time locale cho formatting

### 2. Language Provider (`contexts/LanguageContext.tsx`)

- Context cung cấp state và functions cho toàn bộ app
- Auto-detect ngôn ngữ lần đầu tiên dựa trên browser
- Sync với server session
- Cập nhật API client headers khi đổi ngôn ngữ

### 3. Server Actions (`lib/languageActions.ts`)

- Save/get language từ server session
- Auto-detection và initialization
- Type-safe với SupportedLanguageCode

### 4. API Client (`lib/api/apiClient.ts`)

- Tự động set Accept-Language header dựa trên config
- Sync với language context

## Cách sử dụng

### Thêm ngôn ngữ mới

1. **Thêm vào SUPPORTED_LANGUAGES array**:

```typescript
{
  code: "zh",
  name: "中文",
  englishName: "Chinese",
  flag: "🇨🇳", 
  acceptLanguage: "zh-CN,zh;q=0.9,en;q=0.8",
  dateLocale: "zh-CN",
  enabled: true, // Set true để enable
  browserCodes: ["zh", "zh-CN", "zh-cn", "zh-Hans"]
}
```

2. **Tạo translation files**:
```
public/locales/zh/common.json
public/locales/zh/terms.json
public/locales/zh/privacy.json
...
```

3. **Rebuild app** - hệ thống sẽ tự động load files mới

### Tắt ngôn ngữ

Đặt `enabled: false` trong config:

```typescript
{
  code: "zh",
  // ... other props
  enabled: false, // Ngôn ngữ sẽ bị ẩn khỏi UI
}
```

### Đổi ngôn ngữ mặc định

Đặt `isDefault: true` cho ngôn ngữ mong muốn:

```typescript
{
  code: "en",
  // ... other props
  isDefault: true, // Thay vì vi
}
```

### Sử dụng trong components

```typescript
import { useLanguage } from "@/contexts/LanguageContext";

function MyComponent() {
  const { 
    language,           // Current language code
    setLanguage,        // Function to change language
    availableLanguages, // Array of enabled languages
    isDetectedLanguage, // True if auto-detected
    t                   // Translation function
  } = useLanguage();

  return (
    <div>
      <p>Current: {language}</p>
      <select onChange={(e) => setLanguage(e.target.value)}>
        {availableLanguages.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}
```

## Features

### ✅ Auto-detection
- Detect browser language lần đầu tiên
- Fallback về default nếu không support
- Save vào session để nhớ lần sau

### ✅ Type Safety
- `SupportedLanguageCode` type được generate từ config
- Type guards và validation
- IntelliSense support

### ✅ Scalability
- Dễ thêm/bớt ngôn ngữ
- Dynamic loading translation files
- Centralized configuration

### ✅ Performance
- Translation caching
- Lazy loading
- Minimal bundle size impact

### ✅ API Integration
- Auto Accept-Language headers
- Date/time formatting
- Server-side language detection

## Migration từ hệ thống cũ

Hệ thống mới backward compatible với:
- `useLanguage()` hook - có thêm fields mới
- `t()` function
- Language persistence trong session

Có thể thay đổi dần dần các components để sử dụng `availableLanguages` thay vì hardcode list.

## Examples

### Language Selector Component

```typescript
function LanguageSelector() {
  const { language, setLanguage, availableLanguages, isDetectedLanguage } = useLanguage();
  
  return (
    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
      {availableLanguages.map(lang => (
        <option key={lang.code} value={lang.code}>
          {lang.flag} {lang.name}
          {language === lang.code && isDetectedLanguage && " (Auto)"}
        </option>
      ))}
    </select>
  );
}
```

### Check if language is supported

```typescript
import { isLanguageSupported } from "@/lib/i18n/language-config";

if (isLanguageSupported("zh")) {
  // Language is supported and enabled
}
```

### Get Accept-Language header

```typescript
import { getAcceptLanguageHeader } from "@/lib/i18n/language-config";

const header = getAcceptLanguageHeader("vi"); 
// Returns: "vi-VN,vi;q=0.9,en;q=0.8"
```

## Configuration Options

| Field | Type | Description |
|-------|------|-------------|
| `code` | string | ISO 639-1 language code |
| `name` | string | Native name (显示给用户) |
| `englishName` | string | English name |
| `flag` | string | Flag emoji hoặc icon |
| `acceptLanguage` | string | HTTP Accept-Language header value |
| `dateLocale` | string | Intl.DateTimeFormat locale |
| `enabled` | boolean | Có hiển thị trong UI không |
| `isDefault` | boolean | Ngôn ngữ mặc định fallback |
| `browserCodes` | string[] | Browser language codes mapping |
