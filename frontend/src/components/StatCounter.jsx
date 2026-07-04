import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function StatCounter({ value, suffix = "", prefix = "", label, decimals = 0, duration = 1400, testid }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });
    const [n, setN] = useState(0);

    useEffect(() => {
        if (!inView) return;
        let start = null;
        const animate = (ts) => {
            if (!start) start = ts;
            const p = Math.min((ts - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(value * eased);
            if (p < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [inView, value, duration]);

    const formatted = decimals > 0 ? n.toFixed(decimals) : Math.floor(n).toLocaleString();

    return (
        <div ref={ref} className="flex flex-col" data-testid={testid}>
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4 }}
                className="font-display text-4xl sm:text-5xl font-bold text-brand-orange tabular-nums leading-none"
            >
                {prefix}{formatted}{suffix}
            </motion.div>
            {label && <div className="mt-2 text-sm text-white/60 font-mono uppercase tracking-wider">{label}</div>}
        </div>
    );
}
