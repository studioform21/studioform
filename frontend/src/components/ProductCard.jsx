import React from "react";

export default function ProductCard({ item }) {
    return (
        <div className="glass-card p-5 h-full flex flex-col group" data-testid={`product-card-${item.id}`}>
            <div className="flex items-start justify-between gap-3">
                <span className="px-2 py-1 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[10px] uppercase text-white/60">{item.category}</span>
                <span className={`flex items-center gap-1.5 px-2 py-1 rounded-full font-mono text-[10px] uppercase ${item.status === "Live" ? "text-brand-orange border border-brand-orange/30 bg-brand-orange/5" : "text-white/60 border border-white/10"}`}>
                    {item.status === "Live" && <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />} {item.status}
                </span>
            </div>
            <h3 className="mt-4 font-display text-xl font-bold leading-tight group-hover:text-brand-orange transition-colors">{item.name}</h3>
            <p className="mt-2 text-sm text-white/60 leading-relaxed flex-1">{item.description}</p>
            {item.tags && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                    {item.tags.slice(0, 4).map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[10px] text-white/70">{t}</span>
                    ))}
                </div>
            )}
        </div>
    );
}
