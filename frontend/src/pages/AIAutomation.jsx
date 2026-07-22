import React from "react";
import PageHero from "@/components/PageHero";
import StatCounter from "@/components/StatCounter";
import CodeCard, { Cmt, Kw, Str } from "@/components/CodeCard";
import FilterableCatalogGrid from "@/components/FilterableCatalogGrid";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";
import SEOMeta from "@/components/SEOMeta";

const AUTOMATION_STRUCTURED_DATA = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Enterprise AI Automation",
    "name": "AI Automation Workflows",
    "description": "Custom agentic AI automation workflows and integrations with CRMs, databases, and communication channels for enterprise operations.",
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

const WORKFLOWS = [
    { id: "w-01", name: "Sales Lead Auto-Qualifier", category: "Sales", trigger: "New CRM lead", desc: "Enriches, scores, books a demo, and notifies the rep — under 30 seconds." },
    { id: "w-02", name: "Invoice → Ledger", category: "Finance", trigger: "Email invoice", desc: "OCR, GL coding, GST validation, push to Zoho/Tally with approval workflow." },
    { id: "w-03", name: "Support Ticket Triage", category: "Support", trigger: "Zendesk ticket", desc: "Classifies intent, drafts response, assigns to right agent." },
    { id: "w-04", name: "Resume Screener", category: "HR", trigger: "Naukri/LinkedIn apply", desc: "Parses, scores against JD, schedules screening call." },
    { id: "w-05", name: "WhatsApp Order Bot", category: "E-commerce", trigger: "WhatsApp message", desc: "Browses catalog, takes order, accepts payment, prints invoice." },
    { id: "w-06", name: "Compliance Filing Reminder", category: "Finance", trigger: "Date / schedule", desc: "GST, TDS, ROC filings — reminders, prefilled forms, partner handoff." },
    { id: "w-07", name: "Field Service Dispatch", category: "Ops", trigger: "Service request", desc: "Assigns nearest technician, optimises route, books slot, sends OTP." },
    { id: "w-08", name: "Social Listening → Brief", category: "Marketing", trigger: "Daily 8AM", desc: "Scans Twitter/Reddit, summarises brand mentions and competitor moves." },
    { id: "w-09", name: "Doctor Note → Discharge Summary", category: "Healthcare", trigger: "Voice dictation", desc: "Transcribes, structures, populates HIS, sends to patient." },
    { id: "w-10", name: "Driver POD Loop", category: "Logistics", trigger: "Delivery scan", desc: "Captures photo, calls consignee, marks delivered with signature." },
    { id: "w-11", name: "Refund Auto-Decision", category: "Support", trigger: "Refund request", desc: "Policy check, fraud scoring, auto-approve or human escalate." },
    { id: "w-12", name: "Meeting → CRM Update", category: "Sales", trigger: "Calendar end", desc: "Transcribes call, extracts next steps, updates CRM, drafts follow-up." },
];

function WfCard({ item }) {
    return (
        <div className="glass-card p-5 h-full flex flex-col" data-testid={`wf-card-${item.id}`}>
            <span className="px-2 py-1 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[10px] uppercase text-brand-orange w-fit">{item.category}</span>
            <h3 className="mt-3 font-display text-lg font-bold">{item.name}</h3>
            <p className="mt-2 text-sm text-white/60 flex-1">{item.desc}</p>
            <div className="mt-3 font-mono text-[11px] text-white/40">trigger: <span className="text-white/70">{item.trigger}</span></div>
        </div>
    );
}

const AUTOMATION_FAQS = [
    { q: "What is an AI Automation workflow?", a: "It is an automated sequence that triggers from your apps (e.g. CRM, email, forms) and uses AI to qualify, reconcile, route, or output data automatically." },
    { q: "How do you handle human reviews?", a: "We build human-in-the-loop triggers. For high-risk decisions (like payments or patient health dispatches), the AI halts and prompts a manager via Slack or email before proceeding." },
    { q: "Which automation platforms do you support?", a: "We deploy workflows natively using n8n, Make, Zapier, or our custom high-scale Node/Python runtime servers." },
    { q: "How secure is data processing?", a: "Data is processed entirely within encrypted sessions. We support private VPC hosting to comply with strict banking and health regulations." },
    { q: "What is the setup time for a catalog workflow?", a: "Browsed catalog workflows can be customized and deployed to production in 2-4 working days." }
];

export default function AIAutomation() {
    const cats = Array.from(new Set(WORKFLOWS.map(w => w.category)));
    return (
        <div>
            <SEOMeta
                title="AI Automation Workflows"
                description="Browse and deploy custom agentic AI automation workflows across sales, finance, support, HR, and ops."
                keywords="AI automation, workflow automation, RPA, agentic workflows, CRM automation, invoice OCR automation, Studio Form workflows"
                structuredData={AUTOMATION_STRUCTURED_DATA}
                faqs={AUTOMATION_FAQS}
            />
            <PageHero command="studioform --automation" eyebrow="AI Automation" title="AI workflows." accent="Browse. Pick. Deploy.">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
                    <StatCounter value={25} suffix="+" label="Workflows" />
                    <StatCounter value="Multi" suffix="-App" label="Integrations" />
                    <StatCounter value="Rapid" suffix="" label="Deployment" />
                    <StatCounter value="SLA" suffix=" Backed" label="Runner Uptime" />
                </div>
            </PageHero>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <CodeCard filename="automation.ts" className="mb-10">
                    <div><Cmt>// Workflow runtime stats</Cmt></div>
                    <div className="mt-2"><Kw>const</Kw> runtime = {"{"}</div>
                    <div className="pl-6">runs_today: <Str>"184,205"</Str>,</div>
                    <div className="pl-6">avg_latency: <Str>"840ms"</Str>,</div>
                    <div className="pl-6">tools: <Str>"120+"</Str>,</div>
                    <div className="pl-6">human_in_loop: <Str>"configurable"</Str></div>
                    <div>{"};"}</div>
                </CodeCard>
                <FilterableCatalogGrid
                    items={WORKFLOWS}
                    facets={[{ key: "category", label: "category", options: cats }]}
                    searchPlaceholder="$ find 'automation for sales'..."
                    renderCard={(w) => <WfCard item={w} />}
                    testid="automation-grid"
                />
            </section>

            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
                <SectionHeader command="studioform --faqs" title="Frequently Asked" accentInTitle="Questions" />
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                    {AUTOMATION_FAQS.map((faq, idx) => (
                        <div key={idx} className="glass-card p-5">
                            <h4 className="font-bold text-sm text-white">{faq.q}</h4>
                            <p className="mt-2 text-xs text-white/60 leading-relaxed">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </section>

            <CTASection title="Need a workflow we don't have?" subtitle="Describe it. We build it in days, not months." primary={{ label: "Request a workflow", to: "/contact" }} secondary={{ label: "Browse products", to: "/products" }} />
        </div>
    );
}
