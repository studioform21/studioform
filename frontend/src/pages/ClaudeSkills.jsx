import React from "react";
import GenericOffering from "@/components/GenericOffering";
import SEOMeta from "@/components/SEOMeta";

const CLAUDE_STRUCTURED_DATA = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Claude Skill Packs",
    "description": "Custom, enterprise-grade skill packs for Claude. Connect Claude with your tools, databases, APIs, and business policies.",
    "provider": {
        "@type": "Organization",
        "name": "Studio Form",
        "url": "https://www.studioform.app"
    }
};

const ITEMS = [
    {
        tag: "DEVELOPMENT",
        title: "Web & Frontend Pack",
        body: "Includes frontend-design, web-artifacts-builder, and webapp-testing skills for rapid UI iteration."
    },
    {
        tag: "DESIGN",
        title: "Creative & Brand Pack",
        body: "Capabilities for canvas-design, theme-factory, brand-guidelines, and algorithmic-art generation."
    },
    {
        tag: "OFFICE",
        title: "Document Processing",
        body: "Deep integration for docx, xlsx, pdf, and pptx along with real-time doc-coauthoring."
    },
    {
        tag: "COMMUNICATIONS",
        title: "Internal Comms Pack",
        body: "Streamline team workflows with internal-comms and the slack-gif-creator."
    },
    {
        tag: "INFRASTRUCTURE",
        title: "API & Builder Tools",
        body: "Manage scheduled deployments with claude-api and build contexts with mcp-builder."
    },
    {
        tag: "FRAMEWORK",
        title: "Skill Creator Pack",
        body: "Use the base skill-creator module to quickly scaffold and deploy new custom Claude skills."
    },
];

const CLAUDE_FAQS = [
    { q: "What is a Claude Skill Pack?", a: "It is a bundle of tools, Model Context Protocol configurations, system prompts, and test files that extend Claude's core reasoning capabilities for a specific team task." },
    { q: "How does Claude connect to our database?", a: "We build secure MCP server connectors (e.g. Postgres, SQLite, or private APIs) that allow Claude to query information only within strict guardrails." },
    { q: "Do these support Claude Artifacts?", a: "Yes. Our web-artifacts builders and UI packs are explicitly designed to render and test code previews inside Claude's visual interface." },
    { q: "Are custom skills secure?", a: "Yes. All connectors run within your local infrastructure, utilizing read-only database connections and OAuth protocols." },
    { q: "How long does it take to deploy a new skill?", a: "We can scaffold and deploy standard skill packs within 3-5 days. Custom APIs take up to 2 weeks." }
];

export default function ClaudeSkills() {
    return (
        <div>
            <SEOMeta
                title="Claude Skill Packs"
                description="Custom, enterprise-grade skill packs for Claude. Connect Claude with your internal systems, APIs, and data sources."
                keywords="Claude skills, custom Claude MCP, Anthropic Claude tools, enterprise Claude automation, Studio Form Claude"
                structuredData={CLAUDE_STRUCTURED_DATA}
                faqs={CLAUDE_FAQS}
            />
            <GenericOffering
                command="studioform --claude-skills"
                eyebrow="Claude Skills"
                title="100+ enterprise"
                accent="skill packs."
                subtitle="Custom skill packs for Claude — wired into your data, tools, and policies."
                stats={[
                    { value: 100, suffix: "+", label: "Skills" },
                    { value: 12, suffix: "+", label: "Domains" },
                    { value: 24, suffix: "/7", label: "Support" },
                    { value: 99.9, decimals: 1, suffix: "%", label: "Uptime" },
                ]}
                sectionCmd="studioform --packs"
                sectionTitle="Featured" sectionAccent="packs."
                sectionSubtitle="Ready-to-deploy skill packs. Each ships with prompts, tools, evals, and observability."
                items={ITEMS}
                faqs={CLAUDE_FAQS}
                cta={{
                    title: "Build a custom Claude skill pack.",
                    subtitle: "Bring your workflow — we'll ship a production-grade pack in 2 weeks.",
                    primary: { label: "Start a pack", to: "/contact" },
                    secondary: { label: "AI Automation", to: "/ai-automation" }
                }}
            />
        </div>
    );
}