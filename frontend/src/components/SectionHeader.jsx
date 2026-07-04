import React from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/anim";
import TerminalLabel from "@/components/TerminalLabel";

export default function SectionHeader({ command, title, subtitle, align = "left", accentInTitle }) {
    return (
        <div className={`mb-10 ${align === "center" ? "text-center mx-auto max-w-3xl" : ""}`}>
            <motion.div {...fadeUp}>
                <TerminalLabel command={command} />
            </motion.div>
            <motion.h2 {...fadeUp} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.05 }} className="mt-4 font-display font-bold text-4xl sm:text-5xl tracking-tight leading-[1.05]">
                {title} {accentInTitle && <span className="text-brand-orange">{accentInTitle}</span>}
            </motion.h2>
            {subtitle && (
                <motion.p {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="mt-4 text-base text-white/60 max-w-2xl">{subtitle}</motion.p>
            )}
        </div>
    );
}
