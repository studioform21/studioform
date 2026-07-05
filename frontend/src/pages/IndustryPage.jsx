import React from "react";
import { useParams, Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import SEOMeta from "@/components/SEOMeta";
import { Shield, Sparkles, Zap, ArrowRight } from "lucide-react";

const INDUSTRIES_DETAILS = {
    "healthcare": {
        title: "AI Solutions for Healthcare",
        desc: "Empower clinical operations, schedule patient queues, and automate medical document processing securely and accurately.",
        painPoints: [
            ["Clinical Overburden", "Doctors spend hours formatting discharge summaries, EHR forms, and clinical logs manually."],
            ["Appointment Drops", "Clinics face 30% drop rates due to slow response times on scheduling channels."],
            ["Compliance Headaches", "Patient data leakage risks prevent adoption of generic GPT tools."]
        ],
        solutions: [
            ["MediLM EHR Summarizer", "Fine-tuned healthcare models to structure dictations into compliant reports automatically."],
            ["Voice Triage Agents", "Dialect-aware voice agents that confirm bookings, route calls, and answer basic clinic questions 24/7."],
            ["Secure Patient RAG", "Strict HIPAA-compliant vector systems for private patient database interactions."]
        ],
        stats: [
            { label: "Hours Saved", value: "500+" },
            { label: "Accuracy", value: "99.9%" }
        ],
        caseStudyLink: "/case-studies/hospital-chatbot"
    },
    "real-estate": {
        title: "AI Solutions for Real Estate",
        desc: "Automate lead capture, follow-up scheduling, and property catalogs recommendations for agencies and builders.",
        painPoints: [
            ["Leads Leaks", "50% of real estate leads go cold because reps reply hours later rather than seconds."],
            ["Repetitive Calls", "Brokers spend hours telling clients square footage, price tags, and project locations."],
            ["Listing Disconnect", "Catalog updates are slow, and matching listings to prospective buyer criteria is manual."]
        ],
        solutions: [
            ["Dynamic Voice Lead-Catcher", "Voice agents that call inbound leads instantly, pre-qualifying intent and scheduling visits."],
            ["WhatsApp Catalog Bots", "Interactive WhatsApp chat pipelines showing floor plans, photos, and payment terms on demand."],
            ["Smart Recommendation Engines", "Matches buyers to active inventory listings based on natural language queries."]
        ],
        stats: [
            { label: "Lead Response", value: "<30s" },
            { label: "Conversion Rate", value: "+35%" }
        ],
        caseStudyLink: "/case-studies"
    },
    "ecommerce": {
        title: "AI Solutions for E-commerce",
        desc: "Convert mobile traffic inside WhatsApp, automate checkout pipelines, and retrieve answers from product sheets.",
        painPoints: [
            ["Cart Abandonment", "Over 70% of shoppers drop off at checkout screens, especially on mobile web redirects."],
            ["Support Volumes", "Support queues are clogged with redundant queries regarding refund status, sizing, and shipping trackings."],
            ["Personalization Gaps", "Generic upsell recommendations fail to convert modern consumers."]
        ],
        solutions: [
            ["WhatsApp Checkout Engine", "Browse catalogs, select size/color, and complete Razorpay checkouts directly inside WhatsApp."],
            ["Refund/Tracking Bots", "Synced with Shopify/ERP to resolve logistics queries in seconds without human touch."],
            ["Contextual Product Advisors", "RAG-driven shopping assistants that understand product parameters and guide customer searches."]
        ],
        stats: [
            { label: "Conversions Boosted", value: "40%" },
            { label: "Order Volume", value: "3x" }
        ],
        caseStudyLink: "/case-studies/whatsapp-automation"
    },
    "education": {
        title: "AI Solutions for Education",
        desc: "Empower university curriculum design, implement AI coding labs, and automate student admissions queries.",
        painPoints: [
            ["Curriculum Gaps", "Traditional colleges struggle to design practical AI/ML courses aligned with fast industry shifts."],
            ["Admissions Traffic", "Helpdesks are overwhelmed with admissions, fee structures, and campus queries during entry cycles."],
            ["Student Retention", "Self-paced study pipelines suffer from 90% student dropouts without personal code assistance."]
        ],
        solutions: [
            ["University AI Labs", "Pre-designed courses, faculty bootcamps, and on-site AI learning clusters deployed in weeks."],
            ["Admissions Voice Agents", "Inbound voice support routing fees, eligibility criteria, and booking campus tours."],
            ["AI Coding Co-Builder", "Local code assistance instances matching university syllabi to guide student labs."]
        ],
        stats: [
            { label: "Colleges Active", value: "120+" },
            { label: "Faculty Trained", value: "9,500+" }
        ],
        caseStudyLink: "/ai-university"
    },
    "finance": {
        title: "AI Solutions for Finance & Banking",
        desc: "Automate invoice reconciliation, validate tax compliance, and accelerate loan application document reviews.",
        painPoints: [
            ["Manual Accounting", "Accountants manually key in invoices, code GL accounts, and reconcile ledger records."],
            ["Compliance Errors", "Filing GST/ROC without strict checks results in regulatory audits and late penalties."],
            ["Document Backlogs", "Mortgage, loan, and KYC processing pipelines suffer from long multi-day manual checks."]
        ],
        solutions: [
            ["Invoice Ledger Automation", "Extract fields, validate GST numbers, match purchase orders, and push to Zoho/Tally in under 30s."],
            ["Compliance Guardrails", "Automated pre-filing validation checks comparing accounting records with tax guidelines."],
            ["Dynamic Document Evaluators", "High-throughput OCR and verification loops matching KYC files against registry bases."]
        ],
        stats: [
            { label: "Processing Time", value: "-80%" },
            { label: "Compliance Rate", value: "100%" }
        ],
        caseStudyLink: "/case-studies"
    },
    "manufacturing": {
        title: "AI Solutions for Manufacturing",
        desc: "Streamline procurement orders, optimize supplier coordination, and monitor quality audits via computer vision.",
        painPoints: [
            ["Procurement Delay", "Purchasing teams spend days exchanging RFQs, emails, and order specifications with suppliers."],
            ["Manual Inspection", "Visual product quality audits on rapid assembly lines suffer from human fatigue errors."],
            ["Manual Routing Sheets", "Re-allocating floor dispatches and driver tasks on daily shifts is manual and inefficient."]
        ],
        solutions: [
            ["Autonomous Buying Agents", "Procurement bots that draft emails, compare vendor bids, and issue purchase orders."],
            ["Assembly Vision Auditing", "Computer vision nodes deployed on manufacturing lines to identify flaws and flag alerts."],
            ["AI Shift & Route Dispatch", "Reasoning agents that allocate driver routes and shift sheets dynamically from telemetry inputs."]
        ],
        stats: [
            { label: "RFQ Cycle", value: "-60%" },
            { label: "Quality Accuracy", value: "99.8%" }
        ],
        caseStudyLink: "/case-studies/ai-call-center"
    }
};

export default function IndustryPage() {
    const { industryId } = useParams();
    const ind = INDUSTRIES_DETAILS[industryId];

    if (!ind) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold font-display">Industry Not Found</h2>
                    <Link to="/" className="text-brand-orange mt-4 inline-block text-sm">Return Home</Link>
                </div>
            </div>
        );
    }

    const STRUCTURED_DATA = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": ind.title,
        "description": ind.desc,
        "provider": {
            "@type": "Organization",
            "name": "Studio Form",
            "url": "https://studio-form.app"
        }
    };

    return (
        <div>
            <SEOMeta
                title={ind.title}
                description={ind.desc}
                keywords={`AI for ${industryId}, enterprise AI ${industryId}, ${industryId} automation, Studio Form`}
                structuredData={STRUCTURED_DATA}
            />
            <PageHero 
                command={`studioform --industry "${industryId}"`} 
                eyebrow="Industries" 
                title={ind.title} 
                accent={industryId}
                subtitle={ind.desc}
            >
                <div className="grid grid-cols-2 gap-6 max-w-sm mt-4">
                    {ind.stats.map((s) => (
                        <div key={s.label} className="glass-card p-4">
                            <div className="text-2xl font-bold font-display text-brand-orange">{ind.value || s.value}</div>
                            <div className="text-[10px] text-white/50 uppercase font-mono mt-1">{ind.label || s.label}</div>
                        </div>
                    ))}
                </div>
            </PageHero>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-10">
                <div>
                    <div className="font-mono text-xs uppercase text-brand-orange mb-4">Core Pain Points</div>
                    <div className="space-y-6">
                        {ind.painPoints.map(([title, body]) => (
                            <div key={title} className="glass-card p-5 border-l-2 border-l-red-500/40">
                                <h3 className="font-display font-bold text-lg text-white">{title}</h3>
                                <p className="mt-2 text-sm text-white/60 leading-relaxed">{body}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="font-mono text-xs uppercase text-brand-orange mb-4">Our AI Solutions</div>
                    <div className="space-y-6">
                        {ind.solutions.map(([title, body]) => (
                            <div key={title} className="glass-card p-5 border-l-2 border-l-brand-orange/40">
                                <h3 className="font-display font-bold text-lg text-white">{title}</h3>
                                <p className="mt-2 text-sm text-white/60 leading-relaxed">{body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="font-display text-xl font-bold">See this system in action.</h3>
                    <p className="text-sm text-white/60 mt-1">Read the client deployment case study details regarding key outcomes.</p>
                </div>
                <Link to={ind.caseStudyLink} className="px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-brand-orange hover:text-brand-orange transition-all duration-300 inline-flex items-center gap-2 text-sm">
                    Read Case Study <ArrowRight size={14} />
                </Link>
            </section>

            <CTASection />
        </div>
    );
}
