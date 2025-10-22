# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Stellah AI is a marketing website for an AI-powered medical practice lead management platform. The site is a single-page application (SPA) built with vanilla HTML, CSS, and JavaScript, using Tailwind CSS 4.x for styling. It's deployed on Netlify with a Node.js/Express server for local development.

**Target Audience**: Medical practices, dental clinics, and healthcare providers looking to automate lead management and appointment booking.

## Build & Development Commands

### Development
```bash
npm run dev          # Watch mode - compile Tailwind from src/input.css to output.css
npm start           # Start Express dev server on port 5000 (serves on 0.0.0.0)
```

Both commands can run simultaneously: `npm run dev` watches for CSS changes while `npm start` serves the site.

### Build
```bash
npm run build       # Minify Tailwind CSS for production (uses --minify flag)
npm run netlify-build  # Netlify build command (same as build)
```

Build compiles `src/input.css` → `output.css` using Tailwind CLI v4 beta.

### Deployment
The site auto-deploys to GitHub Pages on git push to `main` branch.
- Production URL: `https://www.stellah.ai`
- GitHub Pages URL: `https://digitalempire2020.github.io/stellah-ai-website`
- Apex domain: `stellah.ai` redirects to `www` subdomain (via DNS)
- Deploy time: ~1-2 minutes after push
- GitHub Pages serves static files directly (no build step needed)

## Architecture

### File Structure
- **index.html** - Main SPA (~22k lines, includes most content inline for performance)
- **script.js** - Interactive features: calendar system, scroll animations, metrics counters (~700 lines)
- **style.css** - Legacy custom styles (549 lines, pre-Tailwind code)
- **src/input.css** - Tailwind v4 source file with custom animations and component styles
- **output.css** - Compiled Tailwind output (generated, not in git)
- **server.js** - Express server (port 5000) with redirect middleware
- **middleware/forceHttpsWww.js** - Redirect logic for apex → www and HTTP → HTTPS
- **attached_assets/** - Images and screenshots (timestamped filenames)
- **Preview files**:
  - **breakthrough-preview.html** - AI evolution timeline and transformation story
  - **accident-story-preview.html** - Alternative marketing narrative
  - **preview-mobile-calendar.html** - Mobile calendar testing
  - **preview-12hr-time.html** - Time format testing
- **netlify.toml** - Netlify configuration: redirects, headers, build settings
- **visual-assets-implementation.md** - Design decisions and future visual enhancements

### Technology Stack
- **No framework** - Vanilla JavaScript (ES6+), no build tools except Tailwind
- **Tailwind CSS 4.x beta** - Compiled via `@tailwindcss/cli` (v4.0.0-beta.7)
- **Express 4.x** - Static file serving + redirect middleware (dev only)
- **GitHub Pages** - Production hosting with global CDN and automatic SSL
- **Legacy netlify.toml** - Kept for reference, not actively used

### Key Patterns

#### 1. Single-Page Architecture
All content is in `index.html`. The site uses scroll-triggered animations and progressive disclosure rather than client-side routing. The Express server's wildcard route (`app.get('*')`) serves `index.html` for all paths to support SPA behavior.

#### 2. Inline Performance Optimization
To minimize HTTP requests, much of the CSS and JavaScript is inlined directly in `index.html`. This creates a large file (~2.4MB) but improves initial page load. When editing:
- Check if styles/scripts are inline in `<style>` or `<script>` tags within `index.html`
- External `script.js` provides calendar functionality and interactive features
- External `style.css` contains legacy styles (mostly superseded by Tailwind)
- Compiled `output.css` is referenced in HTML head
- Always test changes in the actual `index.html` context

#### 3. Animation System
The site heavily uses scroll-triggered animations powered by:
- **Intersection Observer API** - Triggers animations when elements enter viewport
- **CSS transitions/animations** - Hardware-accelerated transforms for smooth 60fps performance
- **Counter animations** - Revenue/metrics count up from 0 using `animateCounter()` in script.js:514
- **Progressive cards** - Desktop hover reveals details, mobile tap to expand (see `.progressive-card` in src/input.css:292)

Key animation functions in script.js:
- `initializeAnimations()` (line 64) - Page load entrance effects
- `initializeCalendarAnimations()` (line 450) - Staggered calendar event reveals
- `initializeMetricsUpdates()` (line 514) - Counter animations with 10s interval updates
- `animateCalendarEvents()` (line 84) - Event appearance with 100ms stagger

**Parent Container Trigger Pattern** (for complex nested animations):
When animating elements inside containers with `overflow: hidden` (like sliders), Intersection Observer may not trigger on child elements. Use this pattern:

✅ **When to use:**
- Elements inside sliders/carousels that need entrance animations
- Nested components where direct observation fails
- Situations where children need to be visible immediately but animated on scroll

❌ **When NOT to use:**
- Simple scroll-triggered animations (use standard Intersection Observer)
- Elements that can afford to start hidden (opacity: 0)

**Implementation:**
```javascript
// Watch PARENT container, not children
const container = document.getElementById('parentContainer');
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        container.classList.add('animate-children');  // Trigger via class
        observer.unobserve(container);  // One-time trigger
    }
}, { threshold: 0.2 });
observer.observe(container);
```

```css
/* Children visible but offset */
.child-element {
    opacity: 1;  /* Always visible for functionality */
    transform: scale(0.95) translateY(10px);
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Parent class triggers child animations */
.parentContainer.animate-children .child-element {
    transform: scale(1) translateY(0);
}

/* Stagger with nth-child delays */
.parentContainer.animate-children .child:nth-child(2) {
    transition-delay: 0.15s;
}
```

**Example:** Breakthrough section agent cards (index.html:20981, script.js:790-807)
- Cards always visible for slider functionality
- Container triggers animation when scrolled into view
- Staggered entrance: 0s, 0.15s, 0.3s delays

#### 4. Redirect Architecture
Multi-layer redirect strategy ensures all traffic goes to `https://www.stellah.ai`:
- **netlify.toml** (lines 6-31) - Netlify edge redirects with `force: true`
  - HTTP → HTTPS (both apex and www)
  - Apex domain → www subdomain (both HTTP and HTTPS)
  - SPA fallback (all routes → index.html with 200 status)
- **server.js** (lines 8-17) - Application-level apex domain check for dev server
- **middleware/forceHttpsWww.js** - Checks `x-forwarded-proto` header for HTTPS detection
- Redirects are 301 permanent for SEO

#### 5. Mobile-First Responsive Design
- All major sections have mobile layouts (vertical timelines, stacked cards)
- Touch-friendly interactive elements with tap states
- Responsive typography using Tailwind's sm/md/lg/xl breakpoints
- Progressive cards use different interaction patterns: desktop hover vs mobile tap (see src/input.css:322-403)
- Test on mobile: animations should be performant (60fps), no horizontal scroll

## Brand Identity & Typography

**⚠️ CRITICAL: Follow these guidelines for ALL design implementations. Typography = Brand Identity.**

### Typography Standards

**Font Families** (REQUIRED for all new designs/sections)
- **Headings**: `font-geist` - Custom brand font for all H1/H2/H3/H4
- **Body Text**: `font-sans` (Inter) - All paragraphs, lists, UI text
- **Never use**: Generic system fonts or default Tailwind sans-serif

**Font Weights** (Brand Personality: Elegant, Not Heavy)
- **H1/H2**: `font-normal` (400) or `font-light` (300) - NEVER `font-bold`
- **H3/H4**: `font-semibold` (600) - NOT `font-bold` (700)
- **Body text**: `font-normal` (400) or `font-light` (300)
- **Emphasis/CTAs only**: `font-bold` (700) - Use sparingly

**Letter Spacing** (Modern, Clean Look)
- **All headings**: Must include `tracking-tight`
- **Brand text/logos**: Always `tracking-tight`
- **Body text**: Default tracking (no class needed)

**Font Size Scale** (Moderate, Refined)
- **H1**: `text-[40px] sm:text-6xl lg:text-7xl` (hero only)
- **H2**: `text-3xl sm:text-4xl` (NOT 5xl/6xl - too large)
- **H3**: `text-2xl sm:text-3xl` (NOT 4xl - keep moderate)
- **Body**: `text-base` or `text-lg` (NOT xl/2xl unless intentional)

### Brand Colors

**Primary Palette**
- **Primary Orange**: `#FF7A45` - Main brand color, CTAs, highlights
- **Dark Orange**: `#EA580C` - Gradients, hover states, emphasis
- **Gradient**: `linear-gradient(135deg, #FF7A45 0%, #EA580C 100%)`

**Neutral Palette**
- **Background**: White (`bg-white`) or Stone-50 (`bg-stone-50`)
- **Text Primary**: `text-stone-900` (headings, important text)
- **Text Secondary**: `text-stone-700` (body text)
- **Text Tertiary**: `text-stone-600` (labels, less important)
- **Text Muted**: `text-stone-500` (hints, disabled states)
- **Borders**: `border-stone-200` (light), `border-stone-300` (medium)

**Usage Rules**
- Backgrounds should be white or very light stone tints
- Avoid heavy use of colored backgrounds (keep minimal, clean)
- Orange is accent only - use strategically, not everywhere
- Dark backgrounds only for intentional pattern breaks

### Complete Typography Checklist (Use for Every New Design)

Before implementing any HTML/design:

```html
<!-- 1. Add fonts in <head> if not already present -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- 2. Add font definitions in <style> -->
<style>
.font-sans {
    font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
}
.font-geist {
    font-family: 'Geist', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
}
</style>

<!-- 3. Apply to body -->
<body class="font-sans">

<!-- 4. Apply to headings -->
<h2 class="font-geist font-normal tracking-tight">Heading Text</h2>
<h3 class="font-geist font-semibold tracking-tight">Subheading</h3>
```

**Quick Validation**
- ✅ Do all headings use `font-geist`?
- ✅ Do all headings have `tracking-tight`?
- ✅ Are H2s using `font-normal` (NOT `font-bold`)?
- ✅ Are H3/H4s using `font-semibold` (NOT `font-bold`)?
- ✅ Is body using `font-sans`?
- ✅ Do colors match brand (#FF7A45, stone grays)?

### Why This Matters

**Wrong Typography:**
- Generic sans-serif → Looks like any SaaS
- `font-bold` everywhere → Looks heavy, less premium
- Normal tracking → Looks spread out, less modern
- **Result**: Generic, unprofessional, not Stellah

**Correct Typography:**
- Geist + Inter → Distinct brand identity
- `font-normal`/`font-semibold` → Elegant, refined
- `tracking-tight` → Modern, clean, premium
- **Result**: Looks like Stellah, professional, trustworthy

**Brand Perception Impact**: Typography is 50% of brand identity. Getting it wrong undermines the entire premium positioning.

## Common Development Workflows

### Updating Tailwind Styles
1. **Utility classes**: Edit HTML classes directly in `index.html` or preview files
2. **Custom components/animations**: Edit `src/input.css`
3. Run `npm run dev` to watch for changes (auto-recompiles to `output.css`)
4. Refresh browser to see changes
5. For production: `npm run build` minifies output

Note: Tailwind v4 uses `@import "tailwindcss"` syntax in `src/input.css`. Custom CSS (animations, component classes) is defined after the import.

### Modifying Animations
Most animation logic is in `script.js`:
- `initializeAnimations()` (line 64) - Page load fade/slide/blur effects
- `initializeCalendarAnimations()` (line 450) - Calendar event stagger animations
- `initializeInteractiveElements()` (line 484) - Search, export, dashboard link handlers
- `initializeMetricsUpdates()` (line 514) - Counter animations and periodic updates
- `animateCounter()` (line 557) - Reusable number counter with easing

CSS animations are defined in:
- `src/input.css` (lines 34-122) - Keyframes for fadeInUp, slideInRight, blurIn, pulse, etc.
- Inline `<style>` tags in `index.html` for section-specific animations

### Testing Redirects Locally
```bash
# Start server
npm start

# Test apex domain redirect (requires /etc/hosts entry: 127.0.0.1 stellah.ai)
curl -I http://stellah.ai:5000
# Should return: Location: https://www.stellah.ai/

# Test HTTPS detection
curl -I -H "x-forwarded-proto: https" http://localhost:5000
# Should serve normally (no redirect)
```

### Working with Preview Files
Preview files are standalone HTML files for testing specific features:
- Create by duplicating relevant sections from `index.html`
- Include necessary inline styles and scripts
- Use for isolated testing without affecting main site
- Current previews:
  - `breakthrough-preview.html` - AI transformation story (main marketing narrative)
  - `accident-story-preview.html` - Alternative accident prevention story
  - `preview-mobile-calendar.html` - Calendar mobile layout testing
  - `preview-12hr-time.html` - Time format testing

### Adding New Sections
When adding content sections:
1. Follow mobile-first approach (design for small screens first, use min-width media queries)
2. Add `.scroll-trigger` class for entrance animations (pairs with Intersection Observer)
3. Maintain brand colors: Primary Orange (#FF7A45), Dark Orange (#EA580C), Stone grays for neutrals
4. Test progressive disclosure on touch devices (tap to expand vs hover)
5. Ensure accessibility: WCAG AA contrast ratios, keyboard navigation, semantic HTML
6. Use hardware-accelerated CSS properties (transform, opacity) for animations

## Important Context

### Visual Storytelling Focus
The site tells a transformation story (see `visual-assets-implementation.md`):
- **Problem**: Medical practice drowning in 2,000 leads (chaos, overwhelm)
- **Solution**: 3 specialized AI assistants (Scheduler, Qualifier, Follow-up Master)
- **Results**: $3.7M+ revenue, 30k+ appointments, 80+ staff freed

This narrative structure is core to the site's effectiveness. Visual elements are not decorative—they serve the transformation story. The "before/after" pattern appears throughout:
- AI evolution timeline (one failing AI → three specialists)
- Metrics counters (animate from 0 to final impressive numbers)
- Progressive cards (reveal detailed "after" state on interaction)

### Security Headers
The site implements strict security headers in `netlify.toml` (lines 34-38):
- `X-Frame-Options: DENY` - Prevents clickjacking/embedding
- `X-Content-Type-Options: nosniff` - Prevents MIME type confusion

When adding external resources:
- Update CSP in `<meta>` tags within `index.html` if needed
- Test that new assets load correctly with security headers
- Prefer same-origin resources to avoid CORS issues

### Performance Considerations
- Target: <200ms additional load time for animations/interactions
- All animations use hardware-accelerated properties (transform, opacity) for 60fps
- Intersection Observer API used for scroll-triggered animations (efficient, low reflow)
- Large inline HTML (~2.4MB) trades file size for fewer HTTP requests
- Images in `attached_assets/` are PNG/JPG screenshots (consider WebP conversion for performance)
- Tailwind output is minified in production (--minify flag)

### Git Workflow
Recent commits focus on mobile optimization and performance:
- e93e82d - Mobile timeline card fixes
- 8f67d2a - Production issue fixes and asset optimization
- 462bb4f - Critical performance and code quality improvements
- 3101706 - Tailwind optimization (75% load time reduction)

When committing:
- Write descriptive messages focused on user-facing changes
- Include impact when relevant (e.g., "reduce load time by 75%")
- Prefer imperative mood (e.g., "Fix" not "Fixed", "Add" not "Added")

## Code Style Notes

- **JavaScript**: ES6+ syntax, arrow functions, const/let (no var), template literals
  - Functions use descriptive names (e.g., `animateCounter`, `initializeMetricsUpdates`)
  - Event listeners use arrow functions to preserve context
  - DOM manipulation uses safe methods (createElement, textContent) not innerHTML
- **CSS**: Tailwind utilities strongly preferred, custom CSS only for animations/complex components
  - Custom classes follow descriptive naming (e.g., `.progressive-card`, `.calendar-event`)
  - Animation keyframes defined in `src/input.css` for reusability
- **HTML**: Semantic markup, accessibility attributes (aria-labels, roles)
  - Heading hierarchy preserved (h1 → h2 → h3)
  - Interactive elements use buttons/links appropriately
- **Naming**: Descriptive, purpose-driven names (e.g., `.breakthrough-box`, `.water-effect`)

## Deployment Notes

GitHub Pages automatically deploys from `main` branch. The process:
1. Push to `main` branch triggers automatic deployment
2. GitHub Pages serves files from root directory (no build step needed)
3. `404.html` handles SPA routing (redirects to index.html via JavaScript)
4. Custom domain configured via `CNAME` file (`www.stellah.ai`)
5. `.nojekyll` prevents Jekyll processing

GitHub Pages configuration:
- **CNAME** - Points to `www.stellah.ai`
- **.nojekyll** - Disables Jekyll, serves files as-is
- **404.html** - SPA fallback routing via JavaScript

Debugging production issues:
- Check GitHub Actions tab for deployment status
- Verify `CNAME` contains correct domain
- Ensure `output.css` is committed (not in `.gitignore`)
- DNS: Apex domain uses A records to GitHub IPs, www uses CNAME
- Test on actual mobile devices, not just browser DevTools
- GitHub Pages deployment typically takes 1-2 minutes

Note: `server.js` and Express are only for local development. Production uses GitHub Pages static hosting.

## Debugging Best Practices (Lessons Learned)

### ALWAYS Use Systematic Debugging - Never Guess-and-Check

When a user reports a visual or layout bug:

**❌ DON'T DO THIS (Anti-Pattern):**
1. Make assumptions about the cause
2. Try a quick fix based on the assumption
3. Commit and hope it works
4. When user says "still broken," try another guess
5. Repeat until something sticks

**✅ DO THIS INSTEAD (Systematic Approach):**

#### Step 1: Comparative Analysis FIRST
```bash
# Example: Month 9 card appears misaligned
# Compare working vs broken elements line-by-line

# Extract Month 1 (working)
sed -n '20167,20195p' index.html > month1.txt

# Extract Month 9 (broken)
sed -n '20271,20305p' index.html > month9.txt

# Find differences
diff month1.txt month9.txt
```

#### Step 2: Identify ALL Differences
Don't stop at the first difference. List everything that's different:
- Classes
- Inline styles
- Structure
- Child elements
- Attributes

#### Step 3: Research Each Difference
```bash
# Found: Month 9 has "pulse-animation" class
# Research what it does
grep -A 5 "pulse-animation" index.html
grep -A 5 "@keyframes pulse" index.html

# Understand: It applies translateX(-50%) which shifts left
```

#### Step 4: Verify Root Cause
Before making ANY changes:
- Confirm the difference you found actually causes the issue
- Check if removing/adding it would logically fix the problem
- Consider side effects

#### Step 5: Make Targeted Fix
Now and ONLY now, make a single, targeted change that addresses the root cause.

### Real Example: Month 9 Alignment Issue

**What Went Wrong:**
- Spent hours trying responsive class tweaks (sm:, md:, lg:)
- Added text-center class (didn't address root cause)
- Made multiple commits hoping one would work
- User had to say "still broken" multiple times

**What Should Have Been Done:**
```bash
# 1. Compare immediately
grep -A 3 "rounded-full.*Month 1" index.html
grep -A 3 "rounded-full.*Month 9" index.html

# Would have shown:
# Month 1: ... justify-center text-white font-semibold ...>
# Month 9: ... justify-center text-white font-semibold ... pulse-animation>
#                                                          ^^^^^^^^^^^^^^^^

# 2. Research pulse-animation
grep -A 5 "@keyframes pulse" index.html
# Shows: transform: translateX(-50%) ← This shifts it left!

# 3. Remove pulse-animation
# Done in 3 minutes instead of hours
```

### Key Lessons:

1. **When user says "still broken" - STOP GUESSING**
   - Go back to Step 1 (Comparative Analysis)
   - You missed something in your diagnosis

2. **Use diff-based debugging**
   - Extract working element → file1
   - Extract broken element → file2
   - `diff file1 file2` shows exactly what's different

3. **Trust the user's eyes**
   - If they say it's broken, it's broken
   - Don't assume your fix worked without verification
   - They can see the rendered page; you can't

4. **Understand before modifying**
   - Research what each class/style does
   - Don't add/remove things "to see if it works"

5. **One change at a time**
   - Make the minimal change needed
   - Verify it works before additional changes

6. **Document the root cause in commit messages**
   - Helps future debugging
   - Example: "Remove pulse-animation which was applying translateX(-50%)"
