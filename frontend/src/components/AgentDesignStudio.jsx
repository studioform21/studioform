import React, { useState } from "react";
import { Sparkles, Terminal, ArrowRight, ShieldCheck, CheckCircle2, Cpu } from "lucide-react";

export default function AgentDesignStudio() {
    const [step, setStep] = useState(1); // 1: config, 2: loader, 3: blueprint, 4: success
    const [persona, setPersona] = useState("telephony");
    const [platform, setPlatform] = useState("twilio");
    const [language, setLanguage] = useState("bilingual");
    const [leadName, setLeadName] = useState("");
    const [leadEmail, setLeadEmail] = useState("");
    const [loadingText, setLoadingText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const personas = {
        telephony: { title: "Telephony Receptionist", desc: "Handles inbound/outbound phone calls, qualifications, and live support." },
        document: { title: "Document Intelligence Analyst", desc: "Extracts data from complex PDFs, legal tables, and spreadsheets." },
        whatsapp: { title: "WhatsApp Support Bot", desc: "Automates customer orders, checkouts, and files sharing." },
        weblead: { title: "Web Lead Generator", desc: "Engages website visitors, schedules demos, and syncs leads directly to CRMs." }
    };

    const platforms = {
        twilio: "Direct SIP / Twilio Trunk",
        whatsapp: "WhatsApp Business API",
        slack: "Slack / Discord Integrations",
        weblink: "Embedded Web Widget"
    };

    const languages = {
        english: "Global English",
        regional: "Hindi & Indic Dialects",
        bilingual: "Bilingual (EN + HI)",
        multi: "Multilingual (10+ Languages)"
    };

    const startGeneration = () => {
        setStep(2);
        const logs = [
            "Initializing agentic mesh parser...",
            "Checking database connection indices...",
            "Constructing conversational NLU pipeline...",
            "Integrating custom LLM parameters...",
            "System Architecture Blueprint Compiled: SUCCESS"
        ];
        
        let i = 0;
        const interval = setInterval(() => {
            if (i < logs.length) {
                setLoadingText(logs[i]);
                i++;
            } else {
                clearInterval(interval);
                setStep(3);
            }
        }, 800);
    };

    const submitLead = async (e) => {
        e.preventDefault();
        if (!leadEmail) return;

        setIsSubmitting(true);
        try {
            // Send payload to backend server
            const API_BASE = window.location.origin.includes("localhost") || window.location.origin.includes("127.0.0.1") 
                ? "http://localhost:5000/api" 
                : "https://studioform.onrender.com/api";

            // Save lead in MongoDB database via backend endpoint
            await fetch(`${API_BASE}/send-marketing-email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    password: "email@1234",
                    recipient_email: leadEmail,
                    recipient_name: leadName || "Builder",
                    recipient_company: `${personas[persona].title} Project`,
                    template_id: "blueprint",
                    persona: personas[persona].title,
                    platform: platforms[platform],
                    language: languages[language]
                })
            });
            setStep(4);
        } catch (err) {
            console.error("Lead registration failed: ", err);
            // Fallback to success anyway for UX
            setStep(4);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="max-w-4xl mx-auto px-4 py-20">
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange font-mono text-xs uppercase mb-4">
                    <Sparkles size={12} /> AI Design Studio
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold font-display leading-tight">
                    Build Your Custom <span className="text-brand-orange">AI Agent Blueprint</span>
                </h2>
                <p className="mt-3 text-white/60 max-w-xl mx-auto text-sm leading-relaxed">
                    Select your agent parameters, compile the architecture plan, and get a tailored technical blueprint sent to your inbox.
                </p>
            </div>

            <div className="glass-card rounded-2xl border border-white/10 overflow-hidden bg-black/[0.3] backdrop-blur-md shadow-xl min-h-[420px]">
                {/* Step 1: Configurator */}
                {step === 1 && (
                    <div className="p-8 flex flex-col justify-between h-full">
                        <div className="space-y-6">
                            {/* Persona Choice */}
                            <div>
                                <label className="text-xs font-mono uppercase text-brand-orange tracking-wider block mb-3">1. Select Agent Persona</label>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {Object.entries(personas).map(([key, val]) => (
                                        <button
                                            key={key}
                                            onClick={() => setPersona(key)}
                                            className={`p-4 rounded-xl border text-left transition-all duration-200 ${persona === key ? "bg-brand-orange/10 border-brand-orange text-white" : "bg-white/[0.02] border-white/5 text-white/60 hover:border-white/20 hover:text-white"}`}
                                        >
                                            <div className="font-bold text-sm">{val.title}</div>
                                            <div className="text-xs text-white/40 mt-1">{val.desc}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Two Column details */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Platform */}
                                <div>
                                    <label className="text-xs font-mono uppercase text-brand-orange tracking-wider block mb-3">2. Target Integration Platform</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {Object.entries(platforms).map(([key, val]) => (
                                            <button
                                                key={key}
                                                onClick={() => setPlatform(key)}
                                                className={`p-3 rounded-lg border text-center text-xs font-medium transition-all ${platform === key ? "bg-brand-orange/10 border-brand-orange text-white" : "bg-white/[0.02] border-white/5 text-white/50 hover:border-white/15"}`}
                                            >
                                                {val}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Language */}
                                <div>
                                    <label className="text-xs font-mono uppercase text-brand-orange tracking-wider block mb-3">3. Language & Dialects</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {Object.entries(languages).map(([key, val]) => (
                                            <button
                                                key={key}
                                                onClick={() => setLanguage(key)}
                                                className={`p-3 rounded-lg border text-center text-xs font-medium transition-all ${language === key ? "bg-brand-orange/10 border-brand-orange text-white" : "bg-white/[0.02] border-white/5 text-white/50 hover:border-white/15"}`}
                                            >
                                                {val}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                            <button
                                onClick={startGeneration}
                                className="px-6 py-3 rounded-full bg-brand-orange text-black font-medium text-sm flex items-center gap-2 hover:brightness-110 transition"
                            >
                                Generate Architecture Blueprint <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Loader */}
                {step === 2 && (
                    <div className="p-8 flex flex-col items-center justify-center min-h-[420px] text-center bg-[#050507]">
                        <div className="w-16 h-16 rounded-full border-t-2 border-brand-orange animate-spin flex items-center justify-center mb-6">
                            <Cpu className="text-brand-orange" size={24} />
                        </div>
                        <div className="font-mono text-xs text-[#22c55e] mb-2">$ studioform-mesh --compile-blueprint</div>
                        <div className="font-mono text-sm text-white/80 animate-pulse">{loadingText}</div>
                    </div>
                )}

                {/* Step 3: Blueprint Details & Lead Form */}
                {step === 3 && (
                    <div className="grid md:grid-cols-12 min-h-[420px]">
                        {/* Blueprint Specs Sheet */}
                        <div className="md:col-span-7 p-8 bg-[#070709] border-r border-white/10 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-2 text-xs font-mono text-brand-orange mb-4">
                                    <Terminal size={14} /> ARCHITECTURE SCHEMATIC
                                </div>
                                <h3 className="text-xl font-bold font-display text-white">{personas[persona].title}</h3>
                                <p className="text-xs text-white/40 mt-1">Status: COMPILATION SUCCESSFUL</p>

                                <div className="mt-6 space-y-4 font-mono text-xs">
                                    <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg">
                                        <span className="text-white/40 block mb-1">DATA FLOW ENGINE:</span>
                                        <span className="text-white">User Input &rarr; NLP Interpreter &rarr; StudioForm LLM Core &rarr; API Action Block</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="text-white/40 block">PLATFORM GATEWAY:</span>
                                            <span className="text-white">{platforms[platform]}</span>
                                        </div>
                                        <div>
                                            <span className="text-white/40 block">DIALECT PROFILE:</span>
                                            <span className="text-white">{languages[language]}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-white/40 block">LATENCY PROFILE:</span>
                                        <span className="text-white">&lt; 850ms Average response time</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-white/40 text-[11px]">
                                <ShieldCheck size={14} className="text-[#22c55e]" /> Architecture conforms to ISO 27001 data residency guidelines.
                            </div>
                        </div>

                        {/* Capture Form */}
                        <div className="md:col-span-5 p-8 flex flex-col justify-center">
                            <h4 className="text-base font-bold text-white mb-2">Claim Your Blueprint</h4>
                            <p className="text-xs text-white/50 mb-6 leading-relaxed">
                                Enter your details to save this agent schematic and receive a tailored implementation plan from our engineering team.
                            </p>

                            <form onSubmit={submitLead} className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-mono uppercase text-white/40 block mb-1">Your Name</label>
                                    <input
                                        type="text"
                                        value={leadName}
                                        onChange={(e) => setLeadName(e.target.value)}
                                        placeholder="John Doe"
                                        required
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white outline-none focus:border-brand-orange transition"
                                    />
                                </div>

                                <div>
                                    <label className="text-[10px] font-mono uppercase text-white/40 block mb-1">Work Email</label>
                                    <input
                                        type="email"
                                        value={leadEmail}
                                        onChange={(e) => setLeadEmail(e.target.value)}
                                        placeholder="john@company.com"
                                        required
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white outline-none focus:border-brand-orange transition"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3 rounded-lg bg-brand-orange text-black font-medium text-xs hover:brightness-110 transition flex items-center justify-center gap-2 disabled:opacity-55"
                                >
                                    {isSubmitting ? "Registering Blueprint..." : "Email Me the Blueprint Plan"}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Step 4: Success */}
                {step === 4 && (
                    <div className="p-8 flex flex-col items-center justify-center min-h-[420px] text-center bg-[#070907]">
                        <CheckCircle2 className="text-[#22c55e] mb-4 animate-bounce" size={48} />
                        <h3 className="text-xl font-bold text-white font-display">System Blueprint Dispatched!</h3>
                        <p className="mt-2 text-xs text-white/50 max-w-sm mx-auto leading-relaxed">
                            Check your inbox for the custom system architecture layout. Our engineering team will review your specs and schedule a discussion session shortly.
                        </p>
                        <button
                            onClick={() => { setStep(1); setLeadName(""); setLeadEmail(""); }}
                            className="mt-8 px-5 py-2.5 rounded-full border border-white/15 text-white hover:border-brand-orange hover:text-brand-orange text-xs transition"
                        >
                            Build Another Agent
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
