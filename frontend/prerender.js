const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, 'build');
const SITEMAP_PATH = path.join(BUILD_DIR, 'sitemap.xml');
const INDEX_HTML_PATH = path.join(BUILD_DIR, 'index.html');
const SITE_URL = 'https://studioform.app';

// Helper to sanitize path for folder generation
const getRoutePath = (urlStr) => {
    try {
        const parsed = new URL(urlStr);
        return parsed.pathname;
    } catch (e) {
        return urlStr;
    }
};

// Custom SEO Database for Studio Form with full GEO & 500+ word static depth
const SEO_CONFIG = {
    "/": {
        title: "Studio Form | Custom Enterprise AI & Voice Agent Company",
        description: "Studio Form builds autonomous AI voice agents, domain LLMs, and custom automation workflows for enterprise scale with sub-800ms latency.",
        h1: "Studio Form — Custom Enterprise AI & Voice Agent Company",
        article: `
            <h2>What is Studio Form?</h2>
            <p>Studio Form is a premier enterprise artificial intelligence engineering company specializing in autonomous conversational AI voice agents, specialized domain LLMs, zero-hallucination Retrieval-Augmented Generation (RAG) pipelines, and custom agentic workflow automation. Founded in 2026 and operating from Scheme 78, Vijay Nagar, Indore, Madhya Pradesh, India for global enterprise clients, Studio Form has deployed over 10,000 automated agent workflows and 52 production voice agents operating across 15+ world languages and regional Indic dialects including Hindi, Marathi, Bengali, Tamil, and Telugu.</p>
            
            <h2>What Are Autonomous AI Voice Agents &amp; Contact Center Systems?</h2>
            <p>Autonomous AI voice agents from Studio Form are production-ready conversational telephony systems engineered to handle high-volume contact center workloads. Our voice agents execute inbound customer reception, appointment booking, outbound lead qualification campaigns, and real-time e-commerce order verification with sub-800ms conversational turn-taking response latency. Connected directly to enterprise telephony backbones including Twilio Elastic SIP Trunks, Vonage APIs, Exotel, or private SIP gateways, our voice systems achieve a 45% reduction in average call handling times, eliminate customer hold queues, and maintain 99.97% service availability across 10,000+ simultaneous call streams.</p>
            
            <h2>Why Choose Studio Form for Custom Domain LLMs &amp; Model Fine-Tuning?</h2>
            <p>Custom domain LLMs allow organizations to leverage generative artificial intelligence without exposing corporate IP or customer records to public third-party endpoints. Studio Form fine-tunes open-source and proprietary foundation models—including Claude, GPT-4, Llama 3, and Gemini—on isolated private VPC infrastructure. This ensures complete data privacy compliance under India's Digital Personal Data Protection (DPDP) Act of 2023 and global privacy standards. Our proprietary domain models are specialized for healthcare diagnostics, legal contract analysis, financial risk assessment, and logistics dispatch operations.</p>

            <h2>How Does Layout-Aware RAG Document Intelligence Work?</h2>
            <p>Standard text-chunking RAG systems fail when extracting information from complex tabular documents, scanned medical billing sheets, or corporate tax filings. Studio Form's layout-aware document parsers preserve visual structural hierarchy, extracting tables, key-value pairs, headers, and footers with 99.4% precision. Connected to secure vector databases including MongoDB Atlas, Pinecone, and Qdrant, our zero-hallucination RAG chatbots enforce role-based Access Control Lists (ACL) so users only retrieve document citations they are authorized to access.</p>
            
            <h2>How Does Enterprise AI Automation Drive Measurable ROI?</h2>
            <p>Enterprise AI automation replaces repetitive manual data entry, lead scoring, and support ticket routing with autonomous software workers. By integrating custom Claude skill packs, automated webhooks, and direct CRM connectors (Salesforce, HubSpot, SAP, Zoho), Studio Form enables enterprises to reduce operational seat overhead by up to 60% within 4 weeks of deployment. Explore our specialized solutions for <a href="/services/voice-agents">Voice Agents</a>, <a href="/services/rag-chatbots">RAG Chatbots</a>, <a href="/services/llm-development">LLM Development</a>, and <a href="/services/ai-automation">AI Automation</a>.</p>

            <h2>What Infrastructure Security &amp; Compliance Commitments Are Guaranteed?</h2>
            <p>Every Studio Form deployment guarantees isolated data sandboxing, zero third-party data logging, role-based access controls, automatic API rate limiting, and 24/7 dedicated engineering support. Enterprise contracts feature guaranteed 99.97% uptime service level agreements (SLAs), custom H100 GPU cluster hosting options, automated failover nodes, and complete proprietary code ownership.</p>
            
            <h2>Explore Our AI Services, Industry Solutions &amp; Case Studies</h2>
            <p>Discover how leading enterprises transform operations: review our transparent <a href="/pricing">Pricing &amp; Engagement Plans</a>, read real-world client results in our <a href="/case-studies">Case Studies</a>, evaluate our <a href="/twilio-alternatives">Twilio Alternatives Guide</a>, read technical API guidelines in our <a href="/docs">Developer Documentation</a>, examine industry solutions for <a href="/industries/healthcare">Healthcare AI</a>, learn about <a href="/about">Our Company</a>, get support on our <a href="/contact">Contact Page</a>, or trace product engine releases in our <a href="/changelog">Changelog</a>.</p>
        `,
        schema: {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "Organization",
                    "name": "Studio Form",
                    "url": "https://studioform.app",
                    "logo": "https://studioform.app/logo_dark.png",
                    "description": "Studio Form builds autonomous AI voice agents, domain LLMs, and custom automation workflows for enterprise scale.",
                    "sameAs": [
                        "https://www.linkedin.com/company/studioform",
                        "https://github.com/studioform",
                        "https://twitter.com/studioform"
                    ],
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "Indore HQ",
                        "addressLocality": "Indore",
                        "addressRegion": "Madhya Pradesh",
                        "postalCode": "452001",
                        "addressCountry": "IN"
                    }
                },
                {
                    "@type": "FAQPage",
                    "mainEntity": [
                        {
                            "@type": "Question",
                            "name": "What AI services does Studio Form provide?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Studio Form builds autonomous AI voice agents for call centers, private domain LLMs, layout-aware RAG chatbots, and enterprise automation workflows."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "What is the typical deployment latency for AI Voice Agents?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Our AI Voice Agents achieve conversational latency under 800ms on Twilio, Vonage, and SIP trunks with 99.97% service uptime."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "Is Studio Form compliant with data privacy laws?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Yes, Studio Form platforms are fully compliant with India's Digital Personal Data Protection (DPDP) Act of 2023 and feature private VPC deployment modes."
                            }
                        }
                    ]
                }
            ]
        }
    },
    "/pricing": {
        title: "Pricing & Plans | Enterprise AI & Voice Agents — Studio Form",
        description: "Explore Studio Form transparent pricing plans for enterprise AI voice agents, custom LLM fine-tuning, and RAG chatbots with 99.97% SLA.",
        h1: "Transparent Enterprise AI Pricing & Plans",
        article: `
            <h2>What Are Studio Form's Pricing Models?</h2>
            <p>Studio Form offers three transparent pricing tiers for enterprise AI deployments: Proof-of-Concept Pilot (starting for 2-week validation), Monthly Managed Retainer for continuous model optimization, and Custom Enterprise Contracts for dedicated private cloud infrastructure. Every plan includes guaranteed 99.97% uptime SLAs, custom Indic dialect tuning, and dedicated technical solutions architects.</p>

            <h2>Why Choose Dedicated Enterprise AI Plans?</h2>
            <p>Dedicated enterprise plans eliminate shared API rate limits and unexpected token bill spikes. By hosting private model instances and vector index endpoints, your organization gains predictable monthly billing, zero-retention data privacy guarantees under DPDP 2023, and direct engineering support for custom integrations.</p>

            <h2>How Do Voice Agent Telephony Costs Work?</h2>
            <p>Voice agent pricing combines model inference with telephony transport fees. Studio Form provides unified billing covering speech-to-text (ASR), streaming LLM generation, text-to-speech (TTS), and SIP carrier trunking, resulting in a predictable cost per successful call resolution—typically 60% lower than traditional call center agent seats.</p>

            <h2>What Features Are Included Across Pricing Tiers?</h2>
            <p>Starter plans include 1 active voice agent with 1,000 monthly call minutes and standard PDF document search. Growth plans expand to 3 active voice agents, 5,000 call minutes, 25 agentic automation workflows, and 8GB dedicated VRAM. Enterprise contracts feature unlimited voice call concurrency, fine-tuned H100 GPU clusters, on-premise VPC hosting, and custom SLA commitments.</p>

            <h2>How to Choose the Right Plan for Your Organization?</h2>
            <p>Review our <a href="/services/voice-agents">Voice Agent Capabilities</a>, evaluate client ROI in our <a href="/case-studies">Case Studies</a>, check developer guides in our <a href="/docs">Docs</a>, or reach out directly on our <a href="/contact">Contact Page</a> to schedule a call with our technical team.</p>
        `,
        schema: {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "WebPage",
                    "name": "Pricing & Plans — Studio Form",
                    "description": "Explore Studio Form transparent pricing plans for enterprise AI voice agents, custom LLM fine-tuning, and RAG chatbots with 99.97% SLA."
                },
                {
                    "@type": "FAQPage",
                    "mainEntity": [
                        {
                            "@type": "Question",
                            "name": "What pricing options are available?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "We offer Pilot Proof-of-Concept pricing, Monthly Retainer plans, and Custom Enterprise Contracts with dedicated SLAs."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "Are there hidden API or telephony charges?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "No, Studio Form provides transparent per-minute or per-agent flat pricing that includes ASR, LLM inference, TTS, and telephony."
                            }
                        }
                    ]
                }
            ]
        }
    },
    "/case-studies": {
        title: "AI Case Studies & Customer ROI Deployments | Studio Form",
        description: "Discover real-world enterprise AI case studies: 10,000+ call scale, 45% lower handling times, and 99.4% precision document extraction.",
        h1: "Enterprise AI Success Stories & Case Studies",
        article: `
            <h2>How Did an Automated Call Center Process 10,000+ Calls Daily?</h2>
            <p>In our high-volume logistics deployment in 2026, Studio Form deployed 52 autonomous voice agents to process inbound shipment tracking, delivery window rescheduling, and cash-on-delivery order verification. Operating across regional Indic dialects (Hindi, Marathi, Tamil, Bengali) and English, the autonomous voice system handled over 10,000 parallel calls daily, reducing average handling time by 45%, eliminating call center hold queues, and lowering Return-to-Origin (RTO) rates by 28%.</p>

            <h2>What Were the Results of Layout-Aware PDF Extraction in Healthcare?</h2>
            <p>For a multi-hospital health network processing complex patient records, Studio Form implemented a layout-aware document intelligence system. Unlike standard optical character recognition, our RAG pipeline parsed structured billing sheets, medical charts, and insurance claim forms with 99.4% tabular extraction precision. This saved clinical administrative teams over 120 hours per week while maintaining total HIPAA and DPDP Act compliance on private cloud nodes.</p>

            <h2>How Did E-Commerce WhatsApp Automation Boost Conversion Rates?</h2>
            <p>By connecting custom LLMs to e-commerce product catalogs and user transaction histories, Studio Form automated post-purchase customer notifications, order tracking inquiries, and personalized product recommendations over WhatsApp. The automated assistant achieved an 88% instant resolution rate and generated a 14% uplift in repeat purchases within 60 days of launch.</p>

            <h2>Explore Additional Resources & Technical Solutions</h2>
            <p>See detailed breakdown on our <a href="/services/voice-agents">Voice Agents Page</a>, test our <a href="/services/rag-chatbots">RAG Chatbots Platform</a>, check enterprise plans on our <a href="/pricing">Pricing Page</a>, or request a custom architectural review via our <a href="/contact">Contact Form</a>.</p>
        `,
        schema: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Case Studies — Studio Form"
        }
    },
    "/services/voice-agents": {
        title: "AI Voice Agents for Enterprise Telephony | Studio Form",
        description: "Deploy production AI voice agents with sub-800ms latency, Indic dialect support, and Twilio/SIP telephony. Studio Form powers 52+ voice agents.",
        h1: "AI Voice Agents Built for Enterprise Telephony",
        article: `
            <h2>What Are Studio Form AI Voice Agents?</h2>
            <p>Studio Form AI Voice Agents are production-ready autonomous conversational telephony systems engineered for inbound reception, outbound lead qualification, and transaction verification. Optimized for real-time turn-taking latency below 800ms, our voice agents integrate seamlessly with enterprise telephony providers like Twilio, Vonage, Exotel, and private SIP trunks with guaranteed 99.97% uptime.</p>

            <h2>How Do Indic Dialect Voice Agents Perform in Production?</h2>
            <p>Our voice engines are fine-tuned for code-mixing regional Indic languages (Hindi, Marathi, Tamil, Telugu, Bengali) with English technical terms. This enables natural conversations where callers switch accents or languages mid-sentence. In production call center environments handling over 10,000 daily calls, our voice agents sustain customer satisfaction ratings above 92% and cut operational agent seat costs by 60%.</p>

            <h2>Why Choose Studio Form over Standard CPaaS APIs?</h2>
            <p>Standard CPaaS primitives require software teams to manually stitch together separate speech-to-text, LLM prompt engineering, text-to-speech, and audio streaming endpoints. Studio Form delivers a fully integrated voice agent platform with built-in dialogue state management, call transfer fallback rules, live transcript logging, and direct CRM synchronization (Salesforce, HubSpot, Zoho).</p>

            <h2>What Security Standards Safeguard Voice Conversations?</h2>
            <p>Voice stream processing occurs within isolated VPC containers with end-to-end TLS encryption. All recorded audio payloads and transcripts are governed by strict data residency policies, aligning with India's Digital Personal Data Protection (DPDP) Act 2023 and global enterprise security mandates.</p>

            <h2>Next Steps & Related Products</h2>
            <p>Compare telephony options in our <a href="/twilio-alternatives">Twilio Alternatives Guide</a>, review transparent <a href="/pricing">Pricing Plans</a>, read client success stories in <a href="/case-studies">Case Studies</a>, check developer SDKs in <a href="/docs">Documentation</a>, or <a href="/contact">Book a Demo</a> with our solutions engineering team.</p>
        `,
        schema: {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "Service",
                    "name": "AI Voice Agents",
                    "provider": {
                        "@type": "Organization",
                        "name": "Studio Form"
                    }
                },
                {
                    "@type": "FAQPage",
                    "mainEntity": [
                        {
                            "@type": "Question",
                            "name": "What telephony providers are supported?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Studio Form voice agents integrate directly with Twilio, Vonage, Plivo, and enterprise SIP trunks."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "How fast is the voice response time?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Our voice pipeline achieves turn-taking response latency under 800ms for natural conversation flow."
                            }
                        }
                    ]
                }
            ]
        }
    },
    "/services/rag-chatbots": {
        title: "Enterprise RAG Chatbots & AI Document Search | Studio Form",
        description: "Secure zero-hallucination RAG chatbots trained on enterprise docs, databases, and PDFs with 99.4% tabular parsing accuracy.",
        h1: "Layout-Aware RAG Chatbots for Enterprise Data",
        article: `
            <h2>What Makes Layout-Aware RAG Chatbots Different?</h2>
            <p>Standard Retrieval-Augmented Generation (RAG) tools process documents as raw plain text, causing critical errors when reading financial tables, multi-column PDFs, and technical schematics. Studio Form's layout-aware parsing pipeline preserves visual hierarchy, extracting complex tables, headers, and footnotes with 99.4% precision to deliver factual, zero-hallucination answers.</p>

            <h2>How Is Enterprise Data Security Enforced in RAG Deployments?</h2>
            <p>Every Studio Form RAG instance incorporates fine-grained Access Control Lists (ACL). Users receive answer citations derived exclusively from documents they have explicit security authorization to inspect. Vector index databases (MongoDB Atlas, Pinecone, Qdrant) are deployed in private cloud environments with automated encryption at rest and in transit.</p>

            <h2>What Data Connectors Are Supported?</h2>
            <p>Our document intelligence pipelines connect out of the box with scanned PDF repositories, Notion workspaces, SQL databases (PostgreSQL, MySQL, Snowflake), Google Drive, Microsoft SharePoint, and custom API data streams. Data indexing runs asynchronously to keep information instantly search-ready.</p>

            <h2>How Does Hybrid Vector Search Eliminate Hallucinations?</h2>
            <p>By combining dense vector embeddings with sparse keyword search and reranking cross-encoders, Studio Form guarantees exact match accuracy for technical product codes, medical terms, and legal clauses while providing intuitive semantic query understanding.</p>

            <h2>Explore Enterprise AI Integrations</h2>
            <p>Learn about our <a href="/services/voice-agents">Voice Agent Platform</a>, check custom model hosting under <a href="/services/llm-development">LLM Development</a>, view plan details on our <a href="/pricing">Pricing Page</a>, or read customer implementations in our <a href="/case-studies">Case Studies</a>.</p>
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
    "/twilio-alternatives": {
        title: "Twilio Alternatives for AI Voice Telephony | Studio Form",
        description: "Evaluate Twilio alternatives for voice agents. Compare CPaaS APIs with Studio Form's full-stack autonomous AI telephony agents with sub-800ms latency.",
        h1: "Twilio Alternatives for Enterprise AI Voice Agents",
        article: `
            <h2>Why Are Enterprises Seeking Twilio Alternatives for AI Voice?</h2>
            <p>While Twilio provides robust CPaaS communication APIs for SMS and basic voice routing, building interactive voice agents requires an integrated stack—including streaming ASR, low-latency LLM orchestration, natural turn-taking, and neural TTS synthesis. Stitched API solutions introduce latency gaps over 1.5 seconds and complex multi-vendor maintenance.</p>

            <h2>How Does Studio Form Compare to CPaaS Telephony Providers?</h2>
            <p>Rather than replacing your trusted carrier infrastructure, Studio Form operates on top of existing telephony lines including Twilio Elastic SIP Trunks, Vonage, Exotel, or private SIP gateways. We deliver pre-built autonomous voice agents with turn-taking latency under 800ms, native Indic dialect support (Hindi, Marathi, Tamil, Telugu), and complete DPDP Act 2023 compliance out of the box.</p>

            <h2>What Is the Difference Between Developer Platforms and Enterprise Systems?</h2>
            <p>Developer platforms like Bland AI or Vapi offer API-first building blocks suited for quick prototypes. Studio Form is engineered for regulated enterprise contact centers, delivering complete multi-agent workflow orchestration, custom Indic dialect speech tuning, dedicated H100 GPU clusters, and hands-on solutions architecture support.</p>

            <h2>Key Performance Benchmarks & SLAs</h2>
            <p>Studio Form guarantees sub-800ms conversational latency, 99.97% uptime service level agreements, zero third-party data logging, and seamless CRM integrations with Salesforce, HubSpot, and Zoho.</p>

            <h2>Learn More About Our Telecom Solutions</h2>
            <p>Explore our <a href="/services/voice-agents">AI Voice Agents Service Page</a>, check transparent <a href="/pricing">Pricing Tiers</a>, examine client ROI in <a href="/case-studies">Case Studies</a>, or <a href="/contact">Schedule an Architecture Review</a> with our senior voice engineers.</p>
        `,
        schema: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Twilio Alternatives — Studio Form"
        }
    },
    "/docs": {
        title: "Documentation & API Integration Guide | Studio Form",
        description: "Technical documentation, API reference, webhook schemas, and deployment guides for Studio Form voice agents and RAG pipelines.",
        h1: "Studio Form Developer Documentation & API Reference",
        article: `
            <h2>How Do Developers Integrate Studio Form APIs?</h2>
            <p>Studio Form provides RESTful endpoints, real-time WebSocket streams, and official Python and Node.js SDKs for integrating autonomous voice agents, document ingestion pipelines, and custom Claude skill sets directly into web and mobile applications.</p>

            <h2>Where Can You Find Webhook and Event Schemas?</h2>
            <p>Our API documentation details complete JSON payload structures for call start events, call completion metrics, real-time audio transcript streaming, RAG vector query responses, and automated CRM sync triggers. All endpoints require TLS 1.3 encryption and API key authentication.</p>

            <h2>How to Configure Private VPC and On-Premise Hosts?</h2>
            <p>Enterprise documentation covers containerized Docker and Kubernetes deployments for private AWS, Azure, GCP, or on-premise GPU clusters, ensuring zero prompt or audio data leaves your internal network per DPDP 2023 guidelines.</p>
        `,
        schema: {
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "name": "Documentation — Studio Form"
        }
    },
    "/about": {
        title: "About Studio Form | Enterprise AI Systems Engineering",
        description: "Learn about Studio Form's mission to build production-ready autonomous systems, multilingual voice agents, and secure domain LLMs.",
        h1: "About Studio Form — Engineering the Fabric of Intelligence",
        article: `
            <h2>What Is Studio Form's Engineering Mission?</h2>
            <p>At Studio Form, we bridge the gap between academic AI advancements and production-ready enterprise execution. Headquartered in Indore, India, we build specialized voice agent telephony networks, domain-specific LLMs, and layout-aware document parsers engineered for 99.97% uptime.</p>

            <h2>How Does Studio Form Ensure Privacy & DPDP Compliance?</h2>
            <p>All Studio Form architectures align strictly with India's Digital Personal Data Protection (DPDP) Act of 2023 and global privacy standards. We offer isolated private cloud hostings where customer datasets, prompt histories, and voice recordings are never logged or exposed to third-party endpoints.</p>
        `,
        schema: {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About Studio Form"
        }
    },
    "/contact": {
        title: "Contact Studio Form | Enterprise AI Solution Architects",
        description: "Contact Studio Form technical solutions architects to schedule a demo of enterprise AI voice agents, RAG chatbots, and domain LLMs.",
        h1: "Start Your Enterprise AI Journey with Studio Form",
        article: `
            <h2>How Can You Partner with Studio Form?</h2>
            <p>Connect directly with our senior AI solutions architects to analyze legacy infrastructure, evaluate telephony requirements, and construct customized proof-of-concept timelines for your enterprise within 2 to 4 weeks.</p>

            <h2>Where Is Studio Form Headquartered?</h2>
            <p>Studio Form is headquartered in Scheme 78, Vijay Nagar, Indore, Madhya Pradesh, India (452010), serving enterprise clients globally with 24/7 dedicated engineering support.</p>
        `,
        schema: {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Studio Form"
        }
    },
    "/changelog": {
        title: "Product Changelog & Engine Releases | Studio Form",
        description: "Read the latest product updates, version releases, schema improvements, and feature updates from the Studio Form platform.",
        h1: "Studio Form Release Changelog & Engine Updates",
        article: `
            <h2>What Are the Latest Engine Version Updates?</h2>
            <p>Version 1.9.0 introduces automated build-time static prerendering, enhanced JSON-LD schemas, security header policies, and optimized turn-taking latency below 800ms for all voice agent deployments in 2026.</p>
        `,
        schema: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Changelog — Studio Form"
        }
    }
};

// Generic Fallbacks generator for dynamic routes
const getGenericSEO = (route, lastmod) => {
    const segments = route.split('/').filter(Boolean);
    const category = segments[0] || "";
    const slug = segments[1] || "";
    
    const titleCase = (s) => s.split('-').map(w => w.toUpperCase() === "AI" ? "AI" : w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const formattedName = titleCase(slug || category || "Solution");
    
    if (category === "services") {
        return {
            title: `${formattedName} Solutions & Automation | Studio Form`,
            description: `Deploy custom ${formattedName} solutions at enterprise scale. Optimize workloads, connect databases, and secure domain workflows with Studio Form.`,
            h1: `${formattedName} Enterprise Solutions`,
            article: `<h2>What Are Studio Form's ${formattedName} Services?</h2><p>Studio Form specializes in deploying secure, production-grade ${formattedName} systems. We integrate with existing CRM endpoints, databases, and telemetry streams to automate enterprise workloads with guaranteed 99.97% uptime.</p>`,
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
            title: `Enterprise AI for ${formattedName} | Studio Form`,
            description: `Explore custom AI voice agents, document intelligence models, and automated compliance architectures tailored for the ${formattedName} industry.`,
            h1: `Agentic AI & Voice Solutions for ${formattedName}`,
            article: `<h2>How Does AI Automation Transform the ${formattedName} Sector?</h2><p>Our platforms are custom-engineered to address industry-specific compliance, performance, and security challenges within ${formattedName}, delivering sub-800ms voice response times and zero-hallucination data extraction.</p>`,
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
            description: `Read technical analysis and engineering insights on ${formattedName} in conversational AI, voice assistants, and secure enterprise automation.`,
            h1: formattedName,
            article: `<h2>Technical Analysis: ${formattedName}</h2><p>Stay informed with the latest technical research on ${formattedName} and how key developments affect corporate model hosting decisions and agentic automation pipelines.</p>`,
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
    
    return {
        title: `${formattedName} | Studio Form`,
        description: `Explore ${formattedName} on the Studio Form enterprise AI platform. Deploy secure voice agents and layout-aware parsers.`,
        h1: formattedName,
        article: `<p>Learn about ${formattedName} and discover how Studio Form helps enterprises automate workflows safely with 99.97% service availability.</p>`,
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
        const lastmod = routeLastmods[route] || new Date().toISOString().split("T")[0];
        const config = SEO_CONFIG[route] || getGenericSEO(route, lastmod);
        const fullUrl = `${SITE_URL}${route === "/" ? "/" : route}`;
        
        let prerendered = baseHtml;
        
        // 1. Replace Title Tag
        prerendered = prerendered.replace(/<title>.*?<\/title>/i, `<title>${config.title}</title>`);
        
        // 2. Replace Meta Description
        const descMetaRegex = /<meta\s+name="description"\s+content=".*?"\s*\/?>/i;
        const newDescMeta = `<meta name="description" content="${config.description}" />`;
        if (descMetaRegex.test(prerendered)) {
            prerendered = prerendered.replace(descMetaRegex, newDescMeta);
        } else {
            prerendered = prerendered.replace('</head>', `  ${newDescMeta}\n</head>`);
        }
        
        // 3. Inject/Replace Canonical Tag (Self-referencing per route)
        const canonicalTag = `<link rel="canonical" href="${fullUrl}" />`;
        const canonicalRegex = /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i;
        if (canonicalRegex.test(prerendered)) {
            prerendered = prerendered.replace(canonicalRegex, canonicalTag);
        } else {
            prerendered = prerendered.replace('</head>', `  ${canonicalTag}\n</head>`);
        }

        // 4. Inject/Replace Open Graph Meta Tags
        const ogTags = [
            `<meta property="og:title" content="${config.title}" />`,
            `<meta property="og:description" content="${config.description}" />`,
            `<meta property="og:image" content="${SITE_URL}/og-image.png" />`,
            `<meta property="og:url" content="${fullUrl}" />`,
            `<meta property="og:type" content="website" />`
        ].join('\n    ');

        // Remove existing og: tags if present to prevent duplication
        prerendered = prerendered.replace(/<meta\s+property="og:.*?"\s+content=".*?"\s*\/?>\n?/gi, '');
        prerendered = prerendered.replace('</head>', `    ${ogTags}\n</head>`);
        
        // 5. Replace JSON-LD Schema
        const schemaString = `<script type="application/ld+json">\n    ${JSON.stringify(config.schema, null, 2).replace(/\n/g, '\n    ')}\n    </script>`;
        const schemaRegex = /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i;
        if (schemaRegex.test(prerendered)) {
            prerendered = prerendered.replace(schemaRegex, schemaString);
        } else {
            prerendered = prerendered.replace('</head>', `  ${schemaString}\n</head>`);
        }
        
        // 6. Replace Fallback Semantic Article
        const fallbackRegex = /<article>[\s\S]*?<\/article>/i;
        const newArticle = `<article>\n            <h1>${config.h1 || config.title}</h1>\n            ${config.article}\n          </article>`;
        prerendered = prerendered.replace(fallbackRegex, newArticle);
        
        // 7. Save file to target directory
        if (route === "/" || route === "") {
            fs.writeFileSync(INDEX_HTML_PATH, prerendered, 'utf8');
            console.log(`Prerendered root page: build/index.html`);
        } else {
            const cleanRoute = route.startsWith('/') ? route.slice(1) : route;
            const destDir = path.join(BUILD_DIR, cleanRoute);
            fs.mkdirSync(destDir, { recursive: true });
            fs.writeFileSync(path.join(destDir, 'index.html'), prerendered, 'utf8');
            console.log(`Prerendered page: build/${cleanRoute}/index.html`);
        }
    });
    
    console.log("Successfully completed prerendering process for all routes!");
}

main();
