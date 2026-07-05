const fs = require('fs');
const path = require('path');

const STATIC_ROUTES = [
    "",
    "pricing",
    "case-studies",
    "workshops",
    "ai-university",
    "about",
    "team",
    "contact",
    "ai-news",
    "docs",
    "privacy",
    "terms",
    "refund",
    "shipping",
    "cancellation"
];

const SERVICES = [
    "ai-agents",
    "voice-agents",
    "rag-chatbots",
    "llm-development",
    "ai-automation",
    "ai-consulting",
    "fine-tuning",
    "custom-ai"
];

const INDUSTRIES = [
    "healthcare",
    "real-estate",
    "ecommerce",
    "education",
    "finance",
    "manufacturing"
];

const CASE_STUDIES = [
    "ai-call-center",
    "hospital-chatbot",
    "whatsapp-automation"
];

const RESOURCES = [
    "prompts",
    "templates",
    "tools",
    "calculators"
];

const BLOGS = [
    "gpt-5-reasoning-bands",
    "marathi-voice-agent-playbook",
    "rbi-ai-regulation"
];

const siteUrl = "https://studio-form.app";
const today = new Date().toISOString().split("T")[0];

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

const addUrl = (route, priority = "0.8", freq = "weekly") => {
    xml += `  <url>\n`;
    xml += `    <loc>${siteUrl}${route ? "/" + route : ""}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${freq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `  </url>\n`;
};

// Static routes
STATIC_ROUTES.forEach(r => addUrl(r, r === "" ? "1.0" : "0.8", r === "" ? "daily" : "weekly"));

// Services
SERVICES.forEach(s => addUrl(`services/${s}`, "0.9", "weekly"));

// Industries
INDUSTRIES.forEach(i => addUrl(`industries/${i}`, "0.7", "weekly"));

// Case studies
CASE_STUDIES.forEach(c => addUrl(`case-studies/${c}`, "0.8", "weekly"));

// Resources
RESOURCES.forEach(res => addUrl(`resources/${res}`, "0.7", "weekly"));

// Blogs
BLOGS.forEach(b => {
    addUrl(`blog/${b}`, "0.8", "weekly");
    addUrl(`ai-news/${b}`, "0.8", "weekly");
});

xml += `</urlset>\n`;

const destPath = path.join(__dirname, "public", "sitemap.xml");
fs.writeFileSync(destPath, xml, "utf8");
console.log(`Successfully generated dynamic sitemap with ${STATIC_ROUTES.length + SERVICES.length + INDUSTRIES.length + CASE_STUDIES.length + RESOURCES.length + (BLOGS.length * 2)} routes at ${destPath}`);
