import React from "react";
import { Check, X } from "lucide-react";

export default function ProsCons({ pros = [], cons = [] }) {
    return (
        <div className="grid md:grid-cols-2 gap-6">
            {/* Pros Column */}
            <div className="glass-card p-6 border-emerald-500/20 bg-emerald-950/5 rounded-xl space-y-4">
                <h4 className="font-display font-bold text-lg text-emerald-400 flex items-center gap-2 border-b border-white/10 pb-3">
                    <span className="p-1 rounded bg-emerald-500/20 text-emerald-400">
                        <Check size={16} />
                    </span>
                    Advantages & Pros
                </h4>
                <ul className="space-y-3">
                    {pros.map((p, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-white/70 leading-relaxed">
                            <span className="text-emerald-400 mt-1 flex-shrink-0">✓</span>
                            <span>{p}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Cons Column */}
            <div className="glass-card p-6 border-red-500/20 bg-red-950/5 rounded-xl space-y-4">
                <h4 className="font-display font-bold text-lg text-red-400 flex items-center gap-2 border-b border-white/10 pb-3">
                    <span className="p-1 rounded bg-red-500/20 text-red-400">
                        <X size={16} />
                    </span>
                    Disadvantages & Cons
                </h4>
                <ul className="space-y-3">
                    {cons.map((c, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-white/70 leading-relaxed">
                            <span className="text-red-400 mt-1 flex-shrink-0">✗</span>
                            <span>{c}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
