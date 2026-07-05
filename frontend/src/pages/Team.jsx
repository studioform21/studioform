import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle } from "lucide-react";
import PageHero from "@/components/PageHero";
import StatCounter from "@/components/StatCounter";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";
import SEOMeta from "@/components/SEOMeta";
import { stagger } from "@/lib/anim";

const TEAM_STRUCTURED_DATA = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Studio Form Team",
    "description": "Meet the team of builders, founders, and engineers at Studio Form behind India's pioneering agentic AI and voice systems.",
    "url": "https://www.studioform.app/team"
};

const LEADERS = [
    { name: "Pranjal Rai", role: "CEO & Co-founder", bio: "Built India's first multilingual voice agent stack. Speaker, builder, mentor.", skills: [" Innovation", "Agents", "Strategy"] },
    { name: "Sarthak Choukse", role: "CTO & Co-founder", bio: " Telecom + ASR/TTS. Shipped voice agents that handle 10M+ calls a month.", skills: ["ASR", "TTS", "Telephony"] },
    { name: "Nehal Mishra", role: "COO & Head of Products", bio: "Develops scalable web applications, backend APIs, and integrates AI services into production-ready platforms.", skills: ["GenAI", "Automation", "Design"] },
    // { name: "Sneha Kulkarni", role: "Head of Products", bio: "Took AI products from 0 to 1. PM brain meets engineer hands.", skills: ["PM", "Design", "0→1"] },
    // { name: "Karan Iyer", role: "Head of Automation", bio: "n8n contributor. Author of the 'AI Automation in India' playbook.", skills: ["Workflows", "Agents"] },
    // { name: "Lucky Saxena", role: "Head of University", bio: "Educator turned operator. Trains faculty and students across 120+ campuses.", skills: ["Pedagogy", "Curriculum"] },
    // { name: "Daniel Joseph", role: "Head of Infra", bio: "Designed Studio Form's GPU control plane and serving stack.", skills: ["GPU", "Serving", "SRE"] },
    { name: "Nakul Sharma", role: "CFO &Head of Partnerships", bio: "Brings the ecosystem together. Builds bridges with OEMs, OEMs, and governments.", skills: ["Biz Dev", "GTM"] },
];

const CULTURE = [
    ["Async first", "We work in writing. Meetings are a fallback, not a default."],
    ["Builders' bench", "Anyone can show working code on Friday and ship it on Monday."],
    ["Office hours", "Founders are available, every week, on the calendar — no gatekeepers."],
    ["Show, don't tell", "Demos over decks. Always."],
    ["Stay curious", "We pay for books, conferences, and rabbit-hole research time."],
    ["Have a life", "Long-haul work needs long-haul humans. We mean it."],
];

function Avatar({ name }) {
    const initials = name.split(" ").map(n => n[0]).slice(0, 2).join("");
    return (
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-orange to-orange-300 text-black font-display font-bold flex items-center justify-center text-lg">
            {initials}
        </div>
    );
}

export default function Team() {
    return (
        <div>
            <SEOMeta
                title="Our Team"
                description="Meet the founders and team of builders at Studio Form who are constructing the fabric of future intelligence."
                keywords="Studio Form team, Pranjal Rai, Sarthak Choukse, Nehal Mishra, AI builders India"
                structuredData={TEAM_STRUCTURED_DATA}
            />
            <PageHero command="studioform --team" eyebrow="Team" title="Builders, operators," accent="curious people.">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
                    <StatCounter value={10} suffix="+" label="People" />
                    <StatCounter value={12} suffix="+" label="Pods" />
                    <StatCounter value={50} suffix="%" label="Female" />
                    <StatCounter value={2} suffix=" cities" label="Cities" />
                </div>
            </PageHero>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <SectionHeader command="studioform --leadership" title="Leadership." />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {LEADERS.map((p, i) => (
                        <motion.div key={p.name} {...stagger(i)} className="glass-card p-5" data-testid={`leader-${i}`}>
                            <div className="flex items-center gap-4">
                                <Avatar name={p.name} />
                                <div>
                                    <div className="font-display font-bold">{p.name}</div>
                                    <div className="text-xs text-brand-orange font-mono">{p.role}</div>
                                </div>
                            </div>
                            <p className="mt-3 text-sm text-white/60">{p.bio}</p>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                                {p.skills.map(s => <span key={s} className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[10px] text-white/70">{s}</span>)}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <SectionHeader command="studioform --culture" title="How we" accentInTitle="work." />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {CULTURE.map(([t, b], i) => (
                        <motion.div key={t} {...stagger(i)} className="glass-card p-6">
                            <div className="font-display text-lg font-bold">{t}</div>
                            <p className="mt-2 text-sm text-white/60">{b}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
                    <div className="glass-card p-6 flex items-center gap-4">
                        <Mail className="text-brand-orange" size={20} />
                        <div><div className="text-xs font-mono text-white/40">Press &amp; PR</div><div className="font-display font-bold">info@studioform.app</div></div>
                    </div>
                    <div className="glass-card p-6 flex items-center gap-4">
                        <Phone className="text-brand-orange" size={20} />
                        <div><div className="text-xs font-mono text-white/40">Sales (Landline)</div><div className="font-display font-bold">+91 731 408 6183</div></div>
                    </div>
                </div>
            </section>

            <CTASection title="Join the studio." subtitle="We're hiring across engineering, design, AI research, and operations." primary={{ label: "See open roles", to: "/contact" }} secondary={{ label: "Read our story", to: "/about" }} />
        </div>
    );
}
