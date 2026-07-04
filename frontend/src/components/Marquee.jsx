import React from "react";

export default function Marquee({ items = [], className = "" }) {
    const doubled = [...items, ...items];
    return (
        <div className={`marquee border-y border-white/10 bg-white/[0.02] py-3 ${className}`} data-testid="top-marquee">
            <div className="marquee-track font-mono text-xs sm:text-sm text-white/70">
                {doubled.map((t, i) => (
                    <span key={i} className="flex items-center gap-3">
                        <span className="text-brand-orange">▸</span>
                        <span>{t}</span>
                        <span className="text-white/20">|</span>
                    </span>
                ))}
            </div>
        </div>
    );
}
