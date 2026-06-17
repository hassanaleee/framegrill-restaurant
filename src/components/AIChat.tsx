import { useState, useEffect, useRef } from 'react';
import { askChatbot } from '../lib/anthropic';
import menuData from '../data/menu.json';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const WELCOME_MESSAGE: Message = {
  role: 'assistant',
  content: "Hi! Welcome to Frame Grill 🍖 How can I help you today? You can ask me about our menu, hours, or anything else!",
};

const TypingIndicator = () => (
  <div className="flex items-center gap-1 px-4 py-3 bg-stone-100 text-stone-700 rounded-2xl rounded-bl-sm max-w-[80px] shadow-sm">
    <span
      className="w-2 h-2 bg-terracotta-500 rounded-full animate-bounce"
      style={{ animationDelay: '0ms', animationDuration: '900ms' }}
    />
    <span
      className="w-2 h-2 bg-terracotta-500 rounded-full animate-bounce"
      style={{ animationDelay: '180ms', animationDuration: '900ms' }}
    />
    <span
      className="w-2 h-2 bg-terracotta-500 rounded-full animate-bounce"
      style={{ animationDelay: '360ms', animationDuration: '900ms' }}
    />
  </div>
);

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSend = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: 'user', content: trimmed };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);
    setHasError(false);

    try {
      const reply = await askChatbot(updatedMessages, menuData);
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error('AIChat error:', err);
      setHasError(true);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Sorry, I'm having trouble connecting right now. Please try again in a moment! 😊",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* Chat Window */}
      <div
        className={`fixed bottom-24 left-4 z-50 w-[340px] sm:w-[380px] flex flex-col bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden transition-all duration-300 ease-in-out origin-bottom-left ${
          isOpen
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
        style={{ maxHeight: '520px' }}
        aria-hidden={!isOpen}
        role="dialog"
        aria-label="Frame Grill AI Assistant"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-terracotta-700 to-terracotta-600">
          <div className="flex items-center gap-2.5">
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <span className="text-lg">🍖</span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm font-inter leading-tight">Frame Grill AI</p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                <p className="text-terracotta-100 text-xs">Online · Ready to help</p>
              </div>
            </div>
          </div>
          {/* Close Button */}
          <button
            onClick={handleToggle}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors duration-200"
            aria-label="Close chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-stone-50" style={{ minHeight: '280px', maxHeight: '340px' }}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-6 h-6 rounded-full bg-terracotta-100 flex items-center justify-center mr-2 mt-auto mb-0.5 flex-shrink-0">
                  <span className="text-xs">🍖</span>
                </div>
              )}
              <div
                className={`max-w-[75%] px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-terracotta-700 text-white rounded-2xl rounded-br-sm'
                    : 'bg-white text-stone-800 rounded-2xl rounded-bl-sm border border-stone-100'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex justify-start items-end gap-2">
              <div className="w-6 h-6 rounded-full bg-terracotta-100 flex items-center justify-center flex-shrink-0">
                <span className="text-xs">🍖</span>
              </div>
              <TypingIndicator />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Error Banner */}
        {hasError && (
          <div className="px-4 py-1.5 bg-red-50 border-t border-red-100">
            <p className="text-xs text-red-500 text-center">Connection issue — check your API key in .env</p>
          </div>
        )}

        {/* Input Area */}
        <div className="flex items-center gap-2 px-3 py-3 bg-white border-t border-stone-100">
          <input
            ref={inputRef}
            type="text"
            id="ai-chat-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about menu, hours..."
            disabled={isLoading}
            className="flex-1 px-3.5 py-2 text-sm bg-stone-100 text-stone-800 rounded-full border border-transparent placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-terracotta-400 focus:bg-white transition-all duration-200 disabled:opacity-60"
            aria-label="Chat message input"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !inputValue.trim()}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-terracotta-700 hover:bg-terracotta-800 text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm hover:shadow-md active:scale-95"
            aria-label="Send message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 translate-x-px">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Floating Toggle Button */}
      <button
        onClick={handleToggle}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 flex items-center justify-center rounded-full bg-terracotta-700 hover:bg-terracotta-800 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
        aria-label={isOpen ? 'Close AI Chat' : 'Open AI Chat'}
        id="ai-chat-toggle-button"
      >
        {/* Subtle pulse ring when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-terracotta-600 opacity-40 animate-ping" />
        )}

        {/* Icon swap: chat ↔ X */}
        <span className={`absolute transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-75'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </span>
        <span className={`absolute transition-all duration-300 ${!isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
        </span>
      </button>
    </>
  );
};

export default AIChat;
