import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/PageHero";
import SEOMeta from "@/components/SEOMeta";
import { 
    Plus, Trash2, Edit3, Eye, Lock, Unlock, Check, Sparkles, 
    ArrowLeft, FileText, Layout, Layers, HelpCircle, Table, Share2, Clock, User
} from "lucide-react";
import { toast } from "sonner";

const DEFAULT_AUTH_PASS = "admin@1234";

const TAG_OPTIONS = ["Voice AI", "Breaking", "India", "Tools", "LLMs", "Open Source", "Case Study"];

export default function BlogAdmin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [authError, setAuthError] = useState("");

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTag, setActiveTag] = useState("All");

    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState("meta"); // 'meta', 'body', 'sections', 'preview'

    const [formData, setFormData] = useState({
        slug: "",
        title: "",
        tag: "Voice AI",
        date: "",
        readTime: "5 min read",
        author: "Studio Form Voice Engineering",
        keywords: "",
        callout: "",
        body: [""],
        sections: [],
        published: true
    });

    // Handle authentication
    const handleLogin = (e) => {
        e.preventDefault();
        if (passwordInput === DEFAULT_AUTH_PASS) {
            setIsAuthenticated(true);
            setAuthError("");
            toast.success("Authenticated as Blog Admin!");
            fetchBlogs();
        } else {
            setAuthError("Invalid admin passcode. Hint: admin@1234");
        }
    };

    // Fetch existing blogs
    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/blogs");
            if (res.ok) {
                const contentType = res.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    const data = await res.json();
                    if (data.items) {
                        setBlogs(data.items);
                    }
                }
            }
        } catch (err) {
            console.error("Failed to fetch blogs:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchBlogs();
        }
    }, [isAuthenticated]);

    // Auto-generate slug from title
    const handleTitleChange = (val) => {
        const generatedSlug = val
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-");
        setFormData(prev => ({
            ...prev,
            title: val,
            slug: prev.slug === "" || prev.slug === generatedSlug ? generatedSlug : prev.slug
        }));
    };

    // Reset Form for New Article
    const handleNewArticle = () => {
        setFormData({
            slug: "",
            title: "",
            tag: "Voice AI",
            date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            readTime: "6 min read",
            author: "Studio Form Editorial",
            keywords: "",
            callout: "",
            body: [""],
            sections: [],
            published: true
        });
        setIsEditing(true);
        setActiveTab("meta");
    };

    // Edit Existing Article
    const handleEditArticle = (art) => {
        setFormData({
            slug: art.slug || "",
            title: art.title || "",
            tag: art.tag || "Voice AI",
            date: art.date || "",
            readTime: art.readTime || "5 min read",
            author: art.author || "Studio Form Editorial",
            keywords: art.keywords || "",
            callout: art.callout || "",
            body: Array.isArray(art.body) && art.body.length > 0 ? art.body : [""],
            sections: Array.isArray(art.sections) ? art.sections : [],
            published: art.published !== false
        });
        setIsEditing(true);
        setActiveTab("meta");
    };

    // Delete Article
    const handleDeleteArticle = async (slug) => {
        if (!window.confirm(`Are you sure you want to delete article '${slug}'?`)) return;

        try {
            const res = await fetch(`/api/blogs/${slug}?password=${DEFAULT_AUTH_PASS}`, {
                method: "DELETE"
            });
            const data = await res.json();
            if (data.ok) {
                toast.success(`Deleted article ${slug}`);
                fetchBlogs();
            } else {
                toast.error("Failed to delete article");
            }
        } catch (err) {
            toast.error("Error deleting article");
        }
    };

    // Save/Publish Article
    const handlePublish = async () => {
        if (!formData.title || !formData.slug) {
            toast.error("Title and Slug are required!");
            return;
        }

        try {
            const res = await fetch("/api/blogs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    password: passwordInput || DEFAULT_AUTH_PASS
                })
            });
            const data = await res.json();
            if (data.ok) {
                toast.success("Blog post published successfully!");
                setIsEditing(false);
                fetchBlogs();
            } else {
                toast.error(data.detail || "Failed to publish blog post.");
            }
        } catch (err) {
            toast.error("Server error while publishing.");
        }
    };

    // Handlers for Body Paragraphs
    const updateBodyParagraph = (idx, val) => {
        const newBody = [...formData.body];
        newBody[idx] = val;
        setFormData(prev => ({ ...prev, body: newBody }));
    };

    const addBodyParagraph = () => {
        setFormData(prev => ({ ...prev, body: [...prev.body, ""] }));
    };

    const removeBodyParagraph = (idx) => {
        setFormData(prev => ({ ...prev, body: prev.body.filter((_, i) => i !== idx) }));
    };

    // Handlers for Sections
    const addSection = () => {
        const newSec = {
            title: `${formData.sections.length + 1}. Section Title`,
            content: "",
            bullets: [],
            subsections: [],
            faqs: []
        };
        setFormData(prev => ({ ...prev, sections: [...prev.sections, newSec] }));
    };

    const updateSection = (sIdx, field, val) => {
        const newSecs = [...formData.sections];
        newSecs[sIdx][field] = val;
        setFormData(prev => ({ ...prev, sections: newSecs }));
    };

    const removeSection = (sIdx) => {
        setFormData(prev => ({ ...prev, sections: prev.sections.filter((_, i) => i !== sIdx) }));
    };

    // Sub-handlers for Bullets in a Section
    const addSectionBullet = (sIdx) => {
        const newSecs = [...formData.sections];
        if (!newSecs[sIdx].bullets) newSecs[sIdx].bullets = [];
        newSecs[sIdx].bullets.push("");
        setFormData(prev => ({ ...prev, sections: newSecs }));
    };

    const updateSectionBullet = (sIdx, bIdx, val) => {
        const newSecs = [...formData.sections];
        newSecs[sIdx].bullets[bIdx] = val;
        setFormData(prev => ({ ...prev, sections: newSecs }));
    };

    const removeSectionBullet = (sIdx, bIdx) => {
        const newSecs = [...formData.sections];
        newSecs[sIdx].bullets = newSecs[sIdx].bullets.filter((_, i) => i !== bIdx);
        setFormData(prev => ({ ...prev, sections: newSecs }));
    };

    // Sub-handlers for FAQs in a Section
    const addSectionFaq = (sIdx) => {
        const newSecs = [...formData.sections];
        if (!newSecs[sIdx].faqs) newSecs[sIdx].faqs = [];
        newSecs[sIdx].faqs.push({ q: "", a: "" });
        setFormData(prev => ({ ...prev, sections: newSecs }));
    };

    const updateSectionFaq = (sIdx, fIdx, key, val) => {
        const newSecs = [...formData.sections];
        newSecs[sIdx].faqs[fIdx][key] = val;
        setFormData(prev => ({ ...prev, sections: newSecs }));
    };

    const removeSectionFaq = (sIdx, fIdx) => {
        const newSecs = [...formData.sections];
        newSecs[sIdx].faqs = newSecs[sIdx].faqs.filter((_, i) => i !== fIdx);
        setFormData(prev => ({ ...prev, sections: newSecs }));
    };

    // Filtered blogs
    const filteredBlogs = blogs.filter(b => {
        const matchesTag = activeTag === "All" || b.tag === activeTag;
        const matchesQuery = searchQuery === "" || 
            b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            b.slug.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTag && matchesQuery;
    });

    if (!isAuthenticated) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center bg-[#0A0A0A] px-4">
                <SEOMeta title="Blog Admin Login" description="Admin portal for managing Studio Form blog content." />
                
                <div className="glass-card max-w-md w-full p-8 border border-white/10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10 text-brand-orange">
                        <Lock size={120} />
                    </div>

                    <div className="relative z-10 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange">
                                <Lock size={20} />
                            </div>
                            <div>
                                <h2 className="font-display text-xl font-bold text-white">Studio Form CMS</h2>
                                <p className="text-xs text-white/50">Enter admin passcode to upload & manage blogs</p>
                            </div>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-xs font-mono text-white/60 mb-2">ADMIN PASSCODE</label>
                                <input
                                    type="password"
                                    value={passwordInput}
                                    onChange={(e) => setPasswordInput(e.target.value)}
                                    placeholder="Enter admin passcode (e.g. admin@1234)"
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-brand-orange/60 transition"
                                    autoFocus
                                />
                            </div>

                            {authError && (
                                <p className="text-xs text-red-400 font-mono">{authError}</p>
                            )}

                            <button
                                type="submit"
                                className="w-full py-3 rounded-lg bg-brand-orange text-black font-semibold text-sm hover:brightness-110 transition shadow-lg shadow-brand-orange/20"
                            >
                                Unlock Blog Admin Dashboard
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white">
            <SEOMeta title="Blog CMS Dashboard" description="Studio Form Blog Management Dashboard" />

            <PageHero 
                command="studioform --cms" 
                eyebrow="Content Management System" 
                title="Blog Admin" 
                accent="Dashboard" 
                subtitle="Upload, edit, preview, and publish blog articles directly to Studio Form." 
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {!isEditing ? (
                    // ARTICLES LIST VIEW
                    <div className="space-y-6">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-white/60 font-mono">
                                    Total Articles: <strong className="text-brand-orange">{blogs.length}</strong>
                                </span>
                            </div>

                            <button
                                onClick={handleNewArticle}
                                className="px-5 py-2.5 rounded-full bg-brand-orange text-black font-semibold text-xs inline-flex items-center gap-2 hover:brightness-110 transition shadow-lg shadow-brand-orange/20"
                            >
                                <Plus size={16} /> Create New Blog Post
                            </button>
                        </div>

                        {/* Search & Tag Filter */}
                        <div className="flex flex-wrap items-center justify-between gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search articles by title or keyword..."
                                className="px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-xs text-white placeholder-white/40 min-w-[260px] focus:outline-none focus:border-brand-orange/50"
                            />

                            <div className="flex flex-wrap gap-1.5">
                                <button
                                    onClick={() => setActiveTag("All")}
                                    className={`px-3 py-1 rounded-full text-xs font-mono border transition ${activeTag === "All" ? "bg-brand-orange text-black border-brand-orange font-bold" : "border-white/10 text-white/60"}`}
                                >
                                    All
                                </button>
                                {TAG_OPTIONS.map(t => (
                                    <button
                                        key={t}
                                        onClick={() => setActiveTag(t)}
                                        className={`px-3 py-1 rounded-full text-xs font-mono border transition ${activeTag === t ? "bg-brand-orange text-black border-brand-orange font-bold" : "border-white/10 text-white/60 hover:border-white/30"}`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Articles Table */}
                        <div className="glass-card overflow-hidden border border-white/10 rounded-xl">
                            {loading ? (
                                <div className="p-12 text-center text-white/40 font-mono text-sm">Loading blog posts...</div>
                            ) : filteredBlogs.length === 0 ? (
                                <div className="p-12 text-center text-white/40 font-mono text-sm">No blog posts found. Click 'Create New Blog Post' to add one!</div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs">
                                        <thead>
                                            <tr className="bg-white/5 border-b border-white/10 text-brand-orange font-mono uppercase">
                                                <th className="p-4">Article Title</th>
                                                <th className="p-4">Category</th>
                                                <th className="p-4">Author</th>
                                                <th className="p-4">Date</th>
                                                <th className="p-4 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {filteredBlogs.map((b) => (
                                                <tr key={b.slug} className="hover:bg-white/[0.02] transition">
                                                    <td className="p-4 font-medium text-white max-w-md">
                                                        <div className="line-clamp-1">{b.title}</div>
                                                        <div className="text-[11px] font-mono text-white/40">/blog/{b.slug}</div>
                                                    </td>
                                                    <td className="p-4 font-mono">
                                                        <span className="px-2 py-0.5 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-[10px] text-brand-orange uppercase">
                                                            {b.tag}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-white/60">{b.author || "Editorial"}</td>
                                                    <td className="p-4 text-white/50 font-mono">{b.date}</td>
                                                    <td className="p-4 text-right">
                                                        <div className="inline-flex items-center gap-2">
                                                            <Link
                                                                to={`/blog/${b.slug}`}
                                                                target="_blank"
                                                                className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition"
                                                                title="View Live Article"
                                                            >
                                                                <Eye size={14} />
                                                            </Link>
                                                            <button
                                                                onClick={() => handleEditArticle(b)}
                                                                className="p-1.5 rounded bg-brand-orange/15 hover:bg-brand-orange/25 text-brand-orange transition"
                                                                title="Edit Article"
                                                            >
                                                                <Edit3 size={14} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteArticle(b.slug)}
                                                                className="p-1.5 rounded bg-red-500/15 hover:bg-red-500/25 text-red-400 transition"
                                                                title="Delete Article"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    // FORM EDITOR & PREVIEW VIEW
                    <div className="space-y-6">
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                            <button
                                onClick={() => setIsEditing(false)}
                                className="inline-flex items-center gap-2 text-xs text-white/60 hover:text-brand-orange transition font-mono"
                            >
                                <ArrowLeft size={14} /> Back to Articles List
                            </button>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handlePublish}
                                    className="px-6 py-2.5 rounded-full bg-brand-orange text-black font-semibold text-xs inline-flex items-center gap-2 hover:brightness-110 transition shadow-lg shadow-brand-orange/20"
                                >
                                    <Check size={16} /> Save & Publish Article
                                </button>
                            </div>
                        </div>

                        {/* Editor Navigation Tabs */}
                        <div className="flex border-b border-white/10 gap-2 font-mono text-xs">
                            <button
                                onClick={() => setActiveTab("meta")}
                                className={`px-4 py-2.5 border-b-2 transition inline-flex items-center gap-2 ${activeTab === "meta" ? "border-brand-orange text-brand-orange font-bold" : "border-transparent text-white/50 hover:text-white"}`}
                            >
                                <FileText size={14} /> Metadata & Info
                            </button>
                            <button
                                onClick={() => setActiveTab("body")}
                                className={`px-4 py-2.5 border-b-2 transition inline-flex items-center gap-2 ${activeTab === "body" ? "border-brand-orange text-brand-orange font-bold" : "border-transparent text-white/50 hover:text-white"}`}
                            >
                                <Layout size={14} /> Intro & Callouts
                            </button>
                            <button
                                onClick={() => setActiveTab("sections")}
                                className={`px-4 py-2.5 border-b-2 transition inline-flex items-center gap-2 ${activeTab === "sections" ? "border-brand-orange text-brand-orange font-bold" : "border-transparent text-white/50 hover:text-white"}`}
                            >
                                <Layers size={14} /> H2 Sections ({formData.sections.length})
                            </button>
                            <button
                                onClick={() => setActiveTab("preview")}
                                className={`px-4 py-2.5 border-b-2 transition inline-flex items-center gap-2 ${activeTab === "preview" ? "border-brand-orange text-brand-orange font-bold" : "border-transparent text-white/50 hover:text-white"}`}
                            >
                                <Eye size={14} /> Live Article Preview
                            </button>
                        </div>

                        {/* TAB 1: METADATA & INFO */}
                        {activeTab === "meta" && (
                            <div className="glass-card p-6 space-y-5 border border-white/10 rounded-xl">
                                <div>
                                    <label className="block text-xs font-mono text-brand-orange mb-2">ARTICLE TITLE *</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => handleTitleChange(e.target.value)}
                                        placeholder="e.g. How to Build an AI Receptionist for Your Business"
                                        className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white font-display text-lg focus:outline-none focus:border-brand-orange/60"
                                    />
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-mono text-white/60 mb-2">URL SLUG *</label>
                                        <input
                                            type="text"
                                            value={formData.slug}
                                            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                                            placeholder="e.g. how-to-build-ai-receptionist"
                                            className="w-full px-4 py-2.5 rounded-lg bg-black/50 border border-white/10 font-mono text-xs text-white focus:outline-none focus:border-brand-orange/60"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-mono text-white/60 mb-2">CATEGORY TAG</label>
                                        <select
                                            value={formData.tag}
                                            onChange={(e) => setFormData(prev => ({ ...prev, tag: e.target.value }))}
                                            className="w-full px-4 py-2.5 rounded-lg bg-black/50 border border-white/10 font-mono text-xs text-white focus:outline-none focus:border-brand-orange/60"
                                        >
                                            {TAG_OPTIONS.map(t => (
                                                <option key={t} value={t} className="bg-black">{t}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-mono text-white/60 mb-2">AUTHOR NAME</label>
                                        <input
                                            type="text"
                                            value={formData.author}
                                            onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                                            className="w-full px-4 py-2.5 rounded-lg bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-brand-orange/60"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-mono text-white/60 mb-2">READ TIME</label>
                                        <input
                                            type="text"
                                            value={formData.readTime}
                                            onChange={(e) => setFormData(prev => ({ ...prev, readTime: e.target.value }))}
                                            className="w-full px-4 py-2.5 rounded-lg bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-brand-orange/60"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-mono text-white/60 mb-2">PUBLICATION DATE</label>
                                        <input
                                            type="text"
                                            value={formData.date}
                                            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                                            className="w-full px-4 py-2.5 rounded-lg bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-brand-orange/60"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-white/60 mb-2">TARGET KEYWORDS (Comma separated)</label>
                                    <input
                                        type="text"
                                        value={formData.keywords}
                                        onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
                                        placeholder="ai receptionist, voice AI, virtual receptionist"
                                        className="w-full px-4 py-2.5 rounded-lg bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-brand-orange/60"
                                    />
                                </div>
                            </div>
                        )}

                        {/* TAB 2: INTRO & CALLOUTS */}
                        {activeTab === "body" && (
                            <div className="glass-card p-6 space-y-6 border border-white/10 rounded-xl">
                                <div>
                                    <label className="block text-xs font-mono text-brand-orange mb-2">
                                        AI OVERVIEW / FEATURED CALLOUT BOX (Optional)
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={formData.callout}
                                        onChange={(e) => setFormData(prev => ({ ...prev, callout: e.target.value }))}
                                        placeholder="Quick summary box to win Google AI Overviews and Featured Snippets..."
                                        className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-brand-orange/60 leading-relaxed"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <label className="block text-xs font-mono text-brand-orange">INTRODUCTION PARAGRAPHS</label>
                                        <button
                                            onClick={addBodyParagraph}
                                            className="text-xs text-brand-orange hover:underline font-mono inline-flex items-center gap-1"
                                        >
                                            <Plus size={12} /> Add Paragraph
                                        </button>
                                    </div>

                                    {formData.body.map((p, idx) => (
                                        <div key={idx} className="flex gap-2">
                                            <textarea
                                                rows={3}
                                                value={p}
                                                onChange={(e) => updateBodyParagraph(idx, e.target.value)}
                                                placeholder={`Paragraph ${idx + 1}...`}
                                                className="w-full px-4 py-2.5 rounded-lg bg-black/50 border border-white/10 text-xs text-white/80 focus:outline-none focus:border-brand-orange/60 leading-relaxed"
                                            />
                                            {formData.body.length > 1 && (
                                                <button
                                                    onClick={() => removeBodyParagraph(idx)}
                                                    className="p-2 text-red-400 hover:text-red-300"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* TAB 3: SECTIONS BUILDER */}
                        {activeTab === "sections" && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-mono text-sm text-brand-orange uppercase">Article H2 Sections & Elements</h3>
                                    <button
                                        onClick={addSection}
                                        className="px-4 py-2 rounded-full bg-brand-orange text-black font-semibold text-xs inline-flex items-center gap-1.5 hover:brightness-110 transition"
                                    >
                                        <Plus size={14} /> Add H2 Section
                                    </button>
                                </div>

                                {formData.sections.length === 0 ? (
                                    <div className="glass-card p-12 text-center text-white/40 font-mono text-xs border border-white/10 rounded-xl">
                                        No H2 sections added yet. Click 'Add H2 Section' to create structured content!
                                    </div>
                                ) : (
                                    formData.sections.map((sec, sIdx) => (
                                        <div key={sIdx} className="glass-card p-6 space-y-4 border border-white/10 rounded-xl relative">
                                            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                                                <input
                                                    type="text"
                                                    value={sec.title}
                                                    onChange={(e) => updateSection(sIdx, "title", e.target.value)}
                                                    placeholder="Section Heading (e.g. 1. Why AI Receptionists Are Spiking)"
                                                    className="w-full bg-transparent font-display text-base font-bold text-white focus:outline-none focus:border-brand-orange border-b border-transparent"
                                                />
                                                <button
                                                    onClick={() => removeSection(sIdx)}
                                                    className="p-1.5 text-red-400 hover:text-red-300 font-mono text-xs inline-flex items-center gap-1"
                                                >
                                                    <Trash2 size={14} /> Delete
                                                </button>
                                            </div>

                                            <div>
                                                <label className="block text-[11px] font-mono text-white/50 mb-1">SECTION PARAGRAPH CONTENT</label>
                                                <textarea
                                                    rows={3}
                                                    value={sec.content || ""}
                                                    onChange={(e) => updateSection(sIdx, "content", e.target.value)}
                                                    placeholder="Main explanation paragraph for this section..."
                                                    className="w-full px-3 py-2 rounded bg-black/50 border border-white/10 text-xs text-white/80 focus:outline-none focus:border-brand-orange/60 leading-relaxed"
                                                />
                                            </div>

                                            {/* BULLETS */}
                                            <div className="space-y-2 pt-2 border-t border-white/5">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[11px] font-mono text-brand-orange">Bullet Points</span>
                                                    <button
                                                        onClick={() => addSectionBullet(sIdx)}
                                                        className="text-[11px] text-brand-orange hover:underline font-mono inline-flex items-center gap-1"
                                                    >
                                                        <Plus size={10} /> Add Bullet
                                                    </button>
                                                </div>
                                                {sec.bullets?.map((b, bIdx) => (
                                                    <div key={bIdx} className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            value={b}
                                                            onChange={(e) => updateSectionBullet(sIdx, bIdx, e.target.value)}
                                                            placeholder={`Bullet ${bIdx + 1}`}
                                                            className="w-full px-3 py-1.5 rounded bg-black/50 border border-white/10 text-xs text-white/80 focus:outline-none focus:border-brand-orange/60"
                                                        />
                                                        <button onClick={() => removeSectionBullet(sIdx, bIdx)} className="text-red-400 px-1">
                                                            <Trash2 size={12} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* FAQs */}
                                            <div className="space-y-2 pt-2 border-t border-white/5">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[11px] font-mono text-brand-orange">Q&A FAQ Cards</span>
                                                    <button
                                                        onClick={() => addSectionFaq(sIdx)}
                                                        className="text-[11px] text-brand-orange hover:underline font-mono inline-flex items-center gap-1"
                                                    >
                                                        <Plus size={10} /> Add FAQ
                                                    </button>
                                                </div>
                                                {sec.faqs?.map((faq, fIdx) => (
                                                    <div key={fIdx} className="space-y-2 bg-black/40 p-3 rounded border border-white/5 relative">
                                                        <input
                                                            type="text"
                                                            value={faq.q}
                                                            onChange={(e) => updateSectionFaq(sIdx, fIdx, "q", e.target.value)}
                                                            placeholder="Question (e.g. Is an AI receptionist expensive?)"
                                                            className="w-full px-3 py-1 rounded bg-black/50 border border-white/10 text-xs text-white font-semibold focus:outline-none focus:border-brand-orange/60"
                                                        />
                                                        <textarea
                                                            rows={2}
                                                            value={faq.a}
                                                            onChange={(e) => updateSectionFaq(sIdx, fIdx, "a", e.target.value)}
                                                            placeholder="Answer text..."
                                                            className="w-full px-3 py-1 rounded bg-black/50 border border-white/10 text-xs text-white/70 focus:outline-none focus:border-brand-orange/60"
                                                        />
                                                        <button onClick={() => removeSectionFaq(sIdx, fIdx)} className="text-red-400 absolute top-2 right-2">
                                                            <Trash2 size={12} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {/* TAB 4: LIVE PREVIEW */}
                        {activeTab === "preview" && (
                            <div className="glass-card p-8 border border-white/10 rounded-xl space-y-6">
                                <div className="flex items-center gap-3 text-xs font-mono text-white/40">
                                    <span className="px-2.5 py-0.5 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange uppercase">
                                        {formData.tag}
                                    </span>
                                    <span className="flex items-center gap-1"><Clock size={12} /> {formData.readTime}</span>
                                    <span className="flex items-center gap-1"><User size={12} /> {formData.author}</span>
                                    <span>{formData.date}</span>
                                </div>

                                <h1 className="font-display text-3xl font-bold text-white leading-tight">
                                    {formData.title || "Untitled Article"}
                                </h1>

                                {formData.callout && (
                                    <div className="p-4 rounded-xl bg-brand-orange/10 border border-brand-orange/30 text-xs text-white/80 leading-relaxed font-sans shadow-lg">
                                        {formData.callout}
                                    </div>
                                )}

                                <div className="space-y-4">
                                    {formData.body.map((p, idx) => (
                                        <p key={idx} className="text-sm text-white/70 leading-relaxed">{p}</p>
                                    ))}
                                </div>

                                <div className="space-y-6 pt-6 border-t border-white/10">
                                    {formData.sections.map((sec, idx) => (
                                        <div key={idx} className="space-y-3">
                                            <h2 className="font-display text-lg font-bold text-white">{sec.title}</h2>
                                            
                                            {Array.isArray(sec.content) ? (
                                                sec.content.map((p, pIdx) => (
                                                    <p key={pIdx} className="text-sm text-white/65 leading-relaxed">{p}</p>
                                                ))
                                            ) : sec.content ? (
                                                <p className="text-sm text-white/65 leading-relaxed">{sec.content}</p>
                                            ) : null}

                                            {sec.bullets && (
                                                <ul className="space-y-1.5 pl-4 list-disc text-sm text-white/70">
                                                    {sec.bullets.map((b, bIdx) => (
                                                        <li key={bIdx}>{b}</li>
                                                    ))}
                                                </ul>
                                            )}

                                            {sec.faqs && (
                                                <div className="space-y-2 mt-3">
                                                    {sec.faqs.map((faq, fIdx) => (
                                                        <div key={fIdx} className="bg-white/5 p-3 rounded border border-white/10">
                                                            <h3 className="text-xs font-bold text-white">{faq.q}</h3>
                                                            <p className="text-xs text-white/60 mt-1">{faq.a}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
