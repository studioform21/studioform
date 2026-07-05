import React, { useState } from "react";
import PageHero from "@/components/PageHero";
import SEOMeta from "@/components/SEOMeta";
import { Terminal, Shield, BookOpen, Layers } from "lucide-react";

const DOCS_INDEX = [
    {
        category: "Getting Started",
        items: [
            { id: "intro", title: "Introduction", summary: "Learn about the Studio Form agentic AI ecosystem." },
            { id: "quickstart", title: "Quickstart Guide", summary: "Deploy your first voice agent or RAG chatbot in under 10 minutes." }
        ]
    },
    {
        category: "Core API",
        items: [
            { id: "voice-api", title: "Voice Agent API", summary: "Dial, route, stream media, and customize dialect TTS nodes programmatically." },
            { id: "mcp-setup", title: "Model Context Protocol", summary: "Connect LLMs to custom enterprise tools using standard MCP specs." }
        ]
    }
];

const DOC_CONTENT = {
    intro: {
        title: "Introduction to Studio Form",
        body: "Studio Form is a full-stack agentic AI system company. We provide client-ready autonomous agents, multilingual voice callers, domain-specific fine-tuned LLMs, and secure knowledge retrievers.",
        code: "$ studioform --status\n● Operational\nUptime: 99.97%\nAgents active: 200",
        notes: "We design, build, and deploy all assets on public staging grids or private client VPC infrastructures."
    },
    quickstart: {
        title: "Developer Quickstart",
        body: "Get started with the Studio Form SDK. Connect your telephony nodes, link your vector database, and deploy a webhook listener.",
        code: "import { StudioFormClient } from '@studioform/sdk';\n\nconst client = new StudioFormClient({ apiKey: 'sf_live_...' });\nawait client.voice.createCall({\n    to: '+917314086183',\n    agentId: 'voice_support_mumbai'\n});",
        notes: "Telephony keys and API credentials can be generated within your client command center console."
    },
    "voice-api": {
        title: "Voice Agent API Reference",
        body: "Initiate inbound, outbound, or dialect-aware conversational voice sessions. Configure webhooks to process call endings and updates.",
        code: "POST /api/v1/voice/calls\n{\n  \"recipient\": \"+919999999999\",\n  \"dialect\": \"hi-IN-bhojpuri\",\n  \"context\": \"dispatch_order_validation\"\n}",
        notes: "Telephony webhook retries follow exponential backoff configurations automatically."
    },
    "mcp-setup": {
        title: "Model Context Protocol (MCP)",
        body: "Implement Model Context Protocol endpoints to expose internal APIs, database schemas, and file catalogs directly to Claude and custom agents.",
        code: "{\n  \"mcp_servers\": {\n    \"postgres-db\": {\n      \"command\": \"npx\",\n      \"args\": [\"-y\", \"@modelcontextprotocol/server-postgres\"]\n    }\n  }\n}",
        notes: "Ensure Postgres user permissions are limited to read-only views for public LLM execution boundaries."
    }
};

export default function Docs() {
    const [activeId, setActiveId] = useState("intro");
    const doc = DOC_CONTENT[activeId] || DOC_CONTENT["intro"];

    const DOCS_STRUCTURED_DATA = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": doc.title,
        "description": doc.body,
        "url": `https://studio-form.app/docs#${activeId}`,
        "author": {
            "@type": "Organization",
            "name": "Studio Form"
        }
    };

    return (
        <div>
            <SEOMeta
                title={`${doc.title} | Documentation`}
                description={doc.body}
                keywords={`Studio Form docs, ${activeId} guide, AI SDK reference, Model Context Protocol setup`}
                structuredData={DOCS_STRUCTURED_DATA}
            />
            <PageHero 
                command="studioform --docs" 
                eyebrow="Docs" 
                title="System Integration &" 
                accent="API Guides" 
                subtitle="Integrate, scale, and customize autonomous voice agents and RAG databases with our developer guides."
            />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-4 gap-8">
                <aside className="space-y-6">
                    {DOCS_INDEX.map((cat) => (
                        <div key={cat.category}>
                            <div className="font-mono text-xs uppercase text-brand-orange mb-3 tracking-wider">{cat.category}</div>
                            <ul className="space-y-2">
                                {cat.items.map((item) => (
                                    <li key={item.id}>
                                        <button 
                                            onClick={() => setActiveId(item.id)}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeId === item.id ? "bg-white/5 text-white font-medium border border-white/10" : "text-white/60 hover:text-white"}`}
                                        >
                                            {item.title}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </aside>

                <main className="lg:col-span-3 glass-card p-6 sm:p-8 space-y-6">
                    <h2 className="font-display text-3xl font-bold text-white border-b border-white/10 pb-4">{doc.title}</h2>
                    <p className="text-sm text-white/70 leading-relaxed">{doc.body}</p>
                    
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 font-mono text-[10px] text-white/40 uppercase">
                            <Terminal size={12} className="text-brand-orange" /> Execution Code
                        </div>
                        <pre className="bg-[#050505] p-4 rounded-xl font-mono text-xs text-white/80 overflow-x-auto whitespace-pre leading-relaxed border border-white/5">
                            {doc.code}
                        </pre>
                    </div>

                    <div className="border-t border-white/10 pt-6 mt-6 flex gap-3 items-start">
                        <BookOpen size={16} className="text-brand-orange shrink-0 mt-0.5" />
                        <div>
                            <div className="text-xs font-mono uppercase text-white/40">Developer Note</div>
                            <p className="text-xs text-white/60 mt-1 leading-relaxed">{doc.notes}</p>
                        </div>
                    </div>
                </main>
            </section>
        </div>
    );
}
