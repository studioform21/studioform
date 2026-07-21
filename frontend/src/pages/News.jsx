import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import SEOMeta from "@/components/SEOMeta";
import { stagger } from "@/lib/anim";

const NEWS_STRUCTURED_DATA = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    "name": "Studio Form Media House",
    "description": "Daily coverage of AI shipments, emerging research, policy, and insights from the frontlines of agentic AI development.",
    "url": "https://www.studioform.app/ai-news",
    "parentOrganization": {
        "@type": "Organization",
        "name": "Studio Form",
        "url": "https://www.studioform.app"
    }
};

const TAGS = ["All", "Breaking", "Tools", "India", "Voice", "LLMs", "Open Source"];

const ARTICLES = [
    { tag: "Voice", slug: "ai-call-center-solutions", title: "AI Call Center Solutions: Platform Comparison Guide", date: "Jul 21, 2026", excerpt: "Compare enterprise CX suites, voice platforms like Bland & Retell, and Studio Form. A buyer scorecard for choosing AI call center software." },
    { tag: "Voice", slug: "how-to-build-ai-receptionist", title: "How to Build an AI Receptionist That Actually Works", date: "Jul 21, 2026", excerpt: "Learn how to build a production-grade AI receptionist in days — no engineering team, no dropped calls." },
    { tag: "Breaking", slug: "gpt-5-reasoning-bands", title: "GPT-5.2 launches with reasoning bands", date: "Feb 8, 2026", excerpt: "OpenAI's latest unlocks tunable reasoning depth — what it means for production agents." },
    { tag: "India", slug: "rbi-ai-regulation", title: "RBI's draft AI regulation — what BFSI must do", date: "Jan 12, 2026", excerpt: "A pragmatic checklist for banks and NBFCs deploying generative AI." },
    { tag: "Voice", slug: "marathi-voice-agent-playbook", title: "Building a Marathi voice agent — playbook", date: "Jan 6, 2026", excerpt: "Dialect modeling, code-mix detection, and accent control for Marathi customer support." },
    { tag: "India", slug: "", title: "BharatGPT consortium expands to 22 languages", date: "Feb 6, 2026", excerpt: "Indian language LLMs cross a major milestone, with state govt partners onboard." },
    { tag: "Voice", slug: "", title: "Studio Form ships 100M-call voice infra", date: "Feb 3, 2026", excerpt: "Behind the scenes of scaling streaming ASR across 12 telephony providers." },
    { tag: "Tools", slug: "", title: "Top 10 agent frameworks for 2026", date: "Jan 30, 2026", excerpt: "We benchmark the leading open-source agent frameworks on real workloads." },
    { tag: "LLMs", slug: "", title: "Claude Sonnet 4.6 — what's new", date: "Jan 25, 2026", excerpt: "Anthropic ships incremental upgrades to its workhorse model. Our take." },
    { tag: "Open Source", slug: "", title: "OpenClaw 0.4 — soul-driven agents", date: "Jan 18, 2026", excerpt: "Our open-source agent framework hits a milestone with memory-graph extensions." },
];

export default function News() {
    const [tag, setTag] = useState("All");
    const [articles, setArticles] = useState(ARTICLES);

    useEffect(() => {
        let isMounted = true;
        fetch("/api/blogs")
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (isMounted && data && data.items && data.items.length > 0) {
                    const mapped = data.items.map(item => ({
                        tag: item.tag || "Voice",
                        slug: item.slug,
                        title: item.title,
                        date: item.date || "Recent",
                        excerpt: (Array.isArray(item.body) && item.body[0]) 
                            ? item.body[0].slice(0, 140) + "..." 
                            : (item.callout || "Read full article")
                    }));
                    
                    const unlinkedBriefs = ARTICLES.filter(a => !a.slug);
                    setArticles([...mapped, ...unlinkedBriefs]);
                }
            })
            .catch(() => {});
        return () => { isMounted = false; };
    }, []);

    const filtered = tag === "All" ? articles : articles.filter(a => a.tag === tag);

    return (
        <div>
            <SEOMeta
                title="AI News & Insights"
                description="The Studio Form Media House — daily coverage and expert analysis on AI shipments, emerging research, model releases, and policy changes."
                keywords="AI news, AI industry trends, GPT-5 release, indica speech LLM, AI regulation RBI, Studio Form news"
                structuredData={NEWS_STRUCTURED_DATA}
            />
            <PageHero command="studioform --news" eyebrow="News & Insights" title="What's happening in" accent="AI right now." subtitle="The Studio Form Media House — daily coverage of AI shipments, research, and policy." />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex flex-wrap gap-2 mb-8">
                    {TAGS.map(t => (
                        <button key={t} onClick={() => setTag(t)} className={`px-3 py-1.5 rounded-full text-xs font-mono border transition ${tag === t ? "bg-brand-orange text-black border-brand-orange" : "border-white/10 text-white/70 hover:border-brand-orange/40"}`} data-testid={`news-tag-${t}`}>{t}</button>
                    ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filtered.map((a, i) => (
                        <motion.article key={a.title} {...stagger(i)} className="glass-card p-6 flex flex-col" data-testid={`news-card-${i}`}>
                            <div className="flex items-center justify-between">
                                <span className="px-2 py-1 rounded-full bg-brand-orange/15 border border-brand-orange/30 font-mono text-[10px] uppercase text-brand-orange">{a.tag}</span>
                                <span className="font-mono text-[10px] text-white/40">{a.date}</span>
                            </div>
                            <h3 className="mt-4 font-display text-xl font-bold leading-snug">{a.title}</h3>
                            <p className="mt-2 text-sm text-white/60 flex-1">{a.excerpt}</p>
                            {a.slug ? (
                                <Link to={`/blog/${a.slug}`} className="mt-4 text-brand-orange font-mono text-xs hover:text-white transition-colors" data-testid={`news-link-${a.slug}`}>read full article →</Link>
                            ) : (
                                <div className="mt-4 text-white/30 font-mono text-xs cursor-default">brief only</div>
                            )}
                        </motion.article>
                    ))}
                </div>
            </section>

            <CTASection title="Subscribe to the brief." subtitle="One email a week. Curated by humans who ship AI for a living." primary={{ label: "Subscribe", to: "/contact" }} secondary={{ label: "Browse all", to: "/blog" }} />
        </div>
    );
}
