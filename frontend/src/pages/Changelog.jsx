import React from "react";
import PageHero from "@/components/PageHero";
import SEOMeta from "@/components/SEOMeta";

const CHANGELOG_BREADCRUMBS = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.studioform.app"
        },
        {
            "@type": "ListItem",
            "position": 2,
            "name": "Changelog",
            "item": "https://www.studioform.app/changelog"
        }
    ]
};

const CHANGELOG_PAGE_SCHEMA = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebPage",
            "@id": "https://www.studioform.app/changelog#webpage",
            "url": "https://www.studioform.app/changelog",
            "name": "Public Changelog | Studio Form",
            "description": "Factual release log of system shipments, version updates, and core engineering releases.",
            "isPartOf": {
                "@type": "WebSite",
                "@id": "https://www.studioform.app/#website",
                "url": "https://www.studioform.app",
                "name": "Studio Form"
            }
        },
        {
            "@type": "Article",
            "@id": "https://www.studioform.app/changelog#article",
            "isPartOf": {
                "@id": "https://www.studioform.app/changelog#webpage"
            },
            "headline": "Studio Form System Release Changelog",
            "description": "Release log of version updates and engineering shipments.",
            "datePublished": "2026-06-28T00:00:00+05:30",
            "dateModified": "2026-07-05T12:00:00+05:30",
            "author": {
                "@type": "Organization",
                "name": "Studio Form"
            },
            "publisher": {
                "@type": "Organization",
                "@id": "https://www.studioform.app/#organization",
                "name": "Studio Form",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://www.studioform.app/logo_dark.png"
                }
            }
        }
    ]
};

const RELEASES = [
    {
        version: "v1.9.0",
        date: "July 5, 2026",
        headline: "Dynamic SEO Schemas, Automated Sitemaps, and Merchant Compliance",
        items: [
            "Added automated post-build XML sitemap generation tracking 42 unique indexable routes.",
            "Implemented dynamic BreadcrumbList and FAQPage JSON-LD schema builder modules.",
            "Integrated Vercel HTTP security headers (CSP, HSTS, X-Frame-Options, Referrer-Policy).",
            "Deployed Shipping & Delivery and Cancellation compliance policies in footer coordinates.",
            "Installed Google Tag Manager and GA4 gtag.js tracking tags in index.html template."
        ]
    },
    {
        version: "v1.8.1",
        date: "July 2, 2026",
        headline: "Indicator Dialect Telephony Parsing Upgrades",
        items: [
            "Improved NLU speech transcription pipelines for Indic dialect patterns (Marathi, Bengali).",
            "Optimized call center webhook retry intervals for reliable database syncing.",
            "Resolved coordinate layouts for mobile dashboard graphs."
        ]
    },
    {
        version: "v1.8.0",
        date: "June 28, 2026",
        headline: "Initial Platform & Database Infrastructure Release",
        items: [
            "Deployed FastAPI backend operational framework integrated with MongoDB collections.",
            "Launched initial frontend templates including Home, Services, Industries, and Docs modules.",
            "Configured core Axios API client hooks with environment-aware baseURL fallback settings."
        ]
    }
];

export default function Changelog() {
    return (
        <div className="bg-[#0A0A0A] text-white min-h-screen">
            <SEOMeta
                title="System Changelog"
                description="Review factual system updates, release versions, and shipment logs for the Studio Form platform."
                keywords="changelog, version log, product updates, software releases, Studio Form changelog"
                structuredData={CHANGELOG_PAGE_SCHEMA}
            />

            <PageHero
                command="studioform --changelog"
                eyebrow="System Releases"
                title="Public"
                accent="changelog."
                subtitle="Factual, version-controlled updates of the Studio Form engine. Last updated: July 5, 2026."
            />

            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="relative border-l border-white/10 ml-4 sm:ml-6 space-y-12">
                    {RELEASES.map((rel) => (
                        <div key={rel.version} className="relative pl-8 sm:pl-10">
                            {/* Bullet dot */}
                            <span className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] rounded-full bg-brand-orange ring-4 ring-[#0A0A0A]" />

                            {/* Release Version Header */}
                            <div className="flex flex-wrap items-baseline gap-3 mb-2">
                                <span className="font-mono text-lg font-bold text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded">
                                    {rel.version}
                                </span>
                                <span className="text-white/40 font-mono text-xs">{rel.date}</span>
                            </div>

                            <h3 className="font-display text-xl font-bold mb-4 text-white/90">
                                {rel.headline}
                            </h3>

                            {/* Factual Updates List */}
                            <ul className="space-y-3 font-mono text-sm text-white/60">
                                {rel.items.map((item, idx) => (
                                    <li key={idx} className="flex gap-2">
                                        <span className="text-brand-orange select-none">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
