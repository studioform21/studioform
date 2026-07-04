import "@/index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
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

function App() {
    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white antialiased">
            <BrowserRouter>
                <ScrollToTop />
                <Navbar />
                <main className="relative">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/voice-agents" element={<VoiceAgents />} />
                        <Route path="/ai-automation" element={<AIAutomation />} />
                        <Route path="/llms" element={<LLMs />} />
                        <Route path="/rag-chatbots" element={<RagChatbots />} />
                        <Route path="/workshops" element={<Workshops />} />
                        <Route path="/claude-skills" element={<ClaudeSkills />} />
                        <Route path="/ai-university" element={<AIUniversity />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/team" element={<Team />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/ai-news" element={<News />} />
                        <Route path="/blog" element={<News />} />
                        <Route path="/privacy" element={<Legal kind="privacy" />} />
                        <Route path="/terms" element={<Legal kind="terms" />} />
                        <Route path="/refund" element={<Legal kind="refund" />} />
                        <Route path="*" element={<Home />} />
                    </Routes>
                </main>
                <Footer />
            </BrowserRouter>
            <Toaster theme="dark" position="bottom-right" toastOptions={{ style: { background: "#0A0A0A", color: "#fff", border: "1px solid rgba(255,255,255,0.1)" } }} />
        </div>
    );
}

export default App;