import React from "react";
import { motion } from "framer-motion";
import { stagger } from "@/lib/anim";

export default function ProcessSteps({ steps = [] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5" data-testid="process-steps">
            {steps.map((s, i) => (
                <motion.div key={s.title} {...stagger(i, 0.1)} className="glass-card p-6 relative">
                    <div className="absolute -top-3 left-6 px-2 py-0.5 bg-[#0A0A0A] border border-white/10 rounded-full font-mono text-[10px] text-white/40">
                        STEP {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="font-mono text-xs text-brand-orange mb-2">{`> ${s.tag}`}</div>
                    <h3 className="font-display text-xl font-bold mb-2">{s.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{s.body}</p>
                </motion.div>
            ))}
        </div>
    );
}
