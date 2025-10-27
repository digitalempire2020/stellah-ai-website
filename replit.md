# Stellah AI Website

## Overview

Stellah AI is a marketing website for an AI-powered medical practice lead management platform. The site is a single-page application (SPA) built with vanilla HTML, CSS, and JavaScript, using Tailwind CSS v4 beta for styling. It targets medical practices, dental clinics, and healthcare providers looking to automate lead management and appointment booking.

The website emphasizes conversion optimization through emotional storytelling, visual metrics, and clear CTAs. It showcases how Stellah AI transforms lead management through specialized AI agents, reducing staff workload by 70% while increasing appointment conversion rates.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- Pure HTML/CSS/JavaScript (no framework dependencies)
- Tailwind CSS v4 beta for styling (compiled via CLI)
- Express.js server for local development (serves static files)
- GitHub Pages for hosting (static site deployment)

**Build System:**
- Input CSS: `src/input.css` → Output CSS: `output.css`
- Tailwind CLI compilation with `--minify` flag for production
- Three-stage production build pipeline:
  1. Image optimization (Sharp for WebP conversion)
  2. Tailwind CSS compilation
  3. HTML minification (html-minifier-terser)

**Typography:**
- Primary: Inter font family (loaded from Google Fonts)
- Brand: Geist font family (custom brand font)
- Font weights: 300 (light), 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

**Color System:**
- Primary brand: Orange gradient (`#FF7A45` to `#EA580C`)
- Emotional color mapping:
  - Red (`#dc2626`) for failure/loss states
  - Orange for success/brand moments
  - Stone palette (`stone-50` to `stone-900`) for neutrals
  - Green (`#10B981`) for trust indicators

**Design Patterns:**
- Single-page application with scroll-triggered animations
- Mobile-first responsive design (breakpoints: sm, md, lg)
- Progressive enhancement approach
- Intersection Observer API for scroll animations
- CSS custom properties for theming

**Performance Optimizations:**
- Image conversion to WebP format (99%+ size reduction achieved)
- HTML minification (automated via build script)
- Resource hints (dns-prefetch, preconnect) for third-party domains
- Async loading for Google Tag Manager
- SVG sprite system for repeated icons (planned/partial implementation)

### Build & Development Workflow

**Development Commands:**
- `npm run dev` - Watch mode for Tailwind compilation
- `npm start` - Local Express server on port 5000 (binds to 0.0.0.0)
- Both can run simultaneously for live development

**Production Build:**
- `npm run build:prod` - Full optimization pipeline
- `npm run netlify-build` - Netlify deployment command
- Creates timestamped backups before minification

### Hosting & Deployment

**Platform Migration:**
- Migrated from Netlify to GitHub Pages
- Custom domain: `www.stellah.ai` (apex redirects to www)
- Static file serving with SPA routing support
- Files: `CNAME`, `.nojekyll`, `404.html` for GitHub Pages configuration

**DNS Setup:**
- A records pointing to GitHub Pages IPs
- CNAME for www subdomain
- Automatic SSL certificate generation

### Content Architecture

**Key Sections:**
- Hero section with primary CTA
- Problem/pain points (failure scenarios)
- "The Moment We Cracked It" breakthrough story
- AI evolution timeline (visual transformation narrative)
- Results/metrics showcase (animated counters)
- Multi-outlet chain benefits
- Testimonials/social proof
- Demo booking CTA

**Visual Storytelling:**
- Five-beat story arc: Hook → Pain → Insight → Breakthrough → Differentiator
- Color-coded emotional journey (red for failure, orange for success)
- Interactive elements (hover states, scroll animations)
- Before/after comparisons

## External Dependencies

### Third-Party Services

**Google Tag Manager:**
- Tracking code: `GTM-PNJW4X5S`
- Async loading implementation
- Used for analytics and conversion tracking

**LeadConnector (HighLevel):**
- Form iframe integration for demo bookings
- API endpoint: `api.leadconnectorhq.com`
- Form ID: `sbDZ68KbvhNSNVgdlYAI`
- Custom CSS branding applied to iframe wrapper

**Google Fonts:**
- Inter font family (variable weights)
- Geist font family (brand typography)
- Preconnect optimization for faster loading

**Unsplash:**
- External image CDN: `images.unsplash.com`
- Used for visual assets

### NPM Dependencies

**Production:**
- `express@^4.18.2` - Development server

**Development:**
- `@tailwindcss/cli@^4.0.0-beta.7` - Tailwind CSS compiler
- `tailwindcss@^4.0.0-beta.7` - Tailwind CSS framework
- `html-minifier-terser@^7.2.0` - HTML minification
- `sharp@^0.34.4` - Image optimization and WebP conversion

### CDN Resources

**Tailwind CSS:**
- Development: `cdn.tailwindcss.com` (for preview files only)
- Production: Locally compiled and minified

### Browser APIs

- Intersection Observer (scroll animations)
- LocalStorage (potential for user preferences)
- Fetch API (for potential form submissions)
- Window History API (SPA routing support)