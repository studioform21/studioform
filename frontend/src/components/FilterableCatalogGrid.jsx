import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { fadeUp, stagger } from "@/lib/anim";

export default function FilterableCatalogGrid({
    items = [],
    facets = [],          // [{key, label, options:[]}]
    searchPlaceholder = "$ find 'something'…",
    renderCard,
    testid = "catalog-grid",
}) {
    const [q, setQ] = useState("");
    const [filters, setFilters] = useState({});

    useEffect(() => { setFilters({}); }, [facets.length]);

    const filtered = useMemo(() => {
        let list = items;
        Object.entries(filters).forEach(([key, val]) => {
            if (!val || val === "All") return;
            list = list.filter((it) => {
                const v = it[key];
                if (Array.isArray(v)) return v.includes(val);
                return String(v).toLowerCase() === String(val).toLowerCase();
            });
        });
        if (q) {
            const ql = q.toLowerCase();
            list = list.filter((it) => JSON.stringify(it).toLowerCase().includes(ql));
        }
        return list;
    }, [items, q, filters]);

    return (
        <div data-testid={testid}>
            <motion.div {...fadeUp} className="flex items-center gap-3 px-4 py-3 rounded-full glass-card mb-6 max-w-2xl">
                <span className="text-brand-orange font-mono text-sm">$</span>
                <Search size={16} className="text-white/40" />
                <input
                    data-testid={`${testid}-search`}
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder={searchPlaceholder}
                    className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-white/30 font-mono"
                />
            </motion.div>

            {facets.map((f) => (
                <motion.div key={f.key} {...fadeUp} className="flex flex-wrap gap-2 mb-3">
                    <span className="font-mono text-[11px] uppercase text-white/40 self-center mr-1">{f.label}:</span>
                    {["All", ...f.options].map((opt) => {
                        const active = (filters[f.key] || "All") === opt;
                        return (
                            <button
                                key={opt}
                                data-testid={`${testid}-filter-${f.key}-${opt}`}
                                onClick={() => setFilters((s) => ({ ...s, [f.key]: opt }))}
                                className={`px-3 py-1.5 rounded-full text-xs font-mono border transition ${active ? "bg-brand-orange text-black border-brand-orange" : "border-white/10 text-white/70 hover:border-brand-orange/40 hover:text-white"}`}
                            >
                                {opt}
                            </button>
                        );
                    })}
                </motion.div>
            ))}

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" data-testid={`${testid}-results`}>
                {filtered.map((it, i) => (
                    <motion.div key={it.id || i} {...stagger(Math.min(i, 8))}>
                        {renderCard(it)}
                    </motion.div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="mt-12 text-center font-mono text-sm text-white/40" data-testid={`${testid}-empty`}>
                    <span className="text-brand-orange">$</span> no matches. try clearing filters.
                </div>
            )}
        </div>
    );
}