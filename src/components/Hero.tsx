import { motion } from 'motion/react';
import { Award, Zap, Flame, Star, Trophy } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-950 pt-20 px-4">
      {/* Background Glows and Abstract Shapes */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brazil-green/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brazil-yellow/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Decorative soccer grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-6xl w-full mx-auto text-center flex flex-col items-center">
        {/* Floating Tag */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brazil-green/10 border border-brazil-green/20 text-brazil-green text-sm font-semibold mb-6"
        >
          <Star className="w-4 h-4 fill-brazil-green" />
          <span>O RETORNO DO CRAQUE • OUSADIA E ALEGRIA</span>
        </motion.div>

        {/* Big Stylized Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative"
        >
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none select-none">
            NEYMAR <span className="text-transparent bg-clip-text bg-gradient-to-r from-brazil-yellow via-gold to-brazil-green glow-text-gold">JR</span>
          </h1>
          
          <div className="absolute -top-6 -right-6 md:-top-10 md:-right-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="relative flex items-center justify-center"
            >
              <Trophy className="w-10 h-10 md:w-16 md:h-16 text-brazil-yellow drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]" />
            </motion.div>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-lg md:text-2xl text-slate-300 font-light max-w-3xl leading-relaxed"
        >
          Mágico, destemido e imprevisível. O maior herdeiro da <span className="text-brazil-yellow font-semibold">Ginga Brasileira</span> e o maior artilheiro da história da Seleção Brasileira. Bem-vindo ao portal definitivo do futebol arte.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a 
            href="#penalty-game" 
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-brazil-yellow to-gold text-slate-950 font-extrabold text-lg flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-gold-neon cursor-pointer"
          >
            <Zap className="w-5 h-5 fill-slate-950" />
            Jogar Pênalti do Ney
          </a>
          <a 
            href="#career" 
            className="px-8 py-4 rounded-xl bg-slate-900 border border-slate-800 text-white font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 hover:bg-slate-800 hover:border-slate-700 cursor-pointer"
          >
            <Award className="w-5 h-5 text-brazil-green" />
            Ver Carreira & Títulos
          </a>
        </motion.div>

        {/* Interactive Highlight Banner (Bento style specs) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl"
        >
          {[
            { label: 'Gols na Carreira', val: '439+', sub: 'Clubes & Seleção', icon: Flame, color: 'text-rose-500' },
            { label: 'Assistências', val: '245+', sub: 'Garçom Lendário', icon: Zap, color: 'text-brazil-yellow' },
            { label: 'Artilheiro Seleção', val: '79 Gols', sub: 'Superou Pelé', icon: Star, color: 'text-brazil-green' },
            { label: 'Títulos Oficiais', val: '31 Taças', sub: 'Libertadores & UCL', icon: Trophy, color: 'text-amber-500' },
          ].map((stat, i) => (
            <div 
              key={i} 
              className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 hover:border-slate-700 hover:translate-y-[-4px] cursor-default"
            >
              <div className="p-3 bg-slate-900/60 rounded-xl mb-3 border border-slate-800">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">{stat.val}</span>
              <span className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">{stat.label}</span>
              <span className="text-[10px] text-slate-500 mt-0.5">{stat.sub}</span>
            </div>
          ))}
        </motion.div>

        {/* Floating custom badge overlay */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="mt-12 flex items-center gap-3 px-6 py-3 rounded-full bg-slate-900/80 border border-slate-800"
        >
          <span className="w-3.5 h-3.5 rounded-full bg-brazil-green animate-pulse" />
          <span className="text-sm font-medium text-slate-300">
            Neymar JR treina com determinação focado no retorno aos gramados! 🇧🇷 ⚽
          </span>
        </motion.div>
      </div>
    </section>
  );
}
