import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, ArrowLeft, Globe } from "lucide-react";
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

const LEADER_BIOS = {
    "pranjal-rai": {
        name: "Pranjal Rai",
        role: "CEO & Co-founder",
        detailedBio: "Pranjal Rai is the Co-founder and CEO of Studio Form. He has pioneered conversational AI design in India, leading the development of India's first production-grade multilingual voice agent stack. With a background in business strategy and artificial intelligence, Pranjal leads Studio Form's vision to make enterprises AI-native. He is a frequent speaker at AI/ML summits and a mentor to early-stage builders.",
        skills: ["Innovation", "Voice Agents", "GTM Strategy", "Enterprise Architecture"],
        links: {
            linkedin: "https://www.linkedin.com/company/studioform",
            github: "https://github.com/studioform"
        },
        structuredData: {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Pranjal Rai",
            "jobTitle": "CEO & Co-founder",
            "worksFor": {
                "@type": "Organization",
                "name": "Studio Form",
                "url": "https://studioform.app"
            },
            "url": "https://studioform.app/team/pranjal-rai",
            "sameAs": [
                "https://www.linkedin.com/company/studioform",
                "https://github.com/studioform"
            ],
            "description": "Co-founder and CEO of Studio Form, building India's first multilingual voice agent stack.",
            "knowsAbout": ["Artificial Intelligence", "Voice Agents", "Conversational AI", "SaaS Go-To-Market"]
        }
    },
    "sarthak-choukse": {
        name: "Sarthak Choukse",
        role: "CTO & Co-founder",
        detailedBio: "Sarthak Choukse is the Co-founder and CTO of Studio Form, specializing in low-latency speech pipelines, telephony networks, and domain LLM adaptation. Sarthak has engineered speech recognition (ASR) and text-to-speech (TTS) systems that process over 10 million call minutes monthly. Prior to Studio Form, he worked on SIP packet routing systems and distributed GPU training frameworks, enabling real-time turn-taking optimizations under 800ms.",
        skills: ["ASR & TTS", "SIP Telephony", "GPU Serving", "Domain LLM Tuning"],
        links: {
            linkedin: "https://www.linkedin.com/company/studioform",
            github: "https://github.com/studioform"
        },
        structuredData: {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Sarthak Choukse",
            "jobTitle": "CTO & Co-founder",
            "worksFor": {
                "@type": "Organization",
                "name": "Studio Form",
                "url": "https://studioform.app"
            },
            "url": "https://studioform.app/team/sarthak-choukse",
            "sameAs": [
                "https://www.linkedin.com/company/studioform",
                "https://github.com/studioform"
            ],
            "description": "Co-founder and CTO of Studio Form, specializing in low-latency speech synthesis, SIP gateways, and domain-specific LLM adapters.",
            "knowsAbout": ["Automatic Speech Recognition", "Speech Synthesis", "SIP trunking", "Fine-Tuning", "LLM Inference"]
        }
    },
    "nehal-mishra": {
        name: "Nehal Mishra",
        role: "COO & Head of Products",
        detailedBio: "Nehal Mishra is the COO and Head of Products at Studio Form. She leads the design and implementation of production-ready agentic software loops, layout-aware RAG pipelines, and complex user interfaces. Nehal bridges the gap between deep AI research and intuitive product engineering, ensuring that Studio Form SaaS modules are robust, user-friendly, and highly secure.",
        skills: ["Product Engineering", "RAG Systems", "AI Workflows", "Operations"],
        links: {
            linkedin: "https://www.linkedin.com/company/studioform",
            github: "https://github.com/studioform"
        },
        structuredData: {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Nehal Mishra",
            "jobTitle": "COO & Head of Products",
            "worksFor": {
                "@type": "Organization",
                "name": "Studio Form",
                "url": "https://studioform.app"
            },
            "url": "https://studioform.app/team/nehal-mishra",
            "sameAs": [
                "https://www.linkedin.com/company/studioform",
                "https://github.com/studioform"
            ],
            "description": "COO & Head of Products at Studio Form, developing layout-aware RAG interfaces and agentic automation workflows.",
            "knowsAbout": ["Product Management", "Retrieval-Augmented Generation", "SaaS Engineering", "User Experience Design"]
        }
    }
};

const LEADERS = [
    { slug: "pranjal-rai", name: "Pranjal Rai", role: "CEO & Co-founder", bio: "Built India's first multilingual voice agent stack. Speaker, builder, mentor.", skills: [" Innovation", "Agents", "Strategy"] },
    { slug: "sarthak-choukse", name: "Sarthak Choukse", role: "CTO & Co-founder", bio: " Telecom + ASR/TTS. Shipped voice agents that handle 10M+ calls a month.", skills: ["ASR", "TTS", "Telephony"] },
    { slug: "nehal-mishra", name: "Nehal Mishra", role: "COO & Head of Products", bio: "Develops scalable web applications, backend APIs, and integrates AI services into production-ready platforms.", skills: ["GenAI", "Automation", "Design"] },
    { slug: "nakul-sharma", name: "Nakul Sharma", role: "CFO & Head of Partnerships", bio: "Brings the ecosystem together. Builds bridges with OEMs, OEMs, and governments.", skills: ["Biz Dev", "GTM"] },
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
    const { leaderId } = useParams();

    if (leaderId && LEADER_BIOS[leaderId]) {
        const leader = LEADER_BIOS[leaderId];
        return (
            <div>
                <SEOMeta
                    title={`${leader.name} | ${leader.role}`}
                    description={leader.detailedBio}
                    keywords={`${leader.name}, ${leader.role}, Studio Form founder, AI expertise, ${leader.skills.join(", ")}`}
                    structuredData={leader.structuredData}
                />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Link to="/team" className="inline-flex items-center gap-2 text-xs text-white/50 hover:text-brand-orange transition mb-6">
                        <ArrowLeft size={14} /> Back to Team
                    </Link>
                </div>

                <PageHero 
                    command={`studioform --leader-bio "${leaderId}"`}
                    eyebrow="Company Leadership" 
                    title={leader.name} 
                    accent={leader.role}
                />

                <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="glass-card p-8 space-y-6">
                        <div className="flex items-center gap-6">
                            <Avatar name={leader.name} />
                            <div>
                                <h2 className="font-display text-2xl font-bold text-white">{leader.name}</h2>
                                <p className="text-sm text-brand-orange font-mono mt-1">{leader.role} @ Studio Form</p>
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-6">
                            <h3 className="font-display font-semibold text-white text-lg mb-3">About</h3>
                            <p className="text-sm sm:text-base text-white/70 leading-relaxed">{leader.detailedBio}</p>
                        </div>

                        <div className="border-t border-white/10 pt-6">
                            <h3 className="font-display font-semibold text-white text-lg mb-3">Expertise & Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {leader.skills.map((skill, idx) => (
                                    <span key={idx} className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 font-mono text-xs text-white/80">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-6 flex gap-4">
                            <a href={leader.links.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-white/50 hover:text-brand-orange transition">
                                <Globe size={14} /> LinkedIn Profile
                            </a>
                            <a href={leader.links.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-white/50 hover:text-brand-orange transition">
                                <Globe size={14} /> GitHub Org
                            </a>
                        </div>
                    </div>
                </section>

                <CTASection />
            </div>
        );
    }

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
                                    <div className="font-display font-bold">
                                        {p.slug ? (
                                            <Link to={`/team/${p.slug}`} className="hover:text-brand-orange transition-colors">
                                                {p.name}
                                            </Link>
                                        ) : p.name}
                                    </div>
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
