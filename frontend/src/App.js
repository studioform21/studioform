import "@/index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import VoiceAgents from "@/pages/VoiceAgents";
import AIAutomation from "@/pages/AIAutomation";
import LLMs from "@/pages/LLMs";
import ClaudeSkills from "@/pages/ClaudeSkills";
import AIUniversity from "@/pages/AIUniversity";
import About from "@/pages/About";
import Team from "@/pages/Team";
import Contact from "@/pages/Contact";
import News from "@/pages/News";
import Legal from "@/pages/Legal";
import ScrollToTop from "@/components/ScrollToTop";
import RagChatbots from "@/pages/RagChatbots";
import Workshops from "@/pages/Workshops";
import Pricing from "@/pages/Pricing";
import CaseStudies from "@/pages/CaseStudies";
import IndustryPage from "@/pages/IndustryPage";
import Resources from "@/pages/Resources";
import Docs from "@/pages/Docs";
import BlogPost from "@/pages/BlogPost";
import Changelog from "@/pages/Changelog";
import NotFound from "@/pages/NotFound";
import CookieConsent from "@/components/CookieConsent";

function App() {
    if (
        typeof window !== "undefined" && 
        window.location.hostname === "email.studioform.app" && 
        window.location.pathname === "/"
    ) {
        window.location.href = "/b2b-marketing-email.html";
        return null;
    }

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white antialiased">
            <BrowserRouter>
                <ScrollToTop />
                <Navbar />
                <main className="relative">
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
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/ai-news" element={<News />} />
                        <Route path="/blog" element={<News />} />
                        <Route path="/blog/:slug" element={<BlogPost />} />
                        <Route path="/ai-news/:slug" element={<BlogPost />} />
                        <Route path="/docs" element={<Docs />} />
                        <Route path="/changelog" element={<Changelog />} />
                        
                        <Route path="/privacy" element={<Legal kind="privacy" />} />
                        <Route path="/terms" element={<Legal kind="terms" />} />
                        <Route path="/refund" element={<Legal kind="refund" />} />
                        <Route path="/shipping" element={<Legal kind="shipping" />} />
                        <Route path="/cancellation" element={<Legal kind="cancellation" />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <Footer />
                <CookieConsent />
            </BrowserRouter>
            <Toaster theme="dark" position="bottom-right" toastOptions={{ style: { background: "#0A0A0A", color: "#fff", border: "1px solid rgba(255,255,255,0.1)" } }} />
            <Analytics />
        </div>
    );
}

export default App;