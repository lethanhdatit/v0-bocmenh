# Migration Guide - Language System

## Overview

Hướng dẫn migration từ hệ thống ngôn ngữ cũ sang hệ thống mới được cơ cấu lại.

## ✅ Đã hoàn thành

### Core Infrastructure
- [x] `lib/i18n/language-config.ts` - Centralized configuration
- [x] `lib/languageActions.ts` - Updated với auto-detection
- [x] `lib/api/apiClient.ts` - Dynamic Accept-Language headers
- [x] `contexts/LanguageContext.tsx` - Enhanced với availableLanguages
- [x] `lib/infra/i18n.ts` - Dynamic translation loading
- [x] `lib/session/sessionOptions.ts` - Type-safe language support
- [x] `components/layout/Footer.tsx` - Sử dụng config mới

### Features
- [x] Auto-detect browser language lần đầu
- [x] Type-safe SupportedLanguageCode
- [x] Dynamic Accept-Language headers dựa trên config
- [x] Centralized enable/disable languages
- [x] Backward compatibility

## 🔄 Cần Migration (Optional)

### Components chưa migrate
Các components này vẫn hoạt động bình thường, nhưng có thể optimize để sử dụng config mới:

#### 1. Language Selector Components
```typescript
// Cũ
const languages = [
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "en", name: "English", flag: "🇺🇸" },
];

// Mới 
const { availableLanguages } = useLanguage();
// availableLanguages được generate từ config, tự động exclude disabled languages
```

#### 2. Hardcoded Language Checks
```typescript
// Cũ
if (language === "vi") {
  // ...
}

// Mới
import { getLanguageConfig } from "@/lib/i18n/language-config";
const config = getLanguageConfig(language);
if (config?.code === "vi") {
  // ...
}
```

#### 3. Manual Accept-Language Headers
```typescript
// Cũ
const acceptLang = language === "vi" 
  ? "vi-VN,vi;q=0.9,en;q=0.8"
  : "en-US,en;q=0.9,vi;q=0.8";

// Mới
import { getAcceptLanguageHeader } from "@/lib/i18n/language-config";
const acceptLang = getAcceptLanguageHeader(language);
```

## 🚀 Immediate Benefits

### 1. Auto Language Detection
```typescript
// User vào lần đầu với browser tiếng Việt
// → Tự động set language = "vi"
// → Save vào session
// → Lần sau không cần detect nữa
```

### 2. Easy Language Addition
```typescript
// Chỉ cần thêm vào SUPPORTED_LANGUAGES array
{
  code: "zh",
  name: "中文", 
  englishName: "Chinese",
  flag: "🇨🇳",
  acceptLanguage: "zh-CN,zh;q=0.9,en;q=0.8",
  dateLocale: "zh-CN",
  enabled: true, // Set false để tạm tắt
  browserCodes: ["zh", "zh-CN", "zh-Hans"]
}
```

### 3. Type Safety
```typescript
// IntelliSense sẽ suggest chính xác các language codes
function setLang(lang: SupportedLanguageCode) {
  // lang chỉ có thể là "vi" | "en" | ...enabled languages
}
```

### 4. Centralized Control
```typescript
// Tắt một ngôn ngữ globally
{
  code: "en",
  enabled: false // → Ngôn ngữ sẽ biến mất khỏi tất cả UI
}
```

## 📋 Migration Checklist

### Phase 1: Infrastructure ✅ Done
- [x] Setup language-config.ts
- [x] Update LanguageContext
- [x] Update server actions
- [x] Update API client
- [x] Test build success

### Phase 2: Component Migration (Optional)
- [ ] Find hardcoded language arrays
- [ ] Replace với availableLanguages từ config
- [ ] Update language checks to use config
- [ ] Test UI với disabled languages

### Phase 3: Testing
- [ ] Test auto-detection với different browser languages
- [ ] Test enable/disable languages
- [ ] Test API headers
- [ ] Test persistence across sessions

## 📝 Example Migrations

### Language Selector Component

#### Before
```typescript
function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const languages = [
    { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
    { code: "en", name: "English", flag: "🇺🇸" },
  ];
  
  return (
    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
      {languages.map(lang => (
        <option key={lang.code} value={lang.code}>
          {lang.flag} {lang.name}
        </option>
      ))}
    </select>
  );
}
```

#### After
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

#### Benefits
- Automatically excludes disabled languages
- Shows auto-detection indicator
- Centralized language configuration
- Type-safe language codes

### API Headers

#### Before
```typescript
const headers = {
  "Accept-Language": language === "vi" 
    ? "vi-VN,vi;q=0.9,en;q=0.8"
    : "en-US,en;q=0.9,vi;q=0.8"
};
```

#### After
```typescript
import { getAcceptLanguageHeader } from "@/lib/i18n/language-config";

const headers = {
  "Accept-Language": getAcceptLanguageHeader(language)
};
```

## 🧪 Testing Scenarios

### 1. Auto-Detection Test
```
1. Xóa localStorage và cookies
2. Set browser language = vi-VN
3. Refresh trang
4. Expect: language = "vi", isDetectedLanguage = true
```

### 2. Disabled Language Test
```
1. Set enabled: false cho "en" trong config
2. Build & refresh
3. Expect: English option biến mất khỏi language selector
```

### 3. New Language Test
```
1. Thêm Chinese vào SUPPORTED_LANGUAGES với enabled: true
2. Thêm translation files zh/*.json
3. Build & refresh  
4. Expect: Chinese option xuất hiện trong language selector
```

## ⚠️ Breaking Changes

**Không có breaking changes!** Hệ thống mới hoàn toàn backward compatible.

Existing code sử dụng:
- `useLanguage()` hook vẫn hoạt động
- `language` state vẫn đúng type
- `setLanguage()` function vẫn hoạt động
- Translation files vẫn được load như cũ

Chỉ có thêm fields mới:
- `availableLanguages` 
- `isDetectedLanguage`

## 🎯 Next Steps

1. **Optional Migration**: Có thể từ từ update components để sử dụng `availableLanguages`
2. **Add Languages**: Dễ dàng thêm ngôn ngữ mới bằng cách edit config file
3. **Monitoring**: Theo dõi auto-detection metrics
4. **Performance**: Translation caching đã được optimize
