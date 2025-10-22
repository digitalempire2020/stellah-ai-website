#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Minify HTML
function minifyHTML() {
    console.log('Minifying HTML...');
    let html = fs.readFileSync('index.html', 'utf8');
    const originalSize = html.length;

    // Remove comments (except IE conditionals)
    html = html.replace(/<!--(?!\[if).*?-->/gs, '');

    // Remove unnecessary whitespace between tags
    html = html.replace(/>\s+</g, '><');

    // Collapse multiple spaces to single space
    html = html.replace(/\s+/g, ' ');

    // Remove whitespace around = in attributes
    html = html.replace(/\s*=\s*/g, '=');

    // Remove quotes from simple attribute values where safe
    html = html.replace(/="([a-zA-Z0-9-_]+)"/g, '=$1');

    fs.writeFileSync('index.html', html);

    const newSize = html.length;
    const saved = originalSize - newSize;
    console.log(`✓ HTML minified: ${(originalSize/1024).toFixed(1)}KB → ${(newSize/1024).toFixed(1)}KB (saved ${(saved/1024).toFixed(1)}KB)`);
}

// Minify CSS
function minifyCSS() {
    console.log('Minifying CSS...');

    const cssFiles = ['output.css', 'style.css', 'leadconnector-form-branding.css'];

    cssFiles.forEach(file => {
        if (!fs.existsSync(file)) return;

        let css = fs.readFileSync(file, 'utf8');
        const originalSize = css.length;

        // Remove comments
        css = css.replace(/\/\*[\s\S]*?\*\//g, '');

        // Remove unnecessary whitespace
        css = css.replace(/\s+/g, ' ');
        css = css.replace(/\s*:\s*/g, ':');
        css = css.replace(/\s*;\s*/g, ';');
        css = css.replace(/\s*\{\s*/g, '{');
        css = css.replace(/\s*\}\s*/g, '}');
        css = css.replace(/\s*,\s*/g, ',');
        css = css.replace(/;\}/g, '}');

        fs.writeFileSync(file, css);

        const newSize = css.length;
        const saved = originalSize - newSize;
        console.log(`✓ ${file}: ${(originalSize/1024).toFixed(1)}KB → ${(newSize/1024).toFixed(1)}KB (saved ${(saved/1024).toFixed(1)}KB)`);
    });
}

// Add lazy loading to iframes
function addLazyLoading() {
    console.log('Adding lazy loading to iframes...');
    let html = fs.readFileSync('index.html', 'utf8');

    // Add loading="lazy" to iframes that don't have it
    const iframeRegex = /<iframe(?![^>]*loading=)([^>]*)>/g;
    let count = 0;
    html = html.replace(iframeRegex, (match, attrs) => {
        count++;
        return `<iframe${attrs} loading="lazy">`;
    });

    if (count > 0) {
        fs.writeFileSync('index.html', html);
        console.log(`✓ Added lazy loading to ${count} iframe(s)`);
    } else {
        console.log('✓ All iframes already have lazy loading');
    }
}

// Add resource hints for critical resources
function addResourceHints() {
    console.log('Adding resource hints...');
    let html = fs.readFileSync('index.html', 'utf8');

    // Check if resource hints already exist
    if (!html.includes('rel="preload" href="/output.css"')) {
        // Add preload for critical CSS
        const headEnd = html.indexOf('</head>');
        const preloads = `
<link rel="preload" href="/output.css" as="style">
<link rel="preload" href="/script.js" as="script">`;

        html = html.slice(0, headEnd) + preloads + html.slice(headEnd);
        fs.writeFileSync('index.html', html);
        console.log('✓ Added resource hints for critical files');
    } else {
        console.log('✓ Resource hints already present');
    }
}

// Main execution
console.log('🚀 Starting performance optimizations...\n');

try {
    addLazyLoading();
    addResourceHints();
    minifyHTML();
    minifyCSS();

    console.log('\n✅ All optimizations complete!');
} catch (error) {
    console.error('❌ Error during optimization:', error);
    process.exit(1);
}