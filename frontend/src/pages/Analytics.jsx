import React from "react";
import GenericOffering from "@/components/GenericOffering";
import SEOMeta from "@/components/SEOMeta";

const ANALYTICS_STRUCTURED_DATA = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI Analytics Services",
    "description": "Plug-in analytical AI for enterprise data warehouses. Get natural language BI, demand forecasting, and analytical agents.",
    "provider": {
        "@type": "Organization",
        "name": "Studio Form",
        "url": "https://studio-form.app"
    }
};

const ITEMS = [
    { tag: "NL→BI", title: "Natural Language BI", body: "Ask in English. Get the chart, dashboard, and the SQL behind it." },
    { tag: "FORECAST", title: "Demand & Ops Forecasting", body: "Time-series + causal models for inventory, staffing, churn." },
    { tag: "CV", title: "Computer Vision", body: "Shelf, traffic, quality, safety — deployable on existing camera fleets." },
    { tag: "DOC", title: "Document Intelligence", body: "OCR, extraction, classification, and validation for any document stack." },
    { tag: "SEARCH", title: "Enterprise Search", body: "Hybrid search across emails, docs, tickets, code. Permission-aware." },
    { tag: "AGENTS", title: "Analytical Agents", body: "Agents that run analyses, write memos, and present findings on a schedule." },
];

export default function Analytics() {
    return (
        <div>
            <SEOMeta
                title="AI Analytics"
                description="Plug-in analytical AI for enterprise data warehouses. Sits on top of Snowflake, BigQuery, Databricks."
                keywords="AI analytics, natural language BI, SQL agent, predictive analytics, demand forecasting, computer vision, Studio Form analytics"
                structuredData={ANALYTICS_STRUCTURED_DATA}
            />
            <GenericOffering
                command="studioform --analytics"
                eyebrow="AI Analytics"
                title="From data to"
                accent="decisions."
                subtitle="Plug-in analytical AI for the operators who already have a data warehouse and don't want another dashboard."
                stats={[
                    { value: 320, suffix: "+", label: "Deployments" },
                    { value: 12, suffix: " min", label: "Median TTI" },
                    { value: 40, suffix: "%", label: "Faster Decisions" },
                    { value: 30, suffix: "%", label: "Cost Savings" },
                ]}
                sectionCmd="studioform --analytics-stack"
                sectionTitle="Analytics" sectionAccent="capabilities."
                sectionSubtitle="Composable, governed, observable. Sits on top of Snowflake, BigQuery, Databricks."
                items={ITEMS}
                cta={{ title: "Bring AI to your analytics stack.", subtitle: "Tell us your warehouse — we plug in, demo it, and ship in 2 weeks.", primary: { label: "Book analytics demo", to: "/contact" }, secondary: { label: "See LLMs", to: "/llms" } }}
            />
        </div>
    );
}