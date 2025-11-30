# Nivi Protocol - Design Guidelines

## 🎨 Design Philosophy

Nivi embraces a **"Premium Dark Mode Fintech meets Cyberpunk India"** aesthetic, combining the sophistication of modern fintech apps (like CRED) with Web3 blockchain technology and subtle Indian cultural elements.

---

## 🎭 Brand Identity

### Core Values
- **Authentic** - Real content verification through AI
- **Transparent** - Blockchain-based licensing
- **Premium** - High-end user experience
- **Empowering** - Creators own their content

### Visual Language
- Geometric shapes inspired by lotus petals
- Flowing gradients suggesting digital transformation
- Clean, minimal interfaces with purposeful animations
- Glass morphism for depth and hierarchy

---

## 🎨 Color System

### Primary Colors

```css
/* Deep Void Black - Background Base */
--void-black: #050505;

/* Electric Indigo - Primary Actions */
--electric-indigo: #6366F1;
--indigo-light: #818CF8;
--indigo-dark: #4F46E5;

/* Marigold Orange - Accents & Verified Badges */
--marigold: #F59E0B;
--marigold-light: #FBBF24;
--marigold-dark: #D97706;

/* Purple - Secondary Actions */
--cosmic-purple: #8B5CF6;
--purple-light: #A78BFA;
```

### Neutral Scale

```css
/* White with opacity for layering */
--white-100: rgba(255, 255, 255, 1.0);   /* Pure white text */
--white-80: rgba(255, 255, 255, 0.8);    /* Primary text */
--white-60: rgba(255, 255, 255, 0.6);    /* Secondary text */
--white-40: rgba(255, 255, 255, 0.4);    /* Tertiary text */
--white-20: rgba(255, 255, 255, 0.2);    /* Borders */
--white-10: rgba(255, 255, 255, 0.1);    /* Subtle borders */
--white-5: rgba(255, 255, 255, 0.05);    /* Glass cards */
```

### Functional Colors

```css
/* Success */
--success: #10B981;
--success-light: #34D399;

/* Warning */
--warning: #F59E0B;

/* Error */
--error: #EF4444;

/* Info */
--info: #3B82F6;
```

---

## 📝 Typography

### Font Families

```css
/* Space Grotesk - Headings, Numbers, Uppercase Text */
font-family: 'Space Grotesk', sans-serif;
/* Use for: H1-H6, Price displays, Stats, Button text */

/* Manrope - Body Text, Descriptions */
font-family: 'Manrope', sans-serif;
/* Use for: Paragraphs, Labels, Input fields */
```

### Type Scale

```css
/* Headings - Space Grotesk */
--h1: 3rem (48px);       /* Page titles */
--h2: 2rem (32px);       /* Section headers */
--h3: 1.5rem (24px);     /* Card titles */
--h4: 1.25rem (20px);    /* Subsections */

/* Body - Manrope */
--body-lg: 1.125rem (18px);  /* Large body */
--body: 1rem (16px);         /* Default body */
--body-sm: 0.875rem (14px);  /* Small body */
--caption: 0.75rem (12px);   /* Captions, labels */
```

### Typography Rules

**DO:**
- Use Space Grotesk for all headings and numerical data
- Use uppercase + letter-spacing for emphasis
- Maintain consistent hierarchy
- Use Manrope for readable body content

**DON'T:**
- Mix font weights within the same text block
- Use font sizes smaller than 12px
- Override default typography unless specifically requested
- Use custom font-weight Tailwind classes (font-bold, etc.) without reason

---

## 🔲 Glassmorphism System

### Base Glass Card

```css
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.5rem; /* 24px */
}
```

### Interactive Glass Card

```css
.glass-card-hover {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-card-hover:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(99, 102, 241, 0.3);
  transform: translateY(-2px);
}
```

### Elevation Levels

```css
/* Level 1 - Base cards */
background: rgba(255, 255, 255, 0.05);
border: 1px solid rgba(255, 255, 255, 0.1);

/* Level 2 - Elevated cards */
background: rgba(255, 255, 255, 0.08);
border: 1px solid rgba(255, 255, 255, 0.15);

/* Level 3 - Modal/Overlay */
background: rgba(255, 255, 255, 0.1);
border: 1px solid rgba(255, 255, 255, 0.2);
box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
```

---

## 🎬 Animation Guidelines

### Timing Functions

```css
/* Snappy - Quick interactions */
--ease-snappy: cubic-bezier(0.4, 0, 0.2, 1);
/* Duration: 150-200ms */

/* Smooth - Standard transitions */
--ease-smooth: cubic-bezier(0.4, 0, 0.6, 1);
/* Duration: 300ms */

/* Bounce - Playful interactions */
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
/* Duration: 400-500ms */

/* Slide - Page transitions */
--ease-slide: cubic-bezier(0.25, 0.46, 0.45, 0.94);
/* Duration: 400-600ms */
```

### Motion Patterns

**Hover States:**
```css
/* Scale slightly larger */
transform: scale(1.05);
transition-duration: 200ms;

/* Lift upwards */
transform: translateY(-4px);
transition-duration: 300ms;
```

**Click/Tap States:**
```css
/* Scale down slightly */
transform: scale(0.95);
transition-duration: 100ms;
```

**Page Transitions:**
```jsx
// Entry
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.4 }}

// Exit
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.3 }}
```

**Stagger Children:**
```jsx
// Parent
transition={{ staggerChildren: 0.1 }}

// Children
transition={{ delay: index * 0.05 }}
```

### Animation Best Practices

**DO:**
- Use animations to guide user attention
- Keep animations under 500ms for interactions
- Stagger list items for smooth reveals
- Add loading states for async actions
- Use spring physics for natural motion

**DON'T:**
- Animate on every state change
- Use animations longer than 1 second
- Animate too many elements simultaneously
- Skip loading states
- Use jarring or distracting animations

---

## 📐 Spacing System

### Base Unit: 4px

```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
```

### Component Spacing

```css
/* Card padding */
padding: 1.5rem; /* 24px */

/* Section gaps */
gap: 1rem; /* 16px */

/* List item spacing */
margin-bottom: 0.75rem; /* 12px */

/* Page margins */
padding: 1.5rem; /* 24px */

/* Bottom safe area (for tab bar) */
padding-bottom: 6rem; /* 96px */
```

---

## 🎯 Component Patterns

### Primary Button

```jsx
<button className="btn-primary">
  {/* Applies gradient background, padding, rounded corners */}
  Subscribe to License
</button>
```

**CSS:**
```css
.btn-primary {
  background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
  padding: 0.75rem 2rem;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.3);
}

.btn-primary:hover {
  box-shadow: 0 6px 30px rgba(99, 102, 241, 0.5);
  transform: translateY(-2px);
}
```

### Text Gradient

```jsx
<h1 className="text-gradient">NIVI PROTOCOL</h1>
```

**CSS:**
```css
.text-gradient {
  background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #F59E0B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Neon Glow Effect

```jsx
<div className="neon-glow">
  {/* SVG or icon */}
</div>
```

**CSS:**
```css
.neon-glow {
  filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.6))
          drop-shadow(0 0 20px rgba(99, 102, 241, 0.4));
}
```

### Video Card Pattern

**Structure:**
```jsx
<div className="glass-card-hover">
  <div className="aspect-[9/16]"> {/* Vertical video format */}
    <img />
    {/* Overlays */}
    <div className="category-badge" />
    <div className="price-tag" />
    <div className="stats" />
  </div>
  <div className="p-3"> {/* Card info */}
    <h3>{title}</h3>
    <div>{creator}</div>
  </div>
</div>
```

---

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile First Approach */
--mobile: 320px - 767px;    /* Default */
--tablet: 768px - 1023px;   /* md: */
--desktop: 1024px+;         /* lg: */
```

### Layout Guidelines

**Mobile (Default):**
- Single column layouts
- 16-24px horizontal padding
- Full-width cards
- Masonry grid: 2 columns

**Tablet:**
- 2-3 column grids
- 32-48px horizontal padding
- Larger cards
- Masonry grid: 3 columns

**Desktop:**
- Max-width containers (1200px)
- 3-4 column grids
- Side navigation possible
- Masonry grid: 4 columns

---

## 🖼️ Image Guidelines

### Aspect Ratios

```css
/* Video thumbnails */
aspect-ratio: 9/16; /* Vertical (Instagram/TikTok style) */

/* Hero images */
aspect-ratio: 16/9; /* Horizontal */

/* Profile avatars */
aspect-ratio: 1/1; /* Square */
```

### Loading Strategy

```jsx
<ImageWithFallback
  src={imageUrl}
  alt="Description"
  className="object-cover"
/>
```

**Always use:**
- `object-cover` for thumbnails
- `object-contain` for logos
- Proper `alt` text for accessibility
- Unsplash for placeholder images

---

## ♿ Accessibility

### Color Contrast

- White text on dark background: **WCAG AAA** compliant
- Minimum contrast ratio: **7:1**
- Interactive elements: Visible focus states

### Interactive Elements

```css
/* Minimum touch target */
min-height: 44px;
min-width: 44px;

/* Focus visible */
:focus-visible {
  outline: 2px solid #6366F1;
  outline-offset: 2px;
}
```

### ARIA Labels

```jsx
<button aria-label="Close menu">
  <X />
</button>

<input 
  type="text" 
  aria-label="Search videos"
  placeholder="Search..."
/>
```

---

## 🎨 Icon System

### Icon Library
**Lucide React** - Consistent, minimal icon set

### Icon Sizes

```jsx
/* Small - 16px */
<Icon className="w-4 h-4" />

/* Medium - 20px */
<Icon className="w-5 h-5" />

/* Large - 24px */
<Icon className="w-6 h-6" />

/* Extra Large - 32px */
<Icon className="w-8 h-8" />
```

### Icon Colors

```css
/* Primary actions */
color: #6366F1; /* Indigo */

/* Success states */
color: #10B981; /* Green */

/* Warning/Verified */
color: #F59E0B; /* Orange */

/* Default */
color: rgba(255, 255, 255, 0.6); /* White 60% */
```

---

## 🔐 Brand Elements

### Geometric Lotus Logo

The lotus represents:
- **Growth** - Emerging from darkness
- **Purity** - Authentic content
- **Technology** - Geometric, modern interpretation
- **Indian Heritage** - Cultural connection

**Usage:**
- Splash screen (large, animated)
- Navigation bar (small, static)
- Watermarks (subtle overlay)

### Verification Badges

**Shelby AI Verified:**
```jsx
<div className="flex items-center gap-2">
  <Shield className="text-indigo-400" />
  <span>Shelby AI Verified</span>
</div>
```

**Creator Verified:**
```jsx
<CheckCircle className="w-4 h-4 text-indigo-400" />
```

---

## 📋 Best Practices

### Performance

1. **Lazy load images** below the fold
2. **Optimize animations** - Use `transform` and `opacity`
3. **Minimize re-renders** - Use proper React keys
4. **Debounce search** inputs
5. **Virtualize long lists** when needed

### Code Quality

1. **Component structure:**
   ```
   /components
     - SplashScreen.tsx
     - MarketplaceFeed.tsx
     - LicenseDetail.tsx
   ```

2. **Naming conventions:**
   - PascalCase for components
   - camelCase for functions/variables
   - SCREAMING_SNAKE_CASE for constants

3. **Props typing:**
   ```tsx
   interface Props {
     video: Video;
     onBack: () => void;
   }
   ```

### State Management

1. Use `useState` for local state
2. Lift state when sharing between siblings
3. Use `useEffect` for side effects (scroll, timers)
4. Keep state minimal and derived

---

## 🚀 Launch Checklist

- [ ] All images optimized
- [ ] Loading states implemented
- [ ] Error boundaries added
- [ ] Animations tested on mobile
- [ ] Color contrast verified
- [ ] Touch targets minimum 44px
- [ ] Keyboard navigation works
- [ ] Screen reader tested
- [ ] Performance budget met
- [ ] PWA manifest configured

---

## 📞 Design System Maintenance

### When to Update

- New feature requires new component
- Accessibility issues discovered
- Performance improvements needed
- User feedback indicates confusion

### How to Update

1. Document change in this file
2. Update affected components
3. Test across all screens
4. Verify responsive behavior
5. Check accessibility compliance

---

**Last Updated:** November 30, 2025
**Version:** 1.0.0
**Maintained by:** Nivi Protocol Design Team
