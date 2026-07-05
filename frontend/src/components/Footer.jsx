import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Youtube, Mail } from "lucide-react";
import Logo from "@/components/Logo";
import { http } from "@/lib/api";
import { toast } from "sonner";

const COLS = [
    {
        title: "Services", links: [
            ["AI Agents", "/services/ai-agents"],
            ["AI Voice Agents", "/services/voice-agents"],
            ["RAG Chatbots", "/services/rag-chatbots"],
            ["LLM Development", "/services/llm-development"],
            ["AI Automation", "/services/ai-automation"],
            ["AI Consulting", "/services/ai-consulting"],
            ["Fine Tuning", "/services/fine-tuning"],
            ["Custom AI", "/services/custom-ai"]
        ]
    },
    {
        title: "Learn & Resources", links: [
            ["AI University", "/ai-university"],
            ["AI News", "/ai-news"],
            ["Case Studies", "/case-studies"],
            ["Pricing", "/pricing"],
            ["Docs", "/docs"]
        ]
    },
    {
        title: "Company", links: [
            ["About", "/about"],
            ["Team", "/team"],
            ["Contact", "/contact"],
            ["Changelog", "/changelog"],
            ["Privacy", "/privacy"],
            ["Terms", "/terms"],
            ["Refund Policy", "/refund"],
            ["Shipping Policy", "/shipping"],
            ["Cancellation Policy", "/cancellation"]
        ]
    }
];

export default function Footer() {
    const [email, setEmail] = useState("");
    const [busy, setBusy] = useState(false);

    const subscribe = async (e) => {
        e.preventDefault();
        if (!email) return;
        setBusy(true);
        try {
            await http.post("/subscribe", { email });
            toast.success("Subscribed — keep an eye on your inbox.");
            setEmail("");
        } catch {
            toast.error("Something went wrong. Try again.");
        } finally { setBusy(false); }
    };

    return (
        <footer className="border-t border-white/10 bg-[#0A0A0A]" data-testid="footer">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
                    <div className="lg:col-span-2 space-y-4">
                        <Logo />
                        <p className="text-sm text-white/60 max-w-sm">
                            Studio Form is a full-stack agentic AI company. We ship products, not slide decks.
                            Voice agents, automation, LLMs, infrastructure, and education — under one roof.
                        </p>
                        <form onSubmit={subscribe} className="flex gap-2 max-w-sm pt-2">
                            <input
                                data-testid="footer-subscribe-email"
                                type="email"
                                required
                                placeholder="you@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 px-3 py-2.5 rounded-full bg-white/[0.04] border border-white/10 text-sm placeholder:text-white/30 focus:outline-none focus:border-brand-orange/60"
                            />
                            <button data-testid="footer-subscribe-submit" disabled={busy} className="px-4 py-2.5 rounded-full bg-brand-orange text-black font-medium text-sm hover:brightness-110 disabled:opacity-50">
                                {busy ? "..." : "Subscribe"}
                            </button>
                        </form>
                        <p className="text-[10px] text-white/40 font-mono pt-1">
                            By subscribing, you agree to our <Link to="/privacy" className="underline hover:text-brand-orange">Privacy Policy</Link> under the DPDP Act, 2023.
                        </p>
                        <div className="flex items-center gap-3 pt-3">
                            {[Twitter, Linkedin, Youtube, Github].map((Icon, i) => (
                                <a key={i} href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:text-brand-orange hover:border-brand-orange/40 transition">
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {COLS.map((c) => (
                        <div key={c.title}>
                            <div className="font-mono text-xs uppercase text-brand-orange mb-4 tracking-wider">{c.title}</div>
                            <ul className="space-y-2.5">
                                {c.links.map(([label, href]) => (
                                    <li key={label}>
                                        <Link to={href} className="text-sm text-white/70 hover:text-white transition-colors">{label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="font-mono text-xs text-white/40">
                        © {new Date().getFullYear()} Studio Form Labs Pvt. Ltd. — Built in India, deployed globally.
                    </div>
                    <div className="flex items-center gap-2 font-mono text-[11px] text-white/60">
                        <span className="pulse-dot" /> all systems operational
                        <span className="text-white/20">|</span>
                        <Mail size={12} /> info@studioform.app
                    </div>
                </div>
            </div>
        </footer>
    );
}
