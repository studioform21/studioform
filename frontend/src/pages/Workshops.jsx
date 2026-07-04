import React from "react";
import GenericOffering from "@/components/GenericOffering";

const ITEMS = [
    { tag: "AGENTS", title: "Building Agentic Workflows", body: "Hands-on lab for LangChain, AutoGen, CrewAI, and stateful agent coordination." },
    { tag: "RAG", title: "Advanced RAG Engineering", body: "Learn chunking strategies, vector databases, reranking, and evaluation frameworks." },
    { tag: "EVAL", title: "Evaluating LLM Output", body: "Construct test suites, define metrics, and run systematic evaluations for LLM accuracy." },
    { tag: "PROMPT", title: "Prompt Ops & Engineering", body: "Systematic prompt design, few-shot templates, and DSPy for programmatic optimization." },
    { tag: "FINE-TUNE", title: "Fine-Tuning & Local LLMs", body: "When and how to fine-tune open-weights models like Llama 3, Mistral, and Phi." },
    { tag: "SECURITY", title: "AI Security & Guardrails", body: "Preventing prompt injections, jailbreaks, data leakage, and implementing safety layers." },
];

export default function Workshops() {
    return (
        <GenericOffering
            command="studioform --workshops"
            eyebrow="AI & ML Workshops"
            title="Upskill your team on"
            accent="modern AI."
            subtitle="Hands-on, engineer-led workshops to help your product, design, and engineering teams build, evaluate, and scale real-world AI applications."
            stats={[
                { value: 1500, suffix: "+", label: "Engineers Trained" },
                { value: 45, suffix: "+", label: "Companies" },
                { value: 4.9, suffix: "/5", label: "Feedback Rating" },
                { value: 100, suffix: "%", label: "Hands-on Lab" },
            ]}
            sectionCmd="studioform --workshop-curriculum"
            sectionTitle="Workshop" sectionAccent="topics."
            sectionSubtitle="Tailored for developers, architects, and product leaders."
            items={ITEMS}
            cta={{ 
                title: "Bring AI workshops to your organization.", 
                subtitle: "We customize our curriculum based on your team's current stack and target AI goals.", 
                primary: { label: "Schedule a workshop", to: "/contact" }, 
                secondary: { label: "Explore products", to: "/products" } 
            }}
        />
    );
}
