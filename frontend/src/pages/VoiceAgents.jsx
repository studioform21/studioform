import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEOMeta from "@/components/SEOMeta";
import { fadeUp, stagger } from "@/lib/anim";

const FAQS = [
    {
        q: "What are AI voice agents?",
        a: "AI voice agents are autonomous telephony systems that can understand speech, decide next actions, speak back in real time, and complete contact-center workflows such as scheduling, qualification, verification, or routing — without waiting for a human on every turn."
    },
    {
        q: "What makes Studio Form’s AI voice agents different?",
        a: "Studio Form combines sub-800ms latency targets, Whisper-based ASR, streaming TTS, Twilio/Vonage/SIP telephony, Indic code-mixing, and agentic mesh connections to CRM, database, and telemetry systems inside a services-led enterprise deployment model."
    },
    {
        q: "Which languages do Studio Form voice agents support?",
        a: "Studio Form supports English plus Indic dialects including Hindi, Marathi, Bengali, Tamil, and Telugu, with code-mixing so callers can blend languages in one conversation."
    },
    {
        q: "Can Studio Form handle both inbound and outbound calls?",
        a: "Yes. Studio Form deploys inbound reception agents, outbound qualifier systems for CRM lead nurturing, and e-commerce transaction bots for order verification and RTO reduction, plus logistics dispatch patterns."
    },
    {
        q: "How does pricing work for AI voice agents?",
        a: "Studio Form uses Pilot Programs, Monthly Retainers, and Project-Based Pricing. Commercial factors include telephony costs, model inference fees, custom dialect tuning, dedicated database connections, and a 99.97% uptime guarantee. Start on the pricing page or contact sales for a scoped proposal."
    },
    {
        q: "How do Studio Form voice agents compare with Retell AI, PolyAI, Bland AI, or Vapi?",
        a: "Those platforms are commonly evaluated for self-serve, managed inbound, or API-first voice infrastructure. Studio Form is built for enterprises that need multilingual Indic performance, private infrastructure, and consulting-led implementation across inbound, outbound, and transactional call paths. Choose based on language needs, deployment support, and workflow ownership rather than feature checklists alone."
    }
];

const VOICE_AGENTS_STRUCTURED_DATA = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI Voice Agents",
    "description": "Multilingual conversational AI voice agents for inbound, outbound, and support automation across 12+ industries in 15+ languages.",
    "provider": {
        "@type": "Organization",
        "name": "Studio Form",
        "url": "https://www.studioform.app"
    }
};

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const wordRevealContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08
        }
    }
};

const wordRevealChild = {
    hidden: { y: "110%" },
    visible: {
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1]
        }
    }
};

export default function VoiceAgents() {
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="bg-[#0A0A0A] text-white antialiased selection:bg-brand-orange selection:text-black">
            <SEOMeta
                title="AI Voice Agents for Enterprise Contact Centers | Studio Form"
                description="Deploy production AI voice agents with sub-800ms latency, Indic code-mixing, and Twilio, Vonage, or SIP telephony. Studio Form builds autonomous inbound, outbound, and verification agents on private infrastructure."
                keywords="voice agents, conversational AI, voice AI, call center automation, multilingual voice AI, Studio Form voice, Twilio, Bland AI, Retell AI, Vapi"
                structuredData={VOICE_AGENTS_STRUCTURED_DATA}
                faqs={FAQS}
            />

            {/* Hero Section */}
            <section className="relative min-h-screen pt-32 pb-20 flex flex-col items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/45 via-[#0A0A0A] to-[#0A0A0A]">
                {/* Decorative glows */}
                <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] rounded-full bg-brand-orange/10 blur-[60px] pointer-events-none" />
                <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] rounded-full bg-brand-orange/10 blur-[60px] pointer-events-none" />

                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:56px_56px]" />

                <div className="container max-w-6xl mx-auto px-6 relative z-10 text-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-6 inline-block font-mono text-xs tracking-widest text-brand-orange uppercase"
                    >
                        studioform --voice
                    </motion.div>

                    <motion.h1 
                        variants={wordRevealContainer}
                        initial="hidden"
                        animate="visible"
                        className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-8 leading-[1.1] tracking-tight text-white max-w-5xl mx-auto text-balance"
                    >
                        {["AI", "Voice", "Agents", "built", "for", "real", "contact-center", "work"].map((word, i) => (
                            <span key={i} className="inline-block overflow-hidden pb-1 mr-4">
                                <motion.span variants={wordRevealChild} className="inline-block">
                                    {word}
                                </motion.span>
                            </span>
                        ))}
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-xl text-white/70 max-w-3xl mx-auto mb-10 leading-relaxed"
                    >
                        Studio Form deploys autonomous AI voice agents for inbound reception, outbound lead qualification, and e-commerce order verification — with sub-800ms latency, Indic dialect code-mixing, and enterprise telephony on private infrastructure.
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-wrap justify-center gap-3 mb-12"
                    >
                        {["<800ms latency", "10,000+ parallel calls", "45% AHT reduction", "92%+ CSAT", "99.97% uptime SLA"].map((pill, i) => (
                            <span key={i} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] text-white/80">
                                {pill}
                            </span>
                        ))}
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link to="/contact" className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-orange text-black font-semibold hover:brightness-110 transition-all text-center">
                            Book a Demo
                        </Link>
                        <a href="#capabilities" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 border border-white/15 hover:border-brand-orange hover:text-brand-orange font-semibold transition-all text-center">
                            Explore Voice Agents
                        </a>
                    </motion.div>
                </div>

                {/* Call Path Preview Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="container max-w-5xl mx-auto px-6 mt-24"
                >
                    <div className="glass-card rounded-glass border-white/20 overflow-hidden bg-white/[0.02] backdrop-blur-xl border border-white/10 relative">
                        <div className="bg-[#050505] p-6 border-b border-white/10">
                            <div className="flex items-center justify-between mb-4">
                                <span className="font-mono text-xs text-white/40 uppercase tracking-widest">Call path preview</span>
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                                </div>
                            </div>
                            <h3 className="text-xl font-display font-medium text-white">Design the call path your AI voice agent should run.</h3>
                        </div>
                        
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-left">
                            <div className="space-y-6">
                                <div>
                                    <label className="block font-mono text-[10px] uppercase text-brand-orange mb-2">Call direction</label>
                                    <div className="text-white text-sm font-medium py-3 border-b border-white/5">Inbound reception | Outbound qualifier | Order verification</div>
                                </div>
                                <div>
                                    <label className="block font-mono text-[10px] uppercase text-brand-orange mb-2">Languages</label>
                                    <div className="text-white text-sm font-medium py-3 border-b border-white/5">English + Hindi / Marathi / Tamil / Telugu code-mixing</div>
                                </div>
                                <div>
                                    <label className="block font-mono text-[10px] uppercase text-brand-orange mb-2">Telephony</label>
                                    <div className="text-white text-sm font-medium py-3 border-b border-white/5">Twilio | Vonage | SIP trunk</div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <label className="block font-mono text-[10px] uppercase text-brand-orange mb-2">Systems connected</label>
                                    <div className="text-white text-sm font-medium py-3 border-b border-white/5">CRM · database · telemetry endpoints</div>
                                </div>
                                <div>
                                    <label className="block font-mono text-[10px] uppercase text-brand-orange mb-2">Latency target</label>
                                    <div className="text-white text-sm font-medium py-3 border-b border-white/5">sub-800ms conversational turn</div>
                                </div>
                                <div>
                                    <label className="block font-mono text-[10px] uppercase text-brand-orange mb-2">Compliance posture</label>
                                    <div className="text-white text-sm font-medium py-3 border-b border-white/5">DPDP Act 2023 aligned · private infrastructure</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-8 bg-white/5 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
                            <p className="text-sm text-white/60 max-w-xl">
                                Studio Form configures Whisper-based ASR, streaming TTS, and agentic mesh orchestration around the workflows your contact center already runs.
                            </p>
                            <Link to="/contact" className="px-8 py-3 rounded-full bg-brand-orange text-black font-semibold hover:brightness-110 transition-all text-center whitespace-nowrap text-sm">
                                Book a Demo
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Decision Criteria Section */}
            <section className="py-32 bg-[#0F0F0F] border-y border-white/5 relative overflow-hidden">
                <div className="container max-w-7xl mx-auto px-6">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeUp}
                        className="max-w-3xl mb-20 text-left"
                    >
                        <div className="font-mono text-xs tracking-widest text-brand-orange uppercase mb-4">Decision criteria</div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-balance">What separates a production AI voice agent from a demo</h2>
                        <p className="text-lg text-white/70 leading-relaxed">
                            Buyers searching for AI voice agents usually need more than a pleasant voice sample. Production systems have to survive noisy calls, multilingual customers, CRM handoffs, and telephony constraints.
                        </p>
                    </motion.div>

                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 text-left"
                    >
                        {/* Card 1 */}
                        <motion.div variants={fadeUp} className="glass-card p-8 rounded-glass bg-white/[0.02] border border-white/10 flex flex-col">
                            <div className="w-10 h-10 rounded-lg bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center mb-6">
                                <svg className="w-5 h-5 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <h3 className="text-xl font-display font-bold mb-4">Conversational latency</h3>
                            <p className="text-sm text-white/60 leading-relaxed">Sub-second turns keep callers engaged. Studio Form targets sub-800ms telephony latency with custom Whisper-based ASR and proprietary streaming TTS.</p>
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div variants={fadeUp} className="glass-card p-8 rounded-glass bg-white/[0.02] border border-white/10 flex flex-col">
                            <div className="w-10 h-10 rounded-lg bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center mb-6">
                                <svg className="w-5 h-5 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <h3 className="text-xl font-display font-bold mb-4">Language reality</h3>
                            <p className="text-sm text-white/60 leading-relaxed">Contact centers in India need code-mixing across English and Indic dialects in one conversation — Hindi, Marathi, Bengali, Tamil, and Telugu — not English-only scripts with a language toggle.</p>
                        </motion.div>

                        {/* Card 3 */}
                        <motion.div variants={fadeUp} className="glass-card p-8 rounded-glass bg-white/[0.02] border border-white/10 flex flex-col">
                            <div className="w-10 h-10 rounded-lg bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center mb-6">
                                <svg className="w-5 h-5 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            </div>
                            <h3 className="text-xl font-display font-bold mb-4">Telephony integration</h3>
                            <p className="text-sm text-white/60 leading-relaxed">Enterprise deployments need Twilio, Vonage, or SIP trunk connectivity, not a closed sandbox number that cannot reach production call flows.</p>
                        </motion.div>

                        {/* Card 4 */}
                        <motion.div variants={fadeUp} className="glass-card p-8 rounded-glass bg-white/[0.02] border border-white/10 flex flex-col">
                            <div className="w-10 h-10 rounded-lg bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center mb-6">
                                <svg className="w-5 h-5 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                            </div>
                            <h3 className="text-xl font-display font-bold mb-4">Workflow ownership</h3>
                            <p className="text-sm text-white/60 leading-relaxed">Useful agents schedule appointments, route complex queries, nurture CRM leads, verify orders, and coordinate dispatch — then write outcomes back to CRM, database, and telemetry systems.</p>
                        </motion.div>

                        {/* Card 5 */}
                        <motion.div variants={fadeUp} className="glass-card p-8 rounded-glass bg-white/[0.02] border border-white/10 flex flex-col lg:col-span-2">
                            <div className="w-10 h-10 rounded-lg bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center mb-6">
                                <svg className="w-5 h-5 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                            </div>
                            <h3 className="text-xl font-display font-bold mb-4">Private, compliant infrastructure</h3>
                            <p className="text-sm text-white/60 leading-relaxed">Regulated buyers need data isolation, DPDP Act 2023 alignment, and healthcare-ready patterns such as HIPAA-compliant patient portals with zero public API logs where required.</p>
                        </motion.div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <p className="font-mono text-xs uppercase text-white/40 tracking-wider">
                            If a vendor cannot show latency, language behavior, telephony path, workflow ownership, and compliance posture together, the evaluation is incomplete.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Capabilities Section */}
            <section id="capabilities" className="py-32 relative">
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:56px_56px]" />
                <div className="container max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeUp}
                        className="text-center mb-20"
                    >
                        <div className="font-mono text-xs tracking-widest text-brand-orange uppercase mb-4">Product</div>
                        <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Autonomous AI Voice Agents from Studio Form</h2>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                            Studio Form builds secure, production-grade autonomous AI voice agents for enterprise contact-center automation.
                        </p>
                    </motion.div>

                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 text-left"
                    >
                        {/* Cap 1 */}
                        <motion.div variants={fadeUp} className="glass-card p-8 rounded-glass bg-white/[0.02] border border-white/10 group hover:border-brand-orange/40 transition-all">
                            <div className="font-mono text-[10px] text-brand-orange mb-4">01 -- INBOUND</div>
                            <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-brand-orange transition-colors">Inbound reception agents</h3>
                            <p className="text-white/60 text-sm leading-relaxed">Appointment scheduling, complex query routing, and front-line customer service without forcing every call to a human queue.</p>
                        </motion.div>
                        {/* Cap 2 */}
                        <motion.div variants={fadeUp} className="glass-card p-8 rounded-glass bg-white/[0.02] border border-white/10 group hover:border-brand-orange/40 transition-all">
                            <div className="font-mono text-[10px] text-brand-orange mb-4">02 -- OUTBOUND</div>
                            <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-brand-orange transition-colors">Outbound qualifier systems</h3>
                            <p className="text-white/60 text-sm leading-relaxed">CRM lead nurturing and qualification calls that keep pipeline movement continuous outside business hours.</p>
                        </motion.div>
                        {/* Cap 3 */}
                        <motion.div variants={fadeUp} className="glass-card p-8 rounded-glass bg-white/[0.02] border border-white/10 group hover:border-brand-orange/40 transition-all">
                            <div className="font-mono text-[10px] text-brand-orange mb-4">03 -- E-COMMERCE</div>
                            <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-brand-orange transition-colors">E-commerce transaction bots</h3>
                            <p className="text-white/60 text-sm leading-relaxed">Order verification and RTO-reduction calls that confirm intent before fulfillment risk compounds.</p>
                        </motion.div>
                        {/* Cap 4 */}
                        <motion.div variants={fadeUp} className="glass-card p-8 rounded-glass bg-white/[0.02] border border-white/10 group hover:border-brand-orange/40 transition-all">
                            <div className="font-mono text-[10px] text-brand-orange mb-4">04 -- SPEECH</div>
                            <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-brand-orange transition-colors">Sub-second speech stack</h3>
                            <p className="text-white/60 text-sm leading-relaxed">Custom Whisper-based speech recognition and proprietary streaming TTS components tuned for conversational telephony under 800ms.</p>
                        </motion.div>
                        {/* Cap 5 */}
                        <motion.div variants={fadeUp} className="glass-card p-8 rounded-glass bg-white/[0.02] border border-white/10 group hover:border-brand-orange/40 transition-all">
                            <div className="font-mono text-[10px] text-brand-orange mb-4">05 -- TELEPHONY</div>
                            <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-brand-orange transition-colors">Enterprise telephony integrations</h3>
                            <p className="text-white/60 text-sm leading-relaxed">Deploy on Twilio, Vonage, or SIP trunks so agents join the phone network operations the business already runs.</p>
                        </motion.div>
                        {/* Cap 6 */}
                        <motion.div variants={fadeUp} className="glass-card p-8 rounded-glass bg-white/[0.02] border border-white/10 group hover:border-brand-orange/40 transition-all">
                            <div className="font-mono text-[10px] text-brand-orange mb-4">06 -- MESH</div>
                            <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-brand-orange transition-colors">Agentic mesh coordination</h3>
                            <p className="text-white/60 text-sm leading-relaxed">Distributed multi-agent systems connect voice turns with CRM, database, and telemetry endpoints instead of trapping the conversation in a standalone bot.</p>
                        </motion.div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-glass glass-card border border-white/5 bg-panel/50 text-left"
                    >
                        <div className="flex items-start gap-6">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center border border-brand-orange/20">
                                <span className="text-brand-orange font-mono text-xs">!</span>
                            </div>
                            <p className="text-sm text-white/60 italic leading-relaxed">
                                Related Studio Form layers — layout-aware RAG Chatbots, custom LLM fine-tuning, and AI consulting — can wrap the voice deployment when the enterprise needs document intelligence or private model work in the same program.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Use Cases Section */}
            <section id="use-cases" className="py-32 bg-[#0A0A0A]">
                <div className="container max-w-7xl mx-auto px-6">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeUp}
                        className="flex flex-col md:flex-row justify-between items-end mb-20 text-left"
                    >
                        <div className="max-w-2xl">
                            <div className="font-mono text-xs tracking-widest text-brand-orange uppercase mb-4">Where it ships</div>
                            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">AI voice agent use cases that justify a pilot</h2>
                        </div>
                        <Link to="/case-studies" className="px-8 py-3 rounded-full bg-white/10 border border-white/15 hover:border-brand-orange hover:text-brand-orange font-semibold transition-all mb-2">
                            Review case studies
                        </Link>
                    </motion.div>

                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left"
                    >
                        {/* UC 1 */}
                        <motion.div variants={fadeUp} className="p-10 glass-card rounded-glass bg-white/[0.02] border border-white/10 flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-display font-bold mb-6">Telecom and call centers</h3>
                                <p className="text-white/70 mb-8 leading-relaxed">Scale concurrent multilingual support across Hindi and English-speaking customer bases while reducing average handling time.</p>
                            </div>
                            <div className="pt-6 border-t border-white/10 font-mono text-[11px] text-brand-orange/80">
                                OUTCOME: Studio Form reports 10,000+ parallel calls, 45% AHT reduction, and 92%+ CSAT in a multilingual telephony deployment.
                            </div>
                        </motion.div>
                        {/* UC 2 */}
                        <motion.div variants={fadeUp} className="p-10 glass-card rounded-glass bg-white/[0.02] border border-white/10">
                            <h3 className="text-2xl font-display font-bold mb-6">E-commerce operations</h3>
                            <p className="text-white/70 mb-8 leading-relaxed">Run automated outbound order verification to reduce return-to-origin rates and confirm delivery intent before expensive exceptions.</p>
                        </motion.div>
                        {/* UC 3 */}
                        <motion.div variants={fadeUp} className="p-10 glass-card rounded-glass bg-white/[0.02] border border-white/10">
                            <h3 className="text-2xl font-display font-bold mb-6">Logistics and dispatch</h3>
                            <p className="text-white/70 mb-8 leading-relaxed">Coordinate delivery partners and dispatch updates through outbound voice automation instead of manual dialer queues.</p>
                        </motion.div>
                        {/* UC 4 */}
                        <motion.div variants={fadeUp} className="p-10 glass-card rounded-glass bg-white/[0.02] border border-white/10">
                            <h3 className="text-2xl font-display font-bold mb-6">Healthcare follow-up</h3>
                            <p className="text-white/70 mb-8 leading-relaxed">Support HIPAA-compliant patient scheduling and outbound follow-up patterns on isolated private cloud infrastructure with zero public API logs.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Deployment Section */}
            <section id="deployment" className="py-32 bg-[#0F0F0F] relative overflow-hidden">
                <div className="container max-w-7xl mx-auto px-6">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeUp}
                        className="max-w-3xl mb-24 text-left"
                    >
                        <div className="font-mono text-xs tracking-widest text-brand-orange uppercase mb-4">How rollout works</div>
                        <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">From pilot brief to production telephony</h2>
                        <p className="text-lg text-white/70 leading-relaxed">
                            Studio Form is services-led. Engagements move from focused proof to retained production support, with pricing shaped by telephony, model inference, dialect tuning, and dedicated connections.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-32 relative text-left">
                        <div className="hidden lg:block absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-0"></div>
                        
                        {/* Step 1 */}
                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-full bg-brand-orange text-black font-display font-bold flex items-center justify-center mb-8">1</div>
                            <h3 className="text-xl font-display font-bold mb-4">Scope the call paths</h3>
                            <p className="text-sm text-white/60 leading-relaxed">Define inbound, outbound, or verification journeys, languages, CRM fields, and success metrics for the pilot.</p>
                        </div>
                        {/* Step 2 */}
                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-full bg-brand-orange text-black font-display font-bold flex items-center justify-center mb-8">2</div>
                            <h3 className="text-xl font-display font-bold mb-4">Configure speech and telephony</h3>
                            <p className="text-sm text-white/60 leading-relaxed">Connect Whisper-based ASR, streaming TTS, and Twilio, Vonage, or SIP trunks to the target environments.</p>
                        </div>
                        {/* Step 3 */}
                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-full bg-brand-orange text-black font-display font-bold flex items-center justify-center mb-8">3</div>
                            <h3 className="text-xl font-display font-bold mb-4">Wire the agentic mesh</h3>
                            <p className="text-sm text-white/60 leading-relaxed">Connect agents to CRM, database, and telemetry endpoints so every call can read context and write outcomes.</p>
                        </div>
                        {/* Step 4 */}
                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-full bg-brand-orange text-black font-display font-bold flex items-center justify-center mb-8">4</div>
                            <h3 className="text-xl font-display font-bold mb-4">Pilot, measure, retain</h3>
                            <p className="text-sm text-white/60 leading-relaxed">Launch a Pilot Program, review latency and containment quality, then expand through Monthly Retainers or Project-Based Pricing.</p>
                        </div>
                    </div>

                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="glass-card rounded-glass border border-white/10 p-12 text-left bg-white/[0.01]"
                    >
                        <div className="flex flex-col lg:flex-row items-center gap-16">
                            <div className="lg:w-1/2">
                                <h4 className="font-mono text-xs uppercase text-brand-orange mb-8 tracking-widest">Voice agent pricing factors</h4>
                                <ul className="space-y-4 mb-10">
                                    {["Telephony costs", "Model inference fees", "Custom dialect tuning for Indic languages", "Dedicated database connections", "99.97% uptime guarantee"].map((factor, i) => (
                                        <li key={i} className="flex items-center gap-4 text-white/80">
                                            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span> {factor}
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex flex-wrap gap-4">
                                    <Link to="/contact" className="px-8 py-3 rounded-full bg-brand-orange text-black font-semibold hover:brightness-110 transition-all text-sm">
                                        Book a Demo
                                    </Link>
                                    <Link to="/pricing" className="px-8 py-3 rounded-full bg-white/10 border border-white/15 hover:border-brand-orange hover:text-brand-orange font-semibold transition-all text-sm">
                                        View pricing model
                                    </Link>
                                </div>
                            </div>
                            <div className="lg:w-1/2 p-10 bg-black/40 rounded-glass border border-white/5">
                                <p className="text-sm text-white/50 leading-relaxed italic mb-0">
                                    Studio Form publishes engagement models and pricing factors rather than self-serve per-minute checkout. Confirm current commercial terms on the pricing and contact pages.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Fit Guidance Section */}
            <section className="py-32 bg-[#0A0A0A] relative">
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:56px_56px]" />
                <div className="container max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeUp}
                        className="text-center mb-20"
                    >
                        <div className="font-mono text-xs tracking-widest text-brand-orange uppercase mb-4">Buyer fit</div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">When Studio Form is the right AI voice agent partner</h2>
                        <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
                            Teams comparing AI voice agents often shortlist developer platforms and managed enterprise suites. Studio Form fits buyers who need production telephony plus multilingual depth and implementation partnership.
                        </p>
                    </motion.div>

                    <div className="space-y-4 mb-20 text-left">
                        {/* Row 1 */}
                        <div className="glass-card p-10 rounded-glass border border-white/10 flex flex-col md:flex-row gap-8 bg-white/[0.02]">
                            <h3 className="text-xl font-display font-bold md:w-1/3 text-brand-orange">Choose Studio Form when</h3>
                            <p className="text-white/70 leading-relaxed md:w-2/3">The roadmap needs autonomous inbound and outbound voice agents, Indic code-mixing, private infrastructure, and a consulting-led path from pilot to production.</p>
                        </div>
                        {/* Row 2 */}
                        <div className="glass-card p-10 rounded-glass border border-white/5 bg-white/[0.01] flex flex-col md:flex-row gap-8">
                            <h3 className="text-xl font-display font-bold md:w-1/3 text-white/60">Retell AI is often considered when</h3>
                            <p className="text-white/50 leading-relaxed md:w-2/3">Teams want a self-serve, bring-your-own-stack voice platform with transparent component pricing and strong general production tooling. Studio Form is a better fit when Indic dialect specialization and bundled deployment matter more than pure DIY assembly.</p>
                        </div>
                        {/* Row 3 */}
                        <div className="glass-card p-10 rounded-glass border border-white/5 bg-white/[0.01] flex flex-col md:flex-row gap-8">
                            <h3 className="text-xl font-display font-bold md:w-1/3 text-white/60">PolyAI is often considered when</h3>
                            <p className="text-white/50 leading-relaxed md:w-2/3">Large enterprises want a fully managed inbound voice program and can accept longer implementation cycles. Studio Form is a better fit when outbound qualification, transactional verification, and flexible services-led delivery are required.</p>
                        </div>
                        {/* Row 4 */}
                        <div className="glass-card p-10 rounded-glass border border-white/5 bg-white/[0.01] flex flex-col md:flex-row gap-8">
                            <h3 className="text-xl font-display font-bold md:w-1/3 text-white/60">Bland AI or Vapi are often considered when</h3>
                            <p className="text-white/50 leading-relaxed md:w-2/3">Engineering teams want API-first voice infrastructure for high-volume or highly custom stacks. Studio Form is a better fit when the buyer needs outcome-owned contact-center workflows, Indic language behavior, and compliance-minded private deployment support.</p>
                        </div>
                    </div>

                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="flex flex-col items-center gap-10"
                    >
                        <p className="text-sm text-white/40 text-center max-w-xl">
                            Commonly compared tools include Retell AI, PolyAI, Bland AI, and Vapi. Studio Form competes as a production voice-agent partner for regulated and multilingual enterprise deployments, not as a consumer voice generator.
                        </p>
                        <Link to="/contact" className="px-10 py-4 rounded-full bg-brand-orange text-black font-semibold hover:brightness-110 transition-all text-base">
                            Book a Demo
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Evidence Outcomes Section */}
            <section className="py-24 bg-[#050505] border-y border-white/10">
                <div className="container max-w-7xl mx-auto px-6">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="mb-16 text-left"
                    >
                        <div className="font-mono text-xs tracking-widest text-brand-orange uppercase mb-4">Reported outcomes</div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold">Evidence from Studio Form voice deployments</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 text-left">
                        {/* Metric 1 */}
                        <div>
                            <div className="text-5xl font-display font-bold text-brand-orange mb-2">10,000+</div>
                            <div className="font-mono text-xs uppercase tracking-widest text-white mb-4">parallel calls</div>
                            <p className="text-sm text-white/50 leading-relaxed">Multilingual telephony deployment across regional Indic dialects</p>
                        </div>
                        {/* Metric 2 */}
                        <div>
                            <div className="text-5xl font-display font-bold text-brand-orange mb-2">45%</div>
                            <div className="font-mono text-xs uppercase tracking-widest text-white mb-4">lower handling time</div>
                            <p className="text-sm text-white/50 leading-relaxed">Telecom / call center automation outcome reported by Studio Form</p>
                        </div>
                        {/* Metric 3 */}
                        <div>
                            <div className="text-5xl font-display font-bold text-brand-orange mb-2">92%+</div>
                            <div className="font-mono text-xs uppercase tracking-widest text-white mb-4">customer satisfaction</div>
                            <p className="text-sm text-white/50 leading-relaxed">Same multilingual telephony success story</p>
                        </div>
                        {/* Metric 4 */}
                        <div>
                            <div className="text-5xl font-display font-bold text-brand-orange mb-2">&lt;800ms</div>
                            <div className="font-mono text-xs uppercase tracking-widest text-white mb-4">latency target</div>
                            <p className="text-sm text-white/50 leading-relaxed">Custom Whisper ASR + streaming TTS telephony stack</p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-white/5 text-left">
                        <p className="text-sm text-white/40 max-w-2xl">
                            Studio Form aligns voice and enterprise AI systems with DPDP Act 2023 and supports healthcare patterns that keep patient workflows on isolated private cloud infrastructure.
                        </p>
                        <Link to="/case-studies" className="text-brand-orange font-medium flex items-center gap-2 hover:gap-3 transition-all">
                            Read case studies <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Final CTA band */}
            <section className="py-32 bg-[#0A0A0A] relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-orange/5 blur-[80px] pointer-events-none" />
                <div className="container max-w-5xl mx-auto px-6 text-center relative z-10">
                    <div className="font-mono text-xs tracking-widest text-brand-orange uppercase mb-6">Next step</div>
                    <h2 className="text-4xl md:text-7xl font-display font-bold mb-8 text-balance">Brief Studio Form on the AI voice agent you need to ship</h2>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed">
                        Share the call direction, languages, telephony stack, and target workflows. Studio Form will help scope a pilot for autonomous voice agents on private infrastructure.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
                        <Link to="/contact" className="w-full sm:w-auto px-10 py-5 rounded-full bg-brand-orange text-black font-semibold hover:brightness-110 transition-all text-lg">
                            Book a Demo
                        </Link>
                        <a href="#capabilities" className="w-full sm:w-auto px-10 py-5 rounded-full bg-white/10 border border-white/15 hover:border-brand-orange hover:text-brand-orange font-semibold transition-all text-lg">
                            Explore Voice Agents
                        </a>
                    </div>
                    <div>
                        <Link to="/pricing" className="text-white/40 hover:text-white transition-colors text-sm underline decoration-white/20 underline-offset-4">
                            Or talk through commercial options on Pricing
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-32 bg-[#0F0F0F] border-t border-white/5">
                <div className="container max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-16 text-center">AI voice agents FAQ</h2>
                    <div className="space-y-4">
                        {FAQS.map((faq, idx) => (
                            <div key={idx} className="glass-card rounded-glass border border-white/5 bg-white/[0.01] text-left">
                                <button 
                                    className="w-full p-8 text-left flex items-center justify-between group" 
                                    onClick={() => toggleFaq(idx)}
                                >
                                    <span className="text-lg font-display font-bold">{faq.q}</span>
                                    <svg 
                                        className={`w-5 h-5 text-white/30 transition-transform group-hover:text-brand-orange ${openFaq === idx ? "rotate-180" : ""}`} 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {openFaq === idx && (
                                    <div className="px-8 pb-8 text-white/60 text-sm leading-relaxed">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}