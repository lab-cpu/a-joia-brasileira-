import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, CheckCircle, XCircle, RotateCcw, Trophy, Award } from 'lucide-react';
import { QuizQuestion } from '../types';

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Qual foi o clube brasileiro onde Neymar Jr iniciou sua carreira profissional e foi revelado?',
    options: [
      'Flamengo',
      'São Paulo FC',
      'Santos FC',
      'Palmeiras'
    ],
    correctAnswer: 2, // Santos FC
    explanation: 'Neymar Jr estreou no profissional do Santos FC em 2009 com apenas 17 anos. Ele conquistou 6 títulos pelo clube, incluindo a inesquecível Copa Libertadores de 2011.'
  },
  {
    id: 2,
    question: 'Neymar Jr ultrapassou qual lenda do futebol para se tornar o maior artilheiro absoluto da Seleção Brasileira em jogos oficiais da FIFA?',
    options: [
      'Pelé',
      'Ronaldo Fenômeno',
      'Romário',
      'Zico'
    ],
    correctAnswer: 0, // Pelé
    explanation: 'Neymar Jr ultrapassou o lendário Rei Pelé na contagem oficial de gols da FIFA pela Seleção Brasileira Masculina, consolidando-se no topo da história canarinha.'
  },
  {
    id: 3,
    question: 'Em qual gigante europeu Neymar Jr formou o icônico trio de ataque "MSN" ao lado de Lionel Messi e Luis Suárez?',
    options: [
      'Paris Saint-Germain',
      'FC Barcelona',
      'Real Madrid',
      'Manchester United'
    ],
    correctAnswer: 1, // FC Barcelona
    explanation: 'No Barcelona, Neymar formou com Messi e Suárez o trio MSN, que marcou mais de 360 gols juntos e faturou a Champions League de 2015.'
  },
  {
    id: 4,
    question: 'Qual conquista inédita histórica Neymar Jr assegurou ao bater o último pênalti decisivo nos Jogos Olímpicos do Rio 2016?',
    options: [
      'Copa América',
      'Mundial Sub-20',
      'Medalha de Ouro Olímpica',
      'Superclássico das Américas'
    ],
    correctAnswer: 2, // Medalha de Ouro Olímpica
    explanation: 'Neymar JR marcou o gol de falta no tempo normal e converteu a última cobrança de pênalti contra a Alemanha, dando ao Brasil sua primeira medalha de ouro olímpica da história no futebol.'
  },
  {
    id: 5,
    question: 'Qual é o lema pessoal e profissional mais famoso de Neymar, que se tornou sua marca registrada mundial?',
    options: [
      'Foco, Força e Fé',
      'Ousadia e Alegria',
      'Determinação e Humildade',
      'Tudo passa, nada é eterno'
    ],
    correctAnswer: 1, // Ousadia e Alegria
    explanation: '"Ousadia e Alegria" define a essência do futebol arte de Neymar Jr. O lema ficou tão famoso que virou nome de música, campanhas publicitárias e está gravado na história do craque.'
  }
];

export default function TriviaQuiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleSelectOption = (optIdx: number) => {
    if (isAnswered) return;
    setSelectedOpt(optIdx);
  };

  const handleConfirmAnswer = () => {
    if (selectedOpt === null || isAnswered) return;
    
    const isCorrect = selectedOpt === QUESTIONS[currentIdx].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    setSelectedOpt(null);
    setIsAnswered(false);
    
    if (currentIdx + 1 < QUESTIONS.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  // Funny title based on score
  const getRating = (finalScore: number) => {
    if (finalScore <= 1) return { title: 'Perna de Pau 🪵', desc: 'Ih, errou feio! Precisa assistir mais vídeos do Ney de moicano no Santos para recuperar a ginga!' };
    if (finalScore <= 3) return { title: 'Driblador Amador 🏃‍♂️', desc: 'Bom começo, mas ainda falta aquela malícia do drible. Conhece o básico, mas dá para evoluir!' };
    if (finalScore === 4) return { title: 'Neymarzete Raiz ⚡', desc: 'Sensacional! Sabe muito sobre a história do craque. Ousadia pura no seu sangue!' };
    return { title: 'O Pai tá ON! 👑', desc: 'Lendário! Você sabe absolutamente tudo de Neymar JR! Certamente comemora com a dancinha do Ai se eu te pego!' };
  };

  const currentQuestion = QUESTIONS[currentIdx];

  return (
    <section id="quiz" className="py-24 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-brazil-green/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-brazil-yellow/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl w-full mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
            QUIZ DO <span className="text-transparent bg-clip-text bg-gradient-to-r from-brazil-yellow to-brazil-green">MENINO NEY</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto text-sm">
            Será que você é um fã de verdade? Teste seus conhecimentos sobre a carreira, gols icônicos e segredos do camisa 10 da Seleção Brasileira!
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-6 md:p-10 border border-slate-800/80 shadow-2xl">
          <AnimatePresence mode="wait">
            {!quizFinished ? (
              <motion.div
                key={currentIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Header: Progress Bar */}
                <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5 text-brazil-yellow">
                    <HelpCircle className="w-4 h-4" /> Pergunta {currentIdx + 1} de {QUESTIONS.length}
                  </span>
                  <span>Acertos: {score}</span>
                </div>

                {/* Progress Visual Tracker */}
                <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden p-[1px]">
                  <div 
                    className="h-full bg-gradient-to-r from-brazil-yellow to-brazil-green rounded-full transition-all duration-300" 
                    style={{ width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%` }}
                  />
                </div>

                {/* Question */}
                <h3 className="text-xl md:text-2xl font-extrabold text-white leading-snug">
                  {currentQuestion.question}
                </h3>

                {/* Options List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = selectedOpt === idx;
                    const isCorrect = idx === currentQuestion.correctAnswer;
                    
                    let cardClass = 'bg-slate-950/50 border-slate-800/60 text-slate-300 hover:border-slate-700 hover:bg-slate-900';
                    
                    if (isSelected) {
                      cardClass = 'bg-brazil-yellow/10 border-brazil-yellow text-brazil-yellow';
                    }
                    
                    if (isAnswered) {
                      if (isCorrect) {
                        cardClass = 'bg-emerald-500/10 border-emerald-500 text-emerald-400';
                      } else if (isSelected) {
                        cardClass = 'bg-rose-500/10 border-rose-500 text-rose-400';
                      } else {
                        cardClass = 'bg-slate-950/20 border-slate-900/60 text-slate-600 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        id={`option-${idx}`}
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(idx)}
                        className={`p-4 rounded-xl border text-left font-semibold text-sm transition-all duration-300 flex items-center justify-between gap-3 ${cardClass} ${!isAnswered ? 'cursor-pointer' : 'cursor-default'}`}
                      >
                        <span className="flex-1">{option}</span>
                        {isAnswered && isCorrect && <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />}
                        {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback explanation block */}
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs md:text-sm text-slate-400 leading-relaxed"
                  >
                    <span className="font-extrabold text-white block uppercase tracking-wider mb-1">
                      {selectedOpt === currentQuestion.correctAnswer ? '🎉 Resposta Correta!' : '❌ Ops! Resposta Incorreta.'}
                    </span>
                    {currentQuestion.explanation}
                  </motion.div>
                )}

                {/* Action Button */}
                <div className="flex justify-end pt-4">
                  {!isAnswered ? (
                    <button
                      id="confirm-answer"
                      disabled={selectedOpt === null}
                      onClick={handleConfirmAnswer}
                      className={`px-8 py-3.5 rounded-xl font-extrabold text-sm uppercase tracking-wider transition-all duration-300 ${
                        selectedOpt !== null
                          ? 'bg-gradient-to-r from-brazil-yellow to-gold text-slate-950 shadow-gold-neon cursor-pointer hover:scale-105'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-800'
                      }`}
                    >
                      Confirmar Resposta
                    </button>
                  ) : (
                    <button
                      id="next-question"
                      onClick={handleNextQuestion}
                      className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-brazil-green to-emerald-500 text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-green-neon transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                      {currentIdx + 1 === QUESTIONS.length ? 'Ver Resultado' : 'Próxima Pergunta'}
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6 py-6"
              >
                <div className="flex justify-center">
                  <div className="p-4 bg-brazil-yellow/10 border border-brazil-yellow/20 rounded-full animate-bounce">
                    <Trophy className="w-16 h-16 text-brazil-yellow drop-shadow-[0_0_10px_rgba(250,204,21,0.4)]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-3xl font-black uppercase text-white">Quiz Concluído!</h3>
                  <div className="text-6xl font-black text-brazil-yellow glow-text-gold tracking-tight">
                    {score} <span className="text-2xl text-slate-500">/ {QUESTIONS.length}</span>
                  </div>
                  <p className="text-xs uppercase font-extrabold text-brazil-green tracking-widest flex justify-center items-center gap-1">
                    <Award className="w-4 h-4" /> Classificação: {getRating(score).title}
                  </p>
                </div>

                <p className="text-slate-400 max-w-md mx-auto text-sm leading-relaxed">
                  {getRating(score).desc}
                </p>

                <div className="pt-4 flex justify-center">
                  <button
                    id="restart-quiz"
                    onClick={handleResetQuiz}
                    className="px-8 py-4 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-slate-700 font-bold text-sm text-white transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" /> Jogar Novamente
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
