import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { http } from "@/lib/api";
import PageHero from "@/components/PageHero";
import StatCounter from "@/components/StatCounter";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";
import FilterableCatalogGrid from "@/components/FilterableCatalogGrid";
import SEOMeta from "@/components/SEOMeta";
import { stagger } from "@/lib/anim";

const UNIVERSITY_STRUCTURED_DATA = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Studio Form AI University",
    "description": "Learn AI and ML from people who ship code. 100+ courses across 12+ tracks covering ML, NLP, RAG, speech, and autonomous agents.",
    "url": "https://www.studioform.app/ai-university"
};

const GROWTH = Array.from({ length: 12 }).map((_, i) => ({ m: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][i], v: 20 + i * 8 + Math.round(Math.random() * 5) }));
const RADAR = [
    { skill: "ML", v: 90 }, { skill: "NLP", v: 85 }, { skill: "Vision", v: 80 },
    { skill: "RAG", v: 92 }, { skill: "Voice", v: 78 }, { skill: "Agents", v: 88 },
];

const COLLEGES = [
    { stat: "120+", label: "Colleges onboarded" },
    { stat: "18", label: "States covered" },
    { stat: "9,500+", label: "Faculty trained" },
    { stat: "60+", label: "AI Labs deployed" },
];

const SCHOOLS = [
    { title: "AI Club Starter", body: "Curriculum + projects + judging kit to run a school AI club end-to-end." },
    { title: "Teacher Training", body: "Hands-on AI bootcamps for school teachers, NEP-aligned." },
    { title: "Summer AI Camp", body: "2-week residential camp covering ML, robotics, ethics." },
    { title: "AI Olympiad", body: "School-level AI competition with national finals." },
];

function CourseCard({ item }) {
    return (
        <div className="glass-card p-5 h-full flex flex-col" data-testid={`course-card-${item.id}`}>
            <div className="flex items-center justify-between">
                <span className="px-2 py-1 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[10px] uppercase text-brand-orange">{item.category}</span>
                <span className="font-mono text-[10px] text-white/40">{item.duration}</span>
            </div>
            <h3 className="mt-3 font-display text-lg font-bold">{item.name}</h3>
            <p className="mt-2 text-sm text-white/60 flex-1">{item.description}</p>
            <div className="mt-3 font-mono text-[11px] text-white/50">level: <span className="text-white/80">{item.level}</span></div>
        </div>
    );
}

export default function AIUniversity() {
    const [items, setItems] = useState([]);
    useEffect(() => { http.get("/courses").then(r => setItems(r.data.items)); }, []);
    const cats = Array.from(new Set(items.map(i => i.category)));

    return (
        <div>
            <SEOMeta
                title="AI University"
                description="Learn AI and ML from people who ship code. 100+ courses across 12+ tracks covering ML, NLP, RAG, speech, and autonomous agents."
                keywords="AI university, learn AI engineering, ML training India, agentic AI courses, RAG workshops, deep learning certification, Studio Form university"
                structuredData={UNIVERSITY_STRUCTURED_DATA}
            />
            <PageHero command="studioform --university" eyebrow="AI University" title="Learn AI from" accent="people who ship it." subtitle="100+ courses across 12+ tracks. Cohort, self-paced, on-campus, on-site.">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
                    <StatCounter value={100} suffix="+" label="Courses" />
                    <StatCounter value={12} suffix="+" label="Tracks" />
                    <StatCounter value={4.2} suffix="k+" label="Learners" />
                    <StatCounter value={94} suffix="%" label="Completion" />
                </div>
            </PageHero>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid lg:grid-cols-2 gap-6">
                    <div className="glass-card p-6">
                        <div className="font-mono text-xs text-white/40 mb-1">$ studioform --learners</div>
                        <div className="font-display text-2xl font-bold mb-3">Learner growth — 12 months</div>
                        <div className="h-56">
                            <ResponsiveContainer>
                                <LineChart data={GROWTH}>
                                    <XAxis dataKey="m" stroke="#666" tick={{ fontSize: 11 }} />
                                    <YAxis stroke="#666" tick={{ fontSize: 11 }} />
                                    <Tooltip contentStyle={{ background: "#0A0A0A", border: "1px solid #222" }} />
                                    <Line type="monotone" dataKey="v" stroke="#F47B3F" strokeWidth={2} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="glass-card p-6">
                        <div className="font-mono text-xs text-white/40 mb-1">$ studioform --capabilities</div>
                        <div className="font-display text-2xl font-bold mb-3">Capability radar</div>
                        <div className="h-56">
                            <ResponsiveContainer>
                                <RadarChart data={RADAR}>
                                    <PolarGrid stroke="#222" />
                                    <PolarAngleAxis dataKey="skill" stroke="#aaa" tick={{ fontSize: 11 }} />
                                    <Radar dataKey="v" stroke="#F47B3F" fill="#F47B3F" fillOpacity={0.25} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <SectionHeader command="studioform --catalog" title="Browse" accentInTitle="programs." />
                <FilterableCatalogGrid
                    items={items}
                    facets={[{ key: "category", label: "type", options: cats }, { key: "level", label: "level", options: ["Beginner", "Intermediate", "Advanced", "Executive"] }]}
                    searchPlaceholder="$ find 'rag mastery'..."
                    renderCard={(c) => <CourseCard item={c} />}
                    testid="university-grid"
                />
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <SectionHeader command="studioform --offer" title="What we" accentInTitle="offer." />
                <div className="grid sm:grid-cols-2 gap-3">
                    {[
                        "Cohort-based bootcamps with live mentors",
                        "On-campus and on-site corporate programs",
                        "GPU sandboxes included with every program",
                        "Capstone projects from real Studio Form clients",
                        "Industry-recognized certifications",
                        "Job placement support across our portfolio",
                    ].map((s, i) => (
                        <motion.div key={i} {...stagger(i, 0.03)} className="glass-card p-4 flex items-start gap-3">
                            <Check className="text-brand-orange flex-shrink-0 mt-0.5" size={16} />
                            <span className="text-sm">{s}</span>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <SectionHeader command="studioform --colleges" title="For" accentInTitle="colleges." subtitle="We partner with universities to deliver AI specializations, faculty training, and on-campus labs." />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {COLLEGES.map((c) => (
                        <div key={c.label} className="glass-card p-5 text-center">
                            <div className="font-display text-3xl font-bold text-brand-orange">{c.stat}</div>
                            <div className="mt-2 text-xs font-mono uppercase text-white/60">{c.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <SectionHeader command="studioform --schools" title="For" accentInTitle="schools." />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {SCHOOLS.map((s, i) => (
                        <motion.div key={s.title} {...stagger(i)} className="glass-card p-5">
                            <div className="font-display text-lg font-bold">{s.title}</div>
                            <p className="mt-2 text-sm text-white/60">{s.body}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <CTASection title="Bring AI to your campus." subtitle="Faculty training, student programs, on-campus AI labs — designed by people who actually ship AI." primary={{ label: "Contact Team", to: "/contact" }} secondary={{ label: "Workshops", to: "/workshops" }} />
        </div>
    );
}
