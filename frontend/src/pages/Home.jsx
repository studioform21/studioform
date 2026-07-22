import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Package, Mic2, GraduationCap, Zap, Brain, MessageCircle, FlaskConical, Newspaper, Shield } from "lucide-react";
import Marquee from "@/components/Marquee";
import TerminalLabel from "@/components/TerminalLabel";
import StatCounter from "@/components/StatCounter";
import CodeCard, { Cmt, Kw, Str } from "@/components/CodeCard";
import SectionHeader from "@/components/SectionHeader";
import ComparisonTable from "@/components/ComparisonTable";
import ProcessSteps from "@/components/ProcessSteps";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import CTASection from "@/components/CTASection";
import SEOMeta from "@/components/SEOMeta";
import AgentDesignStudio from "@/components/AgentDesignStudio";
import { fadeUp, stagger } from "@/lib/anim";

const ECOSYSTEM = [
    { icon: Package, count: "SaaS Modules", title: "AI SaaS Platforms", desc: "Enterprise-ready AI app templates across healthcare, logistics, aviation, real estate, and finance.", tags: ["Health", "Logi", "Avia", "Fin", "Real", "Edu"], to: "/services/ai-agents" },
    { icon: Mic2, count: "5+ Active Pilots", title: "AI Voice Agents", desc: "Multilingual voice agents in regional Indic dialects — inbound, outbound, bilingual.", tags: ["EN", "HI", "MR", "TE"], to: "/services/voice-agents" },
    { icon: Brain, count: "4+ Custom Models", title: "Domain LLM", desc: "Custom LLMs fine-tuned for aviation, legal, healthcare, finance and more.", tags: ["Domain", "Tuned"], to: "/services/llm-development" },
    { icon: MessageCircle, count: "Layout-Aware", title: "RAG Chatbots", desc: "Secure, permission-aware chatbots that talk to your enterprise PDFs, documents, Notion, and databases.", tags: ["Notion", "SQL", "ACL"], to: "/services/rag-chatbots" },
    { icon: Zap, count: "Custom Loops", title: "AI Automations", desc: "Agentic automation workflows connecting CRMs, databases, and communication channels. Pick one, we deploy it.", tags: ["n8n", "Make", "Python"], to: "/services/ai-automation" },
    { icon: Shield, count: "Custom Packs", title: "Claude Skills", desc: "Custom Claude skill packs for enterprise automation and agentic workflows.", tags: ["Agents"], to: "/services/custom-ai" },
    { icon: GraduationCap, count: "Engineer-Led", title: "AI & ML Workshops", desc: "Hands-on, engineer-led workshops to help your teams design, build, and deploy modern AI systems.", tags: ["Agents", "RAG", "Eval"], to: "/workshops" },
    { icon: Newspaper, count: "Media", title: "AI News & Media", desc: "Studio Form Media House — latest AI industry news, insights, and analysis.", tags: ["Daily"], to: "/ai-news" },
];

const COMP_ROWS = [
    { label: "Approach", others: "PowerPoint consultants. Slides over systems.", ours: "Product builders. We ship working AI — not decks." },
    { label: "Platforms", others: "1–2 niche tools, half-baked MVPs.", ours: "Custom SaaS templates across healthcare, logistics, aviation, real estate, and finance." },
    { label: "Voice AI", others: "Basic bots with robotic voices.", ours: "Active voice agent pilots in regional Indic dialects and English with natural conversation flows." },
    { label: "RAG Chatbots", others: "Out-of-the-box templates that hallucinate.", ours: "Zero-hallucination, permission-aware chatbots connected to your docs." },
    { label: "Automations", others: "A handful of templates, mostly broken.", ours: "Production-ready agentic automation workflows built to connect your apps." },
    { label: "Domain LLM", others: "Generic GPT wrappers, no domain knowledge.", ours: "Domain LLM fine-tuned for aviation, healthcare, legal, finance." },
    { label: "Workshops", others: "A YouTube playlist.", ours: "Hands-on, engineer-led workshops to upskill your product & engineering teams." },
    { label: "Pricing", others: "$50K+ annual contracts, long cycles.", ours: "Pick a platform, customize, deploy — at a cost you'll love." },
    { label: "Speed", others: "6–12 months to see anything.", ours: "Concept to deployed AI in 2–4 weeks." },
];

const STEPS = [
    { tag: "DISCOVER", title: "Browse & Choose", body: "Explore our catalog of automation workflows, voice agent architectures, or SaaS platforms. Find what fits." },
    { tag: "CUSTOMIZE", title: "We Tailor It", body: "Our team customizes the solution for your industry, data, workflows, and scale. No templates." },
    { tag: "DEPLOY", title: "Go Live", body: "Deployed on your infra or ours. Trained, tested, monitored. You get a working AI system." },
];

const INDUSTRIES = [
    ["Logistics & Transport", 10], ["Aviation & Travel", 9], ["Real Estate", 4], ["Healthcare", 6],
    ["Education", 5], ["HR & Recruitment", 3], ["Food & Lifestyle", 3], ["AI Tools & Platforms", 13],
    ["Finance & Ops", 4], ["Automation & Workflows", 2], ["Data & Analytics", 3], ["Vehicle & Auto", 2],
    ["Legal", 1], ["Government", 2],
];

const TESTIMONIALS = [
    { quote: "Studio Form delivered our voice agent system in 2 weeks. It handles 500+ calls/day flawlessly.", name: "Operations Director", role: "Logistics Group, Mumbai" },
    { quote: "The automation catalog is incredible. We found exactly what we needed and had it deployed in days.", name: "CTO", role: "Healthcare Startup" },
    { quote: "Best AI training our team has ever had. Practical, deep, and immediately applicable.", name: "Dean of Engineering", role: "Tier-1 University" },
    { quote: "Concept to deployed AI product in 3 weeks. The speed and quality are unmatched.", name: "Founder", role: "PropTech Platform" },
    { quote: "Their aviation LLM understands ops terminology better than any generic model we've tested.", name: "VP Technology", role: "Regional Airline" },
];

const MARQUEE_ITEMS = [
    "Studio Form — India's full-stack agentic AI company",
    "Production-ready AI automation workflows",
    "Conversational voice agents across regional dialects",
    "Domain LLMs for aviation, healthcare, legal, finance",
    "Private VPC and secure on-premise deployments",
    "Concept to validated pilot in 2–4 weeks",
];

const HOME_STRUCTURED_DATA = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Organization",
            "@id": "https://www.studioform.app/#organization",
            "name": "Studio Form",
            "url": "https://www.studioform.app",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.studioform.app/logo_dark.png",
                "caption": "Studio Form Logo"
            },
            "description": "India's pioneering agentic AI company. We build autonomous AI agents, voice systems, domain LLMs, and automation workflows that actually ship.",
            "email": "legal@studioform.app",
            "telephone": "+917314086183",
            "foundingDate": "2024-03-21",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Scheme 78, Vijay Nagar",
                "addressLocality": "Indore",
                "addressRegion": "Madhya Pradesh",
                "postalCode": "452010",
                "addressCountry": "IN"
            },
            "founder": [
                {
                    "@type": "Person",
                    "name": "Pranjal Rai"
                },
                {
                    "@type": "Person",
                    "name": "Sarthak Choukse"
                }
            ],
            "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "legal@studioform.app",
                "telephone": "+917314086183"
            },
            "sameAs": [
                "https://github.com/studioform",
                "https://x.com/Studio_Form_",
                "https://www.linkedin.com/company/studioform",
                "https://www.crunchbase.com/organization/studioform",
                "https://www.producthunt.com/products/studio-form"
            ]
        },
        {
            "@type": "ProfessionalService",
            "@id": "https://www.studioform.app/#service",
            "name": "Studio Form",
            "image": "https://www.studioform.app/logo_dark.png",
            "description": "AI engineering studio building voice agents, custom domain LLMs, RAG pipelines, and enterprise AI automation.",
            "url": "https://www.studioform.app",
            "telephone": "+917314086183",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Scheme 78, Vijay Nagar",
                "addressLocality": "Indore",
                "addressRegion": "Madhya Pradesh",
                "postalCode": "452010",
                "addressCountry": "IN"
            },
            "areaServed": ["IN", "US", "Global"],
            "serviceType": ["AI Voice Agents", "RAG Chatbots", "LLM Development", "AI Automation"]
        },
        {
            "@type": "WebSite",
            "@id": "https://www.studioform.app/#website",
            "url": "https://www.studioform.app",
            "name": "Studio Form",
            "description": "Building the Fabric of Future Intelligence. India's pioneering agentic AI company.",
            "publisher": {
                "@id": "https://www.studioform.app/#organization"
            },
            "potentialAction": {
                "@type": "SearchAction",
                "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://www.studioform.app/services/ai-agents?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
            }
        }
    ]
};

export default function Home() {
    return (
        <div>
            <SEOMeta
                title="Studio Form | Custom Enterprise AI & Voice Agent Company"
                description="Studio Form builds autonomous AI voice agents, domain LLMs, and custom automation workflows for enterprise scale with sub-800ms latency."
                keywords="AI company, agentic AI, AI voice agents, domain LLM, RAG chatbots, AI automation, Studio Form"
                canonicalUrl="https://studioform.app/"
                structuredData={HOME_STRUCTURED_DATA}
                faqs={[
                    { q: "What AI services does Studio Form provide?", a: "Studio Form builds autonomous AI voice agents for call centers, private domain LLMs, layout-aware RAG chatbots, and enterprise automation workflows." },
                    { q: "What is the typical deployment latency for AI Voice Agents?", a: "Our AI Voice Agents achieve low conversational turn-taking latency of sub-800ms on Twilio, Vonage, and SIP trunks with SLA-backed service uptime." },
                    { q: "Is Studio Form compliant with data privacy laws?", a: "Yes, Studio Form platforms are fully compliant with India's Digital Personal Data Protection (DPDP) Act of 2023 and feature private VPC deployment modes." },
                    { q: "What is a domain-specific LLM and how is it fine-tuned?", a: "A domain-specific LLM is a model pre-trained on specialized industry datasets (e.g., aviation logs, Indian laws). Studio Form fine-tunes these models on private GPU servers to ensure zero hallucinations and absolute terminology accuracy." },
                    { q: "How does Studio Form integrate voice agents with existing CRM tools?", a: "Our voice agents use native integrations and custom API webhooks to sync call records, schedule calendar slots, and update customer profiles in CRM systems like Salesforce, HubSpot, and Zoho." },
                    { q: "Does Studio Form support regional Indic languages?", a: "Yes, our speech engines support over 15 Indian languages, including Hindi, Marathi, Bengali, Tamil, and Telugu, with high accuracy for code-mixed speech." }
                ]}
            />
            <Marquee items={MARQUEE_ITEMS} />

            {/* HERO */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-50" />
                <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-brand-orange/12 blur-[140px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/[0.03] blur-[120px] rounded-full" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 grid lg:grid-cols-12 gap-10 items-center">
                    <div className="lg:col-span-7">
                        <motion.div {...fadeUp}><TerminalLabel command="studioform --status" /></motion.div>
                        <motion.h1 {...fadeUp} transition={{ delay: 0.05, duration: 0.5 }} className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight">
                            Building the<br />
                            <span className="text-brand-orange">Fabric of Future</span><br />
                            Intelligence.
                        </motion.h1>
                        <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="mt-6 text-lg text-white/65 max-w-xl leading-relaxed">
                            India's pioneering agentic AI company. Headquartered in Indore, we build autonomous AI agents, voice systems, domain LLMs, and automation workflows that actually ship.
                        </motion.p>
                        
                        {/* AEO/GEO direct answer block */}
                        <motion.div {...fadeUp} transition={{ delay: 0.12 }} className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs sm:text-sm text-white/80 max-w-xl leading-relaxed shadow-lg">
                            <span className="font-mono text-brand-orange font-bold mr-1.5">[TL;DR]</span>
                            Studio Form builds autonomous AI voice agents, domain LLMs, and custom automation workflows for enterprises to automate operations. Our systems achieve sub-800ms conversational turn-taking latency, offer private VPC deployments, and support regional Indic dialects with full DPDP Act compliance.
                        </motion.div>
                        <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="mt-8 flex flex-wrap gap-3">
                            <Link to="/services/ai-agents" className="px-6 py-3 rounded-full bg-brand-orange text-black font-medium text-sm hover:brightness-110 transition inline-flex items-center gap-2" data-testid="hero-cta-products">
                                Explore Services <ArrowRight size={16} />
                            </Link>
                            <Link to="/contact" className="px-6 py-3 rounded-full border border-white/15 text-white font-medium text-sm hover:border-brand-orange hover:text-brand-orange transition" data-testid="hero-cta-demo">
                                Book a Demo
                            </Link>
                        </motion.div>

                        <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="mt-12 grid grid-cols-1 lg:grid-cols-4 gap-6">
                            <StatCounter testid="hero-stat-projects" value={15} suffix="+" label="Pilot Projects" />
                            <StatCounter testid="hero-stat-voice" value={5} suffix="+" label="Voice Agents" />
                            <StatCounter testid="hero-stat-courses" value={25} suffix="+" label="Workflows" />
                            <StatCounter testid="hero-stat-industries" value={5} suffix="+" label="Indic Dialects" />
                        </motion.div>

                    </div>

                    <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="lg:col-span-5">
                        <CodeCard filename="studioform-core.tsx">
                            <div><Cmt>// Studio Form system status</Cmt></div>
                            <div className="mt-2"><Kw>const</Kw> platform = {"{"}</div>
                            <div className="pl-6">pilots: <Str>"15+ active"</Str>,</div>
                            <div className="pl-6">voices: <Str>"5 active"</Str>,</div>
                            <div className="pl-6">llms: <Str>"4 domain models"</Str>,</div>
                            <div className="pl-6">uptime: <Str>"SLA backed"</Str>,</div>
                            <div className="pl-6">status: <Str>"● operational"</Str></div>
                            <div>{"};"}</div>
                            <div className="mt-4 space-y-1 text-white/60">
                                <div>{"> Initializing agentic mesh..."}</div>
                                <div>{"> Voice agents:"} <span className="text-brand-orange">ONLINE</span></div>
                                <div>{"> LLM inference:"} <span className="text-brand-orange">ACTIVE</span></div>
                                <div>{"> System:"} <span className="text-brand-orange">ALL GREEN ✓</span></div>
                            </div>
                        </CodeCard>
                    </motion.div>
                </div>
            </section>

            {/* TRUST */}
            <section className="border-y border-white/10 bg-white/[0.02] py-8">
                <div className="text-center font-mono text-xs uppercase text-white/40 mb-4">Trusted by enterprises &amp; institutions</div>
                <Marquee items={["Top Universities of India", "Leading Logistics Companies", "Enterprise Healthcare Groups", "Real Estate Conglomerates", "Government Institutions", "Indian Aviation Operators"]} />
            </section>

            {/* ECOSYSTEM */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <SectionHeader command="studioform --products" title="The AI" accentInTitle="Ecosystem" subtitle="Everything an enterprise needs to become AI-native. Built in India, deployed globally." />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {ECOSYSTEM.map((c, i) => {
                        const Icon = c.icon;
                        return (
                            <motion.div key={c.title} {...stagger(i)}>
                                <Link to={c.to} className="glass-card p-6 h-full flex flex-col group" data-testid={`ecosystem-${c.title.replace(/s+/g, '-').toLowerCase()}`}>
                                    <div className="flex items-start justify-between">
                                        <div className="w-10 h-10 rounded-xl bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center text-brand-orange"><Icon size={18} /></div>
                                        <span className="px-2 py-1 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[10px] text-white/60">{c.count}</span>
                                    </div>
                                    <h3 className="mt-5 font-display text-xl font-bold group-hover:text-brand-orange transition-colors">{c.title}</h3>
                                    <p className="mt-2 text-sm text-white/60 flex-1">{c.desc}</p>
                                    <div className="mt-4 flex flex-wrap gap-1.5">
                                        {c.tags.map(t => <span key={t} className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[10px] text-white/70">{t}</span>)}
                                    </div>
                                    <div className="mt-4 inline-flex items-center gap-1 text-xs text-brand-orange font-mono opacity-0 group-hover:opacity-100 transition-opacity">explore <ArrowRight size={12} /></div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* PROCESS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <SectionHeader command="studioform --workflow" title="How do we build and deploy" accentInTitle="your custom AI?" subtitle="Three steps. Zero fluff." />
                <ProcessSteps steps={STEPS} />
            </section>

            {/* CORE GEO/AEO Q&A SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/10">
                <SectionHeader command="studioform --core-qa" title="Core Technology" accentInTitle="Q&A" subtitle="Straight answers to critical enterprise AI questions." />
                <div className="mt-10 grid gap-8 md:grid-cols-3">
                    <div className="glass-card p-6">
                        <h3 className="font-display text-xl font-bold text-white mb-3">What are autonomous AI voice agents?</h3>
                        <p className="text-sm font-semibold text-brand-orange mb-2">Autonomous voice agents are conversational AI systems that handle telephone calls natively, understanding spoken intent and executing real-time actions.</p>
                        <p className="text-xs text-white/60 leading-relaxed">Unlike simple IVRs, Studio Form voice agents process natural speech, regional Indic dialects, and code-mixed inputs. They integrate directly into CRMs and calendars to execute bookings, qualify leads, and verify orders without human intervention, maintaining 24/7 coverage with zero queues.</p>
                    </div>
                    <div className="glass-card p-6">
                        <h3 className="font-display text-xl font-bold text-white mb-3">How does Studio Form achieve sub-800ms turn-taking latency?</h3>
                        <p className="text-sm font-semibold text-brand-orange mb-2">We achieve sub-800ms latency by optimizing the entire voice pipeline: streaming ASR, parallel LLM inference, and custom streaming TTS synthesis.</p>
                        <p className="text-xs text-white/60 leading-relaxed">By avoiding the overhead of CPaaS API proxies, utilizing speculative decoding, and routing audio packets over dedicated edge server trunks, we eliminate conversational pauses. This guarantees voice interactions that feel as responsive and natural as human dialogue.</p>
                    </div>
                    <div className="glass-card p-6">
                        <h3 className="font-display text-xl font-bold text-white mb-3">How do domain-specific LLMs benefit enterprises?</h3>
                        <p className="text-sm font-semibold text-brand-orange mb-2">Domain LLMs deliver high accuracy, custom terminology understanding, and absolute data privacy compliance under India's DPDP Act 2023.</p>
                        <p className="text-xs text-white/60 leading-relaxed">Generic LLMs lack specialized industry vocabulary (e.g., aviation or logistics codes) and expose query history to public servers. Studio Form fine-tunes domain-specific models (like LexBharat and MedLM) hosted inside secure, sandboxed client VPCs with zero external logging.</p>
                    </div>
                </div>
            </section>

            {/* COMPARISON */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <SectionHeader command="studioform --diff" title="Why choose Studio Form" accentInTitle="over traditional consultancies?" subtitle="We don't pitch decks. We ship products." />
                <ComparisonTable rows={COMP_ROWS} />
            </section>

            {/* FULL STACK ASCII */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <SectionHeader command="studioform --stack" title="What makes us a truly" accentInTitle="full-stack AI company?" />
                <div className="grid lg:grid-cols-2 gap-6">
                    <CodeCard filename="stack.txt">
                        <pre className="text-white/80 whitespace-pre leading-6">{`┌─────────────────────────┐
│   AI Applications       │ ← SaaS Platforms
│   Voice & Agents        │ ← Voice AI
│   RAG & Chatbots        │ ← Knowledge Base
│   Domain LLM            │ ← Custom Models
│   AI & ML Workshops     │ ← Upskilling
└─────────────────────────┘`}</pre>
                        <div className="mt-3 text-white/60">{"> From the custom LLM to the voice agent on the phone — we build and own the entire stack."}</div>
                    </CodeCard>
                    <CodeCard filename="principles.md">
                        <div><Cmt># Core principles</Cmt></div>
                        <div className="mt-2 space-y-2 text-white/80">
                            <div><span className="text-brand-orange">▸</span> We build, not advise.</div>
                            <div><span className="text-brand-orange">▸</span> Indian pricing, global quality.</div>
                            <div><span className="text-brand-orange">▸</span> Production-ready or it doesn't ship.</div>
                            <div><span className="text-brand-orange">▸</span> Every product was deployed for a real client first.</div>
                            <div><span className="text-brand-orange">▸</span> Education is part of the product.</div>
                        </div>
                    </CodeCard>
                </div>
            </section>

            {/* COMMAND CENTER */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <SectionHeader command="studioform --health-check" title="Studio Form" accentInTitle="Command Center" subtitle="Live, animated counters from across the platform." />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <div className="glass-card p-5"><StatCounter value={5} label="AI Agents Active" /></div>
                    <div className="glass-card p-5"><StatCounter value={5000} suffix="+" label="Pilot Calls" /></div>
                    <div className="glass-card p-5"><StatCounter value={4} label="Models in Prod" /></div>
                    <div className="glass-card p-5"><StatCounter value="SLA" suffix=" Target" label="System Uptime" /></div>
                    <div className="glass-card p-5"><StatCounter value={0.8} decimals={1} suffix="s" label="Turn Latency" /></div>
                    <div className="glass-card p-5"><StatCounter value={4} label="Active Domains" /></div>
                </div>
                <div className="mt-6 font-mono text-xs text-white/40 flex items-center gap-2">
                    <span className="pulse-dot" /> $ studioform --health-check &nbsp;→&nbsp; All systems operational. Last checked: just now.
                </div>
            </section>

            {/* INDUSTRIES */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <SectionHeader command="studioform --industries" title="Which industries benefit from Studio Form's" accentInTitle="custom AI solutions?" />
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {INDUSTRIES.map(([name, count], i) => (
                        <motion.div key={name} {...stagger(i, 0.03)}>
                            <Link to="/products" className="glass-card p-4 flex items-center justify-between group" data-testid={`industry-${i}`}>
                                <span className="text-sm text-white group-hover:text-brand-orange transition-colors">{name}</span>
                                <span className="font-mono text-[10px] text-white/40">{count}</span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <SectionHeader command="studioform --reviews" title="What do our clients" accentInTitle="say about us?" />
                <TestimonialCarousel items={TESTIMONIALS} />
            </section>

            <AgentDesignStudio />

            <CTASection />
        </div>
    );
}
