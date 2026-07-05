import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import SEOMeta from "@/components/SEOMeta";
import { Wrench, FileText, Calculator, Copy, Check } from "lucide-react";
import { toast } from "sonner";

const RESOURCES_META = {
    prompts: {
        title: "System Prompt Library",
        desc: "Free, copy-pasteable system prompts for Voice AI, ASR dialect handling, secure RAG filters, and tool-use scripts.",
        keywords: "AI prompts, system prompts voice agent, RAG prompts, LLM instructions, Claude prompt templates"
    },
    templates: {
        title: "AI Workflow Templates",
        desc: "Scaffold structures for n8n, Make, and LangGraph. Pick a template, connect your integrations, and go live.",
        keywords: "AI workflow templates, n8n templates, LangGraph starter, agentic workflow config"
    },
    tools: {
        title: "Free AI Tools",
        desc: "Interactive utility tools to analyze token usage, compute API costs, and evaluate automation readiness.",
        keywords: "free AI tools, token counter, API cost estimator, AI audit tools"
    },
    calculators: {
        title: "Interactive AI ROI Calculator",
        desc: "Estimate the business value, monthly cost savings, and operational hours reclaimed by deploying autonomous agents.",
        keywords: "AI ROI calculator, automation cost savings, voice agent ROI, business automation value"
    }
};

const PROMPT_ITEMS = [
    {
        title: "Voice Agent Inbound Greeting",
        useCase: "ASR-ready conversational hook",
        content: `You are an conversational agent for a logistics group. Start the call with: 'Studio Form dispatches, this is agent Alpha. What delivery tracking number can I help you check today?' Keep responses under 2 sentences to minimize TTS delay. Do not use markdown.`
    },
    {
        title: "RAG Guardrail Boundary",
        useCase: "Zero-hallucination context check",
        content: `You are a medical helper bot. Answer the patient query ONLY using the provided source snippets. If the patient asks for medical diagnoses not stated in the source text, reply: 'I cannot diagnose this symptom. Please consult your physician.' Do not speculate.`
    }
];

export default function Resources() {
    const { resourceId } = useParams();
    const [copied, setCopied] = useState(null);

    // Calculator inputs
    const [tickets, setTickets] = useState(5000);
    const [costPerTicket, setCostPerTicket] = useState(15);
    const [agentPercent, setAgentPercent] = useState(60);

    const handleCopy = (txt, id) => {
        navigator.clipboard.writeText(txt);
        setCopied(id);
        toast.success("Prompt copied to clipboard!");
        setTimeout(() => setCopied(null), 2000);
    };

    const res = RESOURCES_META[resourceId];

    if (!res) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold font-display">Resource Path Not Found</h2>
                    <Link to="/" className="text-brand-orange mt-4 inline-block text-sm">Return Home</Link>
                </div>
            </div>
        );
    }

    const STRUCTURED_DATA = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": `${res.title} | Studio Form Resources`,
        "description": res.desc,
        "url": `https://studio-form.app/resources/${resourceId}`
    };

    // Calculate ROI
    const currentCost = tickets * costPerTicket;
    const resolvedByAI = tickets * (agentPercent / 100);
    const aiCost = resolvedByAI * 1.5; // Estimated voice/API cost of $1.5 per ticket
    const humanCost = (tickets - resolvedByAI) * costPerTicket;
    const newCost = aiCost + humanCost;
    const monthlySavings = currentCost - newCost;
    const annualSavings = monthlySavings * 12;
    const hoursSaved = Math.round(resolvedByAI * 0.15); // Avg 9 mins (0.15 hrs) per ticket

    return (
        <div>
            <SEOMeta
                title={res.title}
                description={res.desc}
                keywords={res.keywords}
                structuredData={STRUCTURED_DATA}
            />
            <PageHero 
                command={`studioform --resources "${resourceId}"`} 
                eyebrow="Resources" 
                title={res.title} 
                accent={resourceId}
                subtitle={res.desc}
            />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {resourceId === "calculators" && (
                    <div className="grid lg:grid-cols-2 gap-10">
                        <div className="glass-card p-6 sm:p-8 space-y-6">
                            <h3 className="font-display text-xl font-bold border-b border-white/10 pb-4">Inputs</h3>
                            
                            <div>
                                <label className="block text-xs font-mono uppercase text-white/40 mb-2">
                                    Support Tickets / Calls per Month: <span className="text-brand-orange font-bold font-display text-sm">{tickets.toLocaleString()}</span>
                                </label>
                                <input 
                                    type="range" 
                                    min="500" 
                                    max="50000" 
                                    step="500"
                                    value={tickets}
                                    onChange={(e) => setTickets(Number(e.target.value))}
                                    className="w-full accent-brand-orange bg-white/10 h-1 rounded-lg cursor-pointer"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono uppercase text-white/40 mb-2">
                                    Average Cost per Human Resolution: <span className="text-brand-orange font-bold font-display text-sm">${costPerTicket}</span>
                                </label>
                                <input 
                                    type="range" 
                                    min="5" 
                                    max="50" 
                                    step="1"
                                    value={costPerTicket}
                                    onChange={(e) => setCostPerTicket(Number(e.target.value))}
                                    className="w-full accent-brand-orange bg-white/10 h-1 rounded-lg cursor-pointer"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono uppercase text-white/40 mb-2">
                                    Projected AI Agent Automation Rate: <span className="text-brand-orange font-bold font-display text-sm">{agentPercent}%</span>
                                </label>
                                <input 
                                    type="range" 
                                    min="20" 
                                    max="90" 
                                    step="5"
                                    value={agentPercent}
                                    onChange={(e) => setAgentPercent(Number(e.target.value))}
                                    className="w-full accent-brand-orange bg-white/10 h-1 rounded-lg cursor-pointer"
                                />
                            </div>
                        </div>

                        <div className="glass-card p-6 sm:p-8 border-brand-orange/40 flex flex-col justify-between">
                            <div>
                                <h3 className="font-display text-xl font-bold border-b border-white/10 pb-4 text-brand-orange">Projected ROI Summary</h3>
                                <div className="grid grid-cols-2 gap-6 mt-6">
                                    <div>
                                        <div className="text-xs text-white/40 font-mono uppercase">Monthly Savings</div>
                                        <div className="text-3xl font-display font-bold text-white mt-1">${Math.round(monthlySavings).toLocaleString()}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-white/40 font-mono uppercase">Annual Savings</div>
                                        <div className="text-3xl font-display font-bold text-brand-orange mt-1">${Math.round(annualSavings).toLocaleString()}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-white/40 font-mono uppercase">Human Hours Reclaimed</div>
                                        <div className="text-3xl font-display font-bold text-white mt-1">{hoursSaved.toLocaleString()} hrs</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-white/40 font-mono uppercase">AI Call Resolutions</div>
                                        <div className="text-3xl font-display font-bold text-white mt-1">{Math.round(resolvedByAI).toLocaleString()}</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="border-t border-white/10 pt-6 mt-6">
                                <p className="text-xs text-white/50 leading-relaxed">Estimations are calculated assuming an average AI agent cost of $1.50 per session compared to human operational costs. Exact savings scale based on system integrations.</p>
                                <Link to="/contact" className="mt-4 w-full block text-center py-3 rounded-full bg-brand-orange text-black font-medium text-sm">
                                    Claim Your Cost Optimization Plan
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {resourceId === "prompts" && (
                    <div className="grid md:grid-cols-2 gap-8">
                        {PROMPT_ITEMS.map((p, idx) => (
                            <div key={idx} className="glass-card p-6 flex flex-col">
                                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                                    <div>
                                        <h3 className="font-display font-bold text-lg text-white">{p.title}</h3>
                                        <div className="text-[10px] text-white/40 font-mono uppercase mt-0.5">{p.useCase}</div>
                                    </div>
                                    <button 
                                        onClick={() => handleCopy(p.content, idx)}
                                        className="p-2 rounded-lg border border-white/10 hover:border-brand-orange/40 text-white/60 hover:text-brand-orange transition-colors"
                                    >
                                        {copied === idx ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                </div>
                                <pre className="bg-[#050505] p-4 rounded-xl font-mono text-xs text-white/70 overflow-x-auto whitespace-pre-wrap leading-relaxed flex-1">
                                    {p.content}
                                </pre>
                            </div>
                        ))}
                    </div>
                )}

                {(resourceId === "templates" || resourceId === "tools") && (
                    <div className="max-w-md mx-auto text-center py-10">
                        <Calculator size={48} className="text-brand-orange mx-auto mb-4" />
                        <h3 className="font-display text-xl font-bold">Catalog Expanding</h3>
                        <p className="text-sm text-white/60 mt-2">We are compiling resources, templates, and downloadable starter packs. Submitting an email alert will notify you upon launch.</p>
                        <Link to="/contact" className="mt-6 inline-block px-6 py-2.5 rounded-full bg-brand-orange text-black font-medium text-xs">
                            Get Notification Alert
                        </Link>
                    </div>
                )}
            </section>

            <CTASection />
        </div>
    );
}
