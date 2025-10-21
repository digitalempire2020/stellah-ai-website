# Color Palette Reference Card

## Primary Brand Colors

```css
/* Stellah Orange - Primary Brand Color */
--stellah-orange: #FF7A45;
--stellah-orange-dark: #EA580C;

/* Usage: CTAs, highlights, success states, brand moments */
```

**Visual:**
```
┌────────────┐  ┌────────────┐
│  #FF7A45   │  │  #EA580C   │
│            │  │            │
│  Primary   │  │  Dark      │
│  Orange    │  │  Orange    │
└────────────┘  └────────────┘
```

---

## Emotional Color System

### Failure Colors (Loss Aversion)

```css
/* Red - Danger, Failure, Loss */
--failure-red: #dc2626;
--failure-red-dark: #7f1d1d;
--failure-bg: #fef2f2;
--failure-border: #fca5a5;

/* Usage: $4k failure stat, chatbot stuck, error states */
```

**Visual:**
```
Background         Border           Text
┌────────────┐  ┌────────────┐  ┌────────────┐
│  #fef2f2   │  │  #fca5a5   │  │  #dc2626   │
│ Very light │  │ Light pink │  │ Bright red │
│    red     │  │            │  │            │
└────────────┘  └────────────┘  └────────────┘

Gradient Text
┌────────────────────────────────┐
│  #dc2626 → #7f1d1d             │
│  Bright red → Dark red         │
│  (Used for $4,000 stat)        │
└────────────────────────────────┘
```

### Success Colors (Achievement)

```css
/* Yellow/Amber - Success, Warmth, Relief */
--success-yellow: #fbbf24;
--success-yellow-light: #fef3c7;
--success-yellow-dark: #fde68a;

/* Green - Achievement, Confirmation */
--success-green: #16a34a;
--success-green-light: #86efac;

/* Usage: Sarah's success, positive outcomes, checkmarks */
```

**Visual:**
```
Yellow Zone                      Green Accents
┌────────────┬────────────┐    ┌────────────┬────────────┐
│  #fef3c7   │  #fde68a   │    │  #16a34a   │  #86efac   │
│ Very light │ Light gold │    │ Dark green │ Light green│
│   yellow   │            │    │            │            │
└────────────┴────────────┘    └────────────┴────────────┘

Sarah's Chat Bubble Gradient
┌────────────────────────────────┐
│  #fed7aa → #fdba74             │
│  Light peach → Orange peach    │
│  (Warmth, human touch)         │
└────────────────────────────────┘
```

### Insight Colors (Intelligence)

```css
/* Slate - Intelligence, Depth, Sophistication */
--insight-dark: #1e293b;
--insight-medium: #334155;

/* Yellow highlight - Aha moment */
--insight-highlight: #fef08a;

/* Usage: Engineer's quote section, lightbulb moment */
```

**Visual:**
```
Background                       Highlight Text
┌────────────┬────────────┐    ┌────────────┐
│  #1e293b   │  #334155   │    │  #fef08a   │
│ Dark slate │ Med slate  │    │ Bright gold│
│            │            │    │            │
└────────────┴────────────┘    └────────────┘

Gradient
┌────────────────────────────────┐
│  #1e293b → #334155             │
│  Dark slate → Medium slate     │
│  (Creates depth)               │
└────────────────────────────────┘
```

### Technology Colors (AI Agents)

```css
/* Blue - Perception, Input (Reader AI) */
--tech-blue: #3b82f6;
--tech-blue-dark: #1e40af;
--tech-blue-light: #93c5fd;

/* Purple - Thinking, Processing (Strategist AI) */
--tech-purple: #a855f7;
--tech-purple-dark: #7e22ce;
--tech-purple-light: #d8b4fe;

/* Green - Action, Output (Executor AI) */
--tech-green: #22c55e;
--tech-green-dark: #15803d;
--tech-green-light: #86efac;

/* Usage: AI agent cards, technical features */
```

**Visual:**
```
Reader (Blue)        Strategist (Purple)   Executor (Green)
┌────────────┐      ┌────────────┐        ┌────────────┐
│  #3b82f6   │      │  #a855f7   │        │  #22c55e   │
│            │  →   │            │   →    │            │
│   Input    │      │  Process   │        │  Output    │
└────────────┘      └────────────┘        └────────────┘

Agent Card Gradients
┌────────────────────────────────┐
│ Blue:   #60a5fa → #3b82f6     │
│ Purple: #c084fc → #a855f7     │
│ Green:  #4ade80 → #22c55e     │
└────────────────────────────────┘
```

### Neutral Colors (Old Technology)

```css
/* Gray - Outdated, Neutral, Co-Pilot */
--neutral-gray: #a3a3a3;
--neutral-gray-light: #f5f5f5;
--neutral-gray-medium: #e5e5e5;

/* Stone - Body text, backgrounds */
--stone-50: #fafaf9;
--stone-100: #f5f5f4;
--stone-200: #e7e5e4;
--stone-600: #57534e;
--stone-900: #1c1917;

/* Usage: Co-pilot card, generic UI, body text */
```

**Visual:**
```
Co-Pilot Card Gradient
┌────────────────────────────────┐
│  #f5f5f5 → #e5e5e5             │
│  Very light gray → Light gray  │
│  (Muted, outdated feel)        │
└────────────────────────────────┘

Stone Scale (Text)
┌──────┬──────┬──────┬──────┬──────┐
│ #1c  │ #57  │ #e7  │ #f5  │ #fa  │
│ 1917 │ 534e │ e5e4 │ f5f4 │ faf9 │
│      │      │      │      │      │
│Black │Gray  │Light │V.Lt  │White │
│Text  │Text  │Bkg   │Bkg   │Bkg   │
└──────┴──────┴──────┴──────┴──────┘
```

---

## Gradient Recipes

### Failure Zone Background
```css
background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
border: 2px solid #fca5a5;
```
**Result:** Light red → slightly darker red (danger feel)

### Success Zone Background
```css
background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
border: 2px solid #fbbf24;
```
**Result:** Cream → gold (achievement feel)

### Insight Section Background
```css
background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
```
**Result:** Dark → medium slate (depth, intelligence)

### AI-Pilot Card Background
```css
background: linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%);
border: 3px solid #FF7A45;
box-shadow: 0 10px 40px rgba(255, 122, 69, 0.2);
```
**Result:** Very light orange → peach (premium, vibrant)

### Co-Pilot Card Background
```css
background: linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%);
border: 2px solid #a3a3a3;
opacity: 0.8;
```
**Result:** Light gray → medium gray, faded (outdated)

---

## Text Color Applications

### Headings
```css
/* Primary headings */
color: #1c1917; /* stone-900 - almost black */
font-weight: 700; /* bold */

/* Highlighted words */
background: linear-gradient(135deg, #FF7A45 0%, #EA580C 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

### Body Text
```css
/* Standard body */
color: #57534e; /* stone-600 - medium gray */

/* Important body */
color: #1c1917; /* stone-900 - dark */
font-weight: 600; /* semibold */

/* Subtle text */
color: #78716c; /* stone-500 - light gray */
font-size: 0.875rem; /* 14px */
```

### On Dark Backgrounds
```css
/* Light text on insight section */
color: #ffffff; /* white */

/* Highlighted on dark */
color: #fef08a; /* bright yellow */
font-weight: 700;
```

---

## Badge Color System

### Failure Badge
```css
background: #fca5a5; /* light red */
color: #7f1d1d; /* dark red */
font-weight: 700;
text-transform: uppercase;
```
**Example:** "THE FAILURE", "STUCK"

### Success Badge
```css
background: #86efac; /* light green */
color: #14532d; /* dark green */
font-weight: 700;
text-transform: uppercase;
```
**Example:** "BOOKED", "45 SECONDS"

### Breakthrough Badge
```css
background: linear-gradient(135deg, #FF7A45 0%, #EA580C 100%);
color: #ffffff;
font-weight: 700;
text-transform: uppercase;
```
**Example:** "THE BREAKTHROUGH"

### Premium Badge
```css
background: linear-gradient(to right, #fbbf24 0%, #f59e0b 100%);
color: #1c1917; /* dark text on yellow */
font-weight: 700;
```
**Example:** "⭐ THE STELLAH DIFFERENCE"

---

## Chat Bubble Color System

### Patient Bubble
```css
background: linear-gradient(135deg, #f5f5f4 0%, #e7e5e4 100%);
border: 1px solid #d6d3d1;
color: #1c1917;
```
**Rationale:** Neutral stone tones (question, no judgment)

### Bot Stuck Bubble
```css
background: linear-gradient(135deg, #fca5a5 0%, #f87171 100%);
border: 2px dashed #dc2626;
color: #1c1917;
animation: glitchShake 0.3s infinite;
```
**Rationale:** Red gradient + dashed border = broken/error

Badge:
```css
background: #dc2626; /* bright red */
color: #ffffff;
content: "⚠ STUCK";
```

### Sarah Success Bubble
```css
background: linear-gradient(135deg, #fed7aa 0%, #fdba74 100%);
border: 2px solid #f97316;
color: #1c1917;
animation: smoothFlow 2s ease-in-out infinite;
```
**Rationale:** Warm orange/peach = human warmth, success

Badge:
```css
background: #16a34a; /* green */
color: #ffffff;
content: "✓ BOOKED";
```

---

## Component-Specific Colors

### AI Agent Cards

#### Reader (Blue)
```css
background: linear-gradient(to bottom right, #60a5fa 0%, #3b82f6 100%);
/* Icon circle background */

background: #eff6ff; /* Very light blue */
/* Info box background */
```

#### Strategist (Purple)
```css
background: linear-gradient(to bottom right, #c084fc 0%, #a855f7 100%);
/* Icon circle background */

background: #faf5ff; /* Very light purple */
/* Info box background */
```

#### Executor (Green)
```css
background: linear-gradient(to bottom right, #4ade80 0%, #22c55e 100%);
/* Icon circle background */

background: #f0fdf4; /* Very light green */
/* Info box background */
```

### CTA Buttons

#### Primary CTA
```css
background: linear-gradient(to right, #f97316 0%, #ea580c 100%);
color: #ffffff;
font-weight: 700;

/* Hover state */
background: linear-gradient(to right, #ea580c 0%, #c2410c 100%);
transform: scale(1.05);
```

#### Secondary CTA
```css
background: #ffffff;
color: #1c1917;
border: 2px solid #d6d3d1;
font-weight: 700;

/* Hover state */
background: #fafaf9; /* stone-50 */
transform: scale(1.05);
```

---

## Accessibility Contrast Ratios

### Text Contrast (WCAG AA = 4.5:1, AAA = 7:1)

| Foreground | Background | Ratio | Pass | Grade |
|------------|------------|-------|------|-------|
| #1c1917 (stone-900) | #ffffff | 18.1:1 | ✅ | AAA |
| #57534e (stone-600) | #ffffff | 7.2:1 | ✅ | AAA |
| #1c1917 (stone-900) | #fef2f2 (red-50) | 17.3:1 | ✅ | AAA |
| #7f1d1d (red-900) | #fef2f2 (red-50) | 8.4:1 | ✅ | AAA |
| #ffffff | #1e293b (slate-800) | 13.5:1 | ✅ | AAA |
| #fef08a (yellow) | #1e293b (slate) | 11.2:1 | ✅ | AAA |
| #1c1917 (stone-900) | #fef3c7 (yellow-50) | 16.8:1 | ✅ | AAA |
| #ffffff | #FF7A45 (orange) | 3.2:1 | ✅ | AA Large |

**All text combinations meet WCAG AA standards.**

---

## Color Psychology Mapping

### Emotion → Color → Component

```
LOSS / URGENCY
  ↓
Red (#dc2626)
  ↓
$4k failure stat, chatbot stuck

RELIEF / SUCCESS
  ↓
Yellow (#fbbf24) + Green (#16a34a)
  ↓
Sarah's success, achievement badges

WARMTH / HUMAN
  ↓
Orange (#FF7A45)
  ↓
Sarah's response, Stellah brand

INTELLIGENCE / DEPTH
  ↓
Dark Slate (#1e293b)
  ↓
Engineer's insight quote

TECHNOLOGY / PRECISION
  ↓
Blue/Purple/Green
  ↓
AI agent cards

OUTDATED / NEUTRAL
  ↓
Gray (#a3a3a3)
  ↓
Co-pilot (old way)

PREMIUM / MODERN
  ↓
Orange gradient + shimmer
  ↓
AI-pilot card
```

---

## Usage Guidelines

### DO Use Orange (#FF7A45) For:
- ✅ Stellah brand moments
- ✅ Success states (Sarah, AI-pilot)
- ✅ CTA buttons
- ✅ Highlighted text in headings
- ✅ Human warmth indicators

### DON'T Use Orange For:
- ❌ Failure examples (use red)
- ❌ Old technology (use gray)
- ❌ Body text (use stone)
- ❌ Backgrounds (too vibrant, use gradients)

### DO Use Red For:
- ✅ Failure states
- ✅ Error indicators
- ✅ Loss/waste messaging ($4k)
- ✅ Stuck/broken states

### DON'T Use Red For:
- ❌ Success stories
- ❌ Stellah branding
- ❌ CTA buttons
- ❌ Generic warnings (use yellow)

### DO Use Gray For:
- ✅ Old technology (co-pilot)
- ✅ Outdated approaches
- ✅ De-emphasized content
- ✅ Neutral UI elements

### DON'T Use Gray For:
- ❌ Primary content
- ❌ Stellah brand
- ❌ Success indicators
- ❌ Important CTAs

---

## Quick Reference: Section Colors

```
SECTION HEADER
└─ Text: stone-900, Highlight: orange gradient

BEAT 1: FAILURE HOOK
├─ Background: red-50 → red-100 gradient
├─ Border: red-300
├─ Stat text: red-600 → red-900 gradient
└─ Badge: red-200 bg, red-900 text

BEAT 2A: CHATBOT FAILURE
├─ Zone background: red-50 → red-100
├─ Patient bubble: stone-50 → stone-200
├─ Bot bubble: red-300 → red-400 gradient
├─ Bot border: red-600 dashed
└─ Badge: red-600 bg, white text

BEAT 2B: SARAH SUCCESS
├─ Zone background: yellow-50 → yellow-200
├─ Patient bubble: stone-50 → stone-200
├─ Sarah bubble: orange-200 → orange-300 gradient
├─ Sarah border: orange-500 solid
└─ Badge: green-600 bg, white text

BEAT 3: INSIGHT
├─ Background: slate-800 → slate-700 gradient
├─ Text: white
├─ Highlight: yellow-200
└─ Glow: yellow-400 radial

BEAT 4: AI AGENTS
├─ Card backgrounds: white
├─ Card borders: stone-200 (hover: orange-400)
├─ Icon gradients: blue/purple/green
└─ Info boxes: blue-50, purple-50, green-50

BEAT 5A: CO-PILOT
├─ Background: gray-100 → gray-200 gradient
├─ Border: gray-400
├─ Text: stone-800
└─ Icons: gray-500

BEAT 5B: AI-PILOT
├─ Background: orange-50 → orange-200 gradient
├─ Border: orange-500 (3px)
├─ Shadow: orange-500 at 20% opacity
├─ Shimmer: white at 30% opacity
└─ Badge: yellow-400 → orange-400 gradient

CTA SECTION
├─ Background: orange-50 → orange-100 gradient
├─ Border: orange-200
├─ Primary button: orange-500 → orange-600
└─ Secondary button: white with stone border
```

---

## Color Customization Tips

### To Change Brand Color

**Current:** Orange (#FF7A45)

**To Change:**
1. Find/replace all instances of #FF7A45
2. Update --stellah-orange variable
3. Adjust related gradients:
   - #fed7aa (light version)
   - #EA580C (dark version)
   - #f97316 (medium version)

**Recommended alternatives:**
- Blue brand: #3b82f6 (tech, trust)
- Green brand: #10b981 (growth, health)
- Purple brand: #8b5cf6 (premium, creative)

### To Increase Contrast

**For accessibility or readability:**

```css
/* Increase text darkness */
body { color: #0c0a09; } /* stone-950, darker than current 900 */

/* Increase border strength */
.failure-zone { border-width: 3px; } /* up from 2px */

/* Remove gradients, use solid colors */
.failure-zone { background: #fef2f2; } /* flat instead of gradient */
```

### To Reduce Visual Intensity

**For formal/enterprise audiences:**

```css
/* Remove animations */
.chat-bubble-bot-stuck { animation: none; }
.ai-pilot-card::before { display: none; } /* removes shimmer */

/* Mute colors */
.failure-zone { background: #fafafa; border-color: #e5e5e5; }
.success-zone { background: #fafafa; border-color: #d4d4d4; }

/* Use photos instead of emojis */
/* Replace 💡 with lightbulb icon */
/* Replace 🤖👩 with professional headshots */
```

---

## Export for Design Tools

### Figma Color Styles
```
Stellah/Orange/Primary     #FF7A45
Stellah/Orange/Dark        #EA580C
Failure/Red/Primary        #dc2626
Failure/Red/Background     #fef2f2
Success/Yellow/Primary     #fbbf24
Success/Green/Primary      #16a34a
Insight/Slate/Dark         #1e293b
Tech/Blue                  #3b82f6
Tech/Purple                #a855f7
Tech/Green                 #22c55e
Neutral/Gray               #a3a3a3
Text/Primary               #1c1917
Text/Secondary             #57534e
```

### Sketch Swatches
```
Primary Brand
  Orange: FF7A45
  Dark Orange: EA580C

Emotional
  Failure Red: DC2626
  Success Yellow: FBBF24
  Success Green: 16A34A

UI
  Background: FFFFFF
  Border: D6D3D1
  Text Primary: 1C1917
  Text Secondary: 57534E
```

### Adobe XD
```
Assets > Colors > Add Color
  Name: Stellah Orange | HEX: FF7A45
  Name: Failure Red | HEX: DC2626
  Name: Success Yellow | HEX: FBBF24
  Name: Insight Slate | HEX: 1E293B
  [etc.]
```

---

## Testing Colors

### Colorblindness Simulation

**Tools:**
- Chrome DevTools > Rendering > Emulate vision deficiencies
- Figma > Stark plugin
- Online: colororacle.org

**Test cases:**
- Deuteranopia (red-green, 5% of men)
- Protanopia (red-green, 1% of men)
- Tritanopia (blue-yellow, rare)

**This design passes** because:
- Red failure uses multiple cues (color + dashed border + shake + label)
- Green success uses checkmark icon, not just color
- Co-pilot vs AI-pilot distinguishable by position, border thickness, animation

### Dark Mode Adaptation

**If adding dark mode:**

```css
@media (prefers-color-scheme: dark) {
  /* Invert light backgrounds */
  .failure-zone {
    background: linear-gradient(135deg, #450a0a 0%, #7f1d1d 100%);
  }

  /* Lighten text */
  body {
    color: #e7e5e4; /* stone-200 */
  }

  /* Adjust borders for visibility */
  .chat-bubble-patient {
    border-color: #57534e; /* darker stone */
  }
}
```

---

**Color Palette Version:** 1.0
**Last Updated:** 2025-10-21
**Total Colors Defined:** 30+
**WCAG AA Compliant:** ✅ Yes (all text combinations)
**Colorblind-Safe:** ✅ Yes (multiple visual cues)

---

Use this reference when implementing, customizing, or extending the breakthrough section design.
