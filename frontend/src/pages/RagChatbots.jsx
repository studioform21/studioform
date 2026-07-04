import React from "react";
import GenericOffering from "@/components/GenericOffering";

const ITEMS = [
    { tag: "ACCURACY", title: "Zero Hallucination Retrieval", body: "Dual-embed verification and hybrid semantic search keep answers 100% grounded in your context." },
    { tag: "CONNECT", title: "Enterprise Connectors", body: "Out-of-the-box sync with Notion, Google Drive, Jira, Salesforce, and SQL databases." },
    { tag: "SECURITY", title: "Role-Based ACL", body: "Strict access control so users only search and retrieve information they have permissions to view." },
    { tag: "MULTIMODAL", title: "Multimodal Processing", body: "Extract and search tables, charts, flowcharts, and scanned PDFs with layout-aware parsers." },
    { tag: "CITATIONS", title: "Page-Level Citations", body: "Every response points back to the exact source document, page, and paragraph for auditability." },
    { tag: "HYBRID", title: "Hybrid Search Mesh", body: "Combines dense vector embedding search with sparse keyword search (BM25) for precision." },
];

export default function RagChatbots() {
    return (
        <GenericOffering
            command="studioform --rag-chatbots"
            eyebrow="RAG Chatbots"
            title="Knowledge-grounded"
            accent="chatbots."
            subtitle="We build custom Retrieval-Augmented Generation (RAG) chatbots that talk to your PDFs, docs, Notion, and databases with absolute accuracy, zero hallucinations, and strict permission compliance."
            stats={[
                { value: 100, suffix: "M+", label: "Tokens Queried" },
                { value: 99.9, suffix: "%", label: "Accuracy Rate" },
                { value: 200, suffix: " ms", label: "Avg Latency" },
                { value: 50, suffix: "+", label: "Connected Sources" },
            ]}
            sectionCmd="studioform --rag-stack"
            sectionTitle="RAG Chatbots" sectionAccent="capabilities."
            sectionSubtitle="Secure, governed, and production-ready search and chat interfaces."
            items={ITEMS}
            cta={{ 
                title: "Unlock your enterprise knowledge.", 
                subtitle: "Point us to your data sources — we will spin up a secure, custom RAG chatbot and demo it in 2 days.", 
                primary: { label: "Book RAG demo", to: "/contact" }, 
                secondary: { label: "See LLMs", to: "/llms" } 
            }}
        />
    );
}
