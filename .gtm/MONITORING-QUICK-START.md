# Quick Start - Where to Monitor Your Events

## ⚡ TL;DR - Where to Go

```
1. SETUP FIRST → Google Tag Manager (30 min setup)
2. TEST → GA4 Real-time (see events live)
3. ANALYZE → GA4 Reports & Explore (daily/weekly)
```

---

## 🎯 Current Status

**What's Done:**
✅ Your website fires events (button clicks, nav clicks, etc.)
✅ Events reach GTM dataLayer

**What You Need:**
⚠️ Configure GTM to send events to Google Analytics 4
⚠️ Set up GA4 reports to view the data

**Time Required:** 30 minutes one-time setup

---

## 📍 Monitoring Locations

### 1. Google Tag Manager Preview
**URL:** https://tagmanager.google.com (Container: GTM-PNJW4X5S)

**Use For:** Testing if events fire correctly

**What to Do:**
- Click **Preview** → Connect to site
- Click buttons/links on your site
- See events fire in real-time

**When:** During setup and debugging

---

### 2. Google Analytics 4 - Real-Time
**URL:** https://analytics.google.com → Your Property → Realtime

**Use For:** Verify events reach GA4 (after GTM setup)

**What You'll See:**
```
Event Name: button_click
Event Count: 5 (in last 30 minutes)
Parameters:
  - button_name: "Book Demo"
  - button_location: "Hero Section"
```

**When:** Daily quick check (2 minutes)

---

### 3. Google Analytics 4 - Events Report
**URL:** GA4 → Reports → Engagement → Events

**Use For:** See all events and frequency

**What You'll See:**
```
Event Name          | Event Count
--------------------|------------
button_click        | 523
funnel_step         | 78
demo_booked         | 15
```

**When:** Weekly analysis (10 minutes)

---

### 4. Google Analytics 4 - Explore (Custom Reports)
**URL:** GA4 → Explore

**Use For:** Deep dive analysis

**What You Can Build:**
- Conversion funnel (Form → Quiz → Calendar → Thank You)
- Button performance by location
- FAQ engagement report
- User journey paths

**When:** Weekly/monthly strategy (30 minutes)

---

### 5. Google Analytics 4 - Conversions
**URL:** GA4 → Reports → Engagement → Conversions

**Use For:** Track your main goal (demo bookings)

**What You'll See:**
```
Conversion Event: demo_booked
Conversions: 15
Conversion Rate: 3.2%
```

**When:** Daily executive summary (1 minute)

---

## 🚀 SETUP CHECKLIST

**Before You Can Monitor, Complete These Steps:**

### ☐ Step 1: Configure GTM (20 min)
1. Create GA4 Configuration tag
2. Create Data Layer Variables (11 variables)
3. Create Triggers (5 triggers)
4. Create GA4 Event Tags (5 tags)
5. Test in Preview mode
6. Publish

**Guide:** See `COMPLETE-MONITORING-SETUP.md` for detailed instructions

### ☐ Step 2: Verify in GA4 Real-Time (5 min)
1. Open GA4 → Real-time
2. Visit your site in another tab
3. Click a button
4. See event appear in Real-time report

### ☐ Step 3: Mark Conversion (2 min)
1. GA4 → Admin → Conversions
2. Add: `demo_booked`
3. Save

### ☐ Step 4: Create Custom Dashboard (10 min)
1. GA4 → Explore → Blank
2. Add visualizations:
   - Funnel exploration
   - Button performance table
   - FAQ engagement chart
3. Save as "Conversion Dashboard"

---

## 📊 Your Daily Monitoring Routine

**Open These 3 Tabs Every Morning:**

**Tab 1: GA4 Real-Time** (https://analytics.google.com)
- Quick glance: Events firing? ✅
- Takes: 30 seconds

**Tab 2: GA4 Conversions** (Reports → Conversions)
- Check: demo_booked count today
- Takes: 30 seconds

**Tab 3: Custom Dashboard** (Explore → Your Dashboard)
- Review: Button performance, funnel drop-offs
- Takes: 2 minutes

**Total:** 3 minutes per day

---

## 🎯 What Each Report Tells You

| Report | Question It Answers | Action You Can Take |
|--------|-------------------|-------------------|
| **Real-Time** | Are events working right now? | Debug issues immediately |
| **Events** | What do users click most? | Prioritize popular actions |
| **Funnel** | Where do users drop off? | Optimize weak steps |
| **Button Performance** | Which CTA converts best? | Replicate winning buttons |
| **Conversions** | How many demos booked? | Track ROI and goals |
| **User Journey** | What path leads to conversion? | Optimize winning paths |

---

## ❓ FAQ

**Q: Do I need to set up GTM or can I just use GA4?**
A: You MUST set up GTM tags. Your website fires events to GTM's dataLayer, but GTM needs tags to forward them to GA4.

**Q: How long until I see data in GA4?**
A: Real-time = instant. Historical reports = 24-48 hours.

**Q: What's the most important metric?**
A: Conversion rate (demo_booked / total visitors) and funnel drop-off rates.

**Q: Do I need Google Analytics 4 or Universal Analytics?**
A: Google Analytics 4 (GA4). Universal Analytics is deprecated.

**Q: Where do I get my GA4 Measurement ID?**
A: GA4 → Admin → Data Streams → Your Web Stream → Measurement ID (starts with G-)

---

## 🔗 Quick Links (Bookmark These)

**Setup:**
- GTM Container: https://tagmanager.google.com
- GA4 Property: https://analytics.google.com

**Daily Check:**
- GA4 Real-time: [Your GA4 URL]/realtime
- GA4 Conversions: [Your GA4 URL]/report/conversions

**Weekly Analysis:**
- Custom Dashboard: [Your GA4 URL]/explore
- Events Report: [Your GA4 URL]/report/events

---

## 📞 Need Help?

**Step-by-Step GTM Setup:**
→ Read: `.gtm/COMPLETE-MONITORING-SETUP.md`

**What Events to Expect:**
→ Read: `.gtm/GTM-PREVIEW-GUIDE.md`

**Funnel Tracking Details:**
→ Read: `.gtm/FUNNEL-TRACKING.md`

---

Last Updated: 2025-10-28
