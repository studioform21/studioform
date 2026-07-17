import React from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import SEOMeta from "@/components/SEOMeta";
import { Check, ArrowRight } from "lucide-react";

const PRICING_STRUCTURED_DATA = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "AI Services Pricing | Studio Form",
    "description": "Transparent pricing for Studio Form AI voice agents, custom LLMs, RAG chatbots, and enterprise automation integrations.",
    "url": "https://www.studioform.app/pricing"
};

const TIERS = [
    {
        name: "Starter",
        price: "$199",
        period: "per month",
        desc: "Ideal for SMBs starting their AI journey.",
        features: [
            "1 Active Voice Agent (1000 mins/mo)",
            "Standard RAG Chatbot (PDF/Notion)",
            "Up to 5 Automation Workflows",
            "Email & Slack support",
            "Shared GPU inference"
        ],
        cta: "Start Starter",
        popular: false
    },
    {
        name: "Growth",
        price: "$599",
        period: "per month",
        desc: "Perfect for scaling operations and voice call volumes.",
        features: [
            "3 Active Voice Agents (5000 mins/mo)",
            "Advanced RAG Chatbot (Notion/SQL/Drive)",
            "Up to 25 Automation Workflows",
            "24/7 priority support",
            "Dedicated GPU instance (8GB VRAM)",
            "Role-Based Access Controls"
        ],
        cta: "Upgrade to Growth",
        popular: true
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "contact sales",
        desc: "For full-scale domain LLMs and cluster deployments.",
        features: [
            "Unlimited Voice Agents & call routing",
            "Domain Fine-Tuning (Aviation/Legal/Health)",
            "Custom RAG + private hybrid vector database",
            "100+ automation workflows & API hooks",
            "Dedicated H100 cluster deployments",
            "Custom SLAs & on-site integration"
        ],
        cta: "Talk to an Engineer",
        popular: false
    }
];

export default function Pricing() {
    return (
        <div>
            <SEOMeta
                title="Pricing"
                description="Transparent pricing models for enterprise AI voice agents, custom LLM fine-tuning, RAG chatbots, and automation workflows."
                keywords="AI pricing, voice AI cost, chatbot pricing, LLM fine-tuning cost, Studio Form pricing"
                structuredData={PRICING_STRUCTURED_DATA}
            />
            <PageHero 
                command="studioform --pricing" 
                eyebrow="Pricing" 
                title="Transparent models," 
                accent="no hidden fees." 
                subtitle="From plug-and-play voice agents to full-stack domain LLM deployments, select a model that scales with you."
            />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-3 gap-8">
                    {TIERS.map((t) => (
                        <div 
                            key={t.name} 
                            className={`glass-card p-8 rounded-2xl flex flex-col relative ${t.popular ? "border-brand-orange/60 ring-2 ring-brand-orange/20" : ""}`}
                            data-testid={`pricing-tier-${t.name.toLowerCase()}`}
                        >
                            {t.popular && (
                                <span className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-brand-orange text-black text-[10px] font-mono uppercase font-bold">
                                    Most Popular
                                </span>
                            )}
                            <div className="font-mono text-xs uppercase text-brand-orange">{t.name}</div>
                            <div className="mt-4 flex items-baseline gap-2">
                                <span className="text-4xl font-bold font-display">{t.price}</span>
                                <span className="text-sm text-white/50">{t.period}</span>
                            </div>
                            <p className="mt-2 text-sm text-white/60">{t.desc}</p>
                            
                            <ul className="mt-6 space-y-3 flex-1 border-t border-white/10 pt-6">
                                {t.features.map((f) => (
                                    <li key={f} className="flex items-start gap-2.5 text-sm text-white/70">
                                        <Check size={16} className="text-brand-orange shrink-0 mt-0.5" />
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link to="/contact" className={`mt-8 w-full py-3 rounded-full font-medium text-sm transition inline-flex items-center justify-center gap-2 ${t.popular ? "bg-brand-orange text-black hover:brightness-110" : "border border-white/15 text-white hover:border-brand-orange/60"}`}>
                                {t.cta} <ArrowRight size={14} />
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
                <h3 className="font-display text-2xl font-bold text-center mb-10">Frequently Asked Questions</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="glass-card p-5">
                        <h4 className="font-bold text-sm text-white">Can I change plans later?</h4>
                        <p className="mt-2 text-xs text-white/60 leading-relaxed">Yes. You can upgrade or downgrade your tier at the start of any billing cycle. Changes to usage limits apply immediately.</p>
                    </div>
                    <div className="glass-card p-5">
                        <h4 className="font-bold text-sm text-white">What is included in the minutes?</h4>
                        <p className="mt-2 text-xs text-white/60 leading-relaxed">Minutes count the total conversation time of your active voice agents on inbound or outbound telephony channels.</p>
                    </div>
                    <div className="glass-card p-5">
                        <h4 className="font-bold text-sm text-white">Do you host on-premise?</h4>
                        <p className="mt-2 text-xs text-white/60 leading-relaxed">Yes. Enterprise custom models and RAG data pipelines can be deployed completely within your private VPC or on-prem GPU infrastructure.</p>
                    </div>
                    <div className="glass-card p-5">
                        <h4 className="font-bold text-sm text-white">Is there an implementation fee?</h4>
                        <p className="mt-2 text-xs text-white/60 leading-relaxed">Starter and Growth tiers can be configured without fees. Enterprise custom fine-tuning projects include a one-time engineering setup fee.</p>
                    </div>
                </div>
            </section>

            <CTASection 
                title="Need a custom configuration?" 
                subtitle="Get in touch with an engineer to design a custom platform configuration, dedicated hostings, or dial-in parameters." 
                primary={{ label: "Contact Sales", to: "/contact" }}
                secondary={{ label: "View Case Studies", to: "/case-studies" }}
            />
        </div>
    );
}
