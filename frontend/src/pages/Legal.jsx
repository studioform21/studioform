import React from "react";
import PageHero from "@/components/PageHero";

const COPY = {
    privacy: {
        title: "Privacy",
        accent: "Policy.",
        cmd: "studioform --privacy",
        body: [
            ["What we collect", "We collect the information you give us when you fill a form, subscribe to our newsletter, or use our products. That includes your name, work email, company, role, and the messages you send. We also collect product-usage logs from authenticated sessions."],
            ["How we use it", "To reply to your enquiries, deliver products, secure our services, and run anonymized analytics. We do not sell your personal information."],
            ["Data residency", "Customer data is processed in India by default. Enterprise contracts can pin data to specific regions."],
            ["Your rights", "You can request access, correction, or deletion of your personal data at any time by writing to privacy@studio-form.app."],
            ["Cookies", "We use minimal first-party cookies for session state and anonymized analytics. No third-party advertising cookies."],
            ["Updates", "We will publish a changelog of policy updates and notify subscribers when material changes occur."],
        ],
    },
    terms: {
        title: "Terms of",
        accent: "Service.",
        cmd: "studioform --terms",
        body: [
            ["Acceptance", "By using studio-form.app and our products, you agree to these terms. If you don't agree, please don't use the services."],
            ["Use of services", "You agree to use our services lawfully and not to attempt to disrupt or reverse-engineer them. Enterprise customers have separately signed MSAs that govern usage."],
            ["Intellectual property", "Studio Form retains ownership of its trademarks, product code, models, and content. Customer data remains the property of the customer."],
            ["Service levels", "Specific SLAs are defined in your order form. The marketing claims on this site are not binding SLAs."],
            ["Limitation of liability", "Our aggregate liability is limited to fees paid by you in the prior 12 months, except for gross negligence or willful misconduct."],
            ["Governing law", "These terms are governed by the laws of India. Courts in Bengaluru shall have exclusive jurisdiction."],
        ],
    },
    refund: {
        title: "Refund",
        accent: "Policy.",
        cmd: "studioform --refund",
        body: [
            ["Scope", "This policy applies to self-serve purchases from studio-form.app. Enterprise contracts follow their own refund terms."],
            ["Cooling-off window", "If you cancel within 7 days of purchase and have not consumed material product value, we offer a full refund."],
            ["Pro-rata refunds", "For annual subscriptions cancelled mid-term, we issue a pro-rata refund on the unused months minus a 10% administrative fee."],
            ["Non-refundable items", "Custom development engagements, GPU reservations, and education programs that have started are non-refundable."],
            ["How to claim", "Email billing@studio-form.app with your order ID. We process verified refunds within 7 working days."],
        ],
    },
};

export default function Legal({ kind = "privacy" }) {
    const c = COPY[kind];
    return (
        <div>
            <PageHero command={c.cmd} title={c.title} accent={c.accent} subtitle="Last updated: February 2026. Plain English, no dark patterns." />
            <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
                {c.body.map(([t, b]) => (
                    <div key={t}>
                        <h3 className="font-display text-2xl font-bold">{t}</h3>
                        <p className="mt-3 text-white/65 leading-relaxed text-sm">{b}</p>
                    </div>
                ))}
                <div className="font-mono text-xs text-white/40 pt-6 border-t border-white/10">$ studioform --legal &nbsp;→&nbsp; for questions write to legal@studio-form.app</div>
            </section>
        </div>
    );
}
