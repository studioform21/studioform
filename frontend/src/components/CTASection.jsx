import React from "react";
import { Link } from "react-router-dom";

export default function CTASection({ command = "studioform --deploy", title = "Ready to ship AI?", subtitle = "Pick a product, talk to us, and we'll have you in production in 2–4 weeks.", primary = { label: "Book a Demo", to: "/contact" }, secondary = { label: "Browse Products", to: "/products" } }) {
    return (
        <section className="relative overflow-hidden border-y border-white/10 bg-white/[0.02] py-20" data-testid="cta-section">
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-brand-orange/15 blur-[120px] rounded-full" />
            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="inline-flex font-mono text-xs sm:text-sm text-white/70 items-center gap-2 mb-5">
                    <span className="text-brand-orange">$</span><span className="cursor-blink">{command}</span>
                </div>
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                    {title}
                </h2>
                <p className="mt-5 text-white/60 max-w-xl mx-auto">{subtitle}</p>
                <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
                    <Link to={primary.to} className="px-6 py-3 rounded-full bg-brand-orange text-black font-medium text-sm hover:brightness-110 transition" data-testid="cta-primary">{primary.label}</Link>
                    <Link to={secondary.to} className="px-6 py-3 rounded-full border border-white/15 text-white font-medium text-sm hover:border-brand-orange hover:text-brand-orange transition" data-testid="cta-secondary">{secondary.label}</Link>
                </div>
            </div>
        </section>
    );
}
