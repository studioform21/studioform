import React from "react";
import GenericOffering from "@/components/GenericOffering";

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

export default function ClaudeSkills() {
    return (
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
            cta={{
                title: "Build a custom Claude skill pack.",
                subtitle: "Bring your workflow — we'll ship a production-grade pack in 2 weeks.",
                primary: { label: "Start a pack", to: "/contact" },
                secondary: { label: "AI Automation", to: "/ai-automation" }
            }}
        />
    );
}