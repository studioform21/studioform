import React from "react";

// S-capsule logo mark: top pill (white/black), diagonal parallelogram (light grey),
// bottom pill (black/orange).
export default function Logo({ size = 28, withWord = true, className = "" }) {
    const w = size;
    const h = size;
    return (
        <div className={`flex items-center gap-3 ${className}`} data-testid="brand-logo">

            {withWord && (
                <span className="font-display font-bold text-white tracking-tight text-lg leading-none">
                    STUDIO<span className="text-brand-orange">FORM</span>
                </span>
            )}
        </div>
    );
}