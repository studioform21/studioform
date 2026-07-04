import React from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import StatCounter from "@/components/StatCounter";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";
import { stagger } from "@/lib/anim";

export default function GenericOffering({
    command, eyebrow, title, accent, subtitle, stats, sectionCmd, sectionTitle, sectionAccent, sectionSubtitle, items,
    cta = {},
}) {
    return (
        <div>
            <PageHero command={command} eyebrow={eyebrow} title={title} accent={accent} subtitle={subtitle}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
                    {stats.map((s) => <StatCounter key={s.label} value={s.value} suffix={s.suffix} decimals={s.decimals || 0} label={s.label} />)}
                </div>
            </PageHero>
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <SectionHeader command={sectionCmd} title={sectionTitle} accentInTitle={sectionAccent} subtitle={sectionSubtitle} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {items.map((it, i) => (
                        <motion.div key={it.title} {...stagger(i)} className="glass-card p-6">
                            <div className="font-mono text-xs text-brand-orange">{it.tag}</div>
                            <h3 className="mt-2 font-display text-lg font-bold">{it.title}</h3>
                            <p className="mt-2 text-sm text-white/60">{it.body}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
            <CTASection title={cta.title} subtitle={cta.subtitle} primary={cta.primary} secondary={cta.secondary} />
        </div>
    );
}
