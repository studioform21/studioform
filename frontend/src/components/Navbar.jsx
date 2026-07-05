import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import Logo from "@/components/Logo";

const SERVICES_LINKS = [
    { to: "/services/ai-agents", label: "AI Agents" },
    { to: "/services/voice-agents", label: "AI Voice Agents" },
    { to: "/services/rag-chatbots", label: "RAG Chatbots" },
    { to: "/services/llm-development", label: "LLM Development" },
    { to: "/services/ai-automation", label: "AI Automation" },
    { to: "/services/ai-consulting", label: "AI Consulting" },
    { to: "/services/fine-tuning", label: "Fine Tuning" },
    { to: "/services/custom-ai", label: "Custom AI" },
];

const LEARN_LINKS = [
    { to: "/ai-university", label: "AI University" },
    { to: "/ai-news", label: "AI News" },
    { to: "/blog", label: "Blog" },
];

const COMPANY_LINKS = [
    { to: "/about", label: "About" },
    { to: "/team", label: "Team" },
    { to: "/contact", label: "Contact" },
];

function Dropdown({ label, items, testid }) {
    const [open, setOpen] = useState(false);
    const ref = React.useRef(null);

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div 
            ref={ref}
            className="relative"
        >
            <button
                data-testid={testid}
                onClick={() => setOpen(prev => !prev)}
                className="flex items-center gap-1 text-sm text-white/80 hover:text-white transition-colors py-2 focus:outline-none"
            >
                {label} <ChevronDown size={14} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
                <div className="absolute left-0 top-full pt-2 z-50">
                    <div className="glass-card min-w-[240px] p-2 !bg-[#0A0A0A]/95 border border-white/10 shadow-2xl rounded-xl">
                        {items.map((it) => (
                            <Link 
                                key={it.to} 
                                to={it.to} 
                                onClick={() => setOpen(false)}
                                className="block px-3 py-2 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                            >
                                {it.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function Navbar() {
    const [mobile, setMobile] = useState(false);
    const loc = useLocation();
    React.useEffect(() => { setMobile(false); }, [loc.pathname]);

    return (
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0A0A0A]/80 border-b border-b-white/10" data-testid="navbar">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                <Link to="/" className="flex items-center gap-3" data-testid="nav-home-link">
                    <span className="font-mono text-brand-orange hidden sm:inline">{">_"}</span>
                    <Logo size={28} />
                </Link>

                <nav className="hidden lg:flex items-center gap-6">
                    <Dropdown label="Services" items={SERVICES_LINKS} testid="nav-services-trigger" />
                    <NavLink to="/pricing" className={({ isActive }) => `text-sm transition-colors ${isActive ? "text-white" : "text-white/80 hover:text-white"}`} data-testid="nav-pricing-link">Pricing</NavLink>
                    <NavLink to="/case-studies" className={({ isActive }) => `text-sm transition-colors ${isActive ? "text-white" : "text-white/80 hover:text-white"}`} data-testid="nav-cases-link">Case Studies</NavLink>
                    <Dropdown label="Learn" items={LEARN_LINKS} testid="nav-learn-trigger" />
                    <Dropdown label="Company" items={COMPANY_LINKS} testid="nav-company-trigger" />
                </nav>

                <div className="hidden lg:flex items-center gap-3">
                    <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[11px] text-white/70" data-testid="status-pill">
                         <span className="pulse-dot" /> all systems operational
                    </span>
                    <Link to="/contact" className="px-4 py-2 rounded-full bg-brand-orange text-black font-medium text-sm hover:brightness-110 transition" data-testid="nav-cta">
                        Get Started
                    </Link>
                </div>

                <button className="lg:hidden text-white" onClick={() => setMobile(v => !v)} data-testid="nav-mobile-toggle">
                    {mobile ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {mobile && (
                <div className="lg:hidden border-t border-white/10 bg-[#0A0A0A]" data-testid="mobile-menu">
                    <div className="px-4 py-4 space-y-4 max-h-[80vh] overflow-y-auto">
                        {[{ title: "Services", items: SERVICES_LINKS }, { title: "Learn", items: LEARN_LINKS }, { title: "Company", items: COMPANY_LINKS }].map(g => (
                            <div key={g.title}>
                                <div className="font-mono text-xs text-brand-orange uppercase mb-2">{g.title}</div>
                                <div className="grid grid-cols-1 gap-1">
                                    {g.items.map(it => (
                                        <Link key={it.to} to={it.to} className="px-3 py-2 rounded-md text-sm text-white/80 hover:bg-white/5">{it.label}</Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <div>
                            <div className="font-mono text-xs text-brand-orange uppercase mb-2">General</div>
                            <div className="grid grid-cols-1 gap-1">
                                <Link to="/pricing" className="px-3 py-2 rounded-md text-sm text-white/80 hover:bg-white/5">Pricing</Link>
                                <Link to="/case-studies" className="px-3 py-2 rounded-md text-sm text-white/80 hover:bg-white/5">Case Studies</Link>
                            </div>
                        </div>
                        <Link to="/contact" className="block text-center px-4 py-2.5 rounded-full bg-brand-orange text-black font-medium text-sm">Get Started</Link>
                    </div>
                </div>
            )}
        </header>
    );
}
