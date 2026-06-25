import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Sparkles, BookOpen, ChevronRight, Play } from 'lucide-react';
import { SkillItem } from '../types';

const SKILLS: SkillItem[] = [
  {
    name: 'Carretilha (Rainbow Flick)',
    difficulty: 'Lendário',
    description: 'A assinatura de pura ousadia de Neymar Jr. Ele prende a bola entre os calcanhares e, num movimento contínuo e mágico, a projeta por cima da cabeça do marcador atônito.',
    howTo: 'Prenda a bola entre os pés. Use o calcanhar do pé de apoio para rolar a bola pela perna oposta. Com um leve coice do calcanhar livre, eleve a bola no ar fazendo uma parábola perfeita por cima do oponente.',
    visualPattern: 'M 10 90 Q 50 10 90 90' // beautiful curve path
  },
  {
    name: 'Elástico (The Flip-Flap)',
    difficulty: 'Difícil',
    description: 'Um drible desconcertante onde o corpo finge ir para um lado e a bola vai para o outro. Executado com extrema velocidade, quebra qualquer espinha dorsal de zagueiros.',
    howTo: 'Use a parte externa do pé para empurrar levemente a bola para fora, fingindo o drible. Num piscar de olhos, use a parte interna do mesmo pé para puxar a bola de volta para dentro, cortando o defensor.',
    visualPattern: 'M 10 50 Q 50 30 50 50 Q 50 70 90 50' // double turn path
  },
  {
    name: 'Chapeau (Sombrero Flick)',
    difficulty: 'Médio',
    description: 'Humilhação artística. Quando o zagueiro vem afobado, Ney aplica um leve toque por cima da cabeça do oponente, dando a volta nele pelo lado oposto para pegar a bola limpa.',
    howTo: 'Aguarde o adversário se aproximar correndo. Dê um leve toque de bico por baixo da bola, erguendo-a na altura do peito/cabeça do adversário. Contorne-o rapidamente enquanto a bola está no ar.',
    visualPattern: 'M 10 70 Q 50 20 90 70' // quick steep arch path
  },
  {
    name: 'Pedalada (Stepover)',
    difficulty: 'Fácil',
    description: 'A clássica ginga brasileira. Balançar o corpo passando as pernas ao redor da bola sem tocá-la, desestabilizando o ponto de gravidade do defensor e abrindo espaço.',
    howTo: 'Corra em direção ao marcador. Faça movimentos circulares com os pés em volta da bola de dentro para fora, alternando as pernas. Flexione os joelhos para vender o drible e arranque para o lado oposto.',
    visualPattern: 'M 20 30 C 50 30, 20 70, 50 70 C 80 70, 50 30, 80 30' // infinity loop feint path
  }
];

export default function SkillShowcase() {
  const [activeSkillIdx, setActiveSkillIdx] = useState<number | null>(null);

  return (
    <section id="skills" className="py-24 bg-slate-950 border-t border-slate-900 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 bg-brazil-green/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brazil-green/10 border border-brazil-green/20 text-brazil-green text-xs font-bold uppercase mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Futebol Arte</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase text-white">
            OS DRIBLES <span className="text-transparent bg-clip-text bg-gradient-to-r from-brazil-yellow to-brazil-green">LENDÁRIOS</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-sm">
            Neymar Jr é o sinônimo da finta plástica. Descubra os segredos por trás das jogadas que deixaram os melhores zagueiros do mundo sem rumo.
          </p>
        </div>

        {/* Grid of Dribbles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILLS.map((skill, index) => {
            const isShowingGuide = activeSkillIdx === index;
            const isLegendary = skill.difficulty === 'Lendário';
            const isHard = skill.difficulty === 'Difícil';
            
            return (
              <div 
                key={index}
                className="glass-panel p-6 rounded-3xl border border-slate-800/80 hover:border-slate-700/80 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">{skill.name}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                      isLegendary 
                        ? 'bg-rose-500/15 text-rose-400 border border-rose-500/20' 
                        : isHard 
                        ? 'bg-brazil-yellow/15 text-brazil-yellow border border-brazil-yellow/20' 
                        : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {skill.difficulty}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-6">
                    {skill.description}
                  </p>
                </div>

                {/* Interactive Simulation / Guide Panel */}
                <AnimatePresence>
                  {isShowingGuide && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden mb-6"
                    >
                      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-brazil-yellow uppercase tracking-wider">
                          <BookOpen className="w-4 h-4" />
                          <span>Como Executar o Movimento</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded-xl">
                          {skill.howTo}
                        </p>
                        
                        {/* Animated vector trajectory simulation */}
                        <div className="h-28 bg-slate-950 border border-slate-900 rounded-xl flex flex-col justify-between p-3 relative">
                          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold absolute top-2 left-3">Trajetória da Bola</span>
                          
                          <div className="w-full h-full flex items-center justify-center pt-4">
                            <svg className="w-full max-w-[280px] h-12 overflow-visible">
                              {/* Background path line */}
                              <path 
                                d={skill.visualPattern} 
                                fill="none" 
                                stroke="#1e293b" 
                                strokeWidth="3" 
                                strokeLinecap="round"
                              />
                              {/* Animated glowing path line */}
                              <motion.path 
                                d={skill.visualPattern} 
                                fill="none" 
                                stroke="#fbbf24" 
                                strokeWidth="3" 
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                              />
                              {/* Glowing ball symbol traversing the path */}
                              <motion.circle 
                                r="6" 
                                fill="#22c55e"
                                filter="drop-shadow(0px 0px 4px #22c55e)"
                                initial={{ offsetDistance: "0%" }}
                                animate={{ offsetDistance: "100%" }}
                                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                                style={{
                                  motionPath: `path('${skill.visualPattern}')`,
                                  offsetPath: `path('${skill.visualPattern}')`,
                                }}
                              />
                            </svg>
                          </div>

                          <div className="flex justify-between text-[8px] text-slate-500 font-bold uppercase tracking-widest">
                            <span>Toque Inicial</span>
                            <span>Drible Concluído</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Button Action */}
                <button
                  id={`skill-guide-btn-${index}`}
                  onClick={() => setActiveSkillIdx(isShowingGuide ? null : index)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isShowingGuide
                      ? 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
                      : 'bg-slate-900/40 border border-slate-800/80 text-slate-300 hover:border-slate-700/80 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  {isShowingGuide ? (
                    <>Fechar Guia</>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-slate-300" /> Veja o Passo a Passo
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
