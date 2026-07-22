import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FAQAccordion({ items }) {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggle = (idx) => {
        setActiveIndex(activeIndex === idx ? null : idx);
    };

    if (!items || items.length === 0) return null;

    return (
        <div className="space-y-4">
            {items.map((item, idx) => {
                const isOpen = activeIndex === idx;
                return (
                    <div 
                        key={idx} 
                        className="glass-card overflow-hidden border border-white/10 rounded-xl transition duration-300 hover:border-brand-orange/30"
                    >
                        <button
                            onClick={() => toggle(idx)}
                            className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                            aria-expanded={isOpen}
                        >
                            <span className="font-display font-bold text-sm sm:text-base text-white/90">
                                {item.q}
                            </span>
                            <motion.span
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.25 }}
                                className="text-brand-orange flex-shrink-0"
                            >
                                <ChevronDown size={18} />
                            </motion.span>
                        </button>
                        
                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25, ease: "easeInOut" }}
                                >
                                    <div className="px-6 pb-5 pt-1 text-sm text-white/60 leading-relaxed border-t border-white/5">
                                        {item.a}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}
