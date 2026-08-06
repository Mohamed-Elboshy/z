import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, X, Send, Bot, User, ArrowRight } from 'lucide-react';

export const AiStylistDrawer: React.FC = () => {
  const { isAiChatOpen, setIsAiChatOpen, aiMessages, sendAiMessage, language, navigateTo } = useApp();
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickPrompts = language === 'ar' ? [
    'نسّق لي إطلالة شتوية أنيقة',
    'ما هو المقاس المناسب لمعطف الترينش؟',
    'حقائب جلدية تناسب البليزر',
    'كيف يمكنني تتبع طلبي؟'
  ] : [
    'Suggest a chic winter outfit look',
    'What size should I pick for trench coats?',
    'Matching leather bag for charcoal blazer',
    'How do I track my Egyptian delivery?'
  ];

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;
    setInputText('');
    setIsLoading(true);
    await sendAiMessage(text);
    setIsLoading(false);
  };

  if (!isAiChatOpen) {
    return (
      <button
        id="ai-stylist-launcher"
        onClick={() => setIsAiChatOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-black text-white dark:bg-white dark:text-black p-4 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 group cursor-pointer border border-white/20"
        title={language === 'ar' ? 'مساعد ZARA' : 'ZARA Assistant'}
      >
        <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
        <span className="text-xs font-mono uppercase tracking-widest hidden sm:inline group-hover:block font-bold">
          {language === 'ar' ? 'مساعد الأزياء' : 'STYLE ASSISTANT'}
        </span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end transition-opacity">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 h-full flex flex-col shadow-2xl border-l border-zinc-200 dark:border-zinc-800 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-[#F7F7F5] dark:bg-zinc-950">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-black text-white dark:bg-white dark:text-black rounded-full">
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-serif font-bold uppercase tracking-widest text-black dark:text-white">
                {language === 'ar' ? 'مساعد أزياء ZARA': 'ZARA STYLE ADVISOR'}
              </h3>
              <p className="text-[10px] font-sans text-zinc-500 uppercase tracking-wider">
                {language === 'ar'? 'مساعد التسوق': 'Shopping Assistant'}
              </p>
            </div>
          </div>
          <button
            id="close-ai-stylist"
            onClick={() => setIsAiChatOpen(false)}
            className="p-2 text-zinc-500 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestions */}
        <div className="px-4 py-3 bg-zinc-100 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800 flex gap-2 overflow-x-auto scrollbar-none">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="text-[10px] font-sans tracking-wide bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 px-3 py-1.5 rounded-full whitespace-nowrap hover:border-black dark:hover:border-white transition-colors cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 font-sans text-xs">
          {aiMessages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[80%] p-4 leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-black text-white dark:bg-white dark:text-black rounded-t-xl rounded-l-xl font-medium'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-t-xl rounded-r-xl border border-zinc-200 dark:border-zinc-700'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
                <span className="block text-[9px] opacity-60 mt-2 text-right">
                  {msg.timestamp}
                </span>
              </div>
              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 items-center text-zinc-500 text-xs italic">
              <Sparkles className="w-4 h-4 animate-spin text-amber-500" />
              <span>{language === 'ar' ? 'جارٍ تجهيز الاقتراحات...' : 'Preparing recommendations...'}</span>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder={language === 'ar' ? 'اسأل عن الموضة، المقاسات، أو الطلبات...' : 'Ask about looks, sizing, or items...'}
              className="flex-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white px-4 py-3 text-xs focus:outline-none focus:border-black dark:focus:border-white transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="bg-black text-white dark:bg-white dark:text-black p-3 hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-40 transition-colors cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
