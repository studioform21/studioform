import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { http } from "@/lib/api";
import PageHero from "@/components/PageHero";
import StatCounter from "@/components/StatCounter";
import CodeCard from "@/components/CodeCard";
import FilterableCatalogGrid from "@/components/FilterableCatalogGrid";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";
import SEOMeta from "@/components/SEOMeta";
import { fadeUp, stagger } from "@/lib/anim";

const LANGS = [
    ["English", ["US", "UK", "IN"]], ["Hindi", ["Standard", "Bhojpuri", "Bombay"]], ["Marathi", ["Pune", "Nagpur"]],
    ["Tamil", ["Chennai", "Madurai"]], ["Telugu", ["Hyd", "Andhra"]], ["Bengali", ["Kolkata", "Dhaka"]],
    ["Kannada", []], ["Malayalam", []], ["Gujarati", []], ["Punjabi", []],
    ["Odia", []], ["Urdu", []], ["Arabic", ["Gulf", "Egypt"]], ["French", []], ["Spanish", []],
];

const INTEGRATIONS = {
    "Telephony": ["Twilio", "Plivo", "Exotel", "Knowlarity", "Tata Tele"],
    "CRM": ["Salesforce", "HubSpot", "Zoho", "LeadSquared", "Freshsales"],
    "Support": ["Zendesk", "Freshdesk", "Intercom", "HelpScout"],
    "Messaging": ["WhatsApp", "Telegram", "SMS", "RCS"],
    "Automation": ["n8n", "Make", "Zapier", "Pipedream"],
    "Scheduling": ["Calendly", "Google Calendar", "Outlook"],
    "E-commerce": ["Shopify", "WooCommerce", "Magento"],
    "Payments": ["Razorpay", "Stripe", "Paytm"],
};

const PARTNERS = [
    { name: "OpenAI", popular: true, desc: "GPT-4o, Realtime API" },
    { name: "Anthropic", popular: true, desc: "Claude 4.5 Sonnet" },
    { name: "ElevenLabs", popular: true, desc: "Studio-grade TTS" },
    { name: "Deepgram", popular: false, desc: "Streaming ASR" },
    { name: "Azure Speech", popular: false, desc: "Neural voices" },
    { name: "Google Vertex", popular: false, desc: "Gemini + STT" },
];

const GROWTH = Array.from({ length: 12 }).map((_, i) => ({ m: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][i], calls: Math.round(40 + i * 22 + Math.random() * 15) }));

function VoiceCard({ item }) {
    return (
        <div className="glass-card p-5 h-full flex flex-col" data-testid={`voice-card-${item.id}`}>
            <div className="flex items-start justify-between">
                <span className="px-2 py-1 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[10px] uppercase text-white/60">{item.industry}</span>
                <span className={`px-2 py-1 rounded-full font-mono text-[10px] uppercase ${item.type === "Inbound" ? "text-brand-orange border border-brand-orange/30" : "text-white/70 border border-white/15"}`}>{item.type}</span>
            </div>
            <h3 className="mt-4 font-display text-lg font-bold">{item.name}</h3>
            <p className="mt-2 text-sm text-white/60 flex-1">{item.description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
                {item.languages.map((l) => <span key={l} className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[10px] text-white/70">{l}</span>)}
            </div>
        </div>
    );
}

const VOICE_AGENTS_STRUCTURED_DATA = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "AI Voice Agent Development",
    "name": "AI Voice Agents",
    "description": "Custom conversational AI voice agents for inbound reception, appointment booking, and outbound lead qualification with sub-800ms turn-taking latency.",
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
    "areaServed": ["IN", "US", "Global"],
    "audience": {
        "@type": "Audience",
        "audienceType": "Enterprise Business Buyers"
    },
    "offers": {
        "@type": "Offer",
        "price": "199.00",
        "priceCurrency": "USD",
        "description": "Starter subscription pricing for voice agent runtime",
        "url": "https://studioform.app/pricing"
    }
};

const SERVICE_FAQS = [
    { q: "How much does an AI voice agent cost?", a: "Starter plans begin at $199/mo, with Custom options available for high call volume environments." },
    { q: "How long does deployment take?", a: "Standard voice agents can be deployed in 2 days. Complex custom integrations take 2-4 weeks." },
    { q: "Which LLMs do you support?", a: "We support major enterprise models including GPT-4, Claude 3.5, and our fine-tuned logibrain 7B." },
    { q: "Do you integrate with CRMs?", a: "Yes. Out-of-the-box integrations include Salesforce, HubSpot, Zoho, and Tally ERP." },
    { q: "Is WhatsApp supported?", a: "Yes. Voice agents can coordinate checkouts, send reminders, and sync order files with WhatsApp Business APIs." },
    { q: "How do you achieve sub-800ms conversational turn-taking latency?", a: "Our pipeline streams raw audio directly to Whisper-based ASR models, runs inference in parallel using speculative decoding, and streams the output TTS neural synthetic voices straight back to the telephony trunk, keeping turn gaps under 800ms." },
    { q: "Is call barge-in and interruption supported?", a: "Yes, our voice agents feature real-time interruption detection. The moment a user speaks over the agent, the synthesization stream cancels instantly, allowing the agent to listen, process, and respond naturally." },
    { q: "How do you handle background noise in call center environments?", a: "We deploy proprietary audio filtering and noise cancellation layers at the SIP trunk level, separating the caller's voice from environmental sounds to ensure high ASR transcription accuracy." },
    { q: "Are conversations compliant with Indian data privacy rules?", a: "Yes, Studio Form voice agents are designed with compliance at the core. We support private VPC sandboxing and on-premise GPU hosting that prevents data logging, fully conforming to India's DPDP Act of 2023." },
    { q: "Can the voice agent transfer a call to a live human operator?", a: "Yes. We support both warm and cold live transfers. If the agent encounters a query out of its domain bounds or if the customer requests a human, it executes a SIP refer transfer to your active call center staff." }
];

export default function VoiceAgents() {
    const [items, setItems] = useState([]);
    useEffect(() => { http.get("/voice-agents").then(r => setItems(r.data.items)); }, []);
    const industries = Array.from(new Set(items.map(i => i.industry)));

    return (
        <div>
            <SEOMeta
                title="AI Voice Agents for Enterprise Telephony"
                description="Deploy production AI voice agents with low latency, Indic dialect support, and Twilio/SIP telephony."
                keywords="AI voice agents, conversational AI, Twilio voice AI, Indic language AI, contact center automation, customer service bots"
                canonicalUrl="https://studioform.app/services/voice-agents"
                structuredData={VOICE_AGENTS_STRUCTURED_DATA}
                faqs={SERVICE_FAQS}
            />
            <PageHero command="studioform --voice" eyebrow="Voice AI" title="Custom multilingual" accent="voice agents." subtitle="Inbound, outbound, and bilingual conversational voice agents built for your scale.">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
                    <StatCounter value={5} suffix="" label="Active Pilots" />
                    <StatCounter value={3} suffix="" label="Languages" />
                    <StatCounter value="SLA" suffix=" Target" label="Telephony Uptime" />
                    <StatCounter value="Low" suffix="" label="Turn Latency" />
                </div>
            </PageHero>

            {/* AEO/GEO direct answer block */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4">
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 text-sm text-white/80 leading-relaxed shadow-lg">
                    <span className="font-mono text-brand-orange font-bold mr-1.5">[TL;DR]</span>
                    Studio Form deploys custom, low-latency AI voice agents for enterprise contact centers. Supporting multilingual Indic regional dialects (Hindi, Marathi, Tamil, etc.), our agents integrate directly with existing SIP trunks, Twilio, or Exotel. They deliver sub-800ms conversational turn-taking latency and direct CRM synchronization.
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-5 gap-6 mb-12">
                    <div className="lg:col-span-3 glass-card p-6">
                        <div className="font-mono text-xs text-white/40 mb-3">$ studioform --calls-growth</div>
                        <div className="font-display text-2xl font-bold mb-4">Calls processed — 12-month trend</div>
                        <div className="h-56">
                            <ResponsiveContainer>
                                <LineChart data={GROWTH}>
                                    <XAxis dataKey="m" stroke="#666" tick={{ fontSize: 11 }} />
                                    <YAxis stroke="#666" tick={{ fontSize: 11 }} />
                                    <Tooltip contentStyle={{ background: "#0A0A0A", border: "1px solid #222" }} />
                                    <Line type="monotone" dataKey="calls" stroke="#F47B3F" strokeWidth={2} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <CodeCard filename="voice.json">
                            <div className="space-y-1 text-white/80">
                                <div><span className="text-brand-orange">▸</span> Streaming ASR &lt; 250ms</div>
                                <div><span className="text-brand-orange">▸</span> Barge-in &amp; interruption handling</div>
                                <div><span className="text-brand-orange">▸</span> 15+ languages, 40+ accents</div>
                                <div><span className="text-brand-orange">▸</span> CRM-aware, tool-using agents</div>
                                <div><span className="text-brand-orange">▸</span> Compliance-grade recordings</div>
                            </div>
                        </CodeCard>
                    </div>
                </div>

                <SectionHeader command="studioform --languages" title="What regional languages" accentInTitle="and dialects are supported?" />
                <div className="flex flex-wrap gap-2 mb-12">
                    {LANGS.map(([lang, accents]) => (
                        <div key={lang} className="px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-sm" data-testid={`lang-${lang}`}>
                            <span className="font-medium">{lang}</span>
                            {accents.length > 0 && <span className="ml-2 text-white/40 font-mono text-[11px]">{accents.join(" · ")}</span>}
                        </div>
                    ))}
                </div>

                <SectionHeader command="studioform --integrations" title="Which enterprise software" accentInTitle="platforms integrate natively?" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                    {Object.entries(INTEGRATIONS).map(([cat, list], i) => (
                        <motion.div key={cat} {...stagger(i)} className="glass-card p-5">
                            <div className="font-mono text-xs uppercase text-brand-orange mb-3">{cat}</div>
                            <div className="flex flex-wrap gap-1.5">
                                {list.map((n) => <span key={n} className="px-2 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs">{n}</span>)}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <SectionHeader command="studioform --partners" title="Which underlying AI models" accentInTitle="and speech stacks power the agents?" />
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-16">
                    {PARTNERS.map((p, i) => (
                        <motion.div key={p.name} {...stagger(i)} className="glass-card p-5 relative">
                            {p.popular && <span className="absolute top-3 right-3 px-1.5 py-0.5 rounded-full bg-brand-orange/15 border border-brand-orange/40 font-mono text-[9px] uppercase text-brand-orange">popular</span>}
                            <div className="font-display text-lg font-bold">{p.name}</div>
                            <div className="mt-1 text-xs text-white/50">{p.desc}</div>
                        </motion.div>
                    ))}
                </div>

                <SectionHeader command="studioform --catalog" title="What production-ready AI voice agent" accentInTitle="templates can you deploy?" />
                <FilterableCatalogGrid
                    items={items}
                    facets={[{ key: "industry", label: "industry", options: industries }, { key: "type", label: "type", options: ["Inbound", "Outbound"] }]}
                    searchPlaceholder="$ find 'voice agent'..."
                    renderCard={(v) => <VoiceCard item={v} />}
                    testid="voice-grid"
                />
            </section>

            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
                <SectionHeader command="studioform --faqs" title="Frequently Asked" accentInTitle="Questions" />
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                    {SERVICE_FAQS.map((faq, idx) => (
                        <div key={idx} className="glass-card p-5">
                            <h4 className="font-bold text-sm text-white">{faq.q}</h4>
                            <p className="mt-2 text-xs text-white/60 leading-relaxed">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </section>

            <CTASection title="Ship a voice agent in 2 weeks." subtitle="From phone number to production conversation — we handle telephony, NLU, CRM, and ops." primary={{ label: "Book a voice demo", to: "/contact" }} secondary={{ label: "See products", to: "/products" }} />
        </div>
    );
}