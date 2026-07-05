import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, X } from "lucide-react";

export default function CookieConsent() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            // Short delay to let the page load naturally
            const t = setTimeout(() => setVisible(true), 1500);
            return () => clearTimeout(t);
        }
    }, []);

    const handleChoice = (accepted) => {
        localStorage.setItem("cookie-consent", accepted ? "accepted" : "declined");
        
        // Update Google Analytics / Google Tag consent state
        if (window.gtag) {
            window.gtag("consent", "update", {
                analytics_storage: accepted ? "granted" : "denied",
                ad_storage: accepted ? "granted" : "denied"
            });
        }
        
        setVisible(false);
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="fixed bottom-4 right-4 z-50 max-w-sm w-full mx-auto"
                >
                    <div className="glass-card p-5 border border-white/10 shadow-2xl relative bg-[#0C0C0C]/90 backdrop-blur-md rounded-xl text-left">
                        {/* Close button */}
                        <button 
                            onClick={() => handleChoice(false)} 
                            className="absolute top-3 right-3 text-white/40 hover:text-white transition-colors"
                        >
                            <X size={16} />
                        </button>

                        <div className="flex gap-3 items-start">
                            <div className="p-2 rounded-lg bg-brand-orange/10 text-brand-orange shrink-0">
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <h4 className="font-display font-semibold text-sm text-white/95">
                                    Cookie & Consent Compliance
                                </h4>
                                <p className="mt-1 text-xs text-white/60 leading-relaxed font-mono">
                                    We use essential cookies and Google Analytics to improve our service under India's Digital Personal Data Protection Act (DPDP Act), 2023. You can manage your preferences.
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-col gap-2">
                            <button
                                onClick={() => handleChoice(true)}
                                className="w-full py-2 bg-brand-orange hover:bg-brand-orange/90 text-black font-semibold rounded-lg text-xs transition-all shadow-md"
                            >
                                Accept All
                            </button>
                            <div className="flex gap-2 w-full">
                                <button
                                    onClick={() => handleChoice(false)}
                                    className="flex-1 py-2 border border-white/10 hover:border-white/20 text-white rounded-lg text-[11px] font-mono transition-all hover:bg-white/5"
                                >
                                    Reject Analytics
                                </button>
                                <Link
                                    to="/privacy"
                                    onClick={() => setVisible(false)}
                                    className="flex-1 py-2 text-white/40 hover:text-white rounded-lg text-[11px] font-mono border border-transparent hover:border-white/5 flex items-center justify-center transition-all"
                                >
                                    Privacy Policy
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
