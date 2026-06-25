import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Quote, Sparkles, Star } from 'lucide-react';
import { QuoteItem } from '../types';

const QUOTES: QuoteItem[] = [
  {
    text: 'O pai tá on!',
    context: 'Frase que quebrou a internet e virou jargão popular durante as quartas de final da Champions de 2020.',
    year: '2020'
  },
  {
    text: 'Ousadia e alegria',
    context: 'Mais que um lema, o estilo de vida estampado em suas chuteiras e na sua forma moleque de jogar bola.',
    year: '2012'
  },
  {
    text: 'Tudo passa...',
    context: 'Tatuagem marcante no pescoço do craque, lembrando que tanto a glória quanto as dores são passageiras.',
    year: '2014'
  },
  {
    text: 'Deus é bom o tempo todo!',
    context: 'Sua clássica mensagem de fé antes e depois de entrar em campo, vestindo a faixa de 100% Jesus.',
    year: 'Sempre'
  },
  {
    text: 'Me cobrem resultados, não simpatia.',
    context: 'Resposta de personalidade do batedor de recordes do futebol brasileiro diante das críticas da mídia.',
    year: '2021'
  }
];

export default function SoundboardQuotes() {
  const [activeQuote, setActiveQuote] = useState<QuoteItem | null>(null);

  // Synthesizes a beautiful melodic chime sound via Web Audio API to act as the feedback
  const playQuoteSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      // Fun retro-game melodic arpeggio!
      const playTone = (freq: number, start: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
        gain.gain.setValueAtTime(0.04, ctx.currentTime + start);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + duration);
      };

      // Play major third arpeggio (C - E - G - C)
      playTone(523.25, 0, 0.2); // C5
      playTone(659.25, 0.1, 0.2); // E5
      playTone(783.99, 0.2, 0.3); // G5
      playTone(1046.50, 0.3, 0.4); // C6
    } catch (e) {
      // ignore
    }
  };

  const handleQuoteClick = (quote: QuoteItem) => {
    playQuoteSound();
    setActiveQuote(quote);
    
    // Auto clear after some seconds
    setTimeout(() => {
      setActiveQuote(prev => prev?.text === quote.text ? null : prev);
    }, 4000);
  };

  return (
    <section id="quotes" className="py-24 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-brazil-yellow/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl w-full mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brazil-yellow/10 border border-brazil-yellow/20 text-brazil-yellow text-xs font-bold uppercase mb-4">
            <Quote className="w-3.5 h-3.5 fill-brazil-yellow/10" />
            <span>Mural de Frases</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase text-white">
            FRASES DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-brazil-yellow to-brazil-green">PERSONALIDADE</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto text-sm">
            Clique nas frases icônicas que marcaram a carreira de Neymar Jr e ouça o badalo da ousadia no mural oficial de jargões.
          </p>
        </div>

        {/* Quotes list grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {QUOTES.map((quote, idx) => (
            <div
              key={idx}
              id={`quote-card-${idx}`}
              onClick={() => handleQuoteClick(quote)}
              className="group glass-panel p-6 rounded-3xl border border-slate-800/80 hover:border-brazil-yellow/30 hover:bg-slate-950/60 transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden h-48"
            >
              {/* Background watermark */}
              <div className="absolute right-2 bottom-2 text-slate-800/10 font-black text-7xl select-none group-hover:text-brazil-yellow/5 transition-all">
                {quote.year}
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-black text-brazil-yellow bg-brazil-yellow/10 px-2 py-0.5 rounded-full uppercase tracking-widest">
                    {quote.year}
                  </span>
                  <Volume2 className="w-4 h-4 text-slate-500 group-hover:text-brazil-yellow transition-colors" />
                </div>
                
                <p className="text-lg font-black text-white leading-snug group-hover:text-brazil-yellow transition-colors">
                  &ldquo;{quote.text}&rdquo;
                </p>
              </div>

              <p className="text-[11px] text-slate-400 leading-normal line-clamp-2">
                {quote.context}
              </p>
            </div>
          ))}
        </div>

        {/* Fun giant overlay bubble for active quotation */}
        <AnimatePresence>
          {activeQuote && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed bottom-6 right-6 z-50 max-w-sm p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border-2 border-brazil-yellow shadow-gold-neon flex items-start gap-4"
            >
              <div className="p-2 rounded-xl bg-brazil-yellow/10 text-brazil-yellow shrink-0">
                <Star className="w-5 h-5 fill-brazil-yellow" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">O Pai tá On-line!</span>
                  <button 
                    onClick={() => setActiveQuote(null)} 
                    className="text-slate-400 hover:text-white text-xs font-bold px-1.5"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-sm font-extrabold text-white mb-1">
                  &ldquo;{activeQuote.text}&rdquo;
                </p>
                <p className="text-[10px] text-slate-400">
                  {activeQuote.context}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
