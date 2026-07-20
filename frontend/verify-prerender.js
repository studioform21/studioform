const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, 'build');

const TEST_ROUTES = [
    { route: '/', file: path.join(BUILD_DIR, 'index.html'), expectedCanonical: 'https://studioform.app/' },
    { route: '/pricing', file: path.join(BUILD_DIR, 'pricing', 'index.html'), expectedCanonical: 'https://studioform.app/pricing' },
    { route: '/services/voice-agents', file: path.join(BUILD_DIR, 'services', 'voice-agents', 'index.html'), expectedCanonical: 'https://studioform.app/services/voice-agents' },
    { route: '/services/rag-chatbots', file: path.join(BUILD_DIR, 'services', 'rag-chatbots', 'index.html'), expectedCanonical: 'https://studioform.app/services/rag-chatbots' },
    { route: '/case-studies', file: path.join(BUILD_DIR, 'case-studies', 'index.html'), expectedCanonical: 'https://studioform.app/case-studies' },
    { route: '/twilio-alternatives', file: path.join(BUILD_DIR, 'twilio-alternatives', 'index.html'), expectedCanonical: 'https://studioform.app/twilio-alternatives' }
];

console.log("=== VERIFYING PRERENDERED ROUTES & CANONICAL TAGS ===");

let passed = true;

TEST_ROUTES.forEach(({ route, file, expectedCanonical }) => {
    console.log(`\nChecking Route: ${route}`);
    console.log(`Target File: ${file}`);
    
    if (!fs.existsSync(file)) {
        console.error(`❌ FAIL: Pre-rendered HTML file does NOT exist at ${file}`);
        passed = false;
        return;
    }
    
    const content = fs.readFileSync(file, 'utf8');
    
    // Check canonical link
    const canonicalMatch = /<link\s+rel="canonical"\s+href="(.*?)"\s*\/?>/i.exec(content);
    if (!canonicalMatch) {
        console.error(`❌ FAIL: Canonical tag missing in ${route}`);
        passed = false;
    } else {
        const canonicalUrl = canonicalMatch[1];
        if (canonicalUrl === expectedCanonical) {
            console.log(`  ✓ Canonical Tag Match: ${canonicalUrl}`);
        } else {
            console.error(`❌ FAIL: Canonical mismatch for ${route}. Got ${canonicalUrl}, expected ${expectedCanonical}`);
            passed = false;
        }
    }

    // Check Open Graph Tags
    const ogImageMatch = /<meta\s+property="og:image"\s+content="(.*?)"\s*\/?>/i.exec(content);
    if (ogImageMatch) {
        console.log(`  ✓ OG Image: ${ogImageMatch[1]}`);
    } else {
        console.error(`❌ FAIL: OG Image tag missing in ${route}`);
        passed = false;
    }

    // Check word count of static article
    const articleMatch = /<article>([\s\S]*?)<\/article>/i.exec(content);
    if (articleMatch) {
        const text = articleMatch[1].replace(/<[^>]+>/g, ' ');
        const wordCount = text.trim().split(/\s+/).length;
        console.log(`  ✓ Static Article Word Count: ${wordCount} words`);
        if (wordCount < 150) {
            console.warn(`  ⚠️ WARNING: Article word count is low (${wordCount} words) for ${route}`);
        }
    } else {
        console.error(`❌ FAIL: No <article> block found in ${route}`);
        passed = false;
    }
});

if (passed) {
    console.log("\n✅ ALL ROUTE PRERENDER & CANONICAL VERIFICATIONS PASSED!");
} else {
    console.error("\n❌ VERIFICATION FAILED FOR ONE OR MORE ROUTES!");
    process.exit(1);
}
