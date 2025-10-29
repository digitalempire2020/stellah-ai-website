# Complete GTM Event Monitoring Setup

## 🎯 Overview

This guide shows you where to monitor your GTM events and how to set up the complete tracking pipeline.

---

## 📊 The Complete Data Flow

```
Your Website
    ↓ (fires events)
GTM dataLayer
    ↓ (needs setup - see below)
Google Tag Manager Tags
    ↓ (sends to)
Google Analytics 4
    ↓ (view in)
GA4 Reports & Dashboards
```

**Current Status:**
- ✅ Step 1: Website fires events to dataLayer (DONE)
- ⚠️ Step 2: GTM tags to send to GA4 (YOU NEED TO SET UP)
- ⚠️ Step 3: View in GA4 reports (After step 2)

---

## 🚀 STEP-BY-STEP SETUP GUIDE

### Phase 1: Configure GTM to Send Events to GA4

#### 1.1 - Connect GA4 to GTM

**Go to:** https://tagmanager.google.com
**Select:** Container GTM-PNJW4X5S

**Create GA4 Configuration Tag:**
1. Click **Tags** (left sidebar) → **New**
2. Name: `GA4 Configuration`
3. Tag Configuration:
   - Tag Type: **Google Analytics: GA4 Configuration**
   - Measurement ID: `G-XXXXXXXXXX` (your GA4 ID - get from GA4 Admin)
4. Triggering: **All Pages**
5. Click **Save**

---

#### 1.2 - Create Data Layer Variables

These capture the event parameters.

**For Each Parameter, Create a Variable:**

| Variable Name | Data Layer Variable Name |
|---------------|--------------------------|
| DLV - button_name | button_name |
| DLV - button_location | button_location |
| DLV - button_type | button_type |
| DLV - link_text | link_text |
| DLV - link_destination | link_destination |
| DLV - funnel_name | funnel_name |
| DLV - step_number | step_number |
| DLV - step_name | step_name |
| DLV - conversion_type | conversion_type |
| DLV - modal_name | modal_name |
| DLV - action | action |

**How to Create Each Variable:**
1. Click **Variables** (left sidebar)
2. Under "User-Defined Variables" → **New**
3. Name: `DLV - button_name` (example)
4. Variable Configuration:
   - Type: **Data Layer Variable**
   - Data Layer Variable Name: `button_name`
5. Click **Save**
6. Repeat for all parameters above

---

#### 1.3 - Create Event Triggers

**Trigger 1: Button Click Event**
1. **Triggers** → **New**
2. Name: `Event - button_click`
3. Trigger Type: **Custom Event**
4. Event name: `button_click`
5. Click **Save**

**Trigger 2: Navigation Click Event**
1. **Triggers** → **New**
2. Name: `Event - nav_click`
3. Trigger Type: **Custom Event**
4. Event name: `nav_click`
5. Click **Save**

**Trigger 3: Funnel Step Event**
1. **Triggers** → **New**
2. Name: `Event - funnel_step`
3. Trigger Type: **Custom Event**
4. Event name: `funnel_step`
5. Click **Save**

**Trigger 4: Conversion Event**
1. **Triggers** → **New**
2. Name: `Event - conversion`
3. Trigger Type: **Custom Event**
4. Event name: `conversion`
5. Click **Save**

**Trigger 5: Modal Interaction**
1. **Triggers** → **New**
2. Name: `Event - modal_interaction`
3. Trigger Type: **Custom Event**
4. Event name: `modal_interaction`
5. Click **Save**

---

#### 1.4 - Create GA4 Event Tags

Now send each event to GA4.

**Tag 1: Button Click to GA4**
1. **Tags** → **New**
2. Name: `GA4 Event - Button Click`
3. Tag Configuration:
   - Type: **Google Analytics: GA4 Event**
   - Configuration Tag: Select `GA4 Configuration` (created in 1.1)
   - Event Name: `button_click`
4. **Event Parameters** → Add Row:
   - Parameter Name: `button_name`
   - Value: `{{DLV - button_name}}`
5. Add more parameters:
   - `button_location` → `{{DLV - button_location}}`
   - `button_type` → `{{DLV - button_type}}`
6. Triggering: Select `Event - button_click`
7. Click **Save**

**Tag 2: Navigation Click to GA4**
1. **Tags** → **New**
2. Name: `GA4 Event - Navigation Click`
3. Tag Configuration:
   - Type: **Google Analytics: GA4 Event**
   - Configuration Tag: `GA4 Configuration`
   - Event Name: `nav_click`
4. Event Parameters:
   - `link_text` → `{{DLV - link_text}}`
   - `link_destination` → `{{DLV - link_destination}}`
5. Triggering: `Event - nav_click`
6. Click **Save**

**Tag 3: Funnel Step to GA4**
1. **Tags** → **New**
2. Name: `GA4 Event - Funnel Step`
3. Tag Configuration:
   - Type: **Google Analytics: GA4 Event**
   - Configuration Tag: `GA4 Configuration`
   - Event Name: `funnel_step`
4. Event Parameters:
   - `funnel_name` → `{{DLV - funnel_name}}`
   - `step_number` → `{{DLV - step_number}}`
   - `step_name` → `{{DLV - step_name}}`
5. Triggering: `Event - funnel_step`
6. Click **Save**

**Tag 4: Conversion to GA4**
1. **Tags** → **New**
2. Name: `GA4 Event - Conversion`
3. Tag Configuration:
   - Type: **Google Analytics: GA4 Event**
   - Configuration Tag: `GA4 Configuration`
   - Event Name: `demo_booked` ← IMPORTANT: Use this name for GA4 conversion
4. Event Parameters:
   - `conversion_type` → `{{DLV - conversion_type}}`
5. Triggering: `Event - conversion`
6. Click **Save**

**Tag 5: Modal Interaction to GA4**
1. **Tags** → **New**
2. Name: `GA4 Event - Modal Interaction`
3. Tag Configuration:
   - Type: **Google Analytics: GA4 Event**
   - Configuration Tag: `GA4 Configuration`
   - Event Name: `modal_interaction`
4. Event Parameters:
   - `modal_name` → `{{DLV - modal_name}}`
   - `action` → `{{DLV - action}}`
5. Triggering: `Event - modal_interaction`
6. Click **Save**

---

#### 1.5 - Test & Publish

**Test First:**
1. Click **Preview** (top right)
2. Connect to your site
3. Click buttons, navigate, etc.
4. Verify tags fire in GTM Preview

**Then Publish:**
1. Click **Submit** (top right)
2. Version Name: `Added conversion funnel tracking`
3. Description: `Tracking buttons, navigation, funnel steps, conversions`
4. Click **Publish**

---

## 📊 WHERE TO MONITOR YOUR DATA

### 1. GTM Preview Mode (Real-Time Testing)

**Use For:** Testing events before they go live

**Go To:** GTM → Preview → Connect to site

**What You See:**
- Events firing in real-time
- Tag fire/don't fire status
- Data layer values

**When to Use:** During setup and debugging

---

### 2. Google Analytics 4 - Real-Time Report

**Use For:** Verify events are reaching GA4 immediately

**Go To:**
- https://analytics.google.com
- Select your GA4 property
- **Reports** → **Realtime**

**What You See:**
- Events in last 30 minutes
- Event names: `button_click`, `nav_click`, `funnel_step`, `demo_booked`
- Event parameters
- Active users

**When to Use:** Right after GTM setup to confirm data flow

---

### 3. Google Analytics 4 - Events Report

**Use For:** See all events and their frequency

**Go To:**
- GA4 → **Reports** → **Engagement** → **Events**

**What You See:**
- Event names and event counts
- Top events by volume
- Event parameters for each event

**Example:**
```
Event Name          | Event Count | Users
--------------------|-------------|-------
button_click        | 523         | 245
nav_click           | 189         | 134
funnel_step         | 78          | 62
demo_booked         | 15          | 15
modal_interaction   | 96          | 71
```

**When to Use:** Daily/weekly analysis of user behavior

---

### 4. Google Analytics 4 - Explore (Custom Reports)

**Use For:** Deep-dive analysis and custom dashboards

**Go To:**
- GA4 → **Explore**

**Create Custom Reports For:**

**A) Button Performance Report**
1. Click **Explore** → **Blank**
2. Dimensions: Add `button_name`, `button_location`
3. Metrics: Add `Event count`, `Total users`
4. Visualization: Table
5. Filter: `Event name = button_click`

**Shows:** Which buttons get clicked most, by location

---

**B) Conversion Funnel Report**
1. **Explore** → **Funnel exploration**
2. Set up steps:
   - Step 1: Event name = `lead` (your form submission)
   - Step 2: Event name = `funnel_step` where `step_number = 2`
   - Step 3: Event name = `funnel_step` where `step_number = 3`
   - Step 4: Event name = `demo_booked`
3. Apply

**Shows:** Drop-off rates between each funnel step

---

**C) Navigation Behavior**
1. **Explore** → **Free form**
2. Dimensions: `link_text`, `link_destination`
3. Metrics: `Event count`
4. Filter: `Event name = nav_click`

**Shows:** Which nav links users click most

---

### 5. Google Analytics 4 - Conversions

**Use For:** Track your primary conversion goal

**Setup:**
1. GA4 → **Admin** → **Conversions** (under Data display)
2. Click **New conversion event**
3. Event name: `demo_booked`
4. Click **Save**

**View Conversions:**
- GA4 → **Reports** → **Engagement** → **Conversions**

**Shows:**
- Number of demo_booked conversions
- Conversion rate
- Source/medium of conversions

---

### 6. Google Analytics 4 - User Journey

**Use For:** See the path users take before converting

**Go To:**
- GA4 → **Explore** → **Path exploration**

**Configuration:**
1. Starting point: Event = `button_click` where `button_name = Book Demo`
2. Ending point: Event = `demo_booked`

**Shows:** The exact sequence of pages/events between button click and conversion

---

## 🎯 COMPREHENSIVE DASHBOARD SETUP

### Create a Custom Dashboard in GA4

**Go To:** GA4 → **Explore** → **Blank**

**Add Multiple Visualizations:**

**Panel 1: Conversion Funnel**
- Type: Funnel exploration
- Shows: Form → Quiz → Calendar → Thank You drop-offs

**Panel 2: Button Performance**
- Type: Table
- Dimensions: `button_location`, `button_name`
- Metric: `Event count`
- Filter: `button_click` events

**Panel 3: Top FAQs**
- Type: Table
- Dimension: `button_name`
- Metric: `Event count`
- Filter: `button_type = accordion`

**Panel 4: Navigation Patterns**
- Type: Bar chart
- Dimension: `link_text`
- Metric: `Event count`

**Panel 5: Conversion Rate by Source**
- Type: Table
- Dimensions: `Source / Medium`
- Metrics: `Total users`, `Conversions`
- Calculated metric: Conversion rate

**Save as:** "Stellah AI - Conversion Dashboard"

---

## 📱 QUICK ACCESS LINKS

Once set up, bookmark these:

**Daily Monitoring:**
- GA4 Real-time: https://analytics.google.com → Realtime
- GA4 Events: https://analytics.google.com → Reports → Engagement → Events

**Weekly Analysis:**
- Your custom dashboard: GA4 → Explore → [Your Dashboard Name]
- Conversion funnel: GA4 → Explore → [Your Funnel Report]

**Monthly Review:**
- GA4 Conversions: Reports → Engagement → Conversions
- User journey: GA4 → Explore → Path exploration

---

## 🚨 WHAT TO MONITOR DAILY

### Key Metrics:

1. **Conversion Rate**
   - Go to: GA4 → Conversions
   - Look for: `demo_booked` event count
   - Calculate: Conversions / Total visitors

2. **Funnel Drop-Off**
   - Go to: Your funnel exploration
   - Look for: Where most users abandon
   - Take action: Optimize that step

3. **Button Performance**
   - Go to: Events → Filter by `button_click`
   - Look for: Which button location converts best
   - Take action: Emphasize winning CTA

4. **FAQ Engagement**
   - Go to: Events → Filter by `button_type = accordion`
   - Look for: Most clicked FAQ questions
   - Take action: Feature popular FAQs higher

---

## ✅ VERIFICATION CHECKLIST

After setup, verify everything works:

**Test 1: Real-Time Events**
1. Open GA4 Real-time report
2. In another tab, visit your site
3. Click a "Book Demo" button
4. Check Real-time: See `button_click` event appear ✅

**Test 2: Event Parameters**
1. GA4 Real-time → Click on `button_click` event
2. Check: `button_location` parameter shows "Hero Section" ✅
3. Check: `button_name` parameter shows "Book Demo" ✅

**Test 3: Conversion Tracking**
1. Visit `/successful-booking` page
2. Check GA4 Real-time: See `demo_booked` event ✅
3. Go to GA4 → Conversions: See count increase ✅

**Test 4: Funnel Tracking**
1. Visit: Quiz page → Calendar page → Thank you page
2. Check GA4 Real-time: See 3 `funnel_step` events ✅
3. Check custom funnel report: See your journey ✅

---

## 🎓 LEARNING RESOURCES

**GA4 Reports Overview:**
https://support.google.com/analytics/answer/9212670

**GA4 Exploration Tutorial:**
https://support.google.com/analytics/answer/9327000

**GTM + GA4 Setup Guide:**
https://support.google.com/tagmanager/answer/9442095

---

## 📞 QUICK TROUBLESHOOTING

**Events Not Showing in GA4?**
1. Check GTM Preview: Events firing? → Fix website
2. Check GTM Tags: Tags firing in Preview? → Fix triggers
3. Check GA4 Real-time: Events appearing? → Fix GA4 config
4. Wait 24-48 hours for historical reports to populate

**Parameters Missing?**
1. Check Data Layer variables in GTM
2. Verify parameter names match exactly
3. Check GA4 event in Real-time for parameter values

---

## 📊 SUMMARY - YOUR MONITORING WORKFLOW

**Daily (5 minutes):**
- GA4 Real-time → Check events firing
- GA4 Conversions → Check demo_booked count

**Weekly (15 minutes):**
- Custom dashboard → Review button performance
- Funnel report → Identify drop-offs
- Events report → Check top user actions

**Monthly (30 minutes):**
- Path exploration → Understand user journeys
- Compare month-over-month conversion rates
- Optimize based on data insights

---

Last Updated: 2025-10-28
Container ID: GTM-PNJW4X5S
