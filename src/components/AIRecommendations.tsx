import { useState } from 'react';
import { getMenuRecommendation } from '../lib/anthropic';
import menuData from '../data/menu.json';

type Status = 'idle' | 'loading' | 'success' | 'error';

const MOOD_BUTTONS = [
  { label: "I'm very hungry 🍖", value: "I am very hungry and want something hearty and filling" },
  { label: "Something light 🥗", value: "I want something light and not too heavy" },
  { label: "Vegetarian options 🌿", value: "I am looking for vegetarian-friendly options" },
  { label: "Surprise me! 🎲", value: "Surprise me with your best recommendation — something unique and exciting" },
];

const AIRecommendations = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [result, setResult] = useState<string>('');
  const [customInput, setCustomInput] = useState('');
  const [activePreference, setActivePreference] = useState<string | null>(null);

  const fetchRecommendation = async (preference: string) => {
    setStatus('loading');
    setActivePreference(preference);
    setResult('');

    try {
      const recommendation = await getMenuRecommendation(preference, menuData);
      setResult(recommendation);
      setStatus('success');
    } catch (err) {
      console.error('AIRecommendations error:', err);
      setStatus('error');
    }
  };

  const handleMoodClick = (value: string) => {
    fetchRecommendation(value);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customInput.trim();
    if (!trimmed || status === 'loading') return;
    fetchRecommendation(trimmed);
  };

  return (
    <section className="section-padding bg-muted/30 border-y border-border/30 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-terracotta-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-resto_one-500/6 rounded-full blur-3xl pointer-events-none" />

      <div className="container-width relative z-10">

        {/* Section Heading */}
        <div className="text-center mb-12" data-aos="fade-up">
          <span className="inline-flex items-center gap-2 bg-terracotta-100 dark:bg-terracotta-950/60 text-terracotta-700 dark:text-terracotta-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            Powered by AI
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4 uppercase tracking-tight">
            Not sure what to order?{' '}
            <span className="text-terracotta-600 dark:text-terracotta-400 font-playfair italic">Let AI decide!</span>{' '}
            🤖
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Tell us your mood or craving and our AI will recommend the perfect dish from the Frame Grill menu.
          </p>
        </div>

        {/* Mood Quick-Select Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8" data-aos="fade-up" data-aos-delay="100">
          {MOOD_BUTTONS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => handleMoodClick(value)}
              disabled={status === 'loading'}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold border-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:scale-95 ${
                activePreference === value && (status === 'loading' || status === 'success')
                  ? 'bg-terracotta-700 border-terracotta-700 text-white shadow-md shadow-terracotta-200/50 dark:shadow-terracotta-900/30'
                  : 'bg-card border-border text-foreground hover:border-terracotta-500 hover:text-terracotta-700 dark:hover:text-terracotta-400 hover:shadow-sm'
              }`}
              id={`mood-btn-${label.replace(/\s+/g, '-').toLowerCase()}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 max-w-lg mx-auto mb-8" data-aos="fade-up" data-aos-delay="150">
          <div className="flex-1 h-px bg-border" />
          <span className="text-muted-foreground text-xs uppercase tracking-widest font-medium flex-shrink-0">or tell us yourself</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Custom Input */}
        <form
          onSubmit={handleCustomSubmit}
          className="flex items-center gap-3 max-w-lg mx-auto mb-10"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <input
            id="ai-recommendation-input"
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder='e.g. "spicy food", "something for kids"…'
            disabled={status === 'loading'}
            className="flex-1 px-5 py-3 rounded-full text-sm bg-card border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-terracotta-400 focus:border-transparent transition-all duration-200 disabled:opacity-60 shadow-sm"
            aria-label="Custom food preference input"
          />
          <button
            type="submit"
            disabled={status === 'loading' || !customInput.trim()}
            className="px-6 py-3 rounded-full bg-terracotta-700 hover:bg-terracotta-800 text-white text-sm font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:scale-95 flex-shrink-0"
            id="ai-recommendation-submit"
          >
            Ask AI
          </button>
        </form>

        {/* Result Area */}
        {status !== 'idle' && (
          <div className="max-w-2xl mx-auto" data-aos="fade-up">

            {/* Loading State */}
            {status === 'loading' && (
              <div className="bg-card border border-border/60 rounded-3xl p-8 shadow-sm text-center">
                <div className="flex flex-col items-center gap-4">
                  {/* Spinner */}
                  <div className="relative w-14 h-14">
                    <div className="absolute inset-0 rounded-full border-4 border-terracotta-100 dark:border-terracotta-950/50" />
                    <div className="absolute inset-0 rounded-full border-4 border-terracotta-600 border-t-transparent animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center text-xl">🤖</div>
                  </div>
                  <div>
                    <p className="text-foreground font-semibold mb-1">AI is thinking...</p>
                    <p className="text-muted-foreground text-sm">Analysing your preference against our full menu</p>
                  </div>
                  {/* Skeleton lines */}
                  <div className="w-full space-y-2 animate-pulse pt-2">
                    <div className="h-4 bg-muted rounded-full w-3/4 mx-auto" />
                    <div className="h-4 bg-muted rounded-full w-full" />
                    <div className="h-4 bg-muted rounded-full w-5/6 mx-auto" />
                  </div>
                </div>
              </div>
            )}

            {/* Success State */}
            {status === 'success' && result && (
              <div className="bg-card border border-terracotta-200/60 dark:border-terracotta-800/40 rounded-3xl overflow-hidden shadow-lg">
                {/* Card Header */}
                <div className="bg-gradient-to-r from-terracotta-700 to-terracotta-600 px-6 py-4 flex items-center gap-3">
                  <div className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center text-lg flex-shrink-0">🤖</div>
                  <div>
                    <p className="text-white font-bold text-sm">Frame Grill AI Recommends</p>
                    <p className="text-terracotta-100 text-xs">Based on: <span className="italic">"{activePreference}"</span></p>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
                    <span className="text-terracotta-100 text-xs">Live</span>
                  </div>
                </div>

                {/* Recommendation Body */}
                <div className="px-6 py-6">
                  {/* Quote icon */}
                  <div className="text-terracotta-300 dark:text-terracotta-700 text-4xl leading-none mb-2 font-playfair select-none">&ldquo;</div>
                  <div className="text-foreground text-sm leading-relaxed whitespace-pre-wrap">
                    {result}
                  </div>
                  <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                      </svg>
                      Powered by Claude AI
                    </span>
                    <button
                      onClick={() => { setStatus('idle'); setActivePreference(null); setCustomInput(''); setResult(''); }}
                      className="text-xs text-terracotta-600 dark:text-terracotta-400 hover:underline font-medium"
                    >
                      Try again →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Error State */}
            {status === 'error' && (
              <div className="bg-card border border-red-200/60 dark:border-red-800/40 rounded-3xl p-8 text-center shadow-sm">
                <div className="w-14 h-14 bg-red-50 dark:bg-red-950/30 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">😕</div>
                <p className="text-foreground font-semibold mb-1">Sorry, try again later</p>
                <p className="text-muted-foreground text-sm mb-5">
                  We couldn't reach the AI right now. This could be a network issue or an invalid API key.
                </p>
                <button
                  onClick={() => { setStatus('idle'); setActivePreference(null); }}
                  className="px-6 py-2.5 rounded-full bg-terracotta-700 hover:bg-terracotta-800 text-white text-sm font-semibold transition-all duration-200 active:scale-95"
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};

export default AIRecommendations;
