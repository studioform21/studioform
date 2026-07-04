import React from "react";

export default function TerminalLabel({ command, className = "" }) {
    return (
        <div className={`inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-white/70 ${className}`} data-testid="terminal-label">
            <span className="text-brand-orange">$</span>
            <span className="cursor-blink">{command}</span>
        </div>
    );
}
