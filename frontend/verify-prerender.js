const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, 'build');
const SITEMAP_PATH = path.join(BUILD_DIR, 'sitemap.xml');

if (!fs.existsSync(SITEMAP_PATH)) {
    console.error("Error: sitemap.xml not found in build/");
    process.exit(1);
}

const sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf8');
const urlRegex = /<loc>(.*?)<\/loc>/g;
let match;
const routes = [];

while ((match = urlRegex.exec(sitemapContent)) !== null) {
    const fullUrl = match[1];
    const parsed = new URL(fullUrl);
    routes.push({
        url: fullUrl,
        routePath: parsed.pathname
    });
}

console.log(`=== VERIFYING ALL ${routes.length} PRERENDERED ROUTES & CANONICAL TAGS ===\n`);

let totalPassed = 0;
let totalFailed = 0;

routes.forEach(({ url, routePath }) => {
    let filePath;
    if (routePath === "/" || routePath === "") {
        filePath = path.join(BUILD_DIR, "index.html");
    } else {
        const clean = routePath.startsWith('/') ? routePath.slice(1) : routePath;
        filePath = path.join(BUILD_DIR, clean, "index.html");
    }

    if (!fs.existsSync(filePath)) {
        console.error(`❌ FAIL [${routePath}]: File does NOT exist at ${filePath}`);
        totalFailed++;
        return;
    }

    const html = fs.readFileSync(filePath, 'utf8');

    // Canonical test (normalize trailing slashes)
    const norm = (u) => u ? (u.endsWith('/') ? u : u + '/') : '';
    const canonicalMatch = /<link\s+rel="canonical"\s+href="(.*?)"\s*\/?>/i.exec(html);
    const canonicalOk = canonicalMatch && norm(canonicalMatch[1]) === norm(url);

    // OG Image test
    const ogImageMatch = /<meta\s+property="og:image"\s+content="(.*?)"\s*\/?>/i.exec(html);
    const ogOk = ogImageMatch && ogImageMatch[1] === "https://studioform.app/og-image.png";

    // Article word count test
    const articleMatch = /<article>([\s\S]*?)<\/article>/i.exec(html);
    let wordCount = 0;
    if (articleMatch) {
        const text = articleMatch[1].replace(/<[^>]+>/g, ' ');
        wordCount = text.trim().split(/\s+/).length;
    }

    if (canonicalOk && ogOk && wordCount > 30) {
        console.log(`✓ [${routePath.padEnd(45)}] WordCount: ${String(wordCount).padStart(3)} | Canonical: OK`);
        totalPassed++;
    } else {
        console.error(`❌ FAIL [${routePath}]: Canonical: ${canonicalMatch ? canonicalMatch[1] : 'NONE'}, OG: ${ogOk}, Words: ${wordCount}`);
        totalFailed++;
    }
});

console.log(`\n==================================================`);
console.log(`VERIFICATION SUMMARY: ${totalPassed}/${routes.length} PASSED, ${totalFailed} FAILED`);
console.log(`==================================================`);

if (totalFailed > 0) {
    process.exit(1);
}
