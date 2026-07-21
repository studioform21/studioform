import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import SEOMeta from "@/components/SEOMeta";
import { ArrowLeft, Clock, User, Share2, BookOpen } from "lucide-react";
import { toast } from "sonner";

const BLOG_ARTICLES = {
    "gpt-5-reasoning-bands": {
        title: "GPT-5 Launches with Reasoning Bands",
        tag: "Breaking",
        date: "Feb 8, 2026",
        readTime: "5 min read",
        author: "Studio Form Research",
        keywords: "GPT-5 release, reasoning bands, o1 reasoning, OpenAI, LLM benchmarks, agentic workflows",
        body: [
            "OpenAI's latest release introduces 'Reasoning Bands'—allowing developers to configure the amount of compute allocated to search and self-correction at inference time.",
            "This marks a major shift from standard next-token predictions, introducing a structured verification loop before output generation. For simple tasks, the model returns responses in milliseconds; for complex operations, it evaluates multiple branches over several seconds.",
            "Our team ran benchmarks comparing this new compute-budget scaling against our fine-tuned LogiBrain models. While GPT-5 excels at general reasoning, domain-specific models still edge out on specialized API coordination latency."
        ],
        sections: [
            {
                title: "1. What are Inference Reasoning Bands?",
                content: "Reasoning bands allow you to specify the maximum reasoning tokens. This prevents the agent from spending minutes correcting itself on trivial tasks while allowing high-compute budgets for complex mathematical or code evaluation checks."
            },
            {
                title: "2. Strategic Impact on Agentic Workflows",
                content: "For enterprise automation, this eliminates the need for expensive multi-turn validation loops in the agent orchestration code. The validation is now handled natively within the model container."
            }
        ],
        structuredData: {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "GPT-5 Launches with Reasoning Bands",
            "datePublished": "2026-02-08T00:00:00Z",
            "author": { "@type": "Person", "name": "Studio Form Research" },
            "publisher": { "@type": "Organization", "name": "Studio Form", "url": "https://www.studioform.app" }
        }
    },
    "marathi-voice-agent-playbook": {
        title: "Building a Marathi Voice Agent: Playbook",
        tag: "Voice AI",
        date: "Jan 6, 2026",
        readTime: "8 min read",
        author: "Sarthak, Voice Engineering",
        keywords: "Marathi voice agent, voice AI, Indic dialect, ASR, TTS, Studio Form voice, logistics voice bot",
        body: [
            "Creating conversational voice bots that sound natural to local regional speakers requires more than translating English text to Marathi. The system must account for regional dialects, code-mixed phrases (using English words within Marathi sentences), and custom background telephony noise.",
            "Over the past 6 months, we have deployed voice agents across Maharashtra's logistics dispatch loops, automating delivery verifications for thousands of local drivers daily.",
            "Here is our engineering playbook detailing how to achieve sub-second TTS latency while preserving accent authenticity."
        ],
        sections: [
            {
                title: "1. Dialect & Code-Mix Adaptation",
                content: "Drivers rarely speak formal book Marathi. They use colloquial expressions and mix in English terms like 'address', 'delivery location', and 'payment code'. Our custom ASR model uses code-mix token mapping to interpret sentences accurately."
            },
            {
                title: "2. Reducing Latency below 800ms",
                content: " टेलीफोनी systems demand speed. We stream media payloads from Twilio directly to our Whisper-based Indic parser, routing responses straight into our fast TTS node to keep conversational gaps natural."
            }
        ],
        structuredData: {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "Building a Marathi Voice Agent: Playbook",
            "datePublished": "2026-01-06T00:00:00Z",
            "author": { "@type": "Person", "name": "Sarthak" },
            "publisher": { "@type": "Organization", "name": "Studio Form", "url": "https://www.studioform.app" }
        }
    },
    "rbi-ai-regulation": {
        title: "RBI's Draft AI Regulation: A Pragmatic BFSI Checklist",
        tag: "India",
        date: "Jan 12, 2026",
        readTime: "6 min read",
        author: "Compliance Operations",
        keywords: "RBI AI guidelines, BFSI compliance, financial AI guardrails, secure banking LLM, finance automation",
        body: [
            "The Reserve Bank of India (RBI) recently issued draft directives detailing regulatory frameworks for artificial intelligence in banking, financial services, and insurance (BFSI) operations.",
            "The draft places significant emphasis on data security, bias audits, explainability of credit-scoring models, and the prevention of automated decisions without human oversight.",
            "Here is a checklist of critical requirements that financial institutions must meet before deploying generative AI agents in production."
        ],
        sections: [
            {
                title: "1. On-Premise Data Residence",
                content: "All customer transaction files and prompt query logs must remain within local Indian geography. This mandates private VPC hosting or secure hybrid setups rather than public APIs."
            },
            {
                title: "2. Explanations & Model Transparency",
                content: "If an AI model assists in loan pre-qualification or risk scoring, a clear audit log of the weights and search nodes must be preserved to justify decisions to audit officers."
            }
        ],
        structuredData: {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "RBI's Draft AI Regulation: A Pragmatic BFSI Checklist",
            "datePublished": "2026-01-12T00:00:00Z",
            "author": { "@type": "Person", "name": "Compliance Operations" },
            "publisher": { "@type": "Organization", "name": "Studio Form", "url": "https://www.studioform.app" }
        }
    },
    "how-to-build-ai-receptionist": {
        title: "How to Build an AI Receptionist That Actually Works (Without Hiring an Engineering Team)",
        tag: "Voice AI",
        date: "Jul 21, 2026",
        readTime: "8 min read",
        author: "Studio Form Voice Engineering",
        keywords: "ai receptionist, voice AI, virtual receptionist, phone automation, ai phone answering, Studio Form, twilio voice agent, n8n voice agent",
        callout: "Quick Summary (AI Overview Box): An AI receptionist is an automated voice AI agent that answers inbound phone calls 24/7, understands conversational intent, books appointments in your CRM/calendar, and escalates complex callers to live staff. Building a production-grade system requires low-latency speech synthesis (<500ms), reliable phone line connectivity, and deep calendar integration—capabilities provided natively by platforms like Studio Form.",
        body: [
            "If you've searched 'ai receptionist' recently, you've probably landed on two kinds of results: enterprise sales pages that never mention pricing, or DIY tutorials that ask you to wire together five different tools and hope nothing breaks at 2 AM when a real customer calls.",
            "Neither is a great option if you're a clinic, law firm, home services company, or growing SaaS business that just needs your phones answered — every time, correctly, without a human sitting by the line.",
            "According to industry research, over 67% of callers hang up without leaving a message when directed to voicemail. For service businesses, missed calls directly translate to lost revenue. This guide walks through exactly how to build a production-grade AI receptionist, why so many businesses are suddenly searching for this, and how to do it with Studio Form instead of duct-taping it together yourself."
        ],
        sections: [
            {
                title: "1. Why 'AI Receptionist' Searches Are Spiking Right Now",
                content: [
                    "Search demand for AI receptionists isn't coming from Fortune 500 enterprises with dedicated AI teams — it's coming from small and mid-sized businesses realizing that missed calls are missed revenue, and that voice AI has finally gotten good enough to handle real conversations.",
                    "A good example of where this demand is coming from: a solo builder recently documented in a popular automation community how they wired together a working AI voice agent receptionist using workflow tools like n8n, chaining together speech-to-text, an LLM, text-to-speech, and telephony APIs by hand. The build worked — but it also needed constant babysitting: managing API rate limits, handling call transfers, keeping latency low enough that callers didn't feel like they were talking to a laggy bot, and rebuilding the whole flow every time one connected service changed its API."
                ],
                bullets: [
                    "The demand is real: Business owners are actively trying to solve 'someone needs to answer the phone' with AI, not just chatbots.",
                    "The DIY path is fragile: Stitching together five tools to answer a phone call works as a weekend project. It does not hold up when a real patient, client, or customer calls your business and the call drops or mishears an appointment time."
                ]
            },
            {
                title: "2. What an AI Receptionist Actually Needs to Do",
                content: "Before building anything, it helps to define what 'receptionist' actually means in AI terms. A real front-desk person does more than answer questions — they:",
                bullets: [
                    "Answer every call within a ring or two, 24/7",
                    "Understand context (a returning patient vs. a new lead vs. a vendor)",
                    "Book, reschedule, or cancel appointments in your actual calendar system",
                    "Route urgent calls to a real human immediately with warm live transfers",
                    "Speak naturally with low latency (<500ms), without robotic pauses",
                    "Log every call transcript and audio recording so your team has a record, not a guess"
                ]
            },
            {
                title: "3. Step-by-Step: Building an AI Receptionist with Studio Form",
                content: "Here's the practical build process using Studio Form's voice agent infrastructure instead of hand-wiring your own stack:",
                subsections: [
                    {
                        subTitle: "Step 1: Define the Call Flows You Need Covered",
                        text: "Start narrow, not broad. List the actual call types your business gets: New appointment bookings, reschedules & cancellations, FAQs (hours, pricing, location), and urgent calls that must reach a human immediately. Studio Form maps these directly into voice agent workflows during onboarding."
                    },
                    {
                        subTitle: "Step 2: Connect Your Existing Systems",
                        text: "An AI receptionist is only useful if it can actually see your calendar and customer records. Studio Form connects directly to your scheduling tool, CRM, or practice management system (Google Calendar, Calendly, HubSpot, Salesforce) so bookings show up instantly."
                    },
                    {
                        subTitle: "Step 3: Train the Voice Agent on Your Business",
                        text: "Studio Form builds the agent around your actual business: your services, your tone, and your specific safety guardrails (e.g. 'if someone mentions chest pain, transfer immediately'). Custom LLM tuning ensures your bot sounds like your business, not a generic call center script."
                    },
                    {
                        subTitle: "Step 4: Set Live Escalation Rules",
                        text: "Configure fail-safes for complex calls: warm transfer to a live line, SMS alerts to on-call staff, or priority callback queues so no urgent caller gets stuck in a bot loop."
                    },
                    {
                        subTitle: "Step 5: Test with Real Call Scenarios",
                        text: "Before going live, test against messy real-world conditions: background noise, accents, interruptions, and callers changing their minds mid-sentence."
                    },
                    {
                        subTitle: "Step 6: Deploy and Monitor",
                        text: "Port your number or launch a new local line. Studio Form provides call logs, transcripts, and resolution monitoring so you can continuously optimize performance."
                    }
                ]
            },
            {
                title: "4. DIY Voice Agent vs. Studio Form: The Real Difference",
                content: "The n8n-style build is a genuinely impressive proof of concept — it proves the underlying idea works. But there's a real gap between getting a voice agent to answer a test call and trusting it to run your front desk every single day. That gap is infrastructure, reliability, and support.",
                table: {
                    headers: ["Feature / Metric", "DIY (n8n / workflow tools)", "Studio Form Platform"],
                    rows: [
                        ["Setup time", "Days to weeks of manual wiring", "2-3 days, guided setup"],
                        ["Voice Latency", "High / Variable (1.2s - 2.5s)", "Ultra-low (<500ms)"],
                        ["Reliability", "Depends on maintaining 5 connected APIs", "Enterprise 99.9% uptime SLA"],
                        ["Calendar / CRM Integration", "Manual, custom-built per tool", "Native integration out of the box"],
                        ["Escalation handling", "Custom logic you write yourself", "Built-in warm & cold live transfers"],
                        ["Ongoing maintenance", "You fix every break, update, and API change", "Fully managed by Studio Form team"]
                    ]
                }
            },
            {
                title: "5. Who This Is For",
                content: "An AI receptionist built this way makes the most sense for:",
                bullets: [
                    "Healthcare & Dental Practices drowning in appointment calls and no-shows",
                    "Law Firms & Professional Services that lose high-value leads to voicemail",
                    "Home Services Businesses (HVAC, plumbing, electrical) getting calls during jobs when no one can answer",
                    "Growing SaaS & E-Commerce Businesses needing consistent 24/7 phone support"
                ]
            },
            {
                title: "6. Frequently Asked Questions",
                faqs: [
                    { q: "Is an AI receptionist the same as a chatbot?", a: "No. A chatbot handles text on a website. An AI receptionist is a voice agent that answers real phone calls, understands spoken conversation, and takes real actions like booking appointments." },
                    { q: "Can it sound natural instead of robotic?", a: "Yes — voice quality has advanced significantly. Platforms like Studio Form tune the agent's tone, pacing, and vocabulary to match your business rather than using a flat, generic voice." },
                    { q: "What happens if the AI can't answer a question?", a: "It escalates based on rules set during setup — transferring to a live team member, sending an SMS alert, or logging a callback request, rather than leaving the caller stuck." },
                    { q: "How long does it take to go live?", a: "Unlike a hand-built workflow stack, which can take weeks of trial and error, a guided build with Studio Form is typically live within days." }
                ]
            }
        ],
        structuredData: {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "TechArticle",
                    "headline": "How to Build an AI Receptionist That Actually Works (Without Hiring an Engineering Team)",
                    "description": "Learn how to build a production-grade AI receptionist using Studio Form's voice agent platform — no engineering team, no dropped calls, deployed in days.",
                    "datePublished": "2026-07-21T00:00:00Z",
                    "author": { "@type": "Organization", "name": "Studio Form Voice Engineering" },
                    "publisher": { "@type": "Organization", "name": "Studio Form", "url": "https://studioform.app" }
                },
                {
                    "@type": "FAQPage",
                    "mainEntity": [
                        {
                            "@type": "Question",
                            "name": "Is an AI receptionist the same as a chatbot?",
                            "acceptedAnswer": { "@type": "Answer", "text": "No. A chatbot handles text on a website. An AI receptionist is a voice agent that answers real phone calls, understands spoken conversation, and takes real actions like booking appointments." }
                        },
                        {
                            "@type": "Question",
                            "name": "Can it sound natural instead of robotic?",
                            "acceptedAnswer": { "@type": "Answer", "text": "Yes — voice quality has advanced significantly. Platforms like Studio Form tune the agent's tone, pacing, and vocabulary to match your business." }
                        },
                        {
                            "@type": "Question",
                            "name": "What happens if the AI can't answer a question?",
                            "acceptedAnswer": { "@type": "Answer", "text": "It escalates based on rules set during setup — transferring to a live team member, sending an SMS alert, or logging a callback request." }
                        },
                        {
                            "@type": "Question",
                            "name": "How long does it take to go live?",
                            "acceptedAnswer": { "@type": "Answer", "text": "Unlike a hand-built workflow stack, which can take weeks of trial and error, a guided build with Studio Form is typically live within days." }
                        }
                    ]
                }
            ]
        }
    }
};

export default function BlogPost() {
    const { slug } = useParams();
    const [fetchedArt, setFetchedArt] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        fetch(`/api/blogs/${slug}`)
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (isMounted) {
                    if (data && data.title) {
                        setFetchedArt(data);
                    }
                    setLoading(false);
                }
            })
            .catch(() => {
                if (isMounted) setLoading(false);
            });
        return () => { isMounted = false; };
    }, [slug]);

    const art = fetchedArt || BLOG_ARTICLES[slug];

    if (loading && !art) {
        return <div className="min-h-screen bg-[#0A0A0A]" />;
    }

    if (!art) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold font-display">Article Not Found</h2>
                    <Link to="/ai-news" className="text-brand-orange mt-4 inline-block text-sm font-mono">Return to News</Link>
                </div>
            </div>
        );
    }

    const shareUrl = window.location.href;
    const handleShare = () => {
        navigator.clipboard.writeText(shareUrl);
        toast.success("Article link copied to clipboard!");
    };

    return (
        <div>
            <SEOMeta
                title={art.title}
                description={art.body[0]}
                keywords={art.keywords}
                structuredData={art.structuredData}
            />
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link to="/ai-news" className="inline-flex items-center gap-2 text-xs text-white/50 hover:text-brand-orange transition mb-6">
                    <ArrowLeft size={14} /> Back to News & Insights
                </Link>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/40 mb-4">
                    <span className="px-2 py-0.5 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange uppercase">
                        {art.tag}
                    </span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {art.readTime}</span>
                    <span className="flex items-center gap-1"><User size={12} /> {art.author}</span>
                    <span>{art.date}</span>
                </div>

                <h1 className="font-display text-3xl sm:text-5xl font-bold text-white leading-tight mb-8">
                    {art.title}
                </h1>

                <div className="grid lg:grid-cols-4 gap-8">
                    <main className="lg:col-span-3 space-y-6">
                        {art.callout && (
                            <div className="p-5 rounded-xl bg-brand-orange/10 border border-brand-orange/30 text-xs sm:text-sm text-white/80 leading-relaxed font-sans shadow-lg mb-6">
                                {art.callout}
                            </div>
                        )}

                        <div className="space-y-4">
                            {art.body.map((p, idx) => (
                                <p key={idx} className="text-sm sm:text-base text-white/70 leading-relaxed">{p}</p>
                            ))}
                        </div>

                        <div className="space-y-8 pt-6 border-t border-white/10">
                            {art.sections.map((sec, idx) => (
                                <div key={idx} className="space-y-3">
                                    <h2 className="font-display text-lg sm:text-xl font-bold text-white">{sec.title}</h2>
                                    
                                    {Array.isArray(sec.content) ? (
                                        sec.content.map((p, pIdx) => (
                                            <p key={pIdx} className="text-sm text-white/65 leading-relaxed">{p}</p>
                                        ))
                                    ) : sec.content ? (
                                        <p className="text-sm text-white/65 leading-relaxed">{sec.content}</p>
                                    ) : null}

                                    {sec.bullets && (
                                        <ul className="space-y-2 pl-4 list-disc text-sm text-white/70">
                                            {sec.bullets.map((b, bIdx) => (
                                                <li key={bIdx} className="leading-relaxed">{b}</li>
                                            ))}
                                        </ul>
                                    )}

                                    {sec.subsections && (
                                        <div className="space-y-4 pl-2 border-l-2 border-brand-orange/30 mt-3">
                                            {sec.subsections.map((sub, sIdx) => (
                                                <div key={sIdx} className="pl-3 space-y-1">
                                                    <h3 className="font-mono text-sm font-semibold text-brand-orange">{sub.subTitle}</h3>
                                                    <p className="text-xs sm:text-sm text-white/65 leading-relaxed">{sub.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {sec.table && (
                                        <div className="overflow-x-auto my-4">
                                            <table className="w-full text-left text-xs border-collapse border border-white/10 rounded-lg">
                                                <thead>
                                                    <tr className="bg-white/5 border-b border-white/10">
                                                        {sec.table.headers.map((h, hIdx) => (
                                                            <th key={hIdx} className="p-3 text-brand-orange font-mono uppercase">{h}</th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {sec.table.rows.map((row, rIdx) => (
                                                        <tr key={rIdx} className="border-b border-white/5 hover:bg-white/[0.02]">
                                                            {row.map((cell, cIdx) => (
                                                                <td key={cIdx} className="p-3 text-white/70">{cell}</td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}

                                    {sec.faqs && (
                                        <div className="space-y-3 mt-4">
                                            {sec.faqs.map((faq, fIdx) => (
                                                <div key={fIdx} className="glass-card p-4 space-y-1">
                                                    <h3 className="font-display text-sm font-bold text-white">{faq.q}</h3>
                                                    <p className="text-xs text-white/65 leading-relaxed">{faq.a}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-between border-t border-white/10 pt-6 mt-10">
                            <button 
                                onClick={handleShare}
                                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:border-brand-orange/40 hover:text-brand-orange transition-all duration-300 inline-flex items-center gap-2 text-xs"
                            >
                                <Share2 size={12} /> Share Article
                            </button>
                        </div>
                    </main>

                    <aside className="space-y-6">
                        <div className="glass-card p-6">
                            <h3 className="font-mono text-xs uppercase text-brand-orange mb-3">Related Services</h3>
                            <ul className="space-y-2.5 text-xs text-white/60">
                                <li><Link to="/services/voice-agents" className="hover:text-brand-orange transition">→ AI Voice Agents</Link></li>
                                <li><Link to="/services/llm-development" className="hover:text-brand-orange transition">→ LLM Fine-Tuning</Link></li>
                                <li><Link to="/services/ai-automation" className="hover:text-brand-orange transition">→ AI Workflows</Link></li>
                            </ul>
                        </div>
                        <div className="glass-card p-6">
                            <h3 className="font-mono text-xs uppercase text-brand-orange mb-3">Subscribe</h3>
                            <p className="text-[11px] text-white/50 leading-relaxed mb-3">Get our weekly brief on shipping production AI.</p>
                            <Link to="/contact" className="w-full block text-center py-2 rounded-full bg-brand-orange text-black font-medium text-xs">
                                Join brief
                            </Link>
                        </div>
                    </aside>
                </div>
            </div>

            <CTASection />
        </div>
    );
}
