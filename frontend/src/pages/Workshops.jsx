import React from "react";
import GenericOffering from "@/components/GenericOffering";
import SEOMeta from "@/components/SEOMeta";

const WORKSHOPS_STRUCTURED_DATA = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "AI & ML Workshops for Engineering Teams",
    "description": "Hands-on, engineer-led workshops covering agentic workflows, advanced RAG engineering, LLM evaluations, prompt engineering, and model fine-tuning.",
    "provider": {
        "@type": "Organization",
        "name": "Studio Form",
        "url": "https://www.studioform.app"
    }
};

const ITEMS = [
    { tag: "AGENTS", title: "Building Agentic Workflows", body: "Hands-on lab for LangChain, AutoGen, CrewAI, and stateful agent coordination." },
    { tag: "RAG", title: "Advanced RAG Engineering", body: "Learn chunking strategies, vector databases, reranking, and evaluation frameworks." },
    { tag: "EVAL", title: "Evaluating LLM Output", body: "Construct test suites, define metrics, and run systematic evaluations for LLM accuracy." },
    { tag: "PROMPT", title: "Prompt Ops & Engineering", body: "Systematic prompt design, few-shot templates, and DSPy for programmatic optimization." },
    { tag: "FINE-TUNE", title: "Fine-Tuning & Local LLMs", body: "When and how to fine-tune open-weights models like Llama 3, Mistral, and Phi." },
    { tag: "SECURITY", title: "AI Security & Guardrails", body: "Preventing prompt injections, jailbreaks, data leakage, and implementing safety layers." },
];

const WORKSHOP_FAQS = [
    { q: "Who leads the workshops?", a: "All workshops are led by Studio Form's core senior engineers who actively build and deploy AI models for enterprise production clients." },
    { q: "Can the curriculum be customized?", a: "Yes. We consult with your engineering leaders beforehand to align lessons and codebase labs directly with your technical stack and targets." },
    { q: "Do you offer hands-on coding labs?", a: "Yes. Every workshop session is 100% hands-on. Developers write, debug, and validate workflows in interactive environments." },
    { q: "What is the duration of a cohort?", a: "Bootcamps range from 2-day intensive hackathons to 4-week structured hybrid tracks." },
    { q: "Are courses available on-site?", a: "Yes. We conduct both remote interactive calls and on-campus or on-site engineering labs for corporate teams." }
];

export default function Workshops() {
    return (
        <div>
            <SEOMeta
                title="AI & ML Workshops"
                description="Hands-on, engineer-led workshops to upskill your teams on building agentic workflows, advanced RAG, LLM evals, and fine-tuning."
                keywords="AI workshops, corporate ML training, agentic workflows lab, RAG engineering course, LLM developer training, Studio Form workshops"
                structuredData={WORKSHOPS_STRUCTURED_DATA}
                faqs={WORKSHOP_FAQS}
            />
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
                faqs={WORKSHOP_FAQS}
                cta={{ 
                    title: "Bring AI workshops to your organization.", 
                    subtitle: "We customize our curriculum based on your team's current stack and target AI goals.", 
                    primary: { label: "Schedule a workshop", to: "/contact" }, 
                    secondary: { label: "Explore products", to: "/products" } 
                }}
            />
        </div>
    );
}
