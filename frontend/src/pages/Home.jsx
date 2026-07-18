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
    { icon: Package, count: "60+ Platforms", title: "AI SaaS Platforms", desc: "Enterprise-ready AI apps across 12+ industries — healthcare, logistics, aviation, real estate, finance.", tags: ["Health", "Logi", "Avia", "Fin", "Real", "Edu"], to: "/services/ai-agents" },
    { icon: Mic2, count: "52+ Agents", title: "AI Voice Agents", desc: "Multilingual voice agents in 15+ languages and 12+ industries — inbound, outbound, multilingual.", tags: ["EN", "HI", "TA", "TE"], to: "/services/voice-agents" },
    { icon: Brain, count: "4+ Models", title: "Domain LLM", desc: "Custom LLMs fine-tuned for aviation, legal, healthcare, finance and more.", tags: ["Domain", "Tuned"], to: "/services/llm-development" },
    { icon: MessageCircle, count: "100+ Deployed", title: "RAG Chatbots", desc: "Secure, permission-aware chatbots that talk to your enterprise PDFs, documents, Notion, and databases.", tags: ["Notion", "SQL", "ACL"], to: "/services/rag-chatbots" },
    { icon: Zap, count: "10,000+ Workflows", title: "AI Automations", desc: "The world's largest catalog of agentic automation workflows. Pick one, we deploy it.", tags: ["$ find 'sales'"], to: "/services/ai-automation" },
    { icon: Shield, count: "100+ Skills", title: "Claude Skills", desc: "Custom Claude skill packs for enterprise automation and agentic workflows.", tags: ["Agents"], to: "/services/custom-ai" },
    { icon: GraduationCap, count: "45+ Companies", title: "AI & ML Workshops", desc: "Hands-on, engineer-led workshops to help your teams design, build, and deploy modern AI systems.", tags: ["Agents", "RAG", "Eval"], to: "/workshops" },
    { icon: Newspaper, count: "Media", title: "AI News & Media", desc: "Studio Form Media House — latest AI industry news, insights, and analysis.", tags: ["Daily"], to: "/ai-news" },
];

const COMP_ROWS = [
    { label: "Approach", others: "PowerPoint consultants. Slides over systems.", ours: "Product builders. We ship working AI — not decks." },
    { label: "Platforms", others: "1–2 niche tools, half-baked MVPs.", ours: "60+ production-ready SaaS platforms across 12+ industries." },
    { label: "Voice AI", others: "Basic bots with robotic voices.", ours: "52+ multilingual voice agents, 15+ languages, real conversations." },
    { label: "RAG Chatbots", others: "Out-of-the-box templates that hallucinate.", ours: "Zero-hallucination, permission-aware chatbots connected to your docs." },
    { label: "Automations", others: "A handful of templates, mostly broken.", ours: "10,000+ tested AI automation workflows — browse, pick, deploy." },
    { label: "Domain LLM", others: "Generic GPT wrappers, no domain knowledge.", ours: "Domain LLM fine-tuned for aviation, healthcare, legal, finance." },
    { label: "Workshops", others: "A YouTube playlist.", ours: "Hands-on, engineer-led workshops to upskill your product & engineering teams." },
    { label: "Pricing", others: "$50K+ annual contracts, long cycles.", ours: "Pick a platform, customize, deploy — at a cost you'll love." },
    { label: "Speed", others: "6–12 months to see anything.", ours: "Concept to deployed AI in 2–4 weeks." },
];

const STEPS = [
    { tag: "DISCOVER", title: "Browse & Choose", body: "Explore 10,000+ automation projects, 50+ voice agents, or 60+ SaaS platforms. Find what fits." },
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
    "10,000+ AI automation projects shipped",
    "52+ voice agents across 12+ industries",
    "100+ AI courses across 12+ tracks",
    "Domain LLMs for aviation, healthcare, legal, finance",
    "Concept to deployed AI in 2–4 weeks",
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
            "telephone": "+917300000000",
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
                    "name": "Sarthak"
                }
            ],
            "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "legal@studioform.app",
                "telephone": "+917300000000"
            },
            "sameAs": [
                "https://github.com/studioform",
                "https://twitter.com/studioform",
                "https://www.linkedin.com/in/studioform"
            ]
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
                title="Fabric of Future Intelligence"
                description="Studio Form is a pioneering agentic AI company in Indore, India. We build autonomous AI voice agents, domain LLMs, and custom automation workflows that actually ship."
                keywords="AI company in Indore, agentic AI Indore, AI voice agents, domain LLM, RAG chatbots, AI automation, Studio Form"
                structuredData={HOME_STRUCTURED_DATA}
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
                        <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="mt-8 flex flex-wrap gap-3">
                            <Link to="/services/ai-agents" className="px-6 py-3 rounded-full bg-brand-orange text-black font-medium text-sm hover:brightness-110 transition inline-flex items-center gap-2" data-testid="hero-cta-products">
                                Explore Services <ArrowRight size={16} />
                            </Link>
                            <Link to="/contact" className="px-6 py-3 rounded-full border border-white/15 text-white font-medium text-sm hover:border-brand-orange hover:text-brand-orange transition" data-testid="hero-cta-demo">
                                Book a Demo
                            </Link>
                        </motion.div>

                        <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="mt-12 grid grid-cols-1 lg:grid-cols-4 gap-6">
                            <StatCounter testid="hero-stat-projects" value={121} suffix="+" label="Projects" />
                            <StatCounter testid="hero-stat-voice" value={50} suffix="+" label="Voice Agents" />
                            <StatCounter testid="hero-stat-courses" value={100} suffix="+" label="AI Courses" />
                            <StatCounter testid="hero-stat-industries" value={12} suffix="+" label="Industries" />
                        </motion.div>

                    </div>

                    <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="lg:col-span-5">
                        <CodeCard filename="studioform-core.tsx">
                            <div><Cmt>// Studio Form system status</Cmt></div>
                            <div className="mt-2"><Kw>const</Kw> platform = {"{"}</div>
                            <div className="pl-6">agents: <Str>"200 active"</Str>,</div>
                            <div className="pl-6">voices: <Str>"50+ active"</Str>,</div>
                            <div className="pl-6">llms: <Str>"4 domain models"</Str>,</div>
                            <div className="pl-6">uptime: <Str>"99.97%"</Str>,</div>
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
                <SectionHeader command="studioform --workflow" title="From idea to" accentInTitle="deployed AI" subtitle="Three steps. Zero fluff." />
                <ProcessSteps steps={STEPS} />
            </section>

            {/* COMPARISON */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <SectionHeader command="studioform --diff" title="Not just another." accentInTitle="THE AI company." subtitle="We don't pitch decks. We ship products." />
                <ComparisonTable rows={COMP_ROWS} />
            </section>

            {/* FULL STACK ASCII */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <SectionHeader command="studioform --stack" title="A truly" accentInTitle="full-stack AI company." />
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
                    <div className="glass-card p-5"><StatCounter value={200} label="AI Agents Active" /></div>
                    <div className="glass-card p-5"><StatCounter value={1} suffix="M+" label="Voice Calls" /></div>
                    <div className="glass-card p-5"><StatCounter value={4} label="Models in Prod" /></div>
                    <div className="glass-card p-5"><StatCounter value={99.97} decimals={2} suffix="%" label="Uptime" /></div>
                    <div className="glass-card p-5"><StatCounter value={0.42} decimals={2} suffix="s" label="Avg Response" /></div>
                    <div className="glass-card p-5"><StatCounter value={12} suffix="+" label="Industries" /></div>
                </div>
                <div className="mt-6 font-mono text-xs text-white/40 flex items-center gap-2">
                    <span className="pulse-dot" /> $ studioform --health-check &nbsp;→&nbsp; All systems operational. Last checked: just now.
                </div>
            </section>

            {/* INDUSTRIES */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <SectionHeader command="studioform --industries" title="AI solutions for" accentInTitle="every industry." />
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
                <SectionHeader command="studioform --reviews" title="What people" accentInTitle="say." />
                <TestimonialCarousel items={TESTIMONIALS} />
            </section>

            <AgentDesignStudio />

            <CTASection />
        </div>
    );
}
