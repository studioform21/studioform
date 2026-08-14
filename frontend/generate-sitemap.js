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
    "cancellation",
    "accessibility",
    "changelog",
    "twilio-alternatives",
    "blog-admin",
    "admin",
    "blog"
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
    "ai-call-center-solutions",
    "how-to-build-ai-receptionist",
    "how-we-achieve-sub-800ms-conversational-latency-in-enterprise-voice-agents",
    "designing-domain-llms-for-telecom-finance-workflows",
    "gpt-5-reasoning-bands",
    "marathi-voice-agent-playbook",
    "rbi-ai-regulation",
    "how-to-build-a-production-ready-ai-agent-architecture-tools-memory-and-deployment"
];

const siteUrl = "https://studioform.app";
const today = new Date().toISOString().split("T")[0];

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

const addUrl = (route, lastmod = today, changefreq = "weekly", priority = "0.7") => {
    const routeUrl = route ? `${siteUrl}/${route}` : `${siteUrl}/`;
    xml += `  <url>\n`;
    xml += `    <loc>${routeUrl}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `  </url>\n`;
};

// Static routes
STATIC_ROUTES.forEach(r => {
    let freq = "weekly";
    let pri = "0.6";
    if (r === "") {
        freq = "daily";
        pri = "1.0";
    } else if (r === "pricing" || r === "case-studies" || r === "blog") {
        freq = "daily";
        pri = "0.8";
    } else if (["privacy", "terms", "refund", "shipping", "cancellation", "accessibility"].includes(r)) {
        freq = "monthly";
        pri = "0.3";
    }
    addUrl(r, today, freq, pri);
});

// Services
SERVICES.forEach(s => addUrl(`services/${s}`, today, "weekly", "0.9"));

// Industries
INDUSTRIES.forEach(i => addUrl(`industries/${i}`, today, "weekly", "0.8"));

// Case studies
CASE_STUDIES.forEach(c => addUrl(`case-studies/${c}`, today, "weekly", "0.8"));

// Resources
RESOURCES.forEach(res => addUrl(`resources/${res}`, today, "weekly", "0.7"));

// Blogs (only AI News, with their specific publication dates)
BLOGS.forEach(b => {
    let date = "2026-07-21"; // default fallback
    if (b === "how-to-build-ai-receptionist") {
        date = "2026-07-21";
    } else if (b === "how-we-achieve-sub-800ms-conversational-latency-in-enterprise-voice-agents" || b === "designing-domain-llms-for-telecom-finance-workflows") {
        date = "2026-07-22";
    } else if (b === "gpt-5-reasoning-bands") {
        date = "2026-02-08";
    } else if (b === "marathi-voice-agent-playbook") {
        date = "2026-01-06";
    } else if (b === "rbi-ai-regulation") {
        date = "2026-01-12";
    }
    addUrl(`ai-news/${b}`, date, "monthly", "0.7");
});

// Leaders
const LEADERS = ["pranjal-rai", "sarthak-choukse", "nehal-mishra"];
LEADERS.forEach(l => addUrl(`team/${l}`, today, "monthly", "0.6"));

xml += `</urlset>\n`;

const destPath = path.join(__dirname, "public", "sitemap.xml");
fs.writeFileSync(destPath, xml, "utf8");
console.log(`Successfully generated dynamic sitemap with ${STATIC_ROUTES.length + SERVICES.length + INDUSTRIES.length + CASE_STUDIES.length + RESOURCES.length + BLOGS.length + LEADERS.length} routes at ${destPath}`);
