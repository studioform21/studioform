import React from "react";
import GenericOffering from "@/components/GenericOffering";

const OFFERINGS = [
    { tag: "TURNKEY", title: "AI Learning Studio", body: "We design and run an immersive AI lab on your campus or office floor — curriculum, GPUs, mentors." },
    { tag: "R&D", title: "Innovation Hub", body: "Embedded R&D pod that ships a new prototype every 6 weeks against your roadmap." },
    { tag: "SANDBOX", title: "Sandbox Arena", body: "Internal hackathons, AI olympiads, and safe sandboxes for your engineering teams to experiment." },
    { tag: "INCUBATION", title: "Incubation Cell", body: "Spin out internal AI startups. We help with team, tech, and capital partners." },
    { tag: "STRATEGY", title: "AI Transformation Office", body: "A fractional CAIO + crew to own your AI roadmap, governance, and KPIs." },
    { tag: "VENDOR", title: "AI Vendor Diligence", body: "We evaluate vendors, run bake-offs, and run your AI procurement so you ship the right stack." },
];

export default function InnovationLabs() {
    return (
        <GenericOffering
            command="studioform --labs"
            eyebrow="Innovation Labs"
            title="Turnkey AI labs."
            accent="Built, run, scaled."
            subtitle="We don't sell you a workshop. We build a working lab inside your organization."
            stats={[
                { value: 42, suffix: "+", label: "Labs Run" },
                { value: 18, suffix: "+", label: "Partner Orgs" },
                { value: 6, suffix: " wks", label: "Sprint Cycle" },
                { value: 240, suffix: "+", label: "Prototypes" },
            ]}
            sectionCmd="studioform --offerings"
            sectionTitle="What we"
            sectionAccent="offer."
            sectionSubtitle="Modular tracks — pick what your org needs, we deliver under one SOW."
            items={OFFERINGS}
            cta={{ title: "Spin up your AI lab.", subtitle: "From curriculum to GPUs, we deliver a fully operational lab in 60 days.", primary: { label: "Talk to labs team", to: "/contact" }, secondary: { label: "AI University", to: "/ai-university" } }}
        />
    );
}
