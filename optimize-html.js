#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Starting HTML optimization...\n');

// Read the HTML file
const inputFile = path.join(__dirname, 'index.html');
const outputFile = path.join(__dirname, 'index.html');

let html = fs.readFileSync(inputFile, 'utf8');
const originalSize = Buffer.byteLength(html, 'utf8');

console.log(`📄 Original file size: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);

// Step 1: Define SVG sprite symbols
const svgSprites = `
<!-- SVG Icon Sprites (optimized) -->
<svg style="display: none;" aria-hidden="true">
  <defs>
    <!-- Inbox/Treatment icon -->
    <symbol id="icon-inbox" viewBox="0 0 24 24">
      <path d="M2 6h20l-2 12H4z"></path>
      <path d="M8 14 2 8"></path>
      <path d="m16 14 6-6"></path>
    </symbol>

    <!-- Clock/Time icon -->
    <symbol id="icon-clock" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12,6 12,12 16,14"></polyline>
    </symbol>

    <!-- Location/Pin icon -->
    <symbol id="icon-location" viewBox="0 0 24 24">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </symbol>

    <!-- Sparkle/Star icon -->
    <symbol id="icon-sparkle" viewBox="0 0 24 24">
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
    </symbol>
  </defs>
</svg>
`;

// Step 2: Insert SVG sprites after <body> tag
const bodyTagMatch = html.match(/<body[^>]*>/);
if (bodyTagMatch) {
  const bodyTagEnd = bodyTagMatch.index + bodyTagMatch[0].length;
  html = html.slice(0, bodyTagEnd) + svgSprites + html.slice(bodyTagEnd);
  console.log('✅ Inserted SVG sprite definitions');
} else {
  console.error('❌ Could not find <body> tag');
  process.exit(1);
}

// Step 3: Replace inbox SVG icons with <use> references
const inboxSvgPattern = /<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1\.5" stroke-linecap="round" stroke-linejoin="round" class="([^"]+)"><path d="M2 6h20l-2 12H4z"><\/path><path d="M8 14 2 8"><\/path><path d="m16 14 6-6"><\/path><\/svg>/g;

let inboxCount = 0;
html = html.replace(inboxSvgPattern, (match, className) => {
  inboxCount++;
  return `<svg class="${className}"><use href="#icon-inbox"/></svg>`;
});
console.log(`✅ Replaced ${inboxCount} inbox icons`);

// Step 4: Replace clock SVG icons with <use> references
const clockSvgPattern = /<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1\.5" stroke-linecap="round" stroke-linejoin="round" class="([^"]+)"><circle cx="12" cy="12" r="10"><\/circle><polyline points="12,6 12,12 16,14"><\/polyline><\/svg>/g;

let clockCount = 0;
html = html.replace(clockSvgPattern, (match, className) => {
  clockCount++;
  return `<svg class="${className}"><use href="#icon-clock"/></svg>`;
});
console.log(`✅ Replaced ${clockCount} clock icons`);

// Step 5: Replace location SVG icons with <use> references
const locationSvgPattern = /<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1\.5" stroke-linecap="round" stroke-linejoin="round" class="([^"]+)"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0 Z"><\/path><circle cx="12" cy="10" r="3"><\/circle><\/svg>/g;

let locationCount = 0;
html = html.replace(locationSvgPattern, (match, className) => {
  locationCount++;
  return `<svg class="${className}"><use href="#icon-location"/></svg>`;
});
console.log(`✅ Replaced ${locationCount} location icons`);

// Step 6: Replace sparkle SVG icons with <use> references
const sparkleSvgPattern = /<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1\.5" stroke-linecap="round" stroke-linejoin="round" class="([^"]+)"><path d="M9\.937 15\.5A2 2 0 0 0 8\.5 14\.063l-6\.135-1\.582a\.5 \.5 0 0 1 0-\.962L8\.5 9\.936A2 2 0 0 0 9\.937 8\.5l1\.582-6\.135a\.5 \.5 0 0 1 \.963 0L14\.063 8\.5A2 2 0 0 0 15\.5 9\.937l6\.135 1\.582a\.5 \.5 0 0 1 0 \.962L15\.5 14\.063a2 2 0 0 0-1\.437 1\.437l-1\.582 6\.135a\.5 \.5 0 0 1-\.963 0z"><\/path><\/svg>/g;

let sparkleCount = 0;
html = html.replace(sparkleSvgPattern, (match, className) => {
  sparkleCount++;
  return `<svg class="${className}"><use href="#icon-sparkle"/></svg>`;
});
console.log(`✅ Replaced ${sparkleCount} sparkle icons`);

// Step 7: Add CSS class for calendar event initial state
const cssInsertionPattern = /\.blur-in-delay-2 { animation-delay: 0\.6s; }/;
const cssClassDefinition = `.calendar-event-initial { opacity: 0; transform: scale(0.98); }`;

if (cssInsertionPattern.test(html)) {
  html = html.replace(cssInsertionPattern, match => `${match}\n${cssClassDefinition}`);
  console.log('✅ Added .calendar-event-initial CSS class');
} else {
  console.log('⚠️ Could not find CSS insertion point - searching for alternative...');
  // Try alternative: insert before @keyframes
  const keyframesPattern = /@keyframes fadeInUp/;
  if (keyframesPattern.test(html)) {
    html = html.replace(keyframesPattern, match => `${cssClassDefinition}\n${match}`);
    console.log('✅ Added .calendar-event-initial CSS class (alternative location)');
  }
}

// Step 8: Replace inline styles with CSS class
// This needs to ADD the class to existing classes, not replace them
// Pattern matches the div with class attribute followed by style attribute
const eventPattern = /(<div class="[^"]+)(" style="opacity: 0; transform: scale\(0\.98\); )(left: [^;]+; top: [^;]+; width: [^;]+; height: [^;]+;)(")/g;

let styleCount = 0;
html = html.replace(eventPattern, (match, classStart, styleMiddle, positioning, styleEnd) => {
  styleCount++;
  // Add calendar-event-initial to existing classes and remove opacity/transform from inline styles
  return `${classStart} calendar-event-initial" style="${positioning}${styleEnd}`;
});
console.log(`✅ Added calendar-event-initial class to ${styleCount} calendar events`);

// Step 9: Write optimized HTML
fs.writeFileSync(outputFile, html, 'utf8');

const finalSize = Buffer.byteLength(html, 'utf8');
const savedBytes = originalSize - finalSize;
const savedPercentage = ((savedBytes / originalSize) * 100).toFixed(2);

console.log('\n📊 Optimization Results:');
console.log(`   Original size: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`   Optimized size: ${(finalSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`   Saved: ${(savedBytes / 1024).toFixed(2)} KB (${savedPercentage}%)`);
console.log('\n✨ Optimization complete!');
