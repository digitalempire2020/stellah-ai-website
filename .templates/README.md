# Page Templates & Snippets

This folder contains reusable code snippets and templates for creating new pages on the Stellah AI website.

## Google Tag Manager (GTM) - REQUIRED FOR ALL PAGES

**📌 IMPORTANT:** Every new page MUST include Google Tag Manager tracking.

### Quick Setup

1. Open `gtm-snippet.html` in this folder
2. Copy **PART 1** (head script) → Paste after `<head>` tag
3. Copy **PART 2** (noscript iframe) → Paste after `<body>` tag

### Verification

After adding GTM to a new page, verify it's installed:

```bash
# Check if GTM is installed
grep -q "GTM-PNJW4X5S" your-page.html && echo "✅ GTM Found" || echo "❌ GTM Missing"
```

### Current Pages with GTM Installed

✅ `index.html` (main site)
✅ `booking-successful/index.html` (thank you page)
✅ `calendar/index.html` (booking calendar)
✅ `quiz-before-demo/index.html` (pre-demo quiz)
✅ `sales-dashboard/index.html` (demo dashboard)
✅ `404.html` (error page)

---

## Files in This Folder

- **gtm-snippet.html** - Google Tag Manager code (Container ID: GTM-PNJW4X5S)
- **README.md** - This file

---

## Questions?

If you're creating a new page and unsure about GTM installation, refer to `gtm-snippet.html` for detailed instructions with code examples.
