import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Calendar, Sparkles, Activity, ShieldAlert } from 'lucide-react';
import { ClubData } from '../types';

const CLUBS: ClubData[] = [
  {
    id: 'santos',
    name: 'Santos FC',
    period: '2009 - 2013',
    goals: 136,
    assists: 48,
    appearances: 225,
    trophies: [
      'Copa Libertadores 2011',
      'Copa do Brasil 2010',
      'Recopa Sul-Americana 2012',
      'Tri-Campeonato Paulista (10, 11, 12)'
    ],
    description: 'Onde tudo começou. Cabelo moicano, dancinhas inesquecíveis, ousadia e dribles humilhantes de encher os olhos. Conquistou a lendária Libertadores de 2011 após 48 anos de jejum do clube paulista, com apenas 19 anos de idade.',
    accentClass: 'border-slate-400 text-slate-300',
    bgGradient: 'from-slate-950 via-zinc-900 to-slate-950',
    logo: '⚪⚫'
  },
  {
    id: 'barca',
    name: 'FC Barcelona',
    period: '2013 - 2017',
    goals: 105,
    assists: 76,
    appearances: 186,
    trophies: [
      'Champions League 2014-15',
      'Mundial de Clubes da FIFA 2015',
      'La Liga (2014-15, 2015-16)',
      'Copa del Rey (3x)',
      'Supercopa da UEFA 2015'
    ],
    description: 'O auge na Europa. Juntou-se a Lionel Messi e Luis Suárez para formar o MSN, considerado o trio de ataque mais devastador da história do futebol moderno. Brilhou intensamente na virada mágica de 6x1 contra o PSG e foi peça-chave na Tríplice Coroa de 2015.',
    accentClass: 'border-rose-500 text-rose-400',
    bgGradient: 'from-blue-950 via-slate-950 to-rose-950',
    logo: '🔵🔴'
  },
  {
    id: 'psg',
    name: 'Paris Saint-Germain',
    period: '2017 - 2023',
    goals: 118,
    assists: 77,
    appearances: 173,
    trophies: [
      'Ligue 1 Francesa (5x)',
      'Copa da França (3x)',
      'Copa da Liga Francesa (2x)',
      'Finalista UEFA Champions League 2020'
    ],
    description: 'A transferência mais cara da história do futebol (€222M). No PSG, tornou-se o grande maestro, comandando lances plásticos de puro talento. Liderou a equipe parisiense na campanha histórica que culminou em sua primeira final de Champions League em 2020.',
    accentClass: 'border-indigo-500 text-indigo-400',
    bgGradient: 'from-slate-950 via-indigo-950 to-slate-950',
    logo: '🗼🔵'
  },
  {
    id: 'hilal',
    name: 'Al-Hilal FC',
    period: '2023 - Presente',
    goals: 1,
    assists: 3,
    appearances: 5,
    trophies: [
      'Saudi Pro League 2023-24',
      'Saudi Super Cup 2023'
    ],
    description: 'Novo desafio no futebol asiático como principal estrela do gigante saudita Al-Hilal. Apesar de um período difícil devido a lesões no joelho, Neymar continua focado em sua plena recuperação física para voltar a dominar os gramados com seu futebol alegre.',
    accentClass: 'border-cyan-400 text-cyan-400',
    bgGradient: 'from-slate-950 via-cyan-950/40 to-slate-950',
    logo: '🦅🔵'
  },
  {
    id: 'selecao',
    name: 'Seleção Brasileira',
    period: '2010 - Presente',
    goals: 79,
    assists: 59,
    appearances: 128,
    trophies: [
      'Inédito Ouro Olímpico Rio 2016',
      'Copa das Confederações 2013',
      'Superclássico das Américas (4x)'
    ],
    description: 'O maior artilheiro da história da mística amarelinha. Neymar assumiu a lendária camisa 10 e se tornou a referência de uma geração. Decidiu a inédita medalha de ouro olímpica cobrando o pênalti final no Maracanã e ultrapassou a marca histórica de gols do Rei Pelé em jogos oficiais pela FIFA.',
    accentClass: 'border-emerald-400 text-emerald-400',
    bgGradient: 'from-slate-950 via-emerald-950/50 to-slate-950',
    logo: '🇧🇷⚽'
  }
];

export default function CareerTimeline() {
  const [activeClub, setActiveClub] = useState<string>('santos');
  const currentData = CLUBS.find(c => c.id === activeClub) || CLUBS[0];

  return (
    <section id="career" className="py-24 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-brazil-yellow/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brazil-green/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
            A TRAJETÓRIA DO <span className="text-transparent bg-clip-text bg-gradient-to-r from-brazil-yellow to-brazil-green">CRAQUE</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Explore as eras de glória de Neymar Jr, passando pelos clubes que moldaram sua lenda até se tornar o artilheiro soberano do Brasil.
          </p>
        </div>

        {/* Club Tabs Switcher */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {CLUBS.map((club) => {
            const isActive = club.id === activeClub;
            return (
              <button
                key={club.id}
                id={`tab-${club.id}`}
                onClick={() => setActiveClub(club.id)}
                className={`px-5 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2 border ${
                  isActive
                    ? 'bg-gradient-to-r from-slate-800 to-slate-900 text-white border-slate-700 shadow-md scale-105'
                    : 'bg-slate-900/40 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <span className="text-lg">{club.logo}</span>
                <span>{club.name}</span>
              </button>
            );
          })}
        </div>

        {/* Career Showcase Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeClub}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className={`rounded-3xl p-6 md:p-10 bg-gradient-to-b ${currentData.bgGradient} border border-slate-800 shadow-2xl relative`}
          >
            {/* Visual Club Accent Line */}
            <div className="absolute top-0 inset-x-10 h-[2px] bg-gradient-to-r from-transparent via-current to-transparent" style={{ color: activeClub === 'santos' ? '#e2e8f0' : activeClub === 'barca' ? '#f43f5e' : activeClub === 'psg' ? '#6366f1' : activeClub === 'hilal' ? '#22d3ee' : '#34d399' }} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Info: Name, Period, Stats */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-slate-400 text-sm font-semibold tracking-wider uppercase mb-2">
                    <Calendar className="w-4 h-4 text-brazil-yellow" />
                    <span>{currentData.period}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white">{currentData.name}</h3>
                </div>

                <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                  {currentData.description}
                </p>

                {/* Individual Club Stats Counter */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80">
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-center">
                    <div className="text-2xl font-black text-white">{currentData.appearances}</div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mt-1">Jogos</div>
                  </div>
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-center">
                    <div className="text-2xl font-black text-brazil-yellow">{currentData.goals}</div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mt-1">Gols</div>
                  </div>
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-center">
                    <div className="text-2xl font-black text-emerald-400">{currentData.assists}</div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mt-1">Assist.</div>
                  </div>
                </div>
              </div>

              {/* Right Info: Trophies Shelf & Interactive Medal Banner */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800/80">
                  <div className="flex items-center gap-2 text-brazil-yellow mb-4">
                    <Trophy className="w-5 h-5 fill-brazil-yellow/20" />
                    <h4 className="text-sm font-extrabold uppercase tracking-wider text-white">Galeria de Títulos Oficiais</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentData.trophies.map((trophy, index) => (
                      <div 
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/40 border border-slate-800/60 transition-all hover:bg-slate-900"
                      >
                        <span className="text-xl">🏆</span>
                        <div>
                          <p className="text-xs font-bold text-slate-100">{trophy}</p>
                          <span className="text-[9px] uppercase tracking-wider text-brazil-yellow font-medium">CAMPEÃO</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Quote / Insight */}
                <div className="flex items-center gap-4 bg-slate-900/40 border border-slate-800/60 p-4 rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-brazil-yellow/10 border border-brazil-yellow/20 flex items-center justify-center shrink-0">
                    <Sparkles className="w-6 h-6 text-brazil-yellow" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-brazil-yellow tracking-widest">Ousadia Memorável</span>
                    <p className="text-xs text-slate-400 italic">
                      {activeClub === 'santos' && '"Ninguém joga por ele, mas ele decide o espetáculo sozinho com dribles divinos."'}
                      {activeClub === 'barca' && '"A memorável noite de 2017: Barcelona 6x1 PSG foi a maior atuação individual do Ney na Europa."'}
                      {activeClub === 'psg' && '"Ao atingir a final da Champions de 2020 em Portugal, Ney provou ser o motor criativo da Europa."'}
                      {activeClub === 'hilal' && '"Foco absoluto: O Rei da Ousadia se prepara para retornar ainda mais iluminado."'}
                      {activeClub === 'selecao' && '"O único brasileiro a se sagrar maior artilheiro isolado oficial da mítica camisa amarela!"'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
