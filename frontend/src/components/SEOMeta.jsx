import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function SEOMeta({
    title,
    description,
    keywords = "agentic AI, voice agents, domain LLM, RAG chatbots, AI automation, Studio Form",
    ogTitle,
    ogDescription,
    ogImage = "/logo_dark.png",
    ogType = "website",
    canonicalUrl,
    structuredData,
    faqs = []
}) {
    const location = useLocation();
    const siteUrl = "https://studioform.app";
    const currentUrl = `${siteUrl}${location.pathname}`;
    const canonical = canonicalUrl || currentUrl;

    const metaTitle = title ? (title.includes("Studio Form") ? title : `${title} | Studio Form`) : "Studio Form | Custom Enterprise AI & Voice Agent Company";
    const metaDesc = description || "Studio Form builds autonomous AI voice agents, domain LLMs, and custom automation workflows for enterprise scale.";

    useEffect(() => {
        // 1. Update Title
        document.title = metaTitle;

        // Helper function to set or update meta tag by name or property
        const setMetaTag = (attributeName, attributeValue, content) => {
            if (content === undefined || content === null) return;
            let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
            if (!element) {
                element = document.createElement("meta");
                element.setAttribute(attributeName, attributeValue);
                document.head.appendChild(element);
            }
            element.setAttribute("content", content);
        };

        // Helper function to set or update link element
        const setLinkElement = (rel, href) => {
            if (!href) return;
            let element = document.querySelector(`link[rel="${rel}"]`);
            if (!element) {
                element = document.createElement("link");
                element.setAttribute("rel", rel);
                document.head.appendChild(element);
            }
            element.setAttribute("href", href);
        };

        // 2. Set basic meta tags
        setMetaTag("name", "description", metaDesc);
        setMetaTag("name", "keywords", keywords);
        setMetaTag("name", "robots", "index, follow");

        // 3. Set canonical URL
        setLinkElement("canonical", canonical);

        // 4. Set Open Graph tags
        setMetaTag("property", "og:title", ogTitle || metaTitle);
        setMetaTag("property", "og:description", ogDescription || metaDesc);
        setMetaTag("property", "og:type", ogType);
        setMetaTag("property", "og:url", canonical);
        
        // Handle absolute image URL for og:image
        const finalImage = ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`;
        setMetaTag("property", "og:image", finalImage);

        // 5. Set Twitter Card tags
        setMetaTag("name", "twitter:card", "summary_large_image");
        setMetaTag("name", "twitter:title", ogTitle || metaTitle);
        setMetaTag("name", "twitter:description", ogDescription || metaDesc);
        setMetaTag("name", "twitter:image", finalImage);

        // 6. Dynamic Script injection helper
        const injectJsonLd = (id, data) => {
            let el = document.getElementById(id);
            if (el) el.remove();
            if (!data) return;

            el = document.createElement("script");
            el.id = id;
            el.type = "application/ld+json";
            el.innerHTML = JSON.stringify(data);
            document.body.appendChild(el);
        };

        // 7. Inject primary structured data
        injectJsonLd("seo-structured-data", structuredData);

        // 8. Auto-generate Breadcrumb List Schema
        const pathSegments = location.pathname.split("/").filter(Boolean);
        if (pathSegments.length > 0) {
            const breadcrumbSchema = {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": `${siteUrl}/`
                    },
                    ...pathSegments.map((segment, idx) => {
                        const url = `${siteUrl}/${pathSegments.slice(0, idx + 1).join("/")}`;
                        const name = segment.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
                        return {
                            "@type": "ListItem",
                            "position": idx + 2,
                            "name": name,
                            "item": url
                        };
                    })
                ]
            };
            injectJsonLd("seo-breadcrumbs", breadcrumbSchema);
        } else {
            injectJsonLd("seo-breadcrumbs", null);
        }

        // 9. Inject FAQ Page Schema if faqs provided
        if (faqs && faqs.length > 0) {
            const faqSchema = {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faqs.map(f => ({
                    "@type": "Question",
                    "name": f.q,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": f.a
                    }
                }))
            };
            injectJsonLd("seo-faqs", faqSchema);
        } else {
            injectJsonLd("seo-faqs", null);
        }

        return () => {
            ["seo-structured-data", "seo-breadcrumbs", "seo-faqs"].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.remove();
            });
        };
    }, [metaTitle, metaDesc, keywords, ogTitle, ogDescription, ogImage, ogType, canonical, structuredData, location.pathname, faqs]);

    return null;
}
