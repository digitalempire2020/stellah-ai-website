# GTM Funnel Tracking - Quick Reference

## 🎯 What's Being Tracked

| Step | Page | Event Name | Conversion? |
|------|------|------------|-------------|
| 1 | Form Submit | `lead` | ❌ (already tracking) |
| 2 | Quiz Page | `funnel_step` | ❌ |
| 3 | Calendar Page | `funnel_step` | ❌ |
| 4 | Thank You Page | `funnel_step` + `conversion` | ✅ YES |

## 🔍 Quick Test

1. Open browser console (F12)
2. Visit: `/quiz-before-demo`
3. Look for: `✅ Funnel: Quiz page loaded`
4. Check `dataLayer`: `console.table(window.dataLayer)`

## 📊 Expected Results in GTM

**dataLayer Events You'll See:**

```javascript
// On Quiz Page
{
  event: 'funnel_step',
  step_number: 2,
  step_name: 'Quiz Started'
}

// On Calendar Page
{
  event: 'funnel_step',
  step_number: 3,
  step_name: 'Calendar Opened'
}

// On Thank You Page
{
  event: 'funnel_step',
  step_number: 4,
  step_name: 'Booking Completed'
}
{
  event: 'conversion',
  conversion_type: 'demo_booked'
}
```

## 🚀 Next Steps in GTM

1. **Create Triggers**
   - Name: `Funnel Step Event`
   - Type: Custom Event
   - Event name: `funnel_step`

2. **Create GA4 Tags**
   - Send funnel_step events to GA4
   - Send conversion events to GA4

3. **Set Up Funnel in GA4**
   - Go to Explore → Funnel exploration
   - Add 4 steps based on events above

## 📈 Metrics You Can Now Track

- **Conversion Rate:** % who reach thank you page
- **Drop-Off Points:** Where users abandon
- **Time Between Steps:** How long each stage takes
- **Completion Rate:** Quiz → Calendar → Thank You

## 🔗 Full Documentation

See `FUNNEL-TRACKING.md` for complete setup instructions.
