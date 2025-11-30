# Nivi Protocol - User Flow Documentation

## 📱 App Overview

**Nivi Protocol** is a Web3 creator licensing platform that enables content creators to mint, license, and monetize their videos through blockchain-based subscriptions. The app combines AI-powered content verification (Shelby AI) with Aptos blockchain payments to create a secure, transparent marketplace for digital content rights.

---

## 🎯 Core User Personas

### 1. Content Creator
**Goal:** Monetize original video content through recurring licensing fees

**Pain Points:**
- Content theft and unauthorized usage
- Difficulty proving authenticity
- Complex licensing agreements
- Payment delays

### 2. Brand/Business
**Goal:** Access verified, licensed content for commercial use

**Pain Points:**
- Risk of using fake/manipulated content
- Unclear licensing rights
- High upfront costs
- Legal complications

---

## 🗺️ Complete User Journey

### Screen 1: Splash Screen

**Purpose:** Brand introduction & app initialization

**Duration:** ~2.5 seconds

**Elements:**
- Geometric lotus logo (animated 3D rotation)
- "NIVI PROTOCOL" branding with gradient
- Tagline: "Verify • Mint • Rent"
- Loading indicator with pulsing dots

**User Action:** None (automatic progression)

**Technical Behavior:**
```jsx
onAnimationComplete → setTimeout(2500ms) → navigate to Onboarding
```

**Design Details:**
- Clean black background (#050505)
- Floating lotus with smooth 3D rotation
- Subtle loading animation
- Text fades in with stagger effect

---

### Screen 2: Onboarding & Login

**Purpose:** User authentication & wallet connection

**Key Sections:**

#### Hero Section
- Large heading: "License Your Creativity, Empower Your Earnings"
- Subheading explaining blockchain-based licensing
- Visual hierarchy with gradient text

#### Value Propositions (3 Cards)

**Card 1: AI Verification**
- Icon: Shield with sparkles
- Title: "Shelby AI Verification"
- Description: 100% authentic content, no deepfakes
- Visual: Glass card with indigo accent

**Card 2: Smart Licensing**
- Icon: Zap
- Title: "On-Chain Licensing"
- Description: Automated payments, transparent terms
- Visual: Glass card with purple accent

**Card 3: Global Reach**
- Icon: Globe
- Title: "Global Marketplace"
- Description: Connect with brands worldwide
- Visual: Glass card with orange accent

#### Authentication
- "Connect with Photon" button (primary CTA)
- Simulates wallet connection
- Loading state during authentication (1.5s)

**User Action:** Click "Connect with Photon"

**Flow:**
```
Click button → Show loading (1.5s) → Simulate wallet connection → Navigate to Marketplace
```

**Technical Details:**
- Button shows spinner during loading
- Smooth transition to marketplace
- Sets `isLoggedIn` state to true
- Activates bottom navigation

**Design Notes:**
- Large, bold typography for hero
- Glassmorphism cards with hover effects
- Gradient primary button with glow
- Spacious layout with generous padding

---

### Screen 3: Marketplace Feed

**Purpose:** Browse and discover licensed content

**Header Section:**
- Title: "MARKETPLACE" (uppercase, Space Grotesk)
- Counter: "{X} verified licenses"
- Search icon button (toggles search bar)

**Search Functionality:**
- Expandable search bar
- Filters by video title OR creator name
- Real-time filtering
- Smooth animation on expand/collapse

**Filter Pills:**
- Categories: All, Dance, Food, Tech, Lifestyle, Comedy
- Horizontal scrollable
- Active state: Gradient background with glow
- Inactive state: Glass card style
- Click to filter content

**Stats Bar:**
- "Trending content" indicator (green)
- "All verified" indicator (orange shield)
- Provides trust signals

**Content Grid:**
- Masonry layout (2 columns on mobile)
- Responsive column count
- Staggered reveal animation
- 10 unique video cards with real data

#### Video Card Anatomy:

**Thumbnail Area (9:16 aspect ratio):**
- High-quality image
- Category tag (top-left corner)
- Price tag (bottom-left): "X APT/mo"
- View count (bottom-right with trending icon)
- Hover effect: Play button overlay
- Scale-up animation on hover

**Info Section:**
- Video title (max 2 lines, truncated)
- Creator avatar (circular, with ring)
- Creator name (truncated)
- License count

**Hover Interactions:**
- Card lifts up (-4px)
- Play button appears with backdrop blur
- Image scales to 110%
- Smooth 300ms transition

**Empty State:**
- Displayed when no results match filters
- Filter icon with message
- "Clear filters" button
- Centered layout in glass card

**Floating Action Button:**
- Position: Bottom-right (above tab bar)
- Icon: Plus sign
- Purpose: Navigate to Creator Studio
- Gradient background with glow
- Scale animation on hover

**User Actions:**
1. Search for content
2. Filter by category
3. Click video card → Navigate to License Detail
4. Click FAB → Navigate to Creator Studio

**Data Flow:**
```jsx
MOCK_VIDEOS → filter by category → filter by search → render in masonry grid
```

**Filtering Logic:**
```javascript
filteredVideos = MOCK_VIDEOS.filter(video => {
  matchesCategory: category === "All" || video.category === category
  matchesSearch: title.includes(query) || creator.includes(query)
})
```

**Performance Optimizations:**
- Lazy load images
- Debounced search
- Virtualized scrolling for large lists
- Optimized re-renders with proper keys

---

### Screen 4: License Detail

**Purpose:** View full content details and subscribe to license

**Entry Animation:**
- Scrolls to top on mount
- Fade in with slide-up (y: 20 → 0)

**Navigation Bar:**
- Back button with arrow (returns to marketplace)
- Share button (future: social sharing)
- Download button (future: content download)
- Sticky at top while scrolling

**Video Preview Section:**

**Hero Video Player:**
- 16:9 aspect ratio (horizontal video)
- Blurred overlay (preview mode)
- Large play button (120x120px)
- "NIVI" watermark (rotated -20deg)
- Preview mode message
- Unlock prompt

**Metadata:**
- Category badge (glass style)
- Video title (large, 48px)
- Creator avatar + name + verified badge
- "Content Creator" label

**Description:**
- Full video description (3-4 sentences)
- Explains content, use cases, quality

**Stats Grid (3 columns):**
1. **Views:** Eye icon + view count (e.g., "3.2M")
2. **Licenses:** Zap icon + license count
3. **Rating:** Star icon + rating (out of 5)

**Commercial Rights Section:**

**Rights List:**
- Checkmark icon (green) for each right
- 4-5 specific usage rights
- Examples:
  - "Commercial advertisements allowed"
  - "Social media posts allowed"
  - "Remix and edit allowed"
  - "Attribution required"

**Shelby AI Verification Badge:**
- Indigo glass card with border
- Shield icon
- "Shelby AI Verified" heading
- Explanation of authenticity guarantee
- Builds trust for brands

**Payment Section:**

**Subscription Details:**
- Heading: "Monthly Subscription"
- Subtext: "Cancel anytime • Automatic renewal on 1st"
- Large price display: "X APT/month"
- Gradient text for amount

**Price Breakdown:**
- Glass card container
- License fee (main amount)
- Platform fee (5% of license)
- Divider line
- Total with gradient styling

**Subscribe Button:**
- Full-width primary button
- Lightning bolt icon
- Text: "Subscribe to License"
- Three states:
  1. **Default:** Ready to subscribe
  2. **Loading:** Spinner + "Processing Payment..."
  3. **Success:** Checkmark + "Successfully Subscribed! 🎉"

**Payment Animation:**
```
Click → Loading (2s) → Confetti explosion → Success state (3s)
```

**Confetti Effect:**
- 50 colored particles
- Random positions across screen
- Fall from top to bottom
- Rotate during fall
- Colors: Indigo, Orange, Purple, Green
- Duration: 2-3 seconds
- Removed after animation

**Trust Signals (3 cards):**
1. **Secure Payment:** Shield icon
2. **Verified Content:** Checkmark icon
3. **Cancel Anytime:** Refresh icon

**Footer:**
- "Powered by Aptos • Secure blockchain payment"
- Shield icon
- Subtle text (40% opacity)

**User Actions:**
1. View video preview
2. Read rights & description
3. Review pricing
4. Click subscribe → Payment flow
5. See success confirmation
6. Return to marketplace

**Technical Flow:**
```
Video object passed from marketplace → Display all fields → 
Subscribe clicked → Loading state → Simulate payment (2s) → 
Show confetti → Success state → Alert confirmation
```

---

### Screen 5: Creator Studio

**Purpose:** Upload and mint content licenses as NFTs

**Entry Animation:**
- Scrolls to top on mount
- Fade in with slide-up

**Navigation:**
- Back arrow (returns to previous screen)
- Breadcrumb style header

**Upload Section:**

**Initial State (No Upload):**
- Large dashed border container
- Upload icon (64px)
- "Upload Your Content" heading
- File format requirements
- "Choose File" button (primary style)

**Click Action:**
- Simulates file upload
- Sets uploaded video preview
- Triggers Shelby AI verification

**Uploaded State:**
- Video thumbnail preview
- Aspect ratio: 9:16 (vertical)
- Overlaid verification status

**Shelby AI Verification States:**

**1. Scanning (0-3 seconds):**
- Orange shield icon with pulse
- "Analyzing with Shelby AI..." text
- Subtitle: "Checking for deepfakes and manipulation"
- Animated scanning bars (3 bars with stagger)
- Progress indicators

**2. Verified (after 3 seconds):**
- Green checkmark icon
- "Content Verified!" text
- Subtitle: "100% authentic, ready to mint"
- Success card with green accent
- Smooth transition from scanning

**AI Analysis Details:**
- Shows verification confidence
- Lists checks performed:
  - Deepfake detection
  - Content manipulation
  - Authenticity score
  - Metadata verification

**License Configuration:**

**Input Fields:**

1. **License Fee Input:**
   - Label: "Monthly License Fee"
   - Prefix: "APT"
   - Number input
   - Default: 10
   - Glass card style
   - Indigo focus ring

2. **Content Category:**
   - Dropdown/Select
   - Options: Dance, Food, Tech, Lifestyle, Comedy
   - Glass card style

3. **Usage Rights Checklist:**
   - Multiple checkboxes
   - Pre-filled common rights:
     - Commercial use
     - Social media
     - Remixing allowed
     - Attribution required

**Platform Fee Display:**
- Automatic calculation (5%)
- Shows earnings breakdown
- Creator receives 95%

**Mint Button:**
- Disabled until verified
- Full-width gradient button
- Lightning bolt icon
- Text: "Mint License NFT"

**Minting Flow:**
```
Click mint → Loading (1.5s) → Confetti animation → 
Success alert → "License NFT minted successfully!"
```

**Loading State:**
- Spinner icon
- "Minting on blockchain..."
- Disabled button state

**Success State:**
- Confetti explosion (same as subscription)
- Alert popup with details
- Confirmation message
- Option to view in marketplace

**Info Cards:**

**What is Minting?**
- Blue info icon
- Explanation of NFT creation
- Blockchain benefits
- Gas fee information

**Earnings Calculator:**
- Shows projected monthly income
- Based on license fee
- Example calculations

**User Actions:**
1. Upload video file
2. Wait for AI verification (automatic)
3. Set license fee
4. Configure usage rights
5. Click mint button
6. See success confirmation
7. Return to marketplace to view listing

**Technical Details:**
```jsx
handleUpload() → setUploadedVideo → setVerificationState("scanning") →
setTimeout(3000) → setVerificationState("verified") →
handleMintLicense() → setIsMinting(true) → setTimeout(1500) →
showConfetti() → alert() → setIsMinting(false)
```

---

### Screen 6: User Dashboard

**Purpose:** View earnings, active licenses, and analytics

**Entry Animation:**
- Scrolls to top on mount
- Fade in

**Header:**
- "WALLET" title (uppercase)
- "Your Earnings" subtitle

**Earnings Overview Card:**

**Main Display:**
- Large gradient text: "$450.00"
- Label: "Total Lifetime Earnings"
- Prominent positioning

**This Month Section:**
- Current month earnings: "$45.00"
- Growth indicator: "+12.5% from last month"
- Green trending up icon
- Positive reinforcement

**Active Licenses Counter:**
- Number with Zap icon: "3 Active"
- Links to license list below

**Withdraw Button:**
- Full-width primary button
- "Withdraw Earnings" text
- Money bag/download icon

**Withdrawal Flow:**
```
Click → Loading (2s) → Alert confirmation →
"Withdrawal initiated! Transfer within 24 hours"
```

**Active Licenses Section:**

**Section Header:**
- "Active Licenses" title
- Shield icon
- "Content being used by brands" subtitle

**License Cards (scrollable list):**

Each card contains:

**Brand Logo:**
- Circular image (48x48px)
- Company branding

**License Details:**
- Video title (truncated)
- Brand name
- Monthly fee amount
- Status badge: "Active" (green)
- Start date

**Visual Hierarchy:**
- Glass card container
- Hover effect (lift + border glow)
- Chevron right icon (implies detail view)

**Example License Entry:**
```
[Nike India Logo]
Viral Dance Tutorial
$10/month • Active since Nov 1, 2024
```

**Performance Stats (future enhancement):**
- Views from licensed content
- Engagement metrics
- Revenue per license

**Quick Actions:**
- View all licenses
- Download earnings report
- Tax documentation
- Payment settings

**Empty State (no active licenses):**
- Illustration or icon
- "No active licenses yet"
- CTA: "Create your first content"
- Links to Creator Studio

**User Actions:**
1. View total earnings
2. Check monthly performance
3. Review active licenses
4. Withdraw earnings
5. Navigate to create more content

**Data Structure:**
```javascript
EARNINGS_DATA = {
  total: 450.00,
  thisMonth: 45.00,
  growth: 12.5,
  activeLicenses: 3
}

MOCK_LICENSES = [
  {
    brand: "Nike India",
    videoTitle: "Viral Dance Tutorial",
    monthlyFee: 10,
    status: "active",
    startDate: "2024-11-01"
  },
  // ... more licenses
]
```

---

## 🧭 Navigation System

### Bottom Tab Bar

**Always Visible:** On all main screens (except splash, onboarding, license detail)

**Tabs (left to right):**

1. **Home** 
   - Icon: House/Grid
   - Active: Indigo fill
   - Destination: Marketplace Feed

2. **Search**
   - Icon: Magnifying glass
   - Active: Indigo fill
   - Destination: Marketplace Feed (search focused)

3. **Create**
   - Icon: Plus in circle (larger, elevated)
   - Active: Gradient background
   - Destination: Creator Studio

4. **Wallet**
   - Icon: Wallet/Money
   - Active: Indigo fill
   - Destination: User Dashboard

**Active State:**
- Icon color: Electric Indigo (#6366F1)
- Label color: White
- Subtle scale up (1.05x)

**Inactive State:**
- Icon color: White 60%
- Label color: White 60%

**Position:**
- Fixed to bottom
- Z-index: 50
- Glass background with blur
- Border top: White 10%
- Safe area padding

---

## 🔄 State Management

### Global States

```jsx
currentScreen: "splash" | "onboarding" | "marketplace" | 
               "studio" | "dashboard" | "license-detail"

activeTab: "home" | "search" | "create" | "wallet"

selectedVideo: Video | null

isLoggedIn: boolean
```

### Local States (per screen)

**Marketplace:**
- selectedCategory: string
- searchQuery: string
- showSearch: boolean
- filteredVideos: Video[]

**License Detail:**
- isSubscribing: boolean
- showConfetti: boolean

**Creator Studio:**
- verificationState: "idle" | "scanning" | "verified"
- uploadedVideo: string | null
- licenseFee: string
- isMinting: boolean

**Dashboard:**
- isWithdrawing: boolean

---

## 🎯 Key User Flows

### Flow 1: Brand Subscribes to Content

```
1. User lands on Marketplace (home)
2. Browses videos or searches
3. Filters by category (e.g., "Dance")
4. Clicks on video card
5. Views License Detail
6. Reviews rights & pricing
7. Clicks "Subscribe to License"
8. Sees payment processing
9. Confetti celebration
10. Success confirmation
11. Returns to Marketplace
12. Can download/use content
```

**Success Metrics:**
- Time to subscribe < 60 seconds
- Clear pricing information
- Trust signals visible
- Rights explicitly listed

### Flow 2: Creator Uploads & Mints Content

```
1. User clicks "Create" tab or FAB
2. Lands on Creator Studio
3. Clicks "Choose File" / "Upload"
4. Selects video from device
5. Shelby AI begins scanning (automatic)
6. Waits 3 seconds for verification
7. Content verified successfully
8. Sets license fee (e.g., 15 APT)
9. Configures usage rights
10. Clicks "Mint License NFT"
11. Blockchain minting (1.5s)
12. Confetti celebration
13. Success alert
14. Content now live on Marketplace
```

**Success Metrics:**
- Upload to mint < 90 seconds
- Clear verification process
- Easy fee configuration
- Immediate marketplace listing

### Flow 3: Creator Withdraws Earnings

```
1. User clicks "Wallet" tab
2. Views dashboard with earnings
3. Sees total: $450.00
4. Reviews active licenses
5. Clicks "Withdraw Earnings"
6. Processing (2s)
7. Confirmation alert
8. "Transfer initiated within 24 hours"
9. Returns to dashboard
```

**Success Metrics:**
- Clear earnings display
- One-click withdrawal
- Immediate confirmation
- Transparent timeline

---

## 🎨 Interaction Patterns

### Micro-interactions

**Card Hover:**
- Lift up 4px
- Border glow (indigo)
- Scale content 105%
- Duration: 300ms

**Button Click:**
- Scale down 95%
- Duration: 100ms
- Haptic feedback (on mobile)

**Loading States:**
- Spinner animation
- Text changes
- Button disabled
- Opacity reduced

**Success States:**
- Checkmark icon
- Green color
- Confetti animation
- Text confirmation

**Filter Toggle:**
- Gradient background on active
- Smooth color transition
- Scale animation (1.05x)

### Scroll Behaviors

**Natural Scroll:**
- Headers scroll with content
- No sticky elements except detail header
- Smooth momentum
- Bounce effect at edges

**Scroll to Top:**
- Triggered on screen mount
- Instant (no animation)
- Ensures content visibility

**Infinite Scroll (future):**
- Load more on bottom reach
- Loading spinner
- Smooth content append

---

## 📊 Data Architecture

### Video Object Structure

```typescript
interface Video {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  creator: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  price: number;
  verified: boolean;
  category: string;
  rights: string[];
  stats: {
    views: string;
    licenses: number;
    rating: number;
  };
}
```

### Data Sources

**Mock Data:** `/data/mockVideos.ts`
- 10 unique videos
- Diverse categories
- Realistic metadata
- Production-ready structure

**Future Integration:**
- Supabase for persistence
- IPFS for video storage
- Aptos blockchain for payments
- AI API for Shelby verification

---

## 🚀 Technical Implementation

### Tech Stack

**Framework:** React 18 with TypeScript
**Styling:** Tailwind CSS v4.0
**Animations:** Motion (Framer Motion)
**Icons:** Lucide React
**Layout:** React Responsive Masonry
**Images:** Unsplash API

### File Structure

```
/
├── App.tsx (main router)
├── components/
│   ├── SplashScreen.tsx
│   ├── OnboardingLogin.tsx
│   ├── MarketplaceFeed.tsx
│   ├── LicenseDetail.tsx
│   ├── CreatorStudio.tsx
│   ├── UserDashboard.tsx
│   └── TabBar.tsx
├── data/
│   └── mockVideos.ts
├── styles/
│   └── globals.css
└── imports/ (Figma assets)
```

### Performance Optimizations

1. **Image lazy loading**
2. **Component code splitting**
3. **Optimized re-renders**
4. **Debounced search**
5. **Memoized computations**
6. **CSS-in-JS minimized**
7. **Bundle size optimization**

---

## 🎯 Success Metrics (KPIs)

### User Engagement
- Time on marketplace: > 3 minutes
- Videos viewed per session: > 5
- Search usage: > 30%
- Filter usage: > 50%

### Creator Success
- Upload to mint time: < 90 seconds
- Verification success rate: > 95%
- Active creators: Growing monthly
- Average license price: 10-25 APT

### Business Metrics
- Subscription conversion: > 10%
- Monthly recurring revenue: Growing
- Platform fee collection: 5% per transaction
- Churn rate: < 5%

### Technical Performance
- Page load time: < 2 seconds
- Time to interactive: < 3 seconds
- Lighthouse score: > 90
- Zero critical errors

---

## 🔮 Future Enhancements

### Phase 2 Features

**Social Features:**
- Creator profiles
- Follow system
- Comments & reviews
- Social sharing

**Advanced Search:**
- Filters (price range, rating, views)
- Sort options
- Saved searches
- Recommendations

**Analytics Dashboard:**
- Revenue charts
- View analytics
- Engagement metrics
- Audience insights

**Payment Features:**
- Multiple tokens support
- Fiat on-ramp
- Subscription tiers
- Bundle deals

**Content Management:**
- Edit listings
- Pause/unpause licenses
- Bulk uploads
- Content versions

### Phase 3 Features

**AI Enhancements:**
- Auto-categorization
- Content suggestions
- Price optimization
- Fraud detection

**Marketplace Growth:**
- Featured content
- Trending algorithm
- Discovery feed
- Curated collections

**Enterprise:**
- Team accounts
- Bulk licensing
- API access
- White-label solutions

---

## 📱 PWA Features

### Installable
- Add to home screen
- Standalone app mode
- Custom splash screen

### Offline Capability (future)
- Cached content viewing
- Offline dashboard access
- Queue actions

### Native Features
- Push notifications (new licenses)
- Background sync
- Share target API

---

## 🎓 User Education

### Onboarding Tips

**First Visit:**
- Welcome modal explaining platform
- Quick tutorial (optional)
- Sample content tour

**Tooltips:**
- "This is a verified creator"
- "AI verified for authenticity"
- "Monthly subscription model"

**Help System:**
- FAQ section
- Video tutorials
- Support chat

---

## ✅ Quality Checklist

### Before Launch

**Functionality:**
- [ ] All screens navigate correctly
- [ ] Filters work accurately
- [ ] Search is responsive
- [ ] Animations are smooth
- [ ] Loading states everywhere
- [ ] Error states handled

**Design:**
- [ ] Colors match brand
- [ ] Typography consistent
- [ ] Spacing uniform
- [ ] Glassmorphism applied
- [ ] Icons aligned
- [ ] Images optimized

**Performance:**
- [ ] Load time < 2s
- [ ] Animations 60fps
- [ ] No layout shift
- [ ] Images lazy loaded
- [ ] Bundle size optimized

**Accessibility:**
- [ ] Keyboard navigation
- [ ] Screen reader compatible
- [ ] Color contrast WCAG AA
- [ ] Touch targets 44px+
- [ ] Focus indicators visible

**Testing:**
- [ ] Mobile devices
- [ ] Tablet views
- [ ] Desktop browsers
- [ ] Slow network
- [ ] Edge cases

---

**Last Updated:** November 30, 2025  
**Version:** 1.0.0  
**Document Owner:** Nivi Protocol Product Team  

---

## 📞 Support & Feedback

For questions about this user flow:
- Technical: Review `/guidelines.md`
- Design: Check component files
- Features: See roadmap in this document

**Happy Building! 🚀**
