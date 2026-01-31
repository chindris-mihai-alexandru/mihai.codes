# mihai.codes Roadmap

> Last updated: January 8, 2026
> 
> This document captures the complete development plan for mihai.codes,
> including completed phases, current state, and detailed next steps.

---

## Table of Contents

1. [Project Vision](#project-vision)
2. [Current State](#current-state)
3. [Phase 2: Completed](#phase-2-completed)
4. [Phase 3: Ephemeral Design System](#phase-3-ephemeral-design-system)
5. [Figma Make Prompts](#figma-make-prompts)
6. [Development Workflow](#development-workflow)
7. [Technical Infrastructure](#technical-infrastructure)
8. [Monetization Strategy](#monetization-strategy)
9. [SEO & Visibility](#seo--visibility)
10. [Resources & References](#resources--references)

---

## Project Vision

**mihai.codes** is a personal portfolio site + technical blog for a junior software engineer. 

Design philosophy: Inspired by **Virtual Nature research** on ephemeral phenomena—transient visual moments (sunrise/sunset) that trigger awe and deeper engagement.

**Target audience**: Engineers, aspiring PMs, CS students who value substance over fluff.

---

## Current State

### What's Live ✅
- **Framework**: Qwik City + Tailwind CSS
- **Hosting**: Cloudflare Pages (auto-deploy from GitHub)
- **Theme**: Dark/light toggle with system preference detection
- **Blog**: Markdown-based posts with listing page
- **Security**: Hardened headers, HTML sanitization, CSP
- **SEO**: Sitemap, robots.txt, JSON-LD structured data
- **Mastodon**: Verified profile link + author attribution
- **Social shortcuts**: `/github`, `/linkedin`, `/mastodon` redirects

### What's Missing 🔜
- **Visual personality**: Site is technically solid but lacks unique UI/UX
- **Ephemeral design**: Animation infrastructure exists but not yet styled
- **Homepage hero**: Needs portfolio introduction section
- **Blog cards**: Need atmospheric styling
- **Newsletter**: Not yet integrated
- **Affiliate links**: Tools page not created

---

## Phase 2: Completed

All Phase 2 technical work is done:

| Task | Status | File(s) |
|------|--------|---------|
| Security headers | ✅ | `public/_headers` |
| HTML sanitization | ✅ | `src/utils/sanitize.ts` |
| Content Security Policy | ✅ | `public/_headers` |
| Sitemap generation | ✅ | `src/routes/sitemap.xml/index.ts` |
| robots.txt | ✅ | `public/robots.txt` |
| JSON-LD structured data | ✅ | Blog post head |
| Author bio component | ✅ | `src/components/author-bio/` |
| Mastodon verification | ✅ | `rel="me"` in router-head |
| Author attribution | ✅ | `rel="author"` in blog posts |
| Social redirects | ✅ | `public/_redirects` |
| prefers-reduced-motion | ✅ | `src/global.css` |

---

## Phase 3: Ephemeral Design System

### The Concept

Based on **Virtual Nature research** (Dr. Alex Smalley, University of Exeter):
- Ephemeral phenomena (sunrise, sunset, rainbows) trigger **awe** and **beauty** perception
- Color shifts suggesting time passing increase **engagement**
- Transient visual moments increase **perceived value** (+10% willingness to pay)
- Subtlety > boldness for professional audiences

**Goal**: Apply these research findings to create a unique, memorable site personality.

### Design Elements to Create

1. **Color System** (morning → day → evening → night progression)
2. **Homepage Hero** (animated gradient, portfolio intro)
3. **Blog Cards** (breathing animation, atmospheric glow)
4. **Blog Post Hero** (article-specific, color cycling)
5. **Reading Journey** (background shifts as user scrolls)

### The Workflow

```
Week 1-2: Figma Make
├── Generate color palettes (Prompt 1)
├── Create homepage hero (Prompt 2)
├── Create blog cards (Prompt 3)
└── Refine if needed (Prompt 4)

Week 2: Gemini Pro Validation
├── Share Figma designs with Gemini
├── Get feedback on "ephemeral quality"
├── Get CSS animation specifications
└── Lock final design specs

Weeks 3-4: Claude Opus 4.5 Implementation
├── Build Qwik components from specs
├── Integrate with existing codebase
├── Test light/dark mode
├── Deploy to production
```

### Why This Workflow

| Model | Strength | Role |
|-------|----------|------|
| **Figma Make** | Visual design generation | Create the designs |
| **Gemini Pro** | Multimodal, aesthetic reasoning | Validate visuals |
| **Claude Opus 4.5** | Code architecture, TypeScript | Implement to spec |

This leverages each tool's 95%+ capability on their specialty.

---

## Figma Make Prompts

### Prompt 1: Color Palette Foundation ⭐ START HERE

```
FIGMA MAKE PROMPT: Ephemeral Design System for mihai.codes Personal Site

SCENARIO
Imagine you're designing the UI for mihai.codes—a personal portfolio site 
and technical blog for a junior software engineer who values clean design 
and reading non-fiction.

Your design philosophy is inspired by Virtual Nature research showing that 
ephemeral phenomena (transient visual moments like sunrise/sunset) trigger 
awe, deeper engagement, and increase perceived value.

Audience: Engineers, aspiring PMs, CS students (values substance, dislikes 
fluff, appreciates intentional design)

CONTEXT
mihai.codes is built with Qwik City + Tailwind CSS. It has:
- Homepage: Portfolio/about section showcasing skills, projects, and bio
- Blog section: Post listing with cards + individual article pages
- Dark/light theme toggle (already implemented, CSS variables ready)

Design must support both light and dark mode seamlessly.
You're creating the ephemeral design system that applies across all sections.

KEY DESIGN ELEMENTS

1. Color System (Ephemeral Progression)
   - Implement color transitions that suggest time passing
   - Morning: Deep indigo (#1a1a3e) → soft orange (#d4764e)
   - Day: Warm whites (#f5f1e6)
   - Evening: Deep purples (#4a2c5e)
   - Night: Almost black (#0f0f1a)
   
   These should feel natural and transient, NOT artificial or jarring.

2. Homepage Hero Section
   - Full-width hero for portfolio introduction
   - Animated gradient (3-5 second cycle) showing atmospheric colors
   - Content: Your name/title, brief intro, CTA (Blog/Projects buttons)
   - Subtle animation (respect professional context)

3. Blog Post Cards (on listing page)
   - Grid layout (3 columns desktop, 2 tablet, 1 mobile)
   - Subtle "breathing" animation (4-6 second pulse cycle)
   - Hover: Slight glow effect (like catching light in sunset)
   - Shows: Post title, date, reading time, excerpt

4. Blog Post Hero (top of individual article pages)
   - Similar to homepage hero but article-specific
   - Title, author name, publication date, reading time
   - Animated gradient (same system)

5. Reading Journey Animation (optional for later)
   - As user scrolls article, background shifts through color cycle
   - Scroll 0-25%: Morning → Noon
   - Scroll 25-50%: Noon → Afternoon  
   - Scroll 50-75%: Afternoon → Evening
   - Scroll 75-100%: Evening → Night

VISUAL STYLE
- Minimal, clean (inspired by Modal.com)
- High contrast text (WCAG AA minimum)
- No gradients on text (readability is essential)
- Uses system sans-serif (Mac/Windows native fonts)
- Code blocks: Monospace, syntax highlighting ready
- Spacing: Generous, breathing room (not cramped)

TECHNICAL CONSTRAINTS
- Tailwind CSS only (no custom CSS files)
- CSS animations only (no JavaScript)
- Easing: ease-in-out and cubic-bezier preferred
- Dark mode: Uses existing CSS variable system
- No layout shift (transform and opacity only)
- GPU acceleration required (smooth on mobile)
- Accessibility: WCAG AA minimum (text contrast, no motion sickness)

WHAT TO GENERATE
Please generate 3 different color palette interpretations for this system.
For EACH palette:

1. Show color progression (morning → day → evening → night)
2. Provide exact hex codes for each color state
3. Suggest animation timing in seconds
4. Recommend easing function
5. Show how colors work in BOTH light AND dark mode
6. Explain WHY this progression evokes "transience" and "awe"

Do NOT generate full pages or components yet.
Output as design tokens and timing specifications.
```

### Prompt 2: Homepage Hero Component

Use AFTER Prompt 1. Replace `[COPY YOUR CHOSEN...]` with values from Prompt 1.

```
FIGMA MAKE PROMPT: Build Homepage Hero Component

I've selected a color palette from the previous generation.
Now please build the actual Homepage Hero component.

TASK: Create a HomepageHero component

DESIGN SPECIFICATION (From Your Chosen Palette)
- Color progression: [COPY YOUR CHOSEN COLORS]
- Animation cycle timing: [COPY THE TIMING] seconds
- Easing function: [COPY THE EASING]

COMPONENT DETAILS
Purpose: Hero section at top of homepage (portfolio introduction)
Layout: Full-width, height 350px desktop / 250px mobile

Content areas:
- Background: Animated gradient cycling through atmospheric colors
- Main heading: Name/title (e.g., "Mihai Chindriș - Junior Software Engineer")
- Subheading: Brief tagline
- CTA buttons: "Explore Blog" and "View Projects"
- Overlay: Semi-transparent dark overlay for text contrast

Animation behavior
- On page load: Start the color cycle immediately
- Cycle duration: [YOUR TIMING] seconds
- Easing: [YOUR EASING]
- Infinite loop: Yes, continuous

Text styling
- Main heading: Extra large (3xl-4xl), bold, white text
- Subheading: Medium (lg), lighter weight, secondary color
- Buttons: Small (sm) text, clear contrast
- Min contrast ratio: 4.5:1 (WCAG AA)

Dark mode behavior
- Must look good in dark mode without code changes
- Use CSS variables for all colors
- No hardcoded colors

Responsive behavior
- Desktop (1024px+): 350px height, 2 buttons side-by-side
- Tablet (768px-1023px): 300px height, buttons stack
- Mobile (under 768px): 250px height, single column

Code requirements
- Valid semantic HTML
- Tailwind CSS classes only
- CSS @keyframes for color animation
- CSS variables for theme colors
- Production-ready code

Please generate complete HTML + Tailwind CSS + @keyframes.
```

### Prompt 3: Blog Card Component

Use AFTER Prompt 1. Replace `[COPY YOUR...]` with values.

```
FIGMA MAKE PROMPT: Build Blog Post Card Component

Using the same color palette, create the BlogCard component.

TASK: Create a BlogCard component for blog post preview

DESIGN SPECIFICATION
- Color palette: [COPY YOUR CHOSEN PALETTE]
- Animation timing: [COPY TIMING] seconds (slightly faster than hero)
- Easing: [COPY EASING]

COMPONENT DETAILS
Purpose: Blog post preview card for /blog listing page
Layout: Card in grid (3 columns desktop, 2 tablet, 1 mobile)

Content areas:
- Top section: Gradient background (3-4 second breathing cycle)
- Title: Blog post title (max 2 lines, white text)
- Metadata: Date, reading time, category tag
- Excerpt: First 150 chars of post
- Bottom: "Read More" link

Animation behavior
- Breathing pulse animation: 4-5 second cycle
- Hover state: Slight glow effect + scale up (1.02x)
- No animation on mobile (performance)

Visual style
- Rounded corners: md
- Card shadow: Subtle
- Spacing: Comfortable padding (1.5rem)

Dark mode
- Card background: Darker
- Uses CSS variables throughout

Responsive
- Desktop: 3 columns, 300px height
- Tablet: 2 columns, 280px height
- Mobile: 1 column, 260px height

Accessibility
- Proper heading hierarchy (h3 for title)
- Color contrast: 4.5:1 minimum
- No animation on prefers-reduced-motion

Please generate complete card HTML + Tailwind CSS + animations.
```

### Prompt 4: Refinement & Variants (Optional)

Use only if components need adjustment.

```
FIGMA MAKE PROMPT: Refine Components + Create Variants

FEEDBACK ON ANIMATIONS
1. Animation feels [too fast / too slow]
   Adjust timing to [NEW_SECONDS] seconds

2. Color transitions appear [too vibrant / too muted]
   [Specify adjustment]

VARIANT REQUEST: Create Two Variants

Variant 1: "Featured Post Card"
- Larger, more prominent
- Featured badge
- More visible gradient

Variant 2: "Archive Card"
- Minimal, compact
- No animation (static)
- Muted colors

Output all variants as separate, production-ready components.
```

---

## Development Workflow

### After Figma Make Designs

#### Gemini Pro Validation Prompt

```
DESIGN VALIDATION REQUEST

I've created design prototypes for ephemeral blog features in Figma.
Here's my design: [Figma link or images]

CONTEXT
Designs implement Virtual Nature research on ephemeral phenomena—
transient visual moments that trigger awe and beauty perception.

REVIEW CRITERIA

1. EPHEMERAL QUALITY (1-10)
   - Do animations feel fleeting or permanent?
   - Do color shifts suggest time passing?

2. RESEARCH ALIGNMENT (1-10)
   - Does this implement sunrise/sunset/transience concept?
   - Likely to trigger awe perception?

3. AUDIENCE APPROPRIATENESS (1-10)
   - Professional for engineers/PMs?
   - Enhances content or distracts?

4. TECHNICAL FEASIBILITY
   - Can these run as CSS-only?
   - Performance concerns?

FOR EACH ANIMATION, provide:
- Ephemeral quality score
- Recommended duration (seconds)
- Recommended easing curve
- CSS @keyframes specification

DELIVERABLE
- Assessment of design direction
- CSS animation specifications
- Yes/No: "Ready for implementation"
```

#### Claude Implementation Prompt

```
IMPLEMENT DESIGN SYSTEM

I have finalized designs for ephemeral features.
Design is locked. Implement exactly what's designed.

DESIGN SPECIFICATION
[Paste Figma specs, hex codes, timings, easing]

CRITICAL CONSTRAINT
Do not invent features or suggest changes.
The design is the source of truth.

COMPONENTS TO BUILD
1. EphemeralHero - [specs]
2. AtmosphericCard - [specs]  
3. ReadingJourney - [specs]

TECHNICAL REQUIREMENTS
- Framework: Qwik City
- Styling: Tailwind CSS + CSS variables
- Theme: Dark/light mode (preserve existing)
- Performance: Zero layout shift
- Browser: Chrome, Firefox, Safari, Ladybird

BUILD SPECIFICATION
- Language: TypeScript (strict)
- Components: Qwik component$()
- Tests: Unit tests for animations
- Accessibility: WCAG 2.1 AA

OUTPUT
Production-ready code matching design exactly.
```

---

## Technical Infrastructure

### Already Implemented

#### Tailwind Config (`tailwind.config.js`)

8 keyframe animations ready for customization:
- `ephemeral-fade` - Gentle opacity transitions
- `atmospheric-glow` - Subtle color shifts (8s cycle)
- `reading-progress` - Scroll progress indication
- `sunrise-shift` - Warm hue rotation
- `sunset-shift` - Cool hue rotation
- `text-glow` - Name glow effect (6s cycle)
- `gradient-shift` - Background position animation
- `border-reveal` - Card hover effect

Custom timing:
- `ephemeral`: 500ms, cubic-bezier(0.4, 0, 0.2, 1)
- `atmospheric`: 2000ms, cubic-bezier(0.16, 1, 0.3, 1)

#### Global CSS (`src/global.css`)

CSS Variables (light mode):
```css
--background: #ffffff;
--foreground: #0a0a0a;
--accent: #059669;
--accent-rgb: 5, 150, 105;
--muted: #f5f5f5;
--border: #e5e5e5;
--card-bg: #fafafa;
--text-secondary: #525252;
```

CSS Variables (dark mode):
```css
--background: #000000;
--foreground: #ffffff;
--accent: #00ff00;
--accent-rgb: 0, 255, 0;
--muted: #1a1a1a;
--border: #333333;
--card-bg: #0a0a0a;
--text-secondary: #a3a3a3;
```

Existing animations:
- `.ephemeral-name` - 4s glow-pulse
- `.card-border-reveal` - Gradient sweep on hover

Accessibility:
- `prefers-reduced-motion` support ✅

### Files to Update After Figma

| File | What to Update |
|------|----------------|
| `src/global.css` | Add ephemeral color variables |
| `tailwind.config.js` | Update animation timings |
| `src/routes/index.tsx` | Add EphemeralHero component |
| `src/routes/blog/index.tsx` | Add AtmosphericCard components |
| `src/routes/blog/[slug]/index.tsx` | Add BlogPostHero |

---

## Monetization Strategy

### Phase 1: Immediate (Week 1-2)

**Affiliate Links** ($100-300/month passive)
- Qwik (15% commission)
- Vercel ($25/signup)
- Cloudflare ($20-200/account)
- Neon (20% commission)

Create `/tools` page with honest recommendations.

### Phase 2: Short-term (Month 1-3)

**Newsletter** (beehiiv recommended - free, 0% fee)
- Free tier: Blog recaps, weekly insights
- Premium ($5/month): Deep-dive posts, early access
- Premium+ ($20/month): Office hours, community

### Phase 3: Medium-term (Month 3+)

**Digital Products** (after 500+ monthly visitors)
- Qwik course ($49)
- "Engineer→PM" guide ($29)
- Setup tutorials ($19)

### Revenue Projection

| Month | Affiliate | Newsletter | Total |
|-------|-----------|------------|-------|
| 1 | $50-100 | $0 | $50-100 |
| 3 | $150-200 | $200-300 | $350-500 |
| 6 | $250-400 | $500-1K | $750-1.4K |
| 12 | $400-800 | $1K-3K | $1.4K-3.8K |

---

## SEO & Visibility

### Already Implemented ✅
- Sitemap.xml generation
- robots.txt
- JSON-LD structured data
- Author bios (E-E-A-T signal)
- Security headers (ranking factor)
- Fast load times (Qwik resumability)

### To Do
- [ ] Setup Google Search Console
- [ ] Submit sitemap
- [ ] Setup Google Analytics 4
- [ ] Monitor Core Web Vitals

### Content Strategy

Write about intersections (unique angles):
- "Why Qwik Over Next.js" - your experience
- "Building with Qwik + ElectricSQL" - no one else has this combo
- "From Engineer to PM: Lessons" - your journey
- "Modal.com Design Deep Dive" - your inspiration

---

## Resources & References

### Research
- **Virtual Nature Project**: https://virtual-nature.com
- **Ephemeral Phenomena Paper**: Smalley et al., 2023 - Journal of Environmental Psychology
- **Forest 404 Experiment**: BBC collaboration on natural soundscapes

### Design Inspiration
- **Modal.com**: Clean, high-contrast, professional
- **cnewton.org**: Ephemeral glow effects

### Tools
- **Figma Make**: https://www.figma.com/make/
- **Google AI Studio**: https://aistudio.google.com/
- **beehiiv**: https://www.beehiiv.com/

### Documentation
- **Qwik**: https://qwik.dev/docs/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Cloudflare Pages**: https://developers.cloudflare.com/pages/

---

## Quick Reference

### Start Here After OS Reinstall

1. Open this file (`ROADMAP.md`)
2. Go to [Figma Make Prompts](#figma-make-prompts)
3. Copy **Prompt 1** into Figma Make
4. Generate 3 palettes, pick the best
5. Continue with Prompts 2, 3, 4
6. Use Gemini validation prompt
7. Use Claude implementation prompt
8. Deploy

### Key Files

| Purpose | File |
|---------|------|
| This roadmap | `ROADMAP.md` |
| Animation infrastructure | `tailwind.config.js` |
| CSS variables | `src/global.css` |
| Security headers | `public/_headers` |
| Redirects | `public/_redirects` |
| Tech documentation | `TECH_STACK.md` |

### Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Deploy (auto via GitHub push)
git push origin main
```

---

*Built by Mihai Chindriș | Powered by Qwik + Cloudflare Pages*
