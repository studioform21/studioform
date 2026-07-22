import React from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";
import SEOMeta from "@/components/SEOMeta";
import { stagger } from "@/lib/anim";

const ABOUT_STRUCTURED_DATA = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Studio Form",
    "description": "Studio Form is a full-stack agentic AI company. We design, build, deploy, and operate autonomous AI agents, voice systems, and custom LLMs for India and the world.",
    "publisher": {
        "@type": "Organization",
        "name": "Studio Form",
        "url": "https://www.studioform.app"
    }
};

const TIMELINE = [
    { year: "2023", title: "The studio begins", body: "Founders ship their first voice agent pilot for a logistics SMB. It handles dispatch inquiries at night, while everyone sleeps." },
    { year: "2024", title: "Multilingual Expansion", body: "Expanded voice agents to support regional Indic dialects (Hindi, Marathi), serving local customer care pilots." },
    { year: "2025", title: "Domain LLMs & Rebrand", body: "Aviation and legal domain models ship to production. Rebranded as Studio Form to align under one unified AI stack." },
    { year: "2025", title: "Automation Launch", body: "Launched custom agentic workflows connecting CRM and ERP endpoints, and established our engineer-led workshops." },
    { year: "2026", title: "Today", body: "Active voice agent pilots, custom domain LLMs, and enterprise-grade automation workflows in production. And just getting started." },
];

const PHILOSOPHY = [
    ["Builders, not advisors", "We ship code, not slides. Every product was deployed for a real client first."],
    ["Indian quality, global standard", "Engineered in India for global SLAs. Made affordable for Indian operators."],
    ["Open by default", "We open-source what we can. Education is part of the product."],
    ["Voice is not a feature", "Voice is the new interface. We design every product with voice in mind."],
    ["Agents > Apps", "We bet on autonomous agents that act, not screens you click through."],
    ["Small teams, big leverage", "Tiny pods, full ownership. We move at the speed of a startup, at the scale of a platform."],
];

const VALUES = [
    ["Ship", "Working software beats perfect plans."],
    ["Ownership", "If you touched it, you own it."],
    ["Curiosity", "We are students of every domain we serve."],
    ["Trust", "We say what we'll do. We do what we say."],
];

export default function About() {
    return (
        <div>
            <SEOMeta
                title="About Us"
                description="Studio Form is a full-stack agentic AI company. We design, build, deploy, and operate autonomous AI agents, voice systems, and custom LLMs for India and the world."
                keywords="Studio Form history, agentic AI company, full-stack AI, Indian AI startup, AI mission, AI vision"
                structuredData={ABOUT_STRUCTURED_DATA}
            />
            <PageHero command="studioform --about" eyebrow="About" title="An AI company that" accent="ships, not pitches." subtitle="Studio Form is a full-stack agentic AI company. We design, build, deploy, and operate AI for India and the world." />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-6">
                <div className="glass-card p-6">
                    <div className="font-mono text-xs text-brand-orange uppercase">Mission</div>
                    <div className="mt-3 font-display text-2xl font-bold">Make AI useful for every business that powers India.</div>
                    <p className="mt-3 text-sm text-white/65 leading-relaxed">From the dhaba on the highway to the bank in Mumbai — we believe enterprise-grade AI shouldn't be reserved for the Fortune 500. Studio Form exists to put deployable AI in the hands of operators who actually need it.</p>
                </div>
                <div className="glass-card p-6">
                    <div className="font-mono text-xs text-brand-orange uppercase">Vision</div>
                    <div className="mt-3 font-display text-2xl font-bold">A world where every operator has an AI co-builder.</div>
                    <p className="mt-3 text-sm text-white/65 leading-relaxed">We see the next decade as a Cambrian explosion of agents — calling, scheduling, deciding, and helping. Our job is to make sure that explosion is grounded, governed, and useful.</p>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <SectionHeader command="studioform --story" title="Our" accentInTitle="story." />
                <div className="relative pl-6 border-l border-white/10 space-y-8">
                    {TIMELINE.map((t, i) => (
                        <motion.div key={t.title} {...stagger(i, 0.06)} className="relative">
                            <span className="absolute -left-[33px] top-1 w-3 h-3 rounded-full bg-brand-orange ring-4 ring-[#0A0A0A]" />
                            <div className="font-mono text-xs text-brand-orange">{t.year}</div>
                            <div className="mt-1 font-display text-xl font-bold">{t.title}</div>
                            <div className="mt-1 text-sm text-white/60 max-w-2xl">{t.body}</div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <SectionHeader command="studioform --philosophy" title="Our" accentInTitle="philosophy." />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {PHILOSOPHY.map(([t, b], i) => (
                        <motion.div key={t} {...stagger(i)} className="glass-card p-6">
                            <div className="font-display text-lg font-bold">{t}</div>
                            <p className="mt-2 text-sm text-white/60">{b}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <SectionHeader command="studioform --values" title="Core" accentInTitle="values." />
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {VALUES.map(([t, b], i) => (
                        <motion.div key={t} {...stagger(i)} className="glass-card p-6">
                            <div className="font-mono text-[10px] uppercase text-brand-orange">value 0{i + 1}</div>
                            <div className="mt-2 font-display text-2xl font-bold">{t}</div>
                            <p className="mt-2 text-sm text-white/60">{b}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <CTASection title="Want to work with us?" subtitle="Whether you want to deploy, partner, or join — we'd love to talk." primary={{ label: "Contact us", to: "/contact" }} secondary={{ label: "Meet the team", to: "/team" }} />
        </div>
    );
}
