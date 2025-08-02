# Feature Flags System

Hệ thống quản lý feature flags tập trung cho website phong thủy, cho phép bật/tắt các tính năng và hiển thị "Coming Soon" một cách nhẹ nhàng.

## Tính năng chính

- ✅ **Centralized Management**: Quản lý tất cả feature flags tại một nơi
- ✅ **Coming Soon UI**: Badges và pages coming soon thân thiện
- ✅ **Lightweight Approach**: Giữ nguyên UI gốc, chỉ thêm opacity và badges
- ✅ **Context Aware**: Styling khác nhau cho navigation vs feature cards
- ✅ **SEO Friendly**: Coming soon pages có meta tags phù hợp

## Cấu hình Features

### File: `lib/features/feature-flags.ts`

```typescript
export const FEATURE_FLAGS: Record<FeaturePath, FeatureConfig> = {
  '/dreams': {
    path: '/dreams',
    status: 'coming-soon', // 'active' | 'coming-soon'
    title: 'Giải Mộng',
    description: 'Khám phá ý nghĩa giấc mơ',
    estimatedLaunch: 'Q2 2025'
  },
  // ...
};
```

## Sử dụng

### 1. Trong Components

```typescript
import { useFeature, ComingSoonBadge, FeatureWrapper } from '@/lib/features';

function MyComponent() {
  const { isActive, isComingSoon } = useFeature('/dreams');
  
  return (
    <FeatureWrapper path="/dreams" reduceOpacity={true}>
      <div className="feature-card">
        {isComingSoon && <ComingSoonBadge variant="corner" />}
        <h3>Giải Mộng</h3>
        <p>Khám phá ý nghĩa giấc mơ...</p>
      </div>
    </FeatureWrapper>
  );
}
```

### 2. Trong Navigation - Custom Badge Configuration

```typescript
import { ComingSoonNavBadge } from '@/lib/features';
import { BADGE_CONFIG } from '@/lib/features/badge-config';

function NavItem({ href, label }) {
  const { isComingSoon } = useFeature(href);
  
  return (
    <Link href={href} className={`group ${isComingSoon ? 'opacity-60 pointer-events-none' : ''}`}>
      <span className="relative inline-block pr-3 pt-1">
        {label}
        {isComingSoon && (
          <ComingSoonNavBadge 
            position="top-right"    // 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left'
            size="xs"              // 'xs' | 'sm' | 'md' | 'lg'
            distance="normal"      // 'near' | 'normal' | 'far'
          />
        )}
      </span>
    </Link>
  );
}

// Or use default config
function SimpleNavItem({ href, label }) {
  return (
    <NavItem 
      item={{ href, label }}
      // Sử dụng config mặc định từ BADGE_CONFIG.navigation
    />
  );
}
```

### Badge Configuration Options

#### Position Options:
- `top-right`: Góc trên phải (default)
- `top-center`: Giữa phía trên  
- `top-left`: Góc trên trái
- `bottom-right`: Góc dưới phải
- `bottom-center`: Giữa phía dưới
- `bottom-left`: Góc dưới trái

#### Size Options:
- `xs`: Siêu nhỏ (scale-75, text-xs)
- `sm`: Nhỏ (scale-90, text-xs) 
- `md`: Vừa (text-xs)
- `lg`: Lớn (text-sm)

#### Distance Options:
- `near`: Gần menu text (1px offset)
- `normal`: Bình thường (2px offset) - default
- `far`: Xa menu text (3px offset)

### Custom Configuration Examples:

```typescript
// Example 1: Different positions
<ComingSoonNavBadge position="top-center" size="sm" distance="far" />
<ComingSoonNavBadge position="bottom-right" size="xs" distance="near" />

// Example 2: Configuration presets
const MENU_CONFIGS = {
  desktop: { position: 'top-right', size: 'xs', distance: 'normal' },
  mobile: { position: 'top-right', size: 'xs', distance: 'near' },
  sidebar: { position: 'bottom-right', size: 'sm', distance: 'far' }
};

// Example 3: Responsive badges
<ComingSoonNavBadge 
  position="top-right"
  size="xs"
  distance="normal"
  className="hidden sm:block" // Ẩn trên mobile
/>
```

### 3. Trong Pages

```typescript
// Method 1: Manual check
import { getFeatureConfig } from '@/lib/features/feature-flags';
import { ComingSoonPage } from '@/components/features/ComingSoonPage';

export default function DreamsPage() {
  const featureConfig = getFeatureConfig('/dreams');
  
  if (featureConfig?.status === 'coming-soon') {
    return (
      <ComingSoonPage 
        title={featureConfig.title}
        description={featureConfig.description}
        estimatedLaunch={featureConfig.estimatedLaunch}
      />
    );
  }
  
  return <ActualPageContent />;
}

// Method 2: HOC approach
import { withFeatureGuard } from '@/lib/features/feature-guard';

const DreamsPage = () => <ActualPageContent />;
export default withFeatureGuard(DreamsPage, '/dreams');
```

## Components

### ComingSoonBadge

Badge nhỏ hiển thị "Sắp Có" với animation đẹp mắt.

```typescript
<ComingSoonBadge 
  variant="corner"    // 'corner' | 'inline' | 'floating'
  size="sm"          // 'sm' | 'md' | 'lg'
/>
```

### FeatureWrapper

Wrapper component áp dụng opacity và disable clicks cho coming soon features.

```typescript
<FeatureWrapper 
  path="/dreams"
  disableClicks={true}     // Disable pointer events
  reduceOpacity={true}     // Giảm opacity
>
  <YourContent />
</FeatureWrapper>
```

### ComingSoonPage

Full-page coming soon với animation và navigation.

```typescript
<ComingSoonPage 
  title="Giải Mộng"
  description="Tính năng đang phát triển..."
  estimatedLaunch="Q2 2025"
/>
```

## Hooks

### useFeature

```typescript
const { isActive, isComingSoon, config } = useFeature('/dreams');
```

### useFeatureGuard

```typescript
const { 
  isActive, 
  isComingSoon, 
  shouldShowComingSoon, 
  config 
} = useFeatureGuard('/dreams');
```

## Styling Guidelines

### Feature Cards
- ✅ Giữ nguyên UI gốc
- ✅ Thêm badge góc trên phải
- ✅ Opacity 60% cho coming soon
- ✅ Disable pointer events

### Navigation
- ✅ Badge nhỏ bên cạnh text
- ✅ Opacity 60% + pointer-events-none
- ✅ Hover vẫn có feedback

### Coming Soon Pages
- ✅ Animated background
- ✅ Clear call-to-action
- ✅ Back navigation
- ✅ Feature preview links

## Development Workflow

1. **Thêm feature mới:**
   ```typescript
   // Thêm vào FEATURE_FLAGS với status: 'coming-soon'
   '/new-feature': {
     path: '/new-feature',
     status: 'coming-soon',
     title: 'Tính Năng Mới',
     estimatedLaunch: 'Q3 2025'
   }
   ```

2. **Phát triển xong:**
   ```typescript
   // Chuyển status thành 'active'
   status: 'active'
   ```

3. **Deploy:**
   - Feature tự động hiển thị bình thường
   - Badges và coming soon pages biến mất

## File Structure

```
lib/features/
├── feature-flags.ts          # Cấu hình chính
├── use-feature.ts            # Hook chính
├── feature-guard.ts          # HOC và utilities
└── index.ts                  # Exports

components/features/
├── ComingSoonBadge.tsx       # Badge component
├── ComingSoonPage.tsx        # Full page component
└── FeatureWrapper.tsx        # Wrapper component
```

## Translation Keys

Thêm vào `public/locales/vi/common.json`:

```json
{
  "common": {
    "comingSoon": "Sắp Có",
    "explore": "Khám Phá",
    "goBack": "Quay Lại",
    "backToHome": "Về Trang Chủ"
  },
  "comingSoon": {
    "description": "Tính năng này đang được phát triển với nhiều cải tiến thú vị. Hãy quay lại sau nhé!",
    "estimatedLaunch": "Dự kiến ra mắt",
    "exploreOther": "Trong thời gian chờ đợi, hãy khám phá các tính năng khác:",
    "viewAllFeatures": "Xem tất cả tính năng"
  }
}
```
