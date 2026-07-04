import React, { useEffect, useState } from "react";
import { http } from "@/lib/api";
import PageHero from "@/components/PageHero";
import StatCounter from "@/components/StatCounter";
import CodeCard, { Cmt, Kw, Str } from "@/components/CodeCard";
import FilterableCatalogGrid from "@/components/FilterableCatalogGrid";
import ProductCard from "@/components/ProductCard";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";

export default function Products() {
    const [items, setItems] = useState([]);
    useEffect(() => { http.get("/products").then(r => setItems(r.data.items)); }, []);
    const categories = Array.from(new Set(items.map(i => i.category)));

    return (
        <div>
            <PageHero command="studioform --products" eyebrow="AI SaaS Platforms" title="60+ AI platforms." accent="Across 12+ industries." subtitle="Production-ready SaaS apps built and shipped by us. Browse, customize, deploy.">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
                    <StatCounter value={items.length || 24} suffix="+" label="Products" />
                    <StatCounter value={categories.length || 13} suffix="+" label="Industries" />
                    <StatCounter value={260} suffix="+" label="Deployments" />
                    <StatCounter value={97} decimals={0} suffix="%" label="Retention" />
                </div>
            </PageHero>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <CodeCard filename="catalog.json" className="mb-10">
                    <div><Cmt>// Product catalog metrics</Cmt></div>
                    <div className="mt-2"><Kw>const</Kw> catalog = {"{"}</div>
                    <div className="pl-6">total: <Str>"60+"</Str>,</div>
                    <div className="pl-6">live: <Str>"{items.filter(i => i.status === 'Live').length}"</Str>,</div>
                    <div className="pl-6">beta: <Str>"{items.filter(i => i.status === 'Beta').length}"</Str>,</div>
                    <div className="pl-6">categories: <Str>"{categories.length}"</Str></div>
                    <div>{"};"}</div>
                </CodeCard>

                <FilterableCatalogGrid
                    items={items}
                    facets={[{ key: "category", label: "category", options: categories }, { key: "status", label: "status", options: ["Live", "Beta"] }]}
                    searchPlaceholder="$ find 'product type'..."
                    renderCard={(p) => <ProductCard item={p} />}
                    testid="products-grid"
                />
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <SectionHeader command="studioform --metrics" title="Platform" accentInTitle="metrics." />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="glass-card p-5"><StatCounter value={260} suffix="+" label="Deployments" /></div>
                    <div className="glass-card p-5"><StatCounter value={12} suffix="+" label="Industries" /></div>
                    <div className="glass-card p-5"><StatCounter value={2} suffix=" wks" label="Avg Deploy" /></div>
                    <div className="glass-card p-5"><StatCounter value={99.97} decimals={2} suffix="%" label="Uptime" /></div>
                </div>
            </section>

            <CTASection title="Find your fit. Ship in weeks." subtitle="Tell us your industry — we'll match you to the right product and customize it for your data." primary={{ label: "Talk to a builder", to: "/contact" }} secondary={{ label: "Voice agents", to: "/voice-agents" }} />
        </div>
    );
}
