import React from "react";
import { Link } from "react-router-dom";

const KEYWORD_MAP = [
    { keywords: ["ai voice agents", "voice agents", "voice agent", "telephony systems"], url: "/services/voice-agents" },
    { keywords: ["rag chatbots", "rag chatbot", "retrieval-augmented generation", "document intelligence"], url: "/services/rag-chatbots" },
    { keywords: ["domain llms", "domain llm", "model fine-tuning", "fine-tuning"], url: "/services/llm-development" },
    { keywords: ["ai automation", "agentic workflows", "automation workflows", "workflow automation", "automation loops"], url: "/services/ai-automation" },
    { keywords: ["pricing plans", "pricing model", "pricing"], url: "/pricing" },
    { keywords: ["case studies", "case study"], url: "/case-studies" },
    { keywords: ["ai workshops", "ai workshop", "workshops"], url: "/workshops" },
    { keywords: ["accessibility statement", "accessibility"], url: "/accessibility" }
];

export function linkify(text) {
    if (typeof text !== "string") return text;
    
    // Sort keyword rules by longest keyword first to avoid greedy substring matches
    const rules = [];
    KEYWORD_MAP.forEach(rule => {
        rule.keywords.forEach(kw => {
            rules.push({ kw, url: rule.url });
        });
    });
    rules.sort((a, b) => b.kw.length - a.kw.length);

    // Keep track of which destination URLs have already been linked to avoid over-linking
    const linkedUrls = new Set();
    let parts = [text];

    rules.forEach(({ kw, url }) => {
        if (linkedUrls.has(url)) return;

        const newParts = [];
        let replacedThisTurn = false;

        parts.forEach(part => {
            if (typeof part !== "string") {
                newParts.push(part);
                return;
            }

            // Regex to match keyword on word boundaries, case-insensitive
            const escaped = kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
            const regex = new RegExp(`\\b(${escaped})\\b`, "i");
            const match = part.match(regex);

            if (match && !replacedThisTurn) {
                const index = match.index;
                const matchText = match[0];
                
                // Push everything before the match
                if (index > 0) {
                    newParts.push(part.substring(0, index));
                }
                
                // Push the linked element
                newParts.push(
                    <Link 
                        key={`${url}-${matchText}`} 
                        to={url} 
                        className="text-brand-orange hover:underline decoration-brand-orange/40"
                    >
                        {matchText}
                    </Link>
                );
                
                // Push everything after the match
                if (index + matchText.length < part.length) {
                    newParts.push(part.substring(index + matchText.length));
                }
                
                linkedUrls.add(url);
                replacedThisTurn = true;
            } else {
                newParts.push(part);
            }
        });
        parts = newParts;
    });

    return parts;
}

export default function AutomaticLinker({ children }) {
    if (typeof children !== "string") return children;
    return <>{linkify(children)}</>;
}
