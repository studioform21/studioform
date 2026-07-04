import React from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { fadeUp } from "@/lib/anim";

export default function ComparisonTable({ rows = [], leftLabel = "Others", rightLabel = "Studio Form" }) {
    return (
        <motion.div {...fadeUp} className="glass-card overflow-hidden" data-testid="comparison-table">
            <div className="grid grid-cols-3 border-b border-white/10 bg-white/[0.02]">
                <div className="p-4 font-mono text-xs uppercase text-white/40">Dimension</div>
                <div className="p-4 font-mono text-xs uppercase text-white/40 border-l border-white/10">{leftLabel}</div>
                <div className="p-4 font-mono text-xs uppercase text-brand-orange border-l border-white/10">{rightLabel}</div>
            </div>
            {rows.map((r, i) => (
                <div key={i} className={`grid grid-cols-3 ${i !== rows.length - 1 ? "border-b border-white/10" : ""}`}>
                    <div className="p-4 text-sm font-medium text-white">{r.label}</div>
                    <div className="p-4 text-sm text-white/60 border-l border-white/10 flex items-start gap-2"><X size={14} className="text-white/30 mt-1 flex-shrink-0" /> {r.others}</div>
                    <div className="p-4 text-sm text-white border-l border-white/10 flex items-start gap-2"><Check size={14} className="text-brand-orange mt-1 flex-shrink-0" /> {r.ours}</div>
                </div>
            ))}
        </motion.div>
    );
}
