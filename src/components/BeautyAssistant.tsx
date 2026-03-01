import React, { useState } from 'react';
import { Send, Sparkles, X } from 'lucide-react';

export const BeautyAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'I am honored to serve. Based on our philosophy of Authentic Quality, how may I assist your skin health today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/beauty-assistant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({ query: userMsg })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', text: data.reply || "I'm having trouble responding right now. Please try again." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', text: "Unable to connect. Please check your connection and try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) return (
    <button onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 z-50 bg-[#800020] text-[#F8F8FF] p-4 rounded-full shadow-xl border border-[#C5A028] hover:scale-105 transition-transform">
      <Sparkles className="w-6 h-6" />
    </button>
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 md:w-96 bg-[#F8F8FF] rounded-xl shadow-2xl border border-[#C5A028] overflow-hidden font-sans">
      <div className="bg-[#800020] p-4 flex justify-between items-center text-[#F8F8FF]">
        <span className="font-serif font-bold tracking-wide flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#C5A028]"/> Asper Concierge</span>
        <button onClick={() => setIsOpen(false)}><X className="w-5 h-5 text-[#C5A028]"/></button>
      </div>
      <div className="h-96 p-4 overflow-y-auto flex flex-col gap-3">
        {messages.map((m, i) => (
          <div key={i} className={`p-3 text-sm rounded-lg max-w-[85%] ${m.role === 'user' ? 'bg-[#E5E5E5] self-end text-[#333333]' : 'bg-white border border-[#E5E5E5] self-start text-[#333333]'}`}>
            {m.text}
          </div>
        ))}
        {isTyping && <div className="text-xs text-[#800020] animate-pulse pl-2">Consulting Pharmacist Logic...</div>}
      </div>
      <div className="p-3 bg-white border-t border-[#E5E5E5] flex gap-2">
        <input 
          className="flex-1 bg-transparent text-sm outline-none text-[#333333]" 
          placeholder="Ask Dr. Sami or Ms. Zain..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend} className="text-[#800020] hover:text-[#600018]"><Send className="w-5 h-5"/></button>
      </div>
    </div>
  );
};
