import React, { useState, useRef, useEffect } from "react";

export default function InteractiveTerminal() {
    const [history, setHistory] = useState([
        { text: "Studio Form Shell v1.0.4 - Initializing...", type: "system" },
        { text: "Type 'help' to see list of available agentic commands.", type: "info" },
        { text: "", type: "empty" }
    ]);
    const [input, setInput] = useState("");
    const terminalEndRef = useRef(null);

    const scrollToBottom = () => {
        terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [history]);

    const handleCommand = (e) => {
        e.preventDefault();
        const trimmedCmd = input.trim().toLowerCase();
        if (!trimmedCmd) return;

        const newHistory = [...history, { text: `studioform@guest:~$ ${input}`, type: "command" }];
        
        switch (trimmedCmd) {
            case "help":
                newHistory.push({
                    text: `Available commands:\n  services  - List Studio Form AI solutions & services\n  stats     - View current operational metrics & stats\n  about     - Learn about Studio Form's core mission\n  contact   - Get contact links & schedule a B2B demo\n  clear     - Clear the terminal logs`,
                    type: "success"
                });
                break;
            case "about":
                newHistory.push({
                    text: "Studio Form is India's pioneering agentic AI company based in Indore. We design, build, and deploy production-ready autonomous systems, multilingual voice agents, private domain LLMs, and custom workflow automations that scale globally.",
                    type: "info"
                });
                break;
            case "stats":
                newHistory.push({
                    text: "OPERATIONAL METRICS:\n  - Projects Shipped: 121+\n  - Multilingual Voice Agents: 50+ Active\n  - AI University Courses: 100+\n  - Target Industries: 12+\n  - Service Uptime: 99.97%\n  - LLM Inference Status: ACTIVE",
                    type: "info"
                });
                break;
            case "services":
            case "products":
                newHistory.push({
                    text: "STUDIO FORM SOLUTIONS:\n  1. AI Voice Agents - Multilingual inbound receptionists & outbound qualifiers (<900ms response latency).\n  2. RAG Chatbots - Zero-hallucination document-search bots connected to PDF/Notion/SQL.\n  3. Automations - 10,000+ cross-platform automated workflows deployed directly on your stack.\n  4. Domain LLMs - Private, fine-tuned LLMs optimized for specialized industry datasets.",
                    type: "info"
                });
                break;
            case "contact":
                newHistory.push({
                    text: "GET IN TOUCH:\n  - Web Link: https://studioform.app/contact\n  - Email ID: contact.studioform@gmail.com\n  - Office: Vijay Nagar, Indore, India\n  \nType 'demo' to navigate directly to the contact page!",
                    type: "success"
                });
                break;
            case "demo":
                newHistory.push({ text: "Opening contact page... redirection initiated.", type: "system" });
                setTimeout(() => {
                    window.location.href = "/contact";
                }, 1000);
                break;
            case "clear":
                setHistory([]);
                setInput("");
                return;
            default:
                newHistory.push({
                    text: `bash: command not found: ${trimmedCmd}. Type 'help' for available commands.`,
                    type: "error"
                });
        }

        setHistory(newHistory);
        setInput("");
    };

    return (
        <div className="w-full bg-[#050505] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[380px] font-mono text-sm">
            {/* Terminal Window Header */}
            <div className="bg-[#0D0D0F] border-b border-white/10 px-4 py-3 flex items-center justify-between">
                <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ef4444] inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-[#eab308] inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-[#22c55e] inline-block"></span>
                </div>
                <div className="text-white/40 text-xs">studioform-shell.sh</div>
                <div className="w-12"></div> {/* Spacer for symmetry */}
            </div>

            {/* Terminal Body Screen */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3 flex flex-col text-white/80">
                {history.map((line, i) => {
                    let colorClass = "text-white/80";
                    if (line.type === "system") colorClass = "text-[#ea580c] font-bold";
                    if (line.type === "info") colorClass = "text-white/60";
                    if (line.type === "command") colorClass = "text-white font-bold";
                    if (line.type === "success") colorClass = "text-[#22c55e]";
                    if (line.type === "error") colorClass = "text-[#ef4444]";

                    return (
                        <div 
                            key={i} 
                            className={`${colorClass} whitespace-pre-wrap leading-relaxed`}
                        >
                            {line.text}
                        </div>
                    );
                })}
                <div ref={terminalEndRef} />
            </div>

            {/* Input Prompt Form */}
            <form 
                onSubmit={handleCommand} 
                className="bg-[#09090B] border-t border-white/5 px-5 py-3 flex items-center gap-2"
            >
                <span className="text-[#ea580c] font-bold">studioform@guest:~$</span>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type command (e.g. help)..."
                    className="flex-1 bg-transparent text-white outline-none border-none caret-[#ea580c] placeholder-white/20"
                    autoFocus
                />
            </form>
        </div>
    );
}
