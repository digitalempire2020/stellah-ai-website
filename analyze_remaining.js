const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Find all unique SVG patterns (excluding ones already in sprites)
const svgMatches = html.matchAll(/<svg[^>]*>(.*?)<\/svg>/gs);
const iconMap = new Map();

for (const match of svgMatches) {
  const full = match[0];
  const content = match[1];
  
  // Skip already optimized icons (ones using <use>)
  if (full.includes('<use href="#icon-')) continue;
  
  // Create a signature for the icon content
  const signature = content.replace(/\s+/g, ' ').trim();
  
  if (!iconMap.has(signature)) {
    iconMap.set(signature, { count: 0, sample: full });
  }
  iconMap.get(signature).count++;
}

// Sort by count
const sorted = Array.from(iconMap.entries())
  .sort((a, b) => b[1].count - a[1].count)
  .slice(0, 10);

console.log('Top 10 Most Repeated SVG Icons (not yet optimized):');
console.log('================================================\n');

let totalDuplicates = 0;
sorted.forEach(([sig, data], index) => {
  console.log(`#${index + 1}: ${data.count} instances`);
  // Show first 100 chars of the icon
  const preview = data.sample.substring(0, 150).replace(/\n/g, ' ');
  console.log(`Preview: ${preview}...`);
  console.log('---');
  totalDuplicates += data.count - 1;
});

console.log(`\nTotal duplicate icons that could be optimized: ${totalDuplicates}`);
console.log(`Total unique icon patterns found: ${iconMap.size}`);
