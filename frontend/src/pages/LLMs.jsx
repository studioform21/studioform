import React from "react";
import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import PageHero from "@/components/PageHero";
import StatCounter from "@/components/StatCounter";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";
import SEOMeta from "@/components/SEOMeta";
import { stagger } from "@/lib/anim";

const LLMS_STRUCTURED_DATA = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Custom Domain LLM Development",
    "name": "Domain-Specific LLMs",
    "description": "Fine-tuned Large Language Models for specific enterprise domains including aviation, legal, healthcare, indic speech, and finance.",
    "provider": {
        "@type": "Organization",
        "name": "Studio Form",
        "url": "https://www.studioform.app",
        "logo": "https://www.studioform.app/logo_dark.png",
        "sameAs": [
            "https://github.com/studioform",
            "https://www.linkedin.com/company/studioform"
        ],
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Scheme 78, Vijay Nagar",
            "addressLocality": "Indore",
            "addressRegion": "Madhya Pradesh",
            "postalCode": "452010",
            "addressCountry": "IN"
        }
    },
    "areaServed": ["IN", "US", "Global"]
};

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

const LLM_FAQS = [
    { q: "What is a domain-specific LLM?", a: "It is a Large Language Model (like Llama 3) fine-tuned on custom corpora (e.g. aviation logs or Supreme Court judgments) to speak the specialized language of an industry." },
    { q: "How do you evaluate model accuracy?", a: "We run models against specialized evaluation frameworks matching your target business workflows, benchmarking against standard datasets." },
    { q: "Where do you host the models?", a: "We can host models on our optimized GPU clouds or deploy them on-premise within your private AWS/Azure VPC nodes." },
    { q: "How much data is required to fine-tune?", a: "We recommend at least 10M tokens of curated text, logs, manuals, or database sheets for specialized fine-tuning." },
    { q: "Do you support indic language LLMs?", a: "Yes. Our BharatVoice and Indic models support over 15 Indian languages, dialect variations, and code-mixed inputs." }
];

export default function LLMs() {
    return (
        <div>
            <SEOMeta
                title="Domain-Specific LLMs"
                description="Fine-tuned Large Language Models for specific enterprise domains including aviation, legal, healthcare, indic speech, and finance."
                keywords="domain LLM, private LLM, LLM fine-tuning, AviationGPT, LexBharat legal LLM, MediLM healthcare LLM, Studio Form LLMs"
                structuredData={LLMS_STRUCTURED_DATA}
                faqs={LLM_FAQS}
            />
            <PageHero command="studioform --llms" eyebrow="Domain LLMs" title="Models that actually" accent="know your industry." subtitle="Generic LLMs don't speak aviation, healthcare, or Indian law. Ours do.">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
                    <StatCounter value={4} suffix="+" label="Custom Models" />
                    <StatCounter value={4} suffix="+" label="Domains" />
                    <StatCounter value={80} suffix="M+" label="Training Tokens" />
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

            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
                <SectionHeader command="studioform --faqs" title="Frequently Asked" accentInTitle="Questions" />
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                    {LLM_FAQS.map((faq, idx) => (
                        <div key={idx} className="glass-card p-5">
                            <h4 className="font-bold text-sm text-white">{faq.q}</h4>
                            <p className="mt-2 text-xs text-white/60 leading-relaxed">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </section>

            <CTASection title="Need a model for your domain?" subtitle="We'll fine-tune, evaluate, and serve it — on your infra or ours." primary={{ label: "Spec a model", to: "/contact" }} secondary={{ label: "RAG Chatbots", to: "/rag-chatbots" }} />
        </div>
    );
}
