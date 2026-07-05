import React from "react";
import { Link } from "react-router-dom";
import SEOMeta from "@/components/SEOMeta";

const NOT_FOUND_STRUCTURED_DATA = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "404 Page Not Found | Studio Form",
    "description": "The page you are looking for does not exist or has been moved.",
    "url": "https://www.studioform.app/404"
};

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#0A0A0A] py-16">
            <SEOMeta
                title="Page Not Found"
                description="The page you are looking for does not exist or has been moved."
                keywords="404, page not found, studio form error"
                structuredData={NOT_FOUND_STRUCTURED_DATA}
            />

            {/* Glowing background shapes */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-md w-full text-center relative z-10">
                {/* Visual Error Code */}
                <div className="font-mono text-xs text-brand-orange mb-3 tracking-widest uppercase">$ err_code_404</div>
                <h1 className="text-7xl sm:text-8xl font-black font-display tracking-tight text-white mb-6">
                    Lost in <span className="text-brand-orange">space.</span>
                </h1>

                {/* Subtext */}
                <p className="text-white/60 text-base leading-relaxed mb-10">
                    The route you requested does not exist or has been moved to a new destination. Let's get you back on track.
                </p>

                {/* Directory Box */}
                <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6 mb-8 text-left font-mono text-sm shadow-xl">
                    <div className="text-white/40 mb-4 pb-2 border-b border-white/10">$ ls /popular_destinations</div>
                    <ul className="space-y-3">
                        <li>
                            <Link to="/" className="text-white/80 hover:text-brand-orange transition-colors flex items-center gap-2">
                                <span className="text-brand-orange">→</span> /home (Index dashboard)
                            </Link>
                        </li>
                        <li>
                            <Link to="/ai-news" className="text-white/80 hover:text-brand-orange transition-colors flex items-center gap-2">
                                <span className="text-brand-orange">→</span> /services/ai-agents (Agent systems)
                            </Link>
                        </li>
                        <li>
                            <Link to="/pricing" className="text-white/80 hover:text-brand-orange transition-colors flex items-center gap-2">
                                <span className="text-brand-orange">→</span> /pricing (Compute & license tiers)
                            </Link>
                        </li>
                        <li>
                            <Link to="/docs" className="text-white/80 hover:text-brand-orange transition-colors flex items-center gap-2">
                                <span className="text-brand-orange">→</span> /docs (Developer resources)
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="text-white/80 hover:text-brand-orange transition-colors flex items-center gap-2">
                                <span className="text-brand-orange">→</span> /contact (Speak to a builder)
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Direct CTA */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/" className="px-6 py-3 bg-brand-orange hover:bg-brand-orange/90 text-black font-semibold rounded-lg text-sm transition-all shadow-lg hover:shadow-brand-orange/20">
                        Return to Homepage
                    </Link>
                    <Link to="/contact" className="px-6 py-3 border border-white/10 hover:border-white/20 text-white rounded-lg text-sm transition-all hover:bg-white/5">
                        Book a Strategy Call
                    </Link>
                </div>
            </div>
        </div>
    );
}
