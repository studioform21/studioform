import React from "react";

export default function CodeCard({ filename = "metrics.tsx", children, className = "" }) {
    return (
        <div className={`glass-card overflow-hidden ${className}`} data-testid="code-card">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-orange" />
                </div>
                <span className="font-mono text-xs text-white/50">{filename}</span>
                <div className="flex items-center gap-1.5">
                    <span className="pulse-dot" />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">live</span>
                </div>
            </div>
            <div className="p-5 font-mono text-[13px] leading-relaxed text-white/80 overflow-x-auto">
                {children}
            </div>
        </div>
    );
}

export const Cmt = ({ children }) => <span className="text-white/35">{children}</span>;
export const Kw = ({ children }) => <span className="text-brand-orange">{children}</span>;
export const Str = ({ children }) => <span className="text-emerald-300/80">{children}</span>;
export const Num = ({ children }) => <span className="text-white">{children}</span>;
