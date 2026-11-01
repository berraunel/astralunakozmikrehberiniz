import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, User, RefreshCw, MessageSquare } from 'lucide-react';
import { NatalChartData } from '../utils/astrologyCalc';

interface AiAstrologerModalProps {
  isOpen: boolean;
  onClose: () => void;
  chart?: NatalChartData;
}

interface Message {
  role: 'user' | 'model';
  content: string;
}

export const AiAstrologerModal: React.FC<AiAstrologerModalProps> = ({ isOpen, onClose, chart }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: chart
        ? `Merhaba ${chart.birthData.fullName}! Ben AstraLogia'nın baş astrologuyum. Haritanı incelediğimde Güneşinin ${chart.sun.sign.name}, Yükseleninin ${chart.ascendant.sign.name} ve Ay burcunun ${chart.moon.sign.name} olduğunu görüyorum. Sana doğum haritan, ilişkilerin veya kariyer yolculuğun hakkında nasıl rehberlik edebilirim?`
        : 'Merhaba sevgili gökyüzü yolcusu! Ben AstraLogia platformunun yapay zeka astrologuyum. Astrolojiye dair merak ettiğin her şeyi, burçları, evleri veya doğum haritanı bana sorabilirsin.',
    },
  ]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const quickQuestions = chart
    ? [
        `${chart.sun.sign.name} Güneş ve ${chart.ascendant.sign.name} Yükselenim birbirini nasıl tamamlar?`,
        `${chart.houses[6]?.name} olan ${chart.houses[6]?.sign.name} burcu ilişkilerimi nasıl etkiler?`,
        `Haritamdaki ${chart.dominantElement} elementi yoğunluğu bana hangi yetenekleri veriyor?`,
        'Bu haritaya sahip biri için en uygun meslek alanları nelerdir?',
      ]
    : [
        'Astrolojiye yeni başlayan biri önce neyi öğrenmeli?',
        'Yükselen burç neden Güneş burcundan daha belirgin hissedilir?',
        '12 Ev hayatımızı nasıl böler?',
        'Element dengesizliği nasıl fark edilir?',
      ];

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const chartContext = chart
        ? {
            fullName: chart.birthData.fullName,
            sunSign: chart.sun.sign.name,
            sunHouse: chart.sun.house,
            ascSign: chart.ascendant.sign.name,
            moonSign: chart.moon.sign.name,
            moonHouse: chart.moon.house,
            dominantElement: chart.dominantElement,
            dominantModality: chart.dominantModality,
            houses: chart.houses.map((h) => ({ house: h.houseNumber, sign: h.sign.name, theme: h.theme })),
            planets: chart.planets.map((p) => ({ name: p.name, sign: p.sign.name, house: p.house, isRetrograde: p.isRetrograde })),
          }
        : null;

      const res = await fetch('/api/chat-astrologer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          chartContext,
          conversationHistory: messages,
        }),
      });

      const data = await res.json();
      const reply = data.reply || data.error || 'Gökyüzü şu anda sessiz, lütfen tekrar deneyin.';
      setMessages((prev) => [...prev, { role: 'model', content: reply }]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          content: 'Bağlantı sırasında bir aksaklık oldu. Lütfen internet bağlantınızı kontrol edip tekrar deneyiniz.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl bg-[#090e1f] border border-amber-500/30 rounded-2xl shadow-2xl flex flex-col h-[640px] max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-indigo-600 flex items-center justify-center text-slate-950 shadow-md">
              <Bot className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-cinzel font-bold text-slate-100 text-base">
                  Astra · AI Baş Astrolog
                </h4>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  Gemini Canlı
                </span>
              </div>
              <p className="text-xs text-amber-300/80">
                {chart ? `${chart.birthData.fullName} Haritası Yüklendi` : 'Genel Danışmanlık Modu'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'model' && (
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 mt-0.5 border border-amber-400/30">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-amber-400 text-slate-950 font-medium rounded-br-none shadow-md'
                    : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-bl-none shadow-sm'
                }`}
              >
                <div className="whitespace-pre-line">{msg.content}</div>
              </div>

              {msg.role === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 items-center text-xs text-amber-300">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-400/30">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              </div>
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300">
                Astra gökyüzü konumlarını inceliyor...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-900 overflow-x-auto flex items-center gap-2">
          <span className="text-[11px] text-slate-400 shrink-0 flex items-center gap-1">
            <MessageSquare className="w-3 h-3 text-amber-400" /> Öneri:
          </span>
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-2.5 py-1 rounded bg-slate-900 hover:bg-amber-500/15 text-slate-300 hover:text-amber-200 border border-slate-800 hover:border-amber-500/30 text-xs whitespace-nowrap shrink-0 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-slate-900/90 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Astrolojiye dair istediğin soruyu sor..."
              className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-slate-100 text-xs sm:text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-slate-950 font-bold rounded-xl transition-all flex items-center justify-center shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
