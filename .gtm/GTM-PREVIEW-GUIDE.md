# GTM Preview Mode - What You'll See

## 🎯 Overview

This guide shows exactly what events and labels you'll see in GTM Preview mode when testing your site.

---

## 📊 Events You'll See in GTM Preview

### 1. Navigation Link Clicks

**Event Name:** `nav_click`

**Example:**
```
When you click: "FAQ" in navigation
GTM Preview shows:
  Event: nav_click
  link_text: "FAQ"
  link_destination: "#faq"
  click_type: "navigation"
```

**All Navigation Links:**
- "Process" → #breakthrough
- "Results" → #results
- "FAQ" → #faq

---

### 2. Book Demo Button Clicks

**Event Name:** `button_click`

**Examples:**

```
Click: BOOK A LIVE DEMO (Hero Section)
GTM Preview shows:
  Event: button_click
  button_name: "Book Demo"
  button_location: "Hero Section"
  button_type: "cta"
```

```
Click: Watch AI in Action (Middle)
GTM Preview shows:
  Event: button_click
  button_name: "Book Demo"
  button_location: "Middle CTA - Watch AI"
  button_type: "cta"
```

```
Click: BOOK A LIVE DEMO (Bottom)
GTM Preview shows:
  Event: button_click
  button_name: "Book Demo"
  button_location: "Final CTA - Operations Directors"
  button_type: "cta"
```

**All Book Demo Buttons:**
- Hero Section
- Middle CTA - Watch AI
- Final CTA - Operations Directors

---

### 3. FAQ Accordion Clicks

**Event Name:** `button_click`

**Example:**

```
Click: "How does Stellah handle my existing CRM?"
GTM Preview shows:
  Event: button_click
  button_name: "FAQ: How does Stellah handle my existing CRM?"
  button_location: "FAQ Section"
  button_type: "accordion"
```

**Note:** The question text is truncated to first 50 characters in the button_name.

---

### 4. Show More FAQ Button

**Event Name:** `button_click`

**Example:**

```
Click: Show More FAQs button
GTM Preview shows:
  Event: button_click
  button_name: "Show More FAQ"
  button_location: "FAQ Section"
  button_type: "interaction"
```

---

### 5. Modal Interactions

**Event Name:** `modal_interaction`

**Examples:**

```
When Book Demo form opens:
GTM Preview shows:
  Event: modal_interaction
  modal_name: "Book Demo Modal"
  action: "open"
```

```
When Dashboard preview opens:
GTM Preview shows:
  Event: modal_interaction
  modal_name: "Dashboard Modal"
  action: "open"
```

---

### 6. Funnel Step Events

**Event Name:** `funnel_step`

**Examples:**

```
Visit: /quiz-before-demo
GTM Preview shows:
  Event: funnel_step
  funnel_name: "Demo Booking Funnel"
  step_number: 2
  step_name: "Quiz Started"
  page_path: "/quiz-before-demo"
```

```
Visit: /calendar
GTM Preview shows:
  Event: funnel_step
  funnel_name: "Demo Booking Funnel"
  step_number: 3
  step_name: "Calendar Opened"
  page_path: "/calendar"
```

```
Visit: /successful-booking
GTM Preview shows:
  Event: funnel_step
  funnel_name: "Demo Booking Funnel"
  step_number: 4
  step_name: "Booking Completed"
  page_path: "/successful-booking"

PLUS:
  Event: conversion
  conversion_type: "demo_booked"
  conversion_value: 1
  funnel_name: "Demo Booking Funnel"
```

---

## 🧪 How to Test in GTM Preview Mode

### Step 1: Enable Preview Mode
1. Go to: https://tagmanager.google.com
2. Select container: GTM-PNJW4X5S
3. Click **Preview** button (top right)
4. Enter URL: https://www.stellah.ai
5. Click **Connect**

### Step 2: Test Navigation Links
1. Click **"FAQ"** in navigation
2. Check GTM Preview → **Summary** tab
3. Look for: `nav_click` event
4. Click event → See parameters: `link_text: "FAQ"`

### Step 3: Test Book Demo Buttons
1. Click any **"BOOK A LIVE DEMO"** button
2. Check GTM Preview → **Summary** tab
3. Look for: `button_click` event
4. Click event → See parameters: `button_location: "Hero Section"` (or other location)

### Step 4: Test FAQ Interactions
1. Click **"Show More FAQs"** button
2. Look for: `button_click` with `button_name: "Show More FAQ"`
3. Click any FAQ question
4. Look for: `button_click` with `button_name: "FAQ: [question text]"`

### Step 5: Test Funnel Pages
1. Visit: `/quiz-before-demo`
2. Look for: `funnel_step` with `step_number: 2`
3. Visit: `/calendar`
4. Look for: `funnel_step` with `step_number: 3`
5. Visit: `/successful-booking`
6. Look for: TWO events: `funnel_step` (step 4) + `conversion`

---

## ✅ What Changed from Before

### ❌ Before (Generic):
```
Event: click
Event: modal_interaction
```
**Problem:** Can't tell which button or where on page

### ✅ After (Specific):
```
Event: button_click
  button_name: "Book Demo"
  button_location: "Hero Section"
  button_type: "cta"

Event: nav_click
  link_text: "FAQ"
  link_destination: "#faq"
```
**Solution:** Clear labels showing exactly what was clicked

---

## 🔍 Troubleshooting

### Event Not Showing Up?

1. **Check Console Logs:**
   - Open browser DevTools (F12) → Console tab
   - Look for: `🎯 GTM Funnel Event: button_click {button_name: "..."}`
   - If you see this, event IS firing, but GTM Preview might have issues

2. **Verify GTM Preview Connection:**
   - Orange "Debugger Connected" banner should appear at top of page
   - If not, reconnect from GTM → Preview → Connect

3. **Check Function Exists:**
   - Console: `typeof trackButtonClick`
   - Should return: `"function"`
   - If `"undefined"`, gtm-events.js didn't load

### Parameters Not Showing?

In GTM Preview:
1. Click the event in **Summary** tab
2. Click **"Data Layer"** tab
3. Scroll to your event
4. Expand to see all parameters

---

## 📊 Quick Reference Table

| User Action | Event Name | Key Parameter | Value Example |
|-------------|------------|---------------|---------------|
| Click FAQ nav | `nav_click` | `link_text` | "FAQ" |
| Click Book Demo | `button_click` | `button_location` | "Hero Section" |
| Click Show More FAQ | `button_click` | `button_name` | "Show More FAQ" |
| Click FAQ question | `button_click` | `button_name` | "FAQ: How does..." |
| Open Book Demo modal | `modal_interaction` | `modal_name` | "Book Demo Modal" |
| Visit Quiz page | `funnel_step` | `step_name` | "Quiz Started" |
| Visit Thank You page | `conversion` | `conversion_type` | "demo_booked" |

---

## 🚀 Next Steps

Once you verify events in GTM Preview:

1. **Create GTM Triggers** for each event type:
   - `button_click`
   - `nav_click`
   - `modal_interaction`
   - `funnel_step`
   - `conversion`

2. **Create GA4 Tags** to send events to Analytics

3. **Set Up Conversions** in GA4 for the `conversion` event

4. **Build Reports** using the specific button/link labels

---

## 📞 Support

**Files to Check:**
- `gtm-events.js` - Core tracking script
- `index.html` - Button implementations
- Browser Console - Event logs

**Common Issues:**
- Script not loading? Check network tab for gtm-events.js
- Events not firing? Check console for JavaScript errors
- Parameters missing? Check Data Layer tab in GTM Preview

Last Updated: 2025-10-28
