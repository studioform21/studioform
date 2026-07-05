import React from "react";
import { useParams, Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import SEOMeta from "@/components/SEOMeta";
import { ArrowLeft, Clock, BarChart2, ShieldAlert, Check } from "lucide-react";

const CATALOG_DATA = [
    {
        id: "ai-call-center",
        title: "Autonomous Voice Agent Call Center",
        client: "Logistics Group, Mumbai",
        metric: "Handled 50,000+ Calls",
        outcome: "Reduced support operations overhead by 60% and slashed caller wait time to 0 seconds.",
        excerpt: "Scaling inbound client bookings and outbound dispatch validation with dialect-aware voice bots."
    },
    {
        id: "hospital-chatbot",
        title: "Zero-Hallucination Patient Helper Chatbot",
        client: "Apex Healthcare Groups",
        metric: "Saved 500+ Doctor Hours",
        excerpt: "Connecting medical records and patient symptom sheets securely via permission-aware RAG.",
        outcome: "Automated triage responses for patient enquiries, lowering doctor diagnostic prep time by 30%."
    },
    {
        id: "whatsapp-automation",
        title: "Conversational WhatsApp Checkout Engine",
        client: "TrendVibe E-commerce Startup",
        metric: "Generated 3x Leads & Orders",
        excerpt: "Integrating inventory catalog browsing, recommendations, and checkout links inside WhatsApp.",
        outcome: "Created a conversational checkout pipeline, boosting checkout conversions by 40%."
    }
];

const CASE_STUDY_DETAILS = {
    "ai-call-center": {
        title: "AI Voice Call Center Integration",
        client: "Logistics Group, Mumbai",
        challenge: "The client faced high call drop rates during peak dispatch hours. Inbound booking inquiries were backed up, and manually calling drivers for delivery validation took hundreds of staff hours daily.",
        solution: "Deployed 52+ dialect-aware inbound/outbound voice agents integrated directly into Twilio and Tally ERP. The bots handle dispatch inquiries, validation codes, and consignee confirmations dynamically.",
        metrics: [
            { label: "Calls Handled", value: "50,000+" },
            { label: "Wait Time", value: "0 sec" },
            { label: "Cost Reduced", value: "60%" }
        ],
        architecture: [
            "SIP Trunking ➔ Twilio Media Streams ➔ Custom ASR (indic dialect model)",
            "ASR Text ➔ Studio Form LLM (LogiBrain 7B) ➔ Custom TTS (Marathi/Hindi/English)",
            "System Action ➔ ERP/Database API Call"
        ],
        structuredData: {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Case Study: Autonomous Voice Agent Call Center",
            "description": "How a major logistics group handled 50,000+ calls and reduced support overhead by 60% with Studio Form AI Voice Agents.",
            "author": { "@type": "Organization", "name": "Studio Form" }
        }
    },
    "hospital-chatbot": {
        title: "Zero-Hallucination Patient Helper Chatbot",
        client: "Apex Healthcare Groups",
        challenge: "Patients called clinic staff repeatedly for report explanations and appointment bookings. Medical compliance prohibited using standard GPT wrappers due to hallucination risks and patient data leakage.",
        solution: "Built a private, secure RAG chatbot using MedLM 13B and strict role-based access control. The bot processes patient PDFs, cross-checks clinical guidelines, and answers questions with layout-aware source citations.",
        metrics: [
            { label: "Hours Saved", value: "500+" },
            { label: "Accuracy", value: "99.9%" },
            { label: "Resolution", value: "85%" }
        ],
        architecture: [
            "Patient Portal ➔ Encrypted Session ➔ Guardrail Layer (symptom boundary check)",
            "MedLM Vector Storage ➔ Dual-embed verification ➔ Source citation extraction",
            "Response Rendering ➔ Page-level PDF links"
        ],
        structuredData: {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Case Study: Healthcare Patient Helper RAG Chatbot",
            "description": "How Apex Healthcare Groups saved 500+ doctor hours using secure, layout-aware patient RAG chatbots.",
            "author": { "@type": "Organization", "name": "Studio Form" }
        }
    },
    "whatsapp-automation": {
        title: "Conversational WhatsApp Checkout Engine",
        client: "TrendVibe E-commerce Startup",
        challenge: "High cart abandonment rates on mobile screens. Users dropped off during payment redirect flows, and manual customer follow-ups on WhatsApp were slow and failed to scale.",
        solution: "Built a dynamic WhatsApp chatbot that synchronizes real-time Shopify catalogs. The bot recommends products using customer history, handles order sizing/selections, and sends Razorpay secure links inside the chat.",
        metrics: [
            { label: "Leads Generated", value: "3x" },
            { label: "Conversions Boosted", value: "40%" },
            { label: "Response Time", value: "<1 sec" }
        ],
        architecture: [
            "WhatsApp Business API ➔ Webhook Listener ➔ Intent Classifier",
            "Shopify API sync ➔ Custom Recommendation Engine ➔ Razorpay links generator",
            "Chat Session ➔ Automated abandoned-cart recovery loop"
        ],
        structuredData: {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Case Study: WhatsApp E-commerce Checkout Automation",
            "description": "How TrendVibe generated 3x leads and boosted conversion rates by 40% using conversational WhatsApp bots.",
            "author": { "@type": "Organization", "name": "Studio Form" }
        }
    }
};

export default function CaseStudies() {
    const { caseStudyId } = useParams();

    if (caseStudyId && CASE_STUDY_DETAILS[caseStudyId]) {
        const cs = CASE_STUDY_DETAILS[caseStudyId];
        return (
            <div>
                <SEOMeta
                    title={`${cs.title} Case Study`}
                    description={`Read the full case study: How Studio Form implemented ${cs.title} for ${cs.client}.`}
                    keywords={`AI case study, ${caseStudyId}, AI ROI, business automation, Studio Form case studies`}
                    structuredData={cs.structuredData}
                />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Link to="/case-studies" className="inline-flex items-center gap-2 text-xs text-white/50 hover:text-brand-orange transition mb-6">
                        <ArrowLeft size={14} /> Back to Case Studies
                    </Link>
                </div>

                <PageHero 
                    command={`studioform --case-study "${caseStudyId}"`}
                    eyebrow="Case Study" 
                    title={cs.title} 
                    accent={cs.client}
                />

                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="glass-card p-6">
                            <h3 className="font-display text-xl font-bold mb-4">The Challenge</h3>
                            <p className="text-sm text-white/70 leading-relaxed">{cs.challenge}</p>
                        </div>

                        <div className="glass-card p-6">
                            <h3 className="font-display text-xl font-bold mb-4">Our Solution</h3>
                            <p className="text-sm text-white/70 leading-relaxed">{cs.solution}</p>
                        </div>

                        <div className="glass-card p-6">
                            <h3 className="font-display text-xl font-bold mb-4">System Architecture</h3>
                            <ul className="mt-4 space-y-3 font-mono text-xs text-white/60">
                                {cs.architecture.map((step, idx) => (
                                    <li key={idx} className="flex gap-2 items-start">
                                        <span className="text-brand-orange shrink-0">[{idx + 1}]</span>
                                        <span>{step}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="glass-card p-6 border-brand-orange/40">
                            <h3 className="font-display text-lg font-bold mb-4 text-brand-orange">Key Outcomes</h3>
                            <div className="space-y-6">
                                {cs.metrics.map((m) => (
                                    <div key={m.label} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                                        <div className="text-3xl font-display font-bold text-white">{m.value}</div>
                                        <div className="text-xs text-white/40 font-mono mt-1 uppercase">{m.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass-card p-6">
                            <h4 className="font-bold text-sm">Need similar results?</h4>
                            <p className="mt-2 text-xs text-white/50">Let's hop on a 15-minute engineering call to analyze your current workflow operations.</p>
                            <Link to="/contact" className="mt-4 w-full block text-center py-2.5 rounded-full bg-brand-orange text-black font-medium text-xs">
                                Book a Strategy Call
                            </Link>
                        </div>
                    </div>
                </section>

                <CTASection 
                    title="Unlock your business potential."
                    subtitle="We build, customize, deploy, and operationalize custom AI agents tailored to your business needs."
                    primary={{ label: "Get started", to: "/contact" }}
                    secondary={{ label: "See all services", to: "/services/ai-agents" }}
                />
            </div>
        );
    }

    // Catalog page
    const CATALOG_STRUCTURED_DATA = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "AI Case Studies | Studio Form",
        "description": "Read real-world case studies detailing business outcomes, saved hours, and cost reductions achieved with custom AI systems.",
        "url": "https://studio-form.app/case-studies"
    };

    return (
        <div>
            <SEOMeta
                title="AI Case Studies"
                description="Read case studies on Studio Form's deployed AI systems: voice call centers, patient RAG chatbots, and WhatsApp checkouts."
                keywords="AI case studies, voice bot case study, healthcare chatbot ROI, retail checkout automation case study"
                structuredData={CATALOG_STRUCTURED_DATA}
            />
            <PageHero 
                command="studioform --case-studies" 
                eyebrow="Case Studies" 
                title="Real code," 
                accent="real business outcomes." 
                subtitle="Demos are nice. Deployed systems that generate value and cut operational overhead are better."
            />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-3 gap-8">
                    {CATALOG_DATA.map((cs) => (
                        <div key={cs.id} className="glass-card p-6 flex flex-col h-full hover:border-brand-orange/40 transition-colors duration-300">
                            <span className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[9px] text-white/40 w-fit uppercase">
                                {cs.client}
                            </span>
                            <div className="mt-4 text-2xl font-bold font-display text-brand-orange">{cs.metric}</div>
                            <h3 className="mt-2 font-display text-xl font-bold text-white leading-snug">{cs.title}</h3>
                            <p className="mt-3 text-sm text-white/60 flex-1">{cs.outcome || cs.excerpt}</p>
                            <Link 
                                to={`/case-studies/${cs.id}`} 
                                className="mt-6 inline-flex items-center gap-2 text-xs font-mono text-brand-orange hover:text-white transition-colors"
                                data-testid={`case-link-${cs.id}`}
                            >
                                read full case study →
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            <CTASection />
        </div>
    );
}
