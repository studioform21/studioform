import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { http } from "@/lib/api";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import SEOMeta from "@/components/SEOMeta";

const CONTACT_STRUCTURED_DATA = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Studio Form",
    "description": "Get in touch with Studio Form to book a demo, schedule AI workshops, or request custom enterprise AI deployments.",
    "url": "https://www.studioform.app/contact"
};

const INTERESTS = ["AI SaaS Platforms", "AI Voice Agents", "Domain LLM", "RAG Chatbots", "AI Automations", "Claude Skills", "AI & ML Workshops", "General"];

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", interest: "AI SaaS Platforms", message: "", source: "contact" });
    const [busy, setBusy] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        
        if (form.phone) {
            const phoneRegex = /^\+?\d{7,15}$/;
            if (!phoneRegex.test(form.phone)) {
                toast.error("Please enter a valid phone number (7 to 15 digits, optional '+' prefix).");
                return;
            }
        }

        setBusy(true);
        try {
            const r = await http.post("/leads", form);
            toast.success("Thanks — we'll reach out within 24 hours.");
            setForm({ ...form, name: "", email: "", phone: "", company: "", message: "" });
        } catch {
            toast.error("Submission failed. Try again.");
        } finally { setBusy(false); }
    };

    const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

    return (
        <div>
            <SEOMeta
                title="Contact Us"
                description="Get in touch with Studio Form. Tell us what you want to deploy, and we will get back to you with a detailed plan in 24 hours."
                keywords="contact Studio Form, book AI demo, hire AI company, deploy AI agents India"
                structuredData={CONTACT_STRUCTURED_DATA}
            />
            <PageHero command="studioform --contact" eyebrow="Contact" title="Let's build" accent="something." subtitle="Tell us what you want to deploy. We'll come back in 24 hours with a plan." />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid lg:grid-cols-5 gap-6">
                    <motion.form onSubmit={submit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-3 glass-card p-6 sm:p-8 space-y-4" data-testid="contact-form">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-mono uppercase text-white/40 mb-2">Name</label>
                                <input data-testid="contact-name" required value={form.name} onChange={set("name")} className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-brand-orange/60 outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-mono uppercase text-white/40 mb-2">Work Email</label>
                                <input data-testid="contact-email" type="email" required value={form.email} onChange={set("email")} className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-brand-orange/60 outline-none" />
                            </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-mono uppercase text-white/40 mb-2">Phone</label>
                                <input data-testid="contact-phone" value={form.phone} onChange={set("phone")} className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-brand-orange/60 outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-mono uppercase text-white/40 mb-2">Company</label>
                                <input data-testid="contact-company" value={form.company} onChange={set("company")} className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-brand-orange/60 outline-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-mono uppercase text-white/40 mb-2">I'm interested in</label>
                            <div className="flex flex-wrap gap-2">
                                {INTERESTS.map(it => (
                                    <button type="button" key={it} onClick={() => setForm(f => ({ ...f, interest: it }))} className={`px-3 py-1.5 rounded-full text-xs font-mono border transition ${form.interest === it ? "bg-brand-orange text-black border-brand-orange" : "border-white/10 text-white/70 hover:border-brand-orange/40"}`} data-testid={`interest-${it.replace(/s+/g, '-')}`}>{it}</button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-mono uppercase text-white/40 mb-2">What do you want to build?</label>
                            <textarea data-testid="contact-message" required rows={5} value={form.message} onChange={set("message")} className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-brand-orange/60 outline-none" />
                        </div>
                        <div className="flex items-start gap-3 py-2">
                            <input
                                type="checkbox"
                                id="consent"
                                required
                                className="mt-1 accent-brand-orange w-4 h-4 rounded border-white/10"
                                data-testid="contact-consent"
                            />
                            <label htmlFor="consent" className="text-xs text-white/60 leading-relaxed font-mono">
                                I agree to the <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:underline">Privacy Policy</a> and consent to the processing of my personal data under the DPDP Act, 2023.
                            </label>
                        </div>
                        <button type="submit" disabled={busy} data-testid="contact-submit" className="w-full px-6 py-3 rounded-full bg-brand-orange text-black font-medium hover:brightness-110 disabled:opacity-50">
                            {busy ? "Sending..." : "Send Message"}
                        </button>
                        <p className="text-[11px] text-white/40 font-mono">$ studioform --submit → we reply within 24 hours, Mon–Fri.</p>
                    </motion.form>

                    <div className="lg:col-span-2 space-y-4">
                        {[{ Icon: Mail, label: "Email", value: "info@studioform.app" },
                        { Icon: Phone, label: "Landline", value: "+91 731 408 6183" },
                        { Icon: MapPin, label: "Studio HQ", value: "Indore" },
                        ].map(({ Icon, label, value }) => (
                            <div key={label} className="glass-card p-5 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center text-brand-orange"><Icon size={18} /></div>
                                <div>
                                    <div className="text-xs font-mono uppercase text-white/40">{label}</div>
                                    <div className="font-display font-bold">{value}</div>
                                </div>
                            </div>
                        ))}
                        <div className="glass-card aspect-[4/3]">
                            <iframe
                                src="https://www.google.com/maps?q=Indore,India&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                title="Indore Map"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Department Emails Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
                <SectionHeader command="studioform --departments" title="Direct" accentInTitle="Departments" subtitle="Reach the right team directly for faster response times." />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                    {[
                        { email: "info@studioform.app", desc: "General inquiries" },
                        { email: "contact@studioform.app", desc: "Contact requests" },
                        { email: "support@studioform.app", desc: "Customer support" },
                        { email: "sales@studioform.app", desc: "Sales inquiries" },
                        { email: "admin@studioform.app", desc: "Website & server administration" },
                        { email: "hello@studioform.app", desc: "Friendly general contact" }
                    ].map(d => (
                        <div key={d.email} className="glass-card p-5 flex flex-col justify-between hover:border-brand-orange/40 transition duration-200">
                            <span className="text-[10px] font-mono text-brand-orange uppercase tracking-wider">{d.desc}</span>
                            <a href={`mailto:${d.email}`} className="text-white font-mono font-bold text-sm mt-2 hover:text-brand-orange transition break-all">{d.email}</a>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
