const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, 'build');
const SITEMAP_PATH = path.join(BUILD_DIR, 'sitemap.xml');
const INDEX_HTML_PATH = path.join(BUILD_DIR, 'index.html');

// Helper to sanitize path for folder generation
const getRoutePath = (urlStr) => {
    const parsed = new URL(urlStr);
    return parsed.pathname;
};

// Custom SEO Database for Studio Form
const SEO_CONFIG = {
    "/": {
        title: "Studio Form | Custom Enterprise AI & Voice Agent Company",
        description: "Studio Form builds autonomous AI voice agents, domain LLMs, and custom automation workflows for enterprise scale.",
        h1: "Studio Form - Custom Enterprise AI & Voice Agent Company in Indore",
        article: `
            <h2>Autonomous AI Voice Agents & Contact Center Automation</h2>
            <p>Our flagship AI Voice Agents represent the state of the art in conversational telephony. Built with advanced Natural Language Understanding (NLU), they understand and communicate in major world languages as well as local Indic dialects like Hindi, Marathi, Bengali, and Tamil. We deploy inbound reception agents that handle appointment bookings and route complex customer inquiries, outbound qualifier systems that nurture leads directly from CRM platforms, and e-commerce transaction bots that verify orders to reduce Return-to-Origin (RTO) rates.</p>
            <h2>Custom LLM Development & Fine-Tuning</h2>
            <p>In the field of model training and fine-tuning, Studio Form helps organizations bypass public API restrictions. We train custom, private domain LLMs on secure infrastructure, ensuring customer datasets remain private and compliant with data residency acts. We optimize models like Claude, GPT-4, Llama 3, and Gemini to align with your proprietary data.</p>
        `,
        schema: {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Studio Form",
            "url": "https://www.studioform.app",
            "logo": "https://www.studioform.app/logo_dark.png",
            "description": "Studio Form builds autonomous AI voice agents, domain LLMs, and custom automation workflows for enterprise scale.",
            "sameAs": [
                "https://github.com/StudioForm",
                "https://linkedin.com/company/studioform"
            ],
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Indore HQ",
                "addressLocality": "Indore",
                "addressRegion": "Madhya Pradesh",
                "postalCode": "452001",
                "addressCountry": "IN"
            }
        }
    },
    "/pricing": {
        title: "Studio Form Pricing — AI Voice Agents & Custom LLM Plans",
        description: "Check out Studio Form's engagement models, plans, and pricing for enterprise AI voice agents, RAG pipelines, and custom LLM deployments.",
        h1: "Transparent Enterprise AI Pricing & Plans",
        article: `
            <h2>Enterprise Engagement Models</h2>
            <p>We provide transparent pricing structures for businesses looking to scale with AI automation. Our models include pilot programs for proof-of-concept testing, monthly retainer models for ongoing support and system upgrades, and project-based pricing for customized enterprise integrations.</p>
            <h2>Voice Agents & RAG Chatbots Pricing</h2>
            <p>Scale your contact centers and data retrieval pipelines. Our pricing accounts for telephony costs, model inference fees, custom dialect tuning (including Indic dialects), and dedicated database connections with 99.97% uptime guarantees.</p>
        `,
        schema: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Pricing — Studio Form",
            "description": "Check out Studio Form's engagement models, plans, and pricing for enterprise AI voice agents, RAG pipelines, and custom LLM deployments."
        }
    },
    "/case-studies": {
        title: "Studio Form Case Studies — AI Voice Agent & RAG Deployments",
        description: "Explore how Studio Form's custom voice agents, intelligent parsers, and fine-tuned LLMs drive measurable business ROI for enterprise clients.",
        h1: "Enterprise AI Success Stories & Case Studies",
        article: `
            <h2>Multilingual Telephony Success Stories</h2>
            <p>Read about our deployment of an automated AI call center that processed over 10,000 parallel calls in regional Indic dialects, reducing average handling time by 45% and maintaining customer satisfaction above 92%.</p>
            <h2>Layout-Aware Document Intelligence Case Study</h2>
            <p>How we implemented a layout-aware PDF parsing system for a healthcare provider, extracting complex tables from patient billing sheets with 99.4% accuracy and feeding the structured data into secure vector databases.</p>
        `,
        schema: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Case Studies — Studio Form"
        }
    },
    "/contact": {
        title: "Contact Studio Form — AI Automation for Enterprise",
        description: "Get in touch with Studio Form. Partner with us to deploy custom conversational AI voice agents, secure fine-tuned LLMs, and RAG systems.",
        h1: "Start Your Enterprise AI Automation Journey",
        article: `
            <h2>Partner with Studio Form</h2>
            <p>Schedule a call with our technical solutions architects to map out your company's automation roadmap. We analyze legacy systems, API capabilities, security parameters, and data compliance mandates to deliver secure agentic networks.</p>
            <h2>Indore Headquarters & Global Deployments</h2>
            <p>While headquartered in Indore, India, Studio Form serves enterprise clients globally. Reach out today for model evaluation scripts, custom voice demos, and implementation quotes.</p>
        `,
        schema: {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Us — Studio Form"
        }
    },
    "/about": {
        title: "About Studio Form — The Future of Enterprise AI Intelligence",
        description: "Learn about Studio Form's mission to design production-ready autonomous systems, multilingual voice agents, and secure domain LLMs.",
        h1: "Crafting the Fabric of Future Intelligence",
        article: `
            <h2>Our Core Mission</h2>
            <p>At Studio Form, we bridge the gap between academic AI advancements and production-ready enterprise execution. We specialize in layout-aware parsers, fine-tuned domain models, and voice agent telephony infrastructures that operate securely at scale.</p>
            <h2>DPDP Act Compliance & Security Standards</h2>
            <p>We build our platforms with security as a baseline. Fully aligned with the Digital Personal Data Protection (DPDP) Act of 2023, we ensure enterprise datasets remain secure, private, and isolated.</p>
        `,
        schema: {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About Us — Studio Form"
        }
    },
    "/changelog": {
        title: "Studio Form Product Changelog & Releases",
        description: "Stay up to date with the latest engine updates, dynamic schemas, security configurations, and feature releases from the Studio Form platform.",
        h1: "Studio Form Changelog & Updates",
        article: `
            <h2>Version 1.9.0 Engine Updates</h2>
            <p>Announcing version 1.9.0 of the Studio Form engine, including automated post-build sitemap compilations, dynamic schema structures, HTTP security response headers, and merchant compliance templates.</p>
        `,
        schema: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Changelog — Studio Form"
        }
    },
    "/services/voice-agents": {
        title: "Enterprise AI Voice Agents — Automated Call Center Telephony",
        description: "Deploy custom multilingual AI voice agents for inbound call routing, outbound qualification, and automated CRM updates with sub-second response latency.",
        h1: "Autonomous Enterprise AI Voice Agents",
        article: `
            <h2>Sub-Second Latency Telephony</h2>
            <p>Our voice agents use specialized Whisper-based speech recognition and custom streaming text-to-speech nodes to achieve conversational latency under 800ms. We optimize the audio pipelines for Twilio, Vonage, and SIP trunks.</p>
            <h2>Multilingual & Dialect Support</h2>
            <p>Deploy agents capable of code-mixing regional Indic dialects (Hindi, Marathi, Tamil, Telugu) with English, ensuring natural conversations for customer service, logistics dispatch, and payment verification.</p>
        `,
        schema: {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "AI Voice Agents",
            "provider": {
                "@type": "Organization",
                "name": "Studio Form"
            }
        }
    },
    "/services/rag-chatbots": {
        title: "Enterprise RAG Chatbots & Semantic Document Intelligence",
        description: "Secure, hallucination-free RAG chatbots trained on private databases, PDFs, Notion, and SQL. Layout-aware parsers extract complex tables with exact precision.",
        h1: "Layout-Aware RAG Chatbots for Enterprise",
        article: `
            <h2>Hallucination-Free Vector Search</h2>
            <p>We connect custom LLMs to secure vector databases (MongoDB Atlas, Pinecone, Qdrant) with metadata-level permission controls (ACL). This guarantees that users only see data they are authorized to access.</p>
            <h2>Document Layout Parsing</h2>
            <p>Our document intelligence pipelines parse tables, charts, and structured layouts from scanned PDFs, ensuring precise data retrieval for legal, financial, and healthcare operations.</p>
        `,
        schema: {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "RAG Chatbots",
            "provider": {
                "@type": "Organization",
                "name": "Studio Form"
            }
        }
    },
    "/industries/healthcare": {
        title: "Enterprise AI for Healthcare & Patient Data Intelligence",
        description: "Deploy secure, HIPAA-compliant AI voice agents and layout-aware document parsers to automate patient triage, billing sheets, and medical records.",
        h1: "Agentic AI & Document Intelligence in Healthcare",
        article: `
            <h2>HIPAA-Compliant Patient Portals</h2>
            <p>Automate patient scheduling and outbound follow-up calls with secure voice agents. All data is processed in isolated private cloud environments with zero public API logs.</p>
            <h2>Medical PDF Extraction</h2>
            <p>Extract clinical tables, treatment histories, and billing metrics from complex medical PDFs with 99.4% precision using layout-aware parser arrays.</p>
        `,
        schema: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "AI Solutions for Healthcare"
        }
    },
    "/ai-news/marathi-voice-agent-playbook": {
        title: "Building a Marathi Voice Agent: Playbook | Studio Form Insights",
        description: "An engineering playbook on building conversational voice agents in Marathi. Learn how to handle regional accents, code-mixed phrases, and sub-second TTS stream latency.",
        h1: "Building a Marathi Voice Agent: Playbook",
        article: `
            <h2>ASR & Accent Adaptation</h2>
            <p>Telephony agents in Maharashtra must interpret colloquial, code-mixed phrases (Marathi mixed with English terms). We fine-tune Whisper and Conformer models to map local dialect tokens accurately.</p>
            <h2>Streaming TTS Optimization</h2>
            <p>We stream audio payloads directly to Twilio using WebSockets, reducing TTS generation gaps below 800ms to keep conversational transitions smooth.</p>
        `,
        schema: {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "Building a Marathi Voice Agent: Playbook",
            "datePublished": "2026-01-06",
            "author": {
                "@type": "Organization",
                "name": "Studio Form"
            }
        }
    },
    "/ai-news/gpt-5-reasoning-bands": {
        title: "GPT-5 Launches with Reasoning Bands: Tech Deep-Dive",
        description: "A technical deep-dive into OpenAI's GPT-5 Reasoning Bands. Learn how compute-budget scaling at inference time impacts enterprise agentic workflows.",
        h1: "GPT-5 Launches with Reasoning Bands",
        article: `
            <h2>Inference-Time Compute Scaling</h2>
            <p>OpenAI's Reasoning Bands allow developers to allocate custom search and verification token budgets. This shifts validation loops inside the model container, improving accuracy on complex tasks.</p>
            <h2>Benchmarking Agentic Efficiency</h2>
            <p>We compare GPT-5's compute scaling against domain-specific fine-tuned models, outlining when to use general-purpose reasoning versus specialized low-latency endpoints.</p>
        `,
        schema: {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "GPT-5 Launches with Reasoning Bands",
            "datePublished": "2026-02-08",
            "author": {
                "@type": "Organization",
                "name": "Studio Form"
            }
        }
    },
    "/ai-news/rbi-ai-regulation": {
        title: "RBI's Draft AI Regulation: A Pragmatic BFSI Compliance Checklist",
        description: "A pragmatic compliance checklist for India's BFSI sector following the RBI draft guidelines on AI. Learn about data residency, model bias audits, and explainability.",
        h1: "RBI's Draft AI Regulation: A Pragmatic BFSI Checklist",
        article: `
            <h2>On-Premise Residency & Private VPCs</h2>
            <p>The RBI directives mandate local Indian geography data residency for all financial prompts and model logs. This requires moving to private VPCs and fine-tuned models.</p>
            <h2>Explainability & Credit Decisioning</h2>
            <p>Decisions assisted by AI models (such as loan pre-qualification) must have transparent trace logs of features and weights to satisfy regulatory compliance auditors.</p>
        `,
        schema: {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "RBI's Draft AI Regulation: A Pragmatic BFSI Checklist",
            "datePublished": "2026-01-12",
            "author": {
                "@type": "Organization",
                "name": "Studio Form"
            }
        }
    }
};

// Generic Fallbacks generator for dynamic routes (blogs, services, industries, resources)
const getGenericSEO = (route, lastmod) => {
    const segments = route.split('/').filter(Boolean);
    const category = segments[0] || "";
    const slug = segments[1] || "";
    
    // Format slug for title/heading: e.g. "ai-agents" -> "AI Agents"
    const titleCase = (s) => s.split('-').map(w => w.toUpperCase() === "AI" ? "AI" : w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    
    const formattedName = titleCase(slug || category);
    
    if (category === "services") {
        return {
            title: `${formattedName} Solutions & Automation — Studio Form`,
            description: `Implement custom ${formattedName} solutions at enterprise scale. Optimize workloads, connect legacy databases, and secure domain workflows.`,
            h1: `${formattedName} Enterprise Solutions`,
            article: `<h2>Customized ${formattedName} Integration</h2><p>Studio Form specializes in deploying secure, production-grade ${formattedName} systems. We integrate with your existing CRM, database, and telemetry endpoints to automate repetitive flows and drive ROI.</p>`,
            schema: {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": formattedName,
                "provider": {
                    "@type": "Organization",
                    "name": "Studio Form"
                }
            }
        };
    }
    
    if (category === "industries") {
        return {
            title: `Enterprise AI for ${formattedName} — Studio Form`,
            description: `Explore custom AI voice agents, document intelligence models, and automated compliance architectures tailored for the ${formattedName} industry.`,
            h1: `Agentic AI in ${formattedName}`,
            article: `<h2>Tailored Industry Solutions</h2><p>Our platforms are custom-built to address industry-specific compliance, performance, and security challenges within the ${formattedName} sector.</p>`,
            schema: {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": `AI Solutions for ${formattedName}`
            }
        };
    }
    
    if (category === "blog" || category === "ai-news") {
        return {
            title: `${formattedName} | Studio Form AI Insights`,
            description: `Read our latest analysis and technical guide on ${formattedName} in the field of conversational AI, voice assistants, and secure enterprise automation.`,
            h1: formattedName,
            article: `<h2>Technical Analysis & Overview</h2><p>Stay informed with the latest research on ${formattedName} and how these developments affect business automation pipelines and corporate model hosting decisions.</p>`,
            schema: {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": formattedName,
                "datePublished": lastmod,
                "author": {
                    "@type": "Organization",
                    "name": "Studio Form"
                }
            }
        };
    }
    
    // Default fallback
    return {
        title: `${formattedName} — Studio Form`,
        description: `Explore ${formattedName} on the Studio Form enterprise AI platform. Deploy secure voice agents and layout-aware parsers.`,
        h1: formattedName,
        article: `<p>Learn about ${formattedName} and discover how Studio Form helps enterprises automate their workflows safely.</p>`,
        schema: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": formattedName
        }
    };
};

function main() {
    console.log("Starting build-time prerender process...");
    
    if (!fs.existsSync(INDEX_HTML_PATH)) {
        console.error(`Error: Base index.html not found at: ${INDEX_HTML_PATH}. Run 'craco build' first.`);
        process.exit(1);
    }
    
    if (!fs.existsSync(SITEMAP_PATH)) {
        console.error(`Error: sitemap.xml not found at: ${SITEMAP_PATH}. Run 'node generate-sitemap.js' first.`);
        process.exit(1);
    }
    
    const baseHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf8');
    const sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf8');
    
    // Discover all URLs from sitemap and extract their lastmod dates
    const urlRegex = /<url>([\s\S]*?)<\/url>/g;
    let urlMatch;
    const routes = [];
    const routeLastmods = {};
    
    while ((urlMatch = urlRegex.exec(sitemapContent)) !== null) {
        const urlBlock = urlMatch[1];
        const locMatch = /<loc>(.*?)<\/loc>/.exec(urlBlock);
        const lastmodMatch = /<lastmod>(.*?)<\/lastmod>/.exec(urlBlock);
        
        if (locMatch) {
            const routePath = getRoutePath(locMatch[1]);
            routes.push(routePath);
            if (lastmodMatch) {
                routeLastmods[routePath] = lastmodMatch[1];
            }
        }
    }
    
    console.log(`Discovered ${routes.length} routes from sitemap.xml`);
    
    routes.forEach(route => {
        // Resolve configuration
        const lastmod = routeLastmods[route] || new Date().toISOString().split("T")[0];
        const config = SEO_CONFIG[route] || getGenericSEO(route, lastmod);
        const fullUrl = `https://www.studioform.app${route}`;
        
        let prerendered = baseHtml;
        
        // 1. Replace Title Tag
        prerendered = prerendered.replace(/<title>.*?<\/title>/i, `<title>${config.title}</title>`);
        
        // 2. Replace Meta Description
        const descMetaRegex = /<meta\s+name="description"\s+content=".*?"\s*\/?>/i;
        const newDescMeta = `<meta name="description" content="${config.description}" />`;
        if (descMetaRegex.test(prerendered)) {
            prerendered = prerendered.replace(descMetaRegex, newDescMeta);
        } else {
            // fallback inject before </head>
            prerendered = prerendered.replace('</head>', `  ${newDescMeta}\n</head>`);
        }
        
        // 3. Inject Canonical Tag
        const canonicalTag = `<link rel="canonical" href="${fullUrl}" />`;
        const canonicalRegex = /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i;
        if (canonicalRegex.test(prerendered)) {
            prerendered = prerendered.replace(canonicalRegex, canonicalTag);
        } else {
            prerendered = prerendered.replace('</head>', `  ${canonicalTag}\n</head>`);
        }
        
        // 4. Replace JSON-LD Schema
        const schemaString = `<script type="application/ld+json">\n    ${JSON.stringify(config.schema, null, 2).replace(/\n/g, '\n    ')}\n    </script>`;
        const schemaRegex = /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i;
        if (schemaRegex.test(prerendered)) {
            prerendered = prerendered.replace(schemaRegex, schemaString);
        } else {
            prerendered = prerendered.replace('</head>', `  ${schemaString}\n</head>`);
        }
        
        // 5. Replace Fallback Semantic Article
        const fallbackRegex = /<article>[\s\S]*?<\/article>/i;
        const newArticle = `<article>\n            <h1>${config.h1 || config.title}</h1>\n            ${config.article}\n          </article>`;
        prerendered = prerendered.replace(fallbackRegex, newArticle);
        
        // 6. Save file to target directory
        if (route === "/") {
            // Write directly to index.html
            fs.writeFileSync(INDEX_HTML_PATH, prerendered, 'utf8');
            console.log(`Prerendered root page: build/index.html`);
        } else {
            // Write to nested directory: e.g. build/pricing/index.html
            const destDir = path.join(BUILD_DIR, route);
            fs.mkdirSync(destDir, { recursive: true });
            fs.writeFileSync(path.join(destDir, 'index.html'), prerendered, 'utf8');
            console.log(`Prerendered page: build${route}/index.html`);
        }
    });
    
    console.log("Successfully completed prerendering process for all routes!");
}

main();
