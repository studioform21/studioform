import React from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/anim";
import TerminalLabel from "@/components/TerminalLabel";

export default function PageHero({ command, eyebrow, title, accent, subtitle, children }) {
    return (
        <section className="relative overflow-hidden border-b border-white/10" data-testid="page-hero">
            <div className="absolute inset-0 grid-bg opacity-50" />
            <div className="absolute -top-32 -right-32 w-[480px] h-[480px] bg-brand-orange/10 blur-[120px] rounded-full" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                <motion.div {...fadeUp}><TerminalLabel command={command} /></motion.div>
                {eyebrow && <motion.div {...fadeUp} transition={{ delay: 0.05, duration: 0.5 }} className="mt-3 inline-block px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[11px] uppercase text-white/60">{eyebrow}</motion.div>}
                <motion.h1 {...fadeUp} transition={{ delay: 0.08, duration: 0.5 }} className="mt-5 font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight max-w-4xl">
                    {title} {accent && <span className="text-brand-orange">{accent}</span>}
                </motion.h1>
                {subtitle && <motion.p {...fadeUp} transition={{ delay: 0.12, duration: 0.5 }} className="mt-6 text-base sm:text-lg text-white/65 max-w-2xl leading-relaxed">{subtitle}</motion.p>}
                {children && <motion.div {...fadeUp} transition={{ delay: 0.18, duration: 0.5 }} className="mt-8">{children}</motion.div>}
            </div>
        </section>
    );
}
