import React, { useEffect, useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

export default function TestimonialCarousel({ items = [] }) {
    const [i, setI] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setI((x) => (x + 1) % items.length), 5000);
        return () => clearInterval(t);
    }, [items.length]);
    if (!items.length) return null;
    const t = items[i];
    return (
        <div className="glass-card p-8 md:p-12 relative" data-testid="testimonial-carousel">
            <Quote size={36} className="text-brand-orange mb-4 opacity-60" />
            <p className="text-xl md:text-2xl font-display leading-snug text-white/90 max-w-3xl">"{t.quote}"</p>
            <div className="mt-6 flex items-center justify-between flex-wrap gap-4">
                <div>
                    <div className="font-medium text-white">{t.name}</div>
                    <div className="text-sm text-white/60">{t.role}</div>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => setI((x) => (x - 1 + items.length) % items.length)} className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:text-brand-orange hover:border-brand-orange/40" data-testid="testimonial-prev">
                        <ChevronLeft size={16} />
                    </button>
                    <span className="font-mono text-xs text-white/40 px-2">{i + 1}/{items.length}</span>
                    <button onClick={() => setI((x) => (x + 1) % items.length)} className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:text-brand-orange hover:border-brand-orange/40" data-testid="testimonial-next">
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}