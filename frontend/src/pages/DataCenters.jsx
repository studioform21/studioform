import React from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Cpu, Zap, Globe, ShieldCheck } from "lucide-react";
import PageHero from "@/components/PageHero";
import StatCounter from "@/components/StatCounter";
import ProcessSteps from "@/components/ProcessSteps";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";
import { stagger } from "@/lib/anim";

const HARDWARE = [
    { tag: "Training", title: "H200 / B200 clusters", body: "8–256 GPU pods, InfiniBand, 3.2Tbps fabric. For LLM pre-training and fine-tuning." },
    { tag: "Inference", title: "L40S / A100 fleets", body: "Auto-scaled inference pools, KV-cache aware routing, vLLM + TensorRT-LLM." },
    { tag: "Edge", title: "Jetson / Orin nodes", body: "On-prem AI at the factory, hospital, store. Latency-critical workloads." },
    { tag: "Hybrid", title: "Bring-your-own-cloud", body: "Run on AWS, Azure, GCP, or our co-located DCs. Single control plane." },
];

const WHY = [
    ["48h deployment", "From signed contract to first GPU."],
    ["India-sovereign", "Data stays where the law says it should."],
    ["Cost engineered", "Up to 60% lower than hyperscaler list price."],
    ["LLM-aware", "Model serving, evals, observability — not just VMs."],
    ["99.99% uptime SLA", "Backed by multi-region failover."],
    ["Real humans", "Solutions architect on Slack, not a portal."],
];

const STEPS = [
    { tag: "DESIGN", title: "Workload sizing", body: "We profile your model, traffic, and SLAs." },
    { tag: "PROCURE", title: "Rack & power", body: "GPUs allocated, racks readied, connectivity wired." },
    { tag: "DEPLOY", title: "Serve & scale", body: "Model deployed with autoscaling, gateway, observability." },
    { tag: "OPTIMIZE", title: "Continuous tuning", body: "We cut your cost-per-token every quarter." },
    { tag: "GROW", title: "Multi-region", body: "Expand to new regions or move workloads on demand." },
];

const SERVE = [
    { title: "Startups", body: "Pay only for GPUs you use. No long contracts." },
    { title: "Enterprises", body: "Private capacity, dedicated SREs, audit controls." },
    { title: "Government", body: "Sovereign, on-prem, fully air-gapped if needed." },
];

const GROWTH = Array.from({ length: 10 }).map((_, i) => ({ y: 2020 + i, v: Math.round(2 + i * 5 + Math.random() * 3) }));

export default function DataCenters() {
    return (
        <div>
            <PageHero command="studioform --infra" eyebrow="AI Data Centers" title="GPU infrastructure," accent="built for AI." subtitle="From a single H200 to a 256-GPU training cluster — deployed in 48 hours.">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl">
                    <div className="glass-card p-4"><StatCounter value={48} suffix="h" label="Deploy Time" /></div>
                    <div className="glass-card p-4"><StatCounter value={60} suffix="%" label="Cost Reduction" /></div>
                    <div className="glass-card p-4"><StatCounter value={100} suffix="%" label="Sovereignty" /></div>
                    <div className="glass-card p-4"><StatCounter value={99.99} decimals={2} suffix="%" label="Uptime SLA" /></div>
                </div>
            </PageHero>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="glass-card p-6">
                    <div className="font-mono text-xs text-white/40 mb-1">$ studioform --market</div>
                    <div className="font-display text-2xl font-bold mb-4">Indian AI infra market — $B</div>
                    <div className="h-56">
                        <ResponsiveContainer>
                            <AreaChart data={GROWTH}>
                                <defs>
                                    <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="0%" stopColor="#F47B3F" stopOpacity={0.5} />
                                        <stop offset="100%" stopColor="#F47B3F" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="y" stroke="#666" tick={{ fontSize: 11 }} />
                                <YAxis stroke="#666" tick={{ fontSize: 11 }} />
                                <Tooltip contentStyle={{ background: "#0A0A0A", border: "1px solid #222" }} />
                                <Area type="monotone" dataKey="v" stroke="#F47B3F" strokeWidth={2} fill="url(#g1)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <SectionHeader command="studioform --hardware" title="Hardware" accentInTitle="lineup." />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {HARDWARE.map((h, i) => (
                        <motion.div key={h.title} {...stagger(i)} className="glass-card p-6">
                            <div className="font-mono text-xs text-brand-orange">{h.tag}</div>
                            <div className="mt-2 font-display text-lg font-bold">{h.title}</div>
                            <p className="mt-2 text-sm text-white/60">{h.body}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <SectionHeader command="studioform --why" title="Why us." />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {WHY.map(([t, b], i) => {
                        const Icon = [Zap, ShieldCheck, Cpu, Globe, ShieldCheck, Zap][i % 6];
                        return (
                            <motion.div key={t} {...stagger(i)} className="glass-card p-6">
                                <div className="w-10 h-10 rounded-xl bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center text-brand-orange"><Icon size={18} /></div>
                                <div className="mt-4 font-display text-lg font-bold">{t}</div>
                                <p className="mt-1 text-sm text-white/60">{b}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <SectionHeader command="studioform --process" title="From spec to" accentInTitle="serving." />
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {STEPS.map((s, i) => (
                        <motion.div key={s.title} {...stagger(i, 0.08)} className="glass-card p-5">
                            <div className="font-mono text-[10px] text-white/40 mb-1">STEP {String(i + 1).padStart(2, "0")}</div>
                            <div className="font-mono text-xs text-brand-orange">{`> ${s.tag}`}</div>
                            <div className="mt-1 font-display font-bold">{s.title}</div>
                            <p className="mt-2 text-sm text-white/60">{s.body}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <SectionHeader command="studioform --customers" title="Who we" accentInTitle="serve." />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {SERVE.map((s, i) => (
                        <motion.div key={s.title} {...stagger(i)} className="glass-card p-6">
                            <div className="font-display text-xl font-bold">{s.title}</div>
                            <p className="mt-2 text-sm text-white/60">{s.body}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <CTASection title="Reserve GPU capacity." subtitle="Tell us your model and SLA — we'll get you a quote in 24h." primary={{ label: "Talk to infra team", to: "/contact" }} secondary={{ label: "See LLMs", to: "/llms" }} />
        </div>
    );
}
