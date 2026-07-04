import React from "react";
import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import PageHero from "@/components/PageHero";
import StatCounter from "@/components/StatCounter";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";
import { stagger } from "@/lib/anim";

const MODELS = [
    { name: "AviationGPT", domain: "Aviation", params: "13B", desc: "IATA codes, ATC phraseology, ops manuals — fine-tuned on 80M tokens of aviation corpus." },
    { name: "MediLM", domain: "Healthcare", params: "13B", desc: "ICD-10, SNOMED, clinical guidelines. Indian + global corpora." },
    { name: "LexBharat", domain: "Legal", params: "13B", desc: "Indian law, SC/HC judgments, contracts, statutes." },
    { name: "FinSathi", domain: "Finance", params: "8B", desc: "Indian accounting, GST, IFRS, banking terminology." },
    { name: "LogiBrain", domain: "Logistics", params: "7B", desc: "Routing reasoning, fleet ops vocabulary, EDI standards." },
    { name: "AgriMind", domain: "Agriculture", params: "7B", desc: "Crop science, irrigation, mandi prices, weather reasoning." },
    { name: "EduSetu", domain: "Education", params: "8B", desc: "NCERT, NEP-aligned, Indian pedagogical chains." },
    { name: "BharatVoice", domain: "Indic Speech", params: "Multi", desc: "15+ Indian languages, code-mixed, dialect-aware." },
];

export default function LLMs() {
    return (
        <div>
            <PageHero command="studioform --llms" eyebrow="Domain LLMs" title="Models that actually" accent="know your industry." subtitle="Generic LLMs don't speak aviation, healthcare, or Indian law. Ours do.">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
                    <StatCounter value={4} suffix="+" label="Models" />
                    <StatCounter value={12} suffix="+" label="Domains" />
                    <StatCounter value={400} suffix="M+" label="Domain Tokens" />
                    <StatCounter value={92} suffix="%" label="Eval Win Rate" />
                </div>
            </PageHero>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <SectionHeader command="studioform --models" title="Our model" accentInTitle="lineup." subtitle="Trained on curated domain corpora. Aligned with industry experts. Evaluated against real workflows." />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {MODELS.map((m, i) => (
                        <motion.div key={m.name} {...stagger(i)} className="glass-card p-6">
                            <div className="flex items-start justify-between">
                                <div className="w-10 h-10 rounded-xl bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center text-brand-orange"><Brain size={18} /></div>
                                <span className="font-mono text-[10px] uppercase text-white/50 px-2 py-1 rounded-full border border-white/10">{m.params}</span>
                            </div>
                            <div className="mt-4 font-mono text-xs text-brand-orange">{m.domain}</div>
                            <h3 className="font-display text-xl font-bold">{m.name}</h3>
                            <p className="mt-2 text-sm text-white/60">{m.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <CTASection title="Need a model for your domain?" subtitle="We'll fine-tune, evaluate, and serve it — on your infra or ours." primary={{ label: "Spec a model", to: "/contact" }} secondary={{ label: "RAG Chatbots", to: "/rag-chatbots" }} />
        </div>
    );
}
