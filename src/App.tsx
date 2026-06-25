import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import CareerTimeline from './components/CareerTimeline';
import PenaltyGame from './components/PenaltyGame';
import SkillShowcase from './components/SkillShowcase';
import SoundboardQuotes from './components/SoundboardQuotes';
import TriviaQuiz from './components/TriviaQuiz';
import { Menu, X, Star, Heart, Trophy, Info } from 'lucide-react';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(1010);

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikesCount(prev => prev - 1);
    } else {
      setLiked(true);
      setLikesCount(prev => prev + 1);
      
      // Synthesize a gold chime sound
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContext) {
          const ctx = new AudioContext();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(880, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.15);
          gain.gain.setValueAtTime(0.04, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.2);
        }
      } catch (e) {}
    }
  };

  const menuItems = [
    { href: '#hero', label: 'Início' },
    { href: '#career', label: 'Trajetória' },
    { href: '#penalty-game', label: 'Cobrar Pênalti' },
    { href: '#skills', label: 'Dribles' },
    { href: '#quiz', label: 'Quiz' },
    { href: '#quotes', label: 'Mural de Frases' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-brazil-yellow selection:text-slate-950 antialiased overflow-x-hidden">
      
      {/* Sticky Header */}
      <header 
        id="navbar-header"
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-900 py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 group">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-brazil-yellow to-brazil-green flex items-center justify-center font-black text-slate-950 text-base shadow-md group-hover:scale-105 transition-all">
              N10
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-wider text-white uppercase leading-none group-hover:text-brazil-yellow transition-colors">
                NEYMAR JR
              </span>
              <span className="text-[9px] font-semibold text-brazil-green uppercase tracking-widest leading-none mt-0.5">
                Portal Oficial de Fãs
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <a 
                key={item.href} 
                href={item.href}
                className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-brazil-yellow transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Dynamic Interactive Like Badge */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="header-like-btn"
              onClick={handleLike}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                liked 
                  ? 'bg-rose-500/10 border-rose-500 text-rose-500 shadow-sm scale-105' 
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-rose-500' : ''}`} />
              <span>{likesCount}</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          id="mobile-menu-drawer"
          className="fixed inset-0 top-[60px] z-40 bg-slate-950/98 backdrop-blur-lg flex flex-col p-6 space-y-6 md:hidden border-t border-slate-900"
        >
          <div className="flex flex-col space-y-4">
            {menuItems.map((item) => (
              <a 
                key={item.href} 
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-bold uppercase tracking-wider text-slate-300 hover:text-brazil-yellow border-b border-slate-900 pb-3"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="pt-4 flex justify-between items-center border-t border-slate-900">
            <span className="text-xs font-bold uppercase text-slate-500">Deixe seu Apoio</span>
            <button
              id="drawer-like-btn"
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-wider transition-all ${
                liked 
                  ? 'bg-rose-500/10 border-rose-500 text-rose-500' 
                  : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-rose-500' : ''}`} />
              <span>{likesCount} Curtidas</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Sections Content */}
      <main>
        <Hero />
        <CareerTimeline />
        <PenaltyGame />
        <SkillShowcase />
        <TriviaQuiz />
        <SoundboardQuotes />
      </main>

      {/* Extra Interactive Fact Alert Banner */}
      <section className="bg-gradient-to-r from-emerald-950 via-slate-950 to-green-950 py-10 border-t border-slate-900 text-center px-4 relative">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="p-3 bg-brazil-green/10 rounded-2xl border border-brazil-green/20 text-brazil-green shrink-0">
            <Info className="w-6 h-6" />
          </div>
          <div className="text-left max-w-2xl">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Você Sabia?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              O Instituto Projeto Neymar Jr (IPNJ) ajuda mais de <span className="text-brazil-yellow font-semibold">3.000 crianças</span> carentes e suas famílias na Praia Grande, em São Paulo, promovendo educação, saúde e esporte desde 2014. O verdadeiro gol de placa do batedor do Hexa!
            </p>
          </div>
          <a 
            href="https://www.institutoneymarjr.org.br/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-4 py-2 bg-slate-900 border border-slate-800 text-xs font-bold uppercase tracking-wider rounded-xl hover:border-slate-700 hover:text-white shrink-0 transition-colors"
          >
            Conhecer o Instituto
          </a>
        </div>
      </section>

      {/* Footer Section */}
      <footer id="main-footer" className="bg-slate-950 border-t border-slate-900 py-12 text-center text-slate-500 text-xs">
        <div className="max-w-5xl mx-auto px-4 space-y-6">
          <div className="flex items-center justify-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-white">
              N
            </span>
            <span className="font-extrabold uppercase tracking-widest text-slate-300">Neymar Jr Tribute Portal</span>
          </div>

          <p className="max-w-md mx-auto leading-relaxed text-[11px]">
            Este é um projeto com fins demonstrativos, interativos e recreativos em homenagem ao legado imorredouro do futebol arte de Neymar Jr. Todos os direitos de marcas registradas pertencem a seus respectivos proprietários.
          </p>

          <div className="flex justify-center gap-6 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
            <span>#OusadiaEElegria</span>
            <span>#OIPaiTaON</span>
            <span>#NeymarJr10</span>
          </div>

          <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px]">
            <span>© 2026 Neymar Jr Tribute Portal. Todos os direitos reservados.</span>
            <span className="flex items-center gap-1">
              Criado com <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> & <Trophy className="w-3 h-3 text-brazil-yellow fill-brazil-yellow" /> no Brasil.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
