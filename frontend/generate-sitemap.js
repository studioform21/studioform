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
    "gpt-5-reasoning-bands",
    "marathi-voice-agent-playbook",
    "rbi-ai-regulation"
];

const siteUrl = "https://studioform.app";
const today = new Date().toISOString().split("T")[0];

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

const addUrl = (route, lastmod = today) => {
    const routeUrl = route ? `${siteUrl}/${route}` : `${siteUrl}/`;
    xml += `  <url>\n`;
    xml += `    <loc>${routeUrl}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `  </url>\n`;
};

// Static routes
STATIC_ROUTES.forEach(r => addUrl(r));

// Services
SERVICES.forEach(s => addUrl(`services/${s}`));

// Industries
INDUSTRIES.forEach(i => addUrl(`industries/${i}`));

// Case studies
CASE_STUDIES.forEach(c => addUrl(`case-studies/${c}`));

// Resources
RESOURCES.forEach(res => addUrl(`resources/${res}`));

// Blogs (only AI News, with their specific publication dates)
BLOGS.forEach(b => {
    let date = "2026-07-21"; // default fallback
    if (b === "how-to-build-ai-receptionist") {
        date = "2026-07-21";
    } else if (b === "gpt-5-reasoning-bands") {
        date = "2026-02-08";
    } else if (b === "marathi-voice-agent-playbook") {
        date = "2026-01-06";
    } else if (b === "rbi-ai-regulation") {
        date = "2026-01-12";
    }
    addUrl(`ai-news/${b}`, date);
});

xml += `</urlset>\n`;

const destPath = path.join(__dirname, "public", "sitemap.xml");
fs.writeFileSync(destPath, xml, "utf8");
console.log(`Successfully generated dynamic sitemap with ${STATIC_ROUTES.length + SERVICES.length + INDUSTRIES.length + CASE_STUDIES.length + RESOURCES.length + BLOGS.length} routes at ${destPath}`);
