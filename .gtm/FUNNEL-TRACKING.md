# GTM Conversion Funnel Tracking

## Overview

This document explains the conversion funnel tracking implemented for Stellah AI's demo booking process.

**Container ID:** `GTM-PNJW4X5S`

---

## 📊 Tracked Funnel

```
Step 1: Form Submit (Lead Event)
   ↓ [GTM already tracking this]

Step 2: Quiz Page Arrival
   ↓ [NEW - tracks who starts quiz]

Step 3: Calendar Page Arrival
   ↓ [NEW - tracks who opens calendar]

Step 4: Thank You Page Arrival - CONVERSION ✅
   ↓ [NEW - tracks completed bookings]
```

---

## 🎯 Events Pushed to dataLayer

### 1. Funnel Step Event

**Event Name:** `funnel_step`

**When It Fires:**
- Quiz page loads → Step 2
- Calendar page loads → Step 3
- Thank you page loads → Step 4

**dataLayer Parameters:**
```javascript
{
  'event': 'funnel_step',
  'funnel_name': 'Demo Booking Funnel',
  'step_number': 2,              // 2, 3, or 4
  'step_name': 'Quiz Started',   // or 'Calendar Opened', 'Booking Completed'
  'page_path': '/quiz-before-demo'
}
```

### 2. Conversion Event

**Event Name:** `conversion`

**When It Fires:** Only on thank you page (Step 4)

**dataLayer Parameters:**
```javascript
{
  'event': 'conversion',
  'conversion_type': 'demo_booked',
  'conversion_value': 1,
  'funnel_name': 'Demo Booking Funnel'
}
```

---

## 📈 How to Use This in Google Analytics 4

### Setup Custom Events in GA4

1. **Go to GTM:** Open your GTM container (GTM-PNJW4X5S)

2. **Create GA4 Event Tags:**

**Tag 1: Funnel Step Tracking**
- Tag Type: Google Analytics: GA4 Event
- Event Name: `funnel_step`
- Event Parameters:
  - `funnel_name`: `{{DLV - funnel_name}}`
  - `step_number`: `{{DLV - step_number}}`
  - `step_name`: `{{DLV - step_name}}`
  - `page_path`: `{{DLV - page_path}}`
- Trigger: Custom Event = `funnel_step`

**Tag 2: Conversion Tracking**
- Tag Type: Google Analytics: GA4 Event
- Event Name: `demo_booked`
- Event Parameters:
  - `conversion_type`: `{{DLV - conversion_type}}`
  - `conversion_value`: `{{DLV - conversion_value}}`
- Trigger: Custom Event = `conversion`

3. **Create Data Layer Variables** (for each parameter above):
   - Variable Type: Data Layer Variable
   - Data Layer Variable Name: (e.g., `funnel_name`, `step_number`, etc.)

---

## 🔍 Viewing Funnel Data

### In GA4 (after setup):

**Path Analysis:**
1. Go to **Explore** → **Funnel exploration**
2. Set up funnel steps:
   - Step 1: Event = `lead` (your existing form event)
   - Step 2: Event = `funnel_step` where `step_number` = 2
   - Step 3: Event = `funnel_step` where `step_number` = 3
   - Step 4: Event = `demo_booked`

**This Shows:**
- How many people drop off at each step
- Conversion rate at each stage
- Time between steps

**Example Insights:**
```
Step 1 (Form): 100 users
Step 2 (Quiz): 80 users → 20% drop-off
Step 3 (Calendar): 65 users → 18.75% drop-off
Step 4 (Thank You): 50 users → 23% drop-off

Overall Conversion: 50% (50/100)
```

---

## 🧪 Testing the Funnel

### Browser Console Testing

1. **Open any funnel page** (quiz, calendar, or thank you)
2. **Open DevTools** (F12) → Console tab
3. **Check for tracking logs:**

You should see:
```
✅ Funnel: Quiz page loaded
🎯 GTM Funnel Event: funnel_step {funnel_name: "Demo Booking Funnel", ...}
```

### GTM Preview Mode Testing

1. In GTM, click **Preview**
2. Enter your site URL
3. Navigate through funnel: Quiz → Calendar → Thank You
4. Check **Tag Manager** pane for:
   - `funnel_step` events firing on each page
   - `conversion` event firing on thank you page

---

## 📋 Funnel Drop-Off Diagnosis

Use this data to identify problems:

| High Drop-Off Stage | Possible Issues | Actions |
|---------------------|-----------------|---------|
| **Form → Quiz** (Step 1→2) | Form redirect broken, quiz page loading slow | Check redirect URL, optimize quiz page load time |
| **Quiz → Calendar** (Step 2→3) | Quiz too long, LeadConnector quiz not progressing | Shorten quiz, check LeadConnector configuration |
| **Calendar → Thank You** (Step 3→4) | Booking widget issues, no available slots | Test calendar widget, add more availability |

---

## 🚨 Important Limitations

**What We CANNOT Track:**
- Individual quiz question answers (iframe limitation)
- Calendar date/time selections (iframe limitation)
- Form field interactions (iframe limitation)

**Why:** Quiz and calendar are embedded iframes from LeadConnector. Cross-origin security prevents tracking internal interactions.

**Solution for Detailed Tracking:**
Configure tracking inside LeadConnector's dashboard:
1. Go to LeadConnector → Settings → Integrations
2. Enable GTM integration
3. Add your GTM container ID (GTM-PNJW4X5S)
4. Events from quiz/calendar will then fire to your GTM

---

## 📝 Files Modified

- **gtm-events.js** - Core funnel tracking script
- **quiz-before-demo/index.html** - Added tracking script
- **calendar/index.html** - Added tracking script
- **successful-booking/index.html** - Added tracking script

All scripts reference: `../gtm-events.js`

---

## 🔧 Maintenance

**When adding new funnel pages:**
1. Add tracking script before `</body>`:
   ```html
   <script src="../gtm-events.js"></script>
   ```

2. Update `gtm-events.js` to detect new page:
   ```javascript
   else if (path.includes('/your-new-page')) {
       trackFunnelStep(5, 'New Step Name', path);
   }
   ```

---

## 📞 Support

For questions about this tracking setup, refer to:
- This documentation
- GTM container: https://tagmanager.google.com (Container ID: GTM-PNJW4X5S)
- GA4 property: (your GA4 property ID)

Last Updated: 2025-10-28
