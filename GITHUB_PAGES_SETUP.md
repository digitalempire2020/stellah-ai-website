# GitHub Pages Migration Guide

## Files Added for GitHub Pages
- **CNAME** - Sets custom domain to www.stellah.ai
- **.nojekyll** - Prevents Jekyll processing (keeps files as-is)
- **404.html** - Handles redirects and SPA routing

## Setup Steps

### 1. Commit and Push Changes
```bash
git add CNAME .nojekyll 404.html _headers _redirects GITHUB_PAGES_SETUP.md
git commit -m "Add GitHub Pages configuration"
git push origin main
```

### 2. Enable GitHub Pages
1. Go to your repo: https://github.com/digitalempire2020/stellah-ai-website
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select: **Deploy from a branch**
4. Choose: **main** branch, **/ (root)** folder
5. Click **Save**

### 3. Configure DNS (at your domain registrar)
Remove existing Netlify DNS and add:

**For apex domain (stellah.ai):**
```
A     185.199.108.153
A     185.199.109.153
A     185.199.110.153
A     185.199.111.153
```

**For www subdomain:**
```
CNAME www.stellah.ai → digitalempire2020.github.io
```

### 4. Wait for Propagation
- GitHub Pages deployment: 5-10 minutes
- DNS changes: 5 minutes to 48 hours (usually 1-2 hours)
- SSL certificate: Auto-generated after DNS propagates

## Benefits over Netlify
✅ **100% FREE** - No bandwidth limits
✅ **No build limits** - Unlimited deployments
✅ **Automatic SSL** - Free HTTPS certificates
✅ **Global CDN** - Fast worldwide delivery
✅ **Simple** - Just push to GitHub

## Limitations vs Netlify
- No server-side redirects (using JavaScript instead)
- No build process needed (your site is already static)
- No form handling (you'd need a third-party service)

## Important Notes
- The Express server (`server.js`) is only for local development
- GitHub Pages serves static files directly
- The site will work exactly the same as on Netlify
- Keep the netlify.toml file in case you want to switch back

## After DNS Propagates
Your site will be available at:
- https://www.stellah.ai (primary)
- https://stellah.ai (redirects to www)
- https://digitalempire2020.github.io/stellah-ai-website (GitHub URL)