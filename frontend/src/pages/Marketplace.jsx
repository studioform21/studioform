import React from "react";
import GenericOffering from "@/components/GenericOffering";

const ITEMS = [
    { tag: "AGENTS", title: "Pre-built Agents", body: "Plug-and-play agents for sales, support, ops, finance — pay per agent or per call." },
    { tag: "MODELS", title: "Model Marketplace", body: "Domain LLMs, embeddings, and rerankers from Studio Form and partners." },
    { tag: "SKILLS", title: "Skill Packs", body: "Capability packs (forms, vision, audio, search) you wire into your own stack." },
    { tag: "WORKFLOWS", title: "Workflow Templates", body: "1-click deploy automation templates for n8n, Make, Zapier." },
    { tag: "DATASETS", title: "Curated Datasets", body: "Licensed, deduped, governance-ready datasets across Indian languages and domains." },
    { tag: "EVALS", title: "Eval Suites", body: "Industry benchmarks and red-team kits for safe AI deployments." },
];

export default function Marketplace() {
    return (
        <GenericOffering
            command="studioform --marketplace"
            eyebrow="AI Marketplace"
            title="Buy. Sell."
            accent="Compose."
            subtitle="The agentic AI marketplace — agents, models, skills, workflows, datasets, evals. All in one place."
            stats={[
                { value: 1840, suffix: "+", label: "Listings" },
                { value: 120, suffix: "+", label: "Sellers" },
                { value: 12, suffix: "k+", label: "Buyers" },
                { value: 4.8, decimals: 1, label: "Avg Rating" },
            ]}
            sectionCmd="studioform --listings"
            sectionTitle="What's on the"
            sectionAccent="marketplace."
            sectionSubtitle="From single skills to whole stacks. Bring your card, walk out with AI."
            items={ITEMS}
            cta={{ title: "List your AI on the marketplace.", subtitle: "Reach thousands of buyers. We handle the billing, support, and SLAs.", primary: { label: "Become a seller", to: "/contact" }, secondary: { label: "Browse products", to: "/products" } }}
        />
    );
}
