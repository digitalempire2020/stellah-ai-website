# Testing Workflow for Stellah AI Website

## Branch Structure

- **`main`** - Production branch (deploys to https://www.stellah.ai)
- **`test-performance-optimizations`** - Testing branch for performance improvements
- **Feature branches** - Create from main for specific features

## Safe Testing Process

### 1. Before Making Changes

```bash
# Always start from the test branch
git checkout test-performance-optimizations

# Pull latest changes
git pull origin main

# Create your test files
cp index.html index-test.html
```

### 2. Test Changes Locally

```bash
# Start local server
npm start

# Test on localhost:5000
# Open browser: http://localhost:5000
```

### 3. Test Performance Locally

Use Chrome DevTools Lighthouse:
1. Open Chrome DevTools (F12)
2. Go to Lighthouse tab
3. Run mobile performance audit
4. Compare scores before/after

### 4. Deploy Test Branch (Optional)

To test on a live environment without affecting production:

```bash
# Push to test branch
git add .
git commit -m "TEST: description of changes"
git push origin test-performance-optimizations
```

You can use Netlify or Vercel to deploy test branches:
- Connect your repo to Netlify/Vercel
- Enable branch deploys
- Access test site at: `test-performance-optimizations--stellah-ai.netlify.app`

### 5. Merge to Production

Once tested and verified:

```bash
# Switch to main
git checkout main

# Merge tested changes
git merge test-performance-optimizations

# Push to production
git push origin main
```

Or create a Pull Request on GitHub for review.

## Testing Checklist

Before deploying to production, verify:

- [ ] All functionality works (FAQ accordions, sliders, forms)
- [ ] No JavaScript errors in console
- [ ] Images load correctly
- [ ] Responsive design works on mobile
- [ ] Performance scores improved (or at least not degraded)
- [ ] No 404 errors for resources
- [ ] Forms still submit properly
- [ ] Analytics tracking still works

## Rollback Procedure

If something goes wrong in production:

```bash
# View recent commits
git log --oneline -5

# Revert last commit
git revert HEAD
git push origin main

# Or reset to specific commit
git reset --hard <commit-hash>
git push --force origin main
```

## Current Test Branch Status

The `test-performance-optimizations` branch currently includes:
- Local Unsplash image (medical-practice-hero.webp)
- External JavaScript files (script.js, inline-app.js)
- Removed Spline 3D embed
- Removed unused DNS prefetch hints

## Performance Baseline (Production)

As of Oct 22, 2025:
- FCP: 4.7s
- LCP: 6.9s
- TBT: 370ms
- CLS: 0
- Speed Index: 5.5s

## Next Optimizations to Test

1. **Critical CSS Extraction** (High Impact)
   - Extract above-fold CSS
   - Inline critical, defer rest

2. **Image Lazy Loading** (Medium Impact)
   - Add Intersection Observer
   - Load images as needed

3. **SVG Sprite Sheet** (High Impact, High Risk)
   - Replace 3,327 inline SVGs
   - Needs careful testing

4. **Service Worker** (Low Impact)
   - Cache static assets
   - Offline support

## Tools for Testing

- **Local**: Chrome DevTools Lighthouse
- **Online**: https://pagespeed.web.dev
- **Staging**: Netlify/Vercel branch deploys
- **Monitoring**: Google Search Console for Core Web Vitals

## Important Notes

- **NEVER** push untested changes directly to `main`
- **ALWAYS** test on mobile view (most traffic is mobile)
- **BACKUP** before major changes: `cp index.html index.backup.html`
- **DOCUMENT** what you changed in commit messages

---

Created: Oct 22, 2025
Last Updated: Oct 22, 2025