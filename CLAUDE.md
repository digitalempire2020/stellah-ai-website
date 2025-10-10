# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Stellah AI is a marketing website for an AI-powered medical practice lead management platform. The site is a single-page application (SPA) built with vanilla HTML, CSS, and JavaScript, using Tailwind CSS 4.x for styling. It's deployed on Netlify with a Node.js/Express server for local development.

**Target Audience**: Medical practices, dental clinics, and healthcare providers looking to automate lead management and appointment booking.

## Build & Development Commands

### Development
```bash
npm run dev          # Watch mode - compile Tailwind CSS on file changes
npm start           # Start Express dev server on port 5000
```

### Build
```bash
npm run build       # Minify Tailwind CSS for production
npm run netlify-build  # Netlify build command (same as build)
```

### Deployment
The site deploys to Netlify automatically on git push. The production URL is `https://www.stellah.ai` with apex domain (`stellah.ai`) redirecting to `www` subdomain.

## Architecture

### File Structure
- **index.html** - Main SPA (22k+ lines, includes inline styles/scripts for performance)
- **script.js** - Interactive features: calendar, animations, scroll effects, metrics counters
- **style.css** - Additional CSS beyond Tailwind (legacy/custom styles)
- **server.js** - Express server with HTTPS/www redirect middleware
- **middleware/forceHttpsWww.js** - Redirect logic for apex → www and HTTP → HTTPS
- **attached_assets/** - Images and visual assets referenced in HTML
- **preview-*.html** - Preview files for testing specific features
- **breakthrough-preview.html** - Standalone preview of key marketing transformation story

### Technology Stack
- **No framework** - Vanilla JavaScript (ES6+)
- **Tailwind CSS 4.x** - Utility-first styling (CDN in dev, compiled in production)
- **Express** - Static file serving + redirect middleware
- **Netlify** - Hosting with custom redirect rules in `netlify.toml`

### Key Patterns

#### 1. Single-Page Architecture
All content is in `index.html`. The site uses scroll-triggered animations and progressive disclosure rather than client-side routing. The Express server's wildcard route (`app.get('*')`) serves `index.html` for all paths to support SPA behavior.

#### 2. Inline Performance Optimization
To minimize HTTP requests, much of the CSS and JavaScript is inlined directly in `index.html`. This creates a large file but improves initial page load. When editing:
- Check if styles/scripts are inline in `<style>` or `<script>` tags within `index.html`
- External files (`script.js`, `style.css`) contain additional functionality
- Always test changes in both inline and external contexts

#### 3. Animation System
The site heavily uses scroll-triggered animations powered by:
- **Intersection Observer API** - Triggers animations when elements enter viewport
- **CSS transitions/animations** - Hardware-accelerated transforms for smooth 60fps
- **Counter animations** - Revenue/metrics count up from 0 (see `initializeMetricsUpdates()` in script.js)
- **Progressive cards** - Click/tap to expand with detailed information

#### 4. Redirect Architecture
Multi-layer redirect strategy ensures all traffic goes to `https://www.stellah.ai`:
- **netlify.toml** - Netlify-level redirects (apex → www, HTTP → HTTPS)
- **server.js** - Application-level redirects for development
- **middleware/forceHttpsWww.js** - Checks x-forwarded-proto headers
- Both apex and www redirects are force=true to override conflicts

#### 5. Mobile-First Responsive Design
- All major sections have mobile layouts (vertical timelines, stacked cards)
- Touch-friendly interactive elements
- Responsive typography using Tailwind's sm/md/lg/xl breakpoints
- Test on mobile: animations should be performant, no horizontal scroll

## Common Development Workflows

### Updating Tailwind Styles
1. Edit HTML classes directly in `index.html`
2. Run `npm run dev` to watch for changes
3. Tailwind compiles to `dist/output.css` (if using external build)
4. For production: `npm run build` minifies output

Note: Currently, most Tailwind is loaded via CDN in development. Check `<script>` tags in HTML head for Tailwind CDN usage.

### Modifying Animations
Most animation logic is in `script.js`:
- `initializeAnimations()` - Page load animations
- `initializeCalendarAnimations()` - Calendar-specific effects
- `initializeInteractiveElements()` - Click/hover interactions
- `initializeMetricsUpdates()` - Counter animations

CSS animations are defined both inline in `index.html` and in `style.css`.

### Testing Redirects Locally
```bash
# Start server
npm start

# Test apex domain redirect (requires hosts file entry)
curl -I http://stellah.ai:5000

# Check HTTPS detection
curl -I -H "x-forwarded-proto: https" http://stellah.ai:5000
```

### Adding New Sections
When adding content sections:
1. Follow mobile-first approach (design for small screens first)
2. Use scroll-trigger class for entrance animations
3. Maintain brand colors: Orange (#FF7A45, #EA580C), Stone grays
4. Test progressive disclosure on touch devices
5. Ensure accessibility (WCAG AA contrast, keyboard navigation)

## Important Context

### Visual Storytelling Focus
The site tells a transformation story (see `visual-assets-implementation.md`):
- **Problem**: Medical practice drowning in 2,000 leads
- **Solution**: 3 specialized AI assistants (Scheduler, Qualifier, Follow-up)
- **Results**: $3.7M+ revenue, 30k+ appointments, 80+ staff freed

This narrative structure should be preserved when making changes. Visual elements are not decorative—they serve the story.

### Security Headers
The site implements strict security headers:
- CSP (Content Security Policy) - Restricts resource loading
- X-Frame-Options - Prevents clickjacking
- X-Content-Type-Options - Prevents MIME sniffing

When adding external resources, update CSP in `index.html` meta tags AND `netlify.toml` headers.

### Performance Considerations
- Target: <200ms additional load time for animations/interactions
- All animations use hardware-accelerated properties (transform, opacity)
- Intersection Observer reduces reflow/repaint
- Images should be optimized (WebP preferred, with fallbacks)

### Git Workflow
Recent commits show focus on mobile responsiveness:
- Card layout fixes for mobile tap interactions
- Desktop/mobile display improvements
- Asset updates

When committing, follow existing style: descriptive messages focused on user-facing changes.

## Code Style Notes

- **JavaScript**: ES6+ syntax, arrow functions, const/let (no var)
- **CSS**: Tailwind utilities preferred, custom CSS for animations
- **HTML**: Semantic markup, accessibility attributes (aria-labels)
- **Naming**: Descriptive class names, BEM-like conventions for custom components

## Deployment Notes

Netlify automatically deploys from `main` branch. The build process:
1. Runs `npm run netlify-build` (compiles Tailwind)
2. Serves files from root directory (publish = ".")
3. Applies redirects from `netlify.toml`
4. Sets security headers

For debugging production issues, check Netlify deploy logs and test redirect rules in `netlify.toml` carefully—force redirects can conflict.
