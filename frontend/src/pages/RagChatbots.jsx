import React from "react";
import GenericOffering from "@/components/GenericOffering";
import SEOMeta from "@/components/SEOMeta";

const RAG_STRUCTURED_DATA = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "RAG Chatbot Development",
    "name": "Enterprise RAG Chatbots",
    "description": "Secure, permission-aware Retrieval-Augmented Generation (RAG) chatbots that interface with databases, documents, and Notion with page-level citations.",
    "provider": {
        "@type": "Organization",
        "name": "Studio Form",
        "url": "https://www.studioform.app",
        "logo": "https://www.studioform.app/logo_dark.png",
        "sameAs": [
            "https://github.com/studioform",
            "https://www.linkedin.com/company/studioform"
        ],
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Scheme 78, Vijay Nagar",
            "addressLocality": "Indore",
            "addressRegion": "Madhya Pradesh",
            "postalCode": "452010",
            "addressCountry": "IN"
        }
    },
    "areaServed": ["IN", "US", "Global"]
};

const ITEMS = [
    { tag: "ACCURACY", title: "Zero Hallucination Retrieval", body: "Dual-embed verification and hybrid semantic search keep answers 100% grounded in your context." },
    { tag: "CONNECT", title: "Enterprise Connectors", body: "Out-of-the-box sync with Notion, Google Drive, Jira, Salesforce, and SQL databases." },
    { tag: "SECURITY", title: "Role-Based ACL", body: "Strict access control so users only search and retrieve information they have permissions to view." },
    { tag: "MULTIMODAL", title: "Multimodal Processing", body: "Extract and search tables, charts, flowcharts, and scanned PDFs with layout-aware parsers." },
    { tag: "CITATIONS", title: "Page-Level Citations", body: "Every response points back to the exact source document, page, and paragraph for auditability." },
    { tag: "HYBRID", title: "Hybrid Search Mesh", body: "Combines dense vector embedding search with sparse keyword search (BM25) for precision." },
];

const RAG_FAQS = [
    { q: "How does the RAG chatbot prevent hallucinations?", a: "We utilize dual-embed verification checks and contextual filtering layers, ensuring the model only references the parsed source text." },
    { q: "Can we restrict database access based on user role?", a: "Yes. Our RAG engines support role-based access control (ACL) syncs so users only query information they are authorized to view." },
    { q: "Which file formats do you parse?", a: "Our layout-aware parsers extract text, tables, and structures from scanned PDFs, spreadsheets (XLSX), docs, Notion sheets, and database tables." },
    { q: "Is the query processing real-time?", a: "Yes. Document syncing is schedulable, and queries are answered in sub-seconds using optimized dense vector databases." },
    { q: "Is my corporate data secure?", a: "Absolutely. We configure fully private deployments in your local VPC environment so no data is shared with external model creators." }
];

export default function RagChatbots() {
    return (
        <div>
            <SEOMeta
                title="RAG Chatbots"
                description="Secure, permission-aware Retrieval-Augmented Generation (RAG) chatbots that interface with databases, documents, and Notion with page-level citations."
                keywords="RAG chatbots, enterprise search, zero-hallucination AI, vector search, database AI assistant, secure RAG"
                structuredData={RAG_STRUCTURED_DATA}
                faqs={RAG_FAQS}
            />
            <GenericOffering
                command="studioform --rag-chatbots"
                eyebrow="RAG Chatbots"
                title="Knowledge-grounded"
                accent="chatbots."
                subtitle="We build custom Retrieval-Augmented Generation (RAG) chatbots that talk to your PDFs, docs, Notion, and databases with absolute accuracy, zero hallucinations, and strict permission compliance."
                stats={[
                    { value: 10, suffix: "+", label: "RAG Deployments" },
                    { value: "High", suffix: "", label: "Visual Precision" },
                    { value: "Sub-Sec", suffix: "", label: "Query Latency" },
                    { value: 25, suffix: "+", label: "Document Formats" },
                ]}
                sectionCmd="studioform --rag-stack"
                sectionTitle="RAG Chatbots" sectionAccent="capabilities."
                sectionSubtitle="Secure, governed, and production-ready search and chat interfaces."
                items={ITEMS}
                faqs={RAG_FAQS}
                cta={{ 
                    title: "Unlock your enterprise knowledge.", 
                    subtitle: "Point us to your data sources — we will spin up a secure, custom RAG chatbot and demo it in 2 days.", 
                    primary: { label: "Book RAG demo", to: "/contact" }, 
                    secondary: { label: "See LLMs", to: "/llms" } 
                }}
            />
        </div>
    );
}
