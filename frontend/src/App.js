import "@/index.css";
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import ScrollToTop from "@/components/ScrollToTop";
import CookieConsent from "@/components/CookieConsent";

// Lazy-loaded page components for route-based code-splitting
const Pricing = lazy(() => import("@/pages/Pricing"));
const Products = lazy(() => import("@/pages/Products"));
const VoiceAgents = lazy(() => import("@/pages/VoiceAgents"));
const AIAutomation = lazy(() => import("@/pages/AIAutomation"));
const LLMs = lazy(() => import("@/pages/LLMs"));
const ClaudeSkills = lazy(() => import("@/pages/ClaudeSkills"));
const AIUniversity = lazy(() => import("@/pages/AIUniversity"));
const About = lazy(() => import("@/pages/About"));
const Team = lazy(() => import("@/pages/Team"));
const Contact = lazy(() => import("@/pages/Contact"));
const News = lazy(() => import("@/pages/News"));
const Legal = lazy(() => import("@/pages/Legal"));
const RagChatbots = lazy(() => import("@/pages/RagChatbots"));
const Workshops = lazy(() => import("@/pages/Workshops"));
const CaseStudies = lazy(() => import("@/pages/CaseStudies"));
const IndustryPage = lazy(() => import("@/pages/IndustryPage"));
const Resources = lazy(() => import("@/pages/Resources"));
const Docs = lazy(() => import("@/pages/Docs"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const BlogAdmin = lazy(() => import("@/pages/BlogAdmin"));
const Changelog = lazy(() => import("@/pages/Changelog"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const EmailDashboard = lazy(() => import("@/pages/EmailDashboard"));
const TwilioAlternatives = lazy(() => import("@/pages/TwilioAlternatives"));

function App() {
    const isEmailHost = typeof window !== "undefined" && window.location.hostname === "email.studioform.app";
    const isEmailDashboard = isEmailHost || (typeof window !== "undefined" && window.location.pathname.startsWith("/b2b-marketing-email"));

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white antialiased">
            <BrowserRouter>
                <ScrollToTop />
                {!isEmailDashboard && <Navbar />}
                <main className="relative">
                    <Suspense fallback={<div className="min-h-[60vh] bg-[#0A0A0A]" />}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/pricing" element={<Pricing />} />
                            
                            {/* Services Nested Routing */}
                            <Route path="/services/ai-agents" element={<Products />} />
                            <Route path="/services/voice-agents" element={<VoiceAgents />} />
                            <Route path="/services/rag-chatbots" element={<RagChatbots />} />
                            <Route path="/services/llm-development" element={<LLMs />} />
                            <Route path="/services/ai-automation" element={<AIAutomation />} />
                            <Route path="/services/ai-consulting" element={<Workshops />} />
                            <Route path="/services/fine-tuning" element={<LLMs />} />
                            <Route path="/services/custom-ai" element={<ClaudeSkills />} />

                            {/* Backward Compatibility Redirects */}
                            <Route path="/voice-agents" element={<Navigate to="/services/voice-agents" replace />} />
                            <Route path="/rag-chatbots" element={<Navigate to="/services/rag-chatbots" replace />} />
                            <Route path="/llms" element={<Navigate to="/services/llm-development" replace />} />
                            <Route path="/ai-automation" element={<Navigate to="/services/ai-automation" replace />} />
                            <Route path="/products" element={<Navigate to="/services/ai-agents" replace />} />
                            <Route path="/claude-skills" element={<Navigate to="/services/custom-ai" replace />} />

                            {/* Case Studies */}
                            <Route path="/case-studies" element={<CaseStudies />} />
                            <Route path="/case-studies/:caseStudyId" element={<CaseStudies />} />

                            {/* Programmatic Industries & Resources */}
                            <Route path="/industries/:industryId" element={<IndustryPage />} />
                            <Route path="/resources/:resourceId" element={<Resources />} />

                            {/* Other Routes */}
                            <Route path="/workshops" element={<Workshops />} />
                            <Route path="/ai-university" element={<AIUniversity />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/team" element={<Team />} />
                            <Route path="/team/:leaderId" element={<Team />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/ai-news" element={<News />} />
                            <Route path="/blog" element={<News />} />
                            <Route path="/blog/:slug" element={<BlogPost />} />
                            <Route path="/ai-news/:slug" element={<BlogPost />} />
                            <Route path="/blog-admin" element={<BlogAdmin />} />
                            <Route path="/admin" element={<BlogAdmin />} />
                            <Route path="/docs" element={<Docs />} />
                            <Route path="/changelog" element={<Changelog />} />
                            
                            <Route path="/privacy" element={<Legal kind="privacy" />} />
                            <Route path="/terms" element={<Legal kind="terms" />} />
                            <Route path="/refund" element={<Legal kind="refund" />} />
                            <Route path="/shipping" element={<Legal kind="shipping" />} />
                            <Route path="/cancellation" element={<Legal kind="cancellation" />} />
                            <Route path="/accessibility" element={<Legal kind="accessibility" />} />
                            <Route path="/b2b-marketing-email" element={<EmailDashboard />} />
                            <Route path="/twilio-alternatives" element={<TwilioAlternatives />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </main>
                {!isEmailDashboard && <Footer />}
                {!isEmailDashboard && <CookieConsent />}
            </BrowserRouter>
            <Toaster theme="dark" position="bottom-right" toastOptions={{ style: { background: "#0A0A0A", color: "#fff", border: "1px solid rgba(255,255,255,0.1)" } }} />
        </div>
    );
}

export default App;