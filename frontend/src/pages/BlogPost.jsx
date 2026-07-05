import React from "react";
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
    }
};

export default function BlogPost() {
    const { slug } = useParams();
    const art = BLOG_ARTICLES[slug];

    if (!art) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold font-display">Article Not Found</h2>
                    <Link to="/ai-news" className="text-brand-orange mt-4 inline-block text-sm">Return to News</Link>
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
                        <div className="space-y-4">
                            {art.body.map((p, idx) => (
                                <p key={idx} className="text-sm sm:text-base text-white/70 leading-relaxed">{p}</p>
                            ))}
                        </div>

                        <div className="space-y-6 pt-6 border-t border-white/10">
                            {art.sections.map((sec, idx) => (
                                <div key={idx} className="space-y-2">
                                    <h2 className="font-display text-lg sm:text-xl font-bold text-white">{sec.title}</h2>
                                    <p className="text-sm text-white/65 leading-relaxed">{sec.content}</p>
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
