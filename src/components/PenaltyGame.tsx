import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, RotateCcw, HelpCircle, Flame, Star } from 'lucide-react';

type Direction = 'left-high' | 'left-low' | 'center' | 'right-high' | 'right-low';
type ShotType = 'placement' | 'power' | 'panenka';

interface PenaltyState {
  score: number;
  attempts: number;
  streak: number;
  highScore: number;
  gameStatus: 'idle' | 'charging' | 'kicking' | 'result';
  selectedDirection: Direction | null;
  selectedShotType: ShotType;
  goalieAction: Direction;
  resultMessage: string;
  resultType: 'goal' | 'saved' | 'missed' | 'post';
  ballPosition: { x: number; y: number; scale: number; opacity: number };
  goaliePosition: { x: number; y: number; scale: number };
}

export default function PenaltyGame() {
  const [state, setState] = useState<PenaltyState>({
    score: 0,
    attempts: 0,
    streak: 0,
    highScore: 0,
    gameStatus: 'idle',
    selectedDirection: null,
    selectedShotType: 'placement',
    goalieAction: 'center',
    resultMessage: 'Escolha o canto e o estilo de batida para começar!',
    resultType: 'goal',
    ballPosition: { x: 0, y: 150, scale: 1, opacity: 1 },
    goaliePosition: { x: 0, y: 0, scale: 1 }
  });

  const [power, setPower] = useState(0);
  const [powerDirection, setPowerDirection] = useState<'up' | 'down'>('up');
  const powerInterval = useRef<NodeJS.Timeout | null>(null);

  // Load high score from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('ney_penalty_high_score');
    if (saved) {
      setState(prev => ({ ...prev, highScore: parseInt(saved, 10) }));
    }
  }, []);

  // Power bar animation loop when state is 'charging'
  useEffect(() => {
    if (state.gameStatus === 'charging') {
      powerInterval.current = setInterval(() => {
        setPower(prev => {
          if (powerDirection === 'up') {
            if (prev >= 100) {
              setPowerDirection('down');
              return 98;
            }
            return prev + 5;
          } else {
            if (prev <= 0) {
              setPowerDirection('up');
              return 2;
            }
            return prev - 5;
          }
        });
      }, 35);
    } else {
      if (powerInterval.current) {
        clearInterval(powerInterval.current);
      }
    }

    return () => {
      if (powerInterval.current) clearInterval(powerInterval.current);
    };
  }, [state.gameStatus, powerDirection]);

  const selectDirection = (dir: Direction) => {
    if (state.gameStatus !== 'idle') return;
    
    // Play a tiny electronic beep sound via Web Audio API
    playSynthesizedSound('click');

    setState(prev => ({
      ...prev,
      selectedDirection: dir
    }));
  };

  const selectShotType = (type: ShotType) => {
    if (state.gameStatus !== 'idle') return;
    playSynthesizedSound('click');
    setState(prev => ({
      ...prev,
      selectedShotType: type
    }));
  };

  const startCharge = () => {
    if (!state.selectedDirection || state.gameStatus !== 'idle') return;
    setPower(0);
    setPowerDirection('up');
    setState(prev => ({
      ...prev,
      gameStatus: 'charging'
    }));
  };

  // Helper to synthesize funny dynamic video-game sound effects using Web Audio API
  const playSynthesizedSound = (type: 'click' | 'whistle' | 'goal' | 'miss' | 'saved') => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      if (type === 'click') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === 'whistle') {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(1000, ctx.currentTime);
        osc1.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.15);
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(1020, ctx.currentTime);
        osc2.frequency.linearRampToValueAtTime(1220, ctx.currentTime + 0.15);
        
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);
        
        osc1.start();
        osc2.start();
        osc1.stop(ctx.currentTime + 0.35);
        osc2.stop(ctx.currentTime + 0.35);
      } else if (type === 'goal') {
        // High-pitched celebratory sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(330, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.3);
        osc.frequency.exponentialRampToValueAtTime(990, ctx.currentTime + 0.6);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.7);
      } else if (type === 'miss' || type === 'saved') {
        // Dull heavy bump sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(60, ctx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      }
    } catch (e) {
      // Audio context might be blocked or unsupported, fail silently
    }
  };

  const kickBall = () => {
    if (state.gameStatus !== 'charging' || !state.selectedDirection) return;

    playSynthesizedSound('whistle');

    const finalPower = power;
    const dir = state.selectedDirection;
    const style = state.selectedShotType;

    // AI Goalkeeper decision logic
    const directions: Direction[] = ['left-high', 'left-low', 'center', 'right-high', 'right-low'];
    // High-skilled goalies tend to jump, but sometimes stay in the center
    const goalieRoll = Math.random();
    let goalieDir: Direction = 'center';
    
    if (goalieRoll < 0.22) goalieDir = 'left-high';
    else if (goalieRoll < 0.44) goalieDir = 'left-low';
    else if (goalieRoll < 0.66) goalieDir = 'right-high';
    else if (goalieRoll < 0.88) goalieDir = 'right-low';
    else goalieDir = 'center';

    // Ball final coordinate simulation
    let destX = 0;
    let destY = -120;
    let destScale = 0.35;
    let destOpacity = 1;

    // Goalkeeper position offsets
    let goalieX = 0;
    let goalieY = 0;
    let goalieScale = 1.1;

    // Map targets to pixel coordinates
    if (dir === 'left-high') { destX = -130; destY = -160; }
    else if (dir === 'left-low') { destX = -130; destY = -70; }
    else if (dir === 'center') { destX = 0; destY = -100; }
    else if (dir === 'right-high') { destX = 130; destY = -160; }
    else if (dir === 'right-low') { destX = 130; destY = -70; }

    // Map goalie dive to coordinates
    if (goalieDir === 'left-high') { goalieX = -110; goalieY = -60; }
    else if (goalieDir === 'left-low') { goalieX = -110; goalieY = 10; }
    else if (goalieDir === 'center') { goalieX = 0; goalieY = -10; }
    else if (goalieDir === 'right-high') { goalieX = 110; goalieY = -60; }
    else if (goalieDir === 'right-low') { goalieX = 110; goalieY = 10; }

    // Determine shot outcome
    let resMsg = '';
    let resType: 'goal' | 'saved' | 'missed' | 'post' = 'goal';

    // 1. Check if the shot was overcharged/undercharged
    const isOverpowered = finalPower > 88;
    const isTooWeak = finalPower < 20;

    if (isOverpowered && style !== 'panenka') {
      // Overpowered shot flies OUT!
      resType = 'missed';
      destY = -240; // flies above the goal
      destX = destX * 1.3;
      resMsg = 'ISOLOU! O chute foi com muita força e subiu por cima do travessão! Parou na arquibancada!';
    } else if (isTooWeak) {
      // Weak shot is always saved by the keeper, or trickles slowly
      resType = 'saved';
      resMsg = 'DEFENDEU! O chute saiu fraco demais e facilitou muito a vida do goleiro.';
      // Adjust goalie to match the direction easily
      goalieX = destX * 0.7;
      goalieY = destY * 0.7;
    } else {
      // Standard power or panenka
      const isCornerMatch = goalieDir === dir;
      // adjacent areas are also easily guardable if power is not perfect
      const isAdjacent = 
        (dir.startsWith('left') && goalieDir.startsWith('left')) ||
        (dir.startsWith('right') && goalieDir.startsWith('right'));

      if (style === 'panenka') {
        destScale = 0.5; // floats in the air
        destY = destY - 20;
        
        if (goalieDir === 'center') {
          // Goalkeeper stayed still, catches easily!
          resType = 'saved';
          resMsg = 'PEGOOU! Cavadinha desastrosa! O goleiro nem se mexeu e encaixou a bola no peito!';
          goalieX = 0;
          goalieY = -20;
        } else {
          // Goalkeeper dived, so the cavadinha enters beautifully!
          resType = 'goal';
          resMsg = 'QUE COISA LINDA! Cavadinha mágica na bochecha da rede! O goleiro pulou e sobrou só a foto!';
        }
      } else if (style === 'power') {
        if (isCornerMatch) {
          // power shot has a chance to burst in anyway if power is near perfect (75-88)
          if (finalPower >= 75 && finalPower <= 87) {
            resType = 'goal';
            resMsg = 'GOLAÇO COM FORÇA! O goleiro acertou o canto, mas a bola foi uma bomba indefensável na gaveta!';
          } else {
            resType = 'saved';
            resMsg = 'DEFESAÇA! Uma pancada, mas o goleiro voou para espalmar de forma espetacular!';
          }
        } else if (isAdjacent && Math.random() < 0.4) {
          // adjacent can occasionally save power shots
          resType = 'saved';
          resMsg = 'SALVOU! O goleiro esticou o braço e desviou por milímetro!';
        } else {
          // Goal!
          resType = 'goal';
          resMsg = 'GOL DE PLACA! Pancada seca! A bola entrou rasgando a rede sem chance!';
        }
      } else {
        // placement shot
        if (isCornerMatch) {
          resType = 'saved';
          resMsg = 'DEFESA DO GOLEIRO! Chute colocado perfeito, mas o goleiro leu suas intenções e buscou no canto!';
        } else if (isAdjacent && Math.random() < 0.2) {
          resType = 'saved';
          resMsg = 'INCRÍVEL! O goleiro se recuperou e espalmou no limite!';
        } else {
          resType = 'goal';
          resMsg = 'GOLAAÇO! Batida com extrema categoria, tirando completamente do goleiro!';
        }
      }
    }

    // If it hit the post randomly (e.g. 5% chance if power is good)
    if (resType === 'goal' && Math.random() < 0.08 && style !== 'panenka') {
      resType = 'post';
      resMsg = 'NA TRAVE! A batida foi caprichosa demais, carimbou a trave e saiu!';
      // bounce ball away
      destX = destX * 1.08;
      destY = destY + 20;
    }

    // Trigger animation state
    setState(prev => ({
      ...prev,
      gameStatus: 'kicking',
      goalieAction: goalieDir,
      ballPosition: { x: destX, y: destY, scale: destScale, opacity: 1 },
      goaliePosition: { x: goalieX, y: goalieY, scale: goalieScale }
    }));

    // Wait for animation to finish, then show result
    setTimeout(() => {
      // Play outcome sound effect
      if (resType === 'goal') {
        playSynthesizedSound('goal');
      } else {
        playSynthesizedSound(resType === 'saved' ? 'saved' : 'miss');
      }

      setState(prev => {
        const newScore = resType === 'goal' ? prev.score + 1 : prev.score;
        const newAttempts = prev.attempts + 1;
        const newStreak = resType === 'goal' ? prev.streak + 1 : 0;
        const newHighScore = Math.max(prev.highScore, newStreak);

        // Save high score
        if (newHighScore > prev.highScore) {
          localStorage.setItem('ney_penalty_high_score', newHighScore.toString());
        }

        return {
          ...prev,
          score: newScore,
          attempts: newAttempts,
          streak: newStreak,
          highScore: newHighScore,
          gameStatus: 'result',
          resultMessage: resMsg,
          resultType: resType
        };
      });
    }, 1200);
  };

  const resetGame = () => {
    setState(prev => ({
      ...prev,
      gameStatus: 'idle',
      selectedDirection: null,
      selectedShotType: 'placement',
      ballPosition: { x: 0, y: 150, scale: 1, opacity: 1 },
      goaliePosition: { x: 0, y: 0, scale: 1 },
      resultMessage: 'Escolha outro canto e mostre que o pai tá on!'
    }));
    setPower(0);
  };

  const resetAllStats = () => {
    localStorage.removeItem('ney_penalty_high_score');
    setState(prev => ({
      ...prev,
      score: 0,
      attempts: 0,
      streak: 0,
      highScore: 0,
      gameStatus: 'idle',
      selectedDirection: null,
      selectedShotType: 'placement',
      ballPosition: { x: 0, y: 150, scale: 1, opacity: 1 },
      goaliePosition: { x: 0, y: 0, scale: 1 },
      resultMessage: 'Estatísticas reiniciadas! Boa sorte na marca do cal!'
    }));
    setPower(0);
  };

  // Dynamic help tags depending on selected style
  const getStyleTip = () => {
    switch (state.selectedShotType) {
      case 'placement':
        return 'Colocado: Excelente precisão. Menor risco de isolar. Fácil controle da barra de força.';
      case 'power':
        return 'Pancada: Chute super veloz. Se acertar o tempo na barra verde, entra mesmo se o goleiro acertar o canto!';
      case 'panenka':
        return 'Cavadinha: Extrema ousadia! Gol garantido se o goleiro pular para as laterais, mas vergonha total se ele ficar parado.';
    }
  };

  return (
    <section id="penalty-game" className="py-24 bg-slate-950 relative overflow-hidden text-white border-t border-slate-900">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brazil-yellow/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl w-full mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }} 
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brazil-yellow/10 border border-brazil-yellow/20 text-brazil-yellow text-xs font-bold uppercase mb-4"
          >
            <Flame className="w-3.5 h-3.5 fill-brazil-yellow" />
            <span>Mini-Game Interativo</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-black uppercase">
            Pênalti do <span className="text-transparent bg-clip-text bg-gradient-to-r from-brazil-yellow to-brazil-green">Neymar JR</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm max-w-xl mx-auto">
            Você é o batedor oficial do Hexa! Escolha o canto, calibre a força da ginga e chute para o fundo das redes. O pai tá on?
          </p>
        </div>

        {/* Scoreboard and Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Gols Convertidos</span>
            <span className="text-3xl font-black text-brazil-yellow">{state.score} <span className="text-sm text-slate-500">/ {state.attempts}</span></span>
          </div>
          
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Aproveitamento</span>
            <span className="text-3xl font-black text-white">
              {state.attempts > 0 ? `${Math.round((state.score / state.attempts) * 100)}%` : '0%'}
            </span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center flex flex-col justify-center items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" /> Sequência Atual
            </span>
            <span className="text-3xl font-black text-emerald-400">{state.streak}</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center flex flex-col justify-center items-center relative group">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Recorde de Streak</span>
            <span className="text-3xl font-black text-brazil-yellow">{state.highScore}</span>
            {state.highScore > 0 && (
              <button 
                onClick={resetAllStats}
                className="absolute top-1 right-2 opacity-0 group-hover:opacity-100 text-[10px] text-rose-500 hover:underline transition-opacity"
              >
                Resetar
              </button>
            )}
          </div>
        </div>

        {/* The Football Goal Field Stage */}
        <div className="relative w-full aspect-[16/9] md:aspect-[2.1/1] bg-gradient-to-b from-slate-950 via-emerald-950 to-green-900 rounded-3xl overflow-hidden border border-emerald-800/60 shadow-inner flex flex-col items-center justify-between p-4 md:p-8">
          
          {/* Goal post drawing */}
          <div className="relative w-full max-w-[500px] h-full flex flex-col justify-end mt-4">
            
            {/* Net Structure */}
            <div className="absolute top-[35px] inset-x-[50px] bottom-0 border-t-4 border-x-4 border-white/90 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:10px_10px] rounded-t-md">
              
              {/* Target Aiming Hotspots in the Net */}
              {state.gameStatus === 'idle' && (
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 p-2 gap-2 z-30">
                  {/* Left High */}
                  <button 
                    id="aim-left-high"
                    onClick={() => selectDirection('left-high')}
                    className={`rounded-lg border-2 border-dashed flex items-center justify-center transition-all ${
                      state.selectedDirection === 'left-high' 
                        ? 'border-brazil-yellow bg-brazil-yellow/20 text-brazil-yellow font-bold text-xs' 
                        : 'border-white/15 bg-slate-900/30 hover:border-white/50 text-[10px] text-white/50'
                    }`}
                  >
                    Gaveta Esquerda
                  </button>

                  {/* Center High is unused but mapped to center generally */}
                  <button 
                    id="aim-center"
                    onClick={() => selectDirection('center')}
                    className={`rounded-lg border-2 border-dashed flex items-center justify-center transition-all col-span-1 row-span-2 ${
                      state.selectedDirection === 'center' 
                        ? 'border-brazil-yellow bg-brazil-yellow/20 text-brazil-yellow font-bold text-xs' 
                        : 'border-white/15 bg-slate-900/30 hover:border-white/50 text-[10px] text-white/50'
                    }`}
                  >
                    Meio do Gol
                  </button>

                  {/* Right High */}
                  <button 
                    id="aim-right-high"
                    onClick={() => selectDirection('right-high')}
                    className={`rounded-lg border-2 border-dashed flex items-center justify-center transition-all ${
                      state.selectedDirection === 'right-high' 
                        ? 'border-brazil-yellow bg-brazil-yellow/20 text-brazil-yellow font-bold text-xs' 
                        : 'border-white/15 bg-slate-900/30 hover:border-white/50 text-[10px] text-white/50'
                    }`}
                  >
                    Gaveta Direita
                  </button>

                  {/* Left Low */}
                  <button 
                    id="aim-left-low"
                    onClick={() => selectDirection('left-low')}
                    className={`rounded-lg border-2 border-dashed flex items-center justify-center transition-all ${
                      state.selectedDirection === 'left-low' 
                        ? 'border-brazil-yellow bg-brazil-yellow/20 text-brazil-yellow font-bold text-xs' 
                        : 'border-white/15 bg-slate-900/30 hover:border-white/50 text-[10px] text-white/50'
                    }`}
                  >
                    Canto Esquerdo
                  </button>

                  {/* Right Low */}
                  <button 
                    id="aim-right-low"
                    onClick={() => selectDirection('right-low')}
                    className={`rounded-lg border-2 border-dashed flex items-center justify-center transition-all ${
                      state.selectedDirection === 'right-low' 
                        ? 'border-brazil-yellow bg-brazil-yellow/20 text-brazil-yellow font-bold text-xs' 
                        : 'border-white/15 bg-slate-900/30 hover:border-white/50 text-[10px] text-white/50'
                    }`}
                  >
                    Canto Direito
                  </button>
                </div>
              )}
            </div>

            {/* Goalkeeper element */}
            <motion.div
              id="goalkeeper"
              animate={{ 
                x: state.goaliePosition.x, 
                y: state.goaliePosition.y,
                scale: state.goaliePosition.scale,
                rotate: state.gameStatus === 'kicking' || state.gameStatus === 'result'
                  ? (state.goalieAction.startsWith('left') ? -65 : state.goalieAction.startsWith('right') ? 65 : 0)
                  : 0
              }}
              transition={{ type: 'spring', stiffness: 100, damping: 10 }}
              className="absolute left-1/2 bottom-0 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center justify-end h-[95px]"
            >
              {/* Goalkeeper body representation */}
              <div className="relative flex flex-col items-center">
                {/* Hands */}
                <div className="absolute top-0 flex justify-between w-24">
                  <div className="w-4 h-10 bg-rose-600 rounded-full origin-bottom rotate-[-30deg]" />
                  <div className="w-4 h-10 bg-rose-600 rounded-full origin-bottom rotate-[30deg]" />
                </div>
                {/* Head */}
                <div className="w-6 h-6 rounded-full bg-amber-200 border-2 border-rose-950 flex items-center justify-center text-[7px] font-bold text-slate-900 relative z-10">
                  🧤
                </div>
                {/* Torso/Jersey */}
                <div className="w-10 h-14 bg-rose-600 border border-slate-900 rounded-t-xl relative z-10 flex items-center justify-center text-[9px] font-bold text-white">
                  GK
                </div>
                {/* Shorts */}
                <div className="w-10 h-4 bg-slate-900 rounded-b-md" />
                {/* Legs */}
                <div className="flex gap-4 w-8 justify-center">
                  <div className="w-2 h-8 bg-slate-800" />
                  <div className="w-2 h-8 bg-slate-800" />
                </div>
              </div>
            </motion.div>

            {/* Penalty Spot and Soccer Ball */}
            <div className="absolute bottom-[2px] left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
              {/* Spot white point */}
              <div className="w-3.5 h-1.5 rounded-full bg-white/50 opacity-80 mb-4" />
              
              {/* Soccer Ball */}
              <motion.div
                id="soccer-ball"
                animate={{
                  x: state.ballPosition.x,
                  y: state.ballPosition.y,
                  scale: state.ballPosition.scale,
                  opacity: state.ballPosition.opacity,
                  rotate: state.gameStatus === 'kicking' ? 720 : 0
                }}
                transition={{ duration: state.gameStatus === 'kicking' ? 0.9 : 0 }}
                className="w-10 h-10 rounded-full bg-white border border-slate-950 flex items-center justify-center text-xl select-none shadow-md"
                style={{
                  backgroundImage: 'radial-gradient(circle at 30% 30%, #fff 40%, #ddd 70%, #999 100%)',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                }}
              >
                ⚽
              </motion.div>
            </div>

            {/* Confetti simulation when scoring */}
            <AnimatePresence>
              {state.gameStatus === 'result' && state.resultType === 'goal' && (
                <div className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center overflow-hidden">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ 
                        opacity: 1, 
                        scale: Math.random() * 0.5 + 0.5,
                        x: 0, 
                        y: -80,
                        rotate: 0 
                      }}
                      animate={{ 
                        opacity: 0,
                        scale: 0.1,
                        x: (Math.random() - 0.5) * 350,
                        y: -180 + (Math.random() - 0.5) * 100,
                        rotate: Math.random() * 360 
                      }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      className={`w-3.5 h-3.5 rounded-sm absolute ${
                        i % 3 === 0 ? 'bg-brazil-yellow' : i % 3 === 1 ? 'bg-brazil-green' : 'bg-brazil-blue'
                      }`}
                    />
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Goal post bottom turf text/overly */}
          <div className="w-full text-center py-2 z-10 bg-slate-900/70 border border-slate-800/50 rounded-xl px-4 mt-2">
            <span className={`text-xs md:text-sm font-bold ${
              state.resultType === 'goal' && state.gameStatus === 'result' ? 'text-brazil-yellow glow-text-gold' : 'text-slate-300'
            }`}>
              {state.resultMessage}
            </span>
          </div>
        </div>

        {/* Shoot controls panel */}
        <div className="mt-6 p-6 rounded-2xl bg-slate-900 border border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Shot type selectors */}
          <div className="md:col-span-5 space-y-3">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Estilo da Cobrança</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { type: 'placement', label: 'Colocado', emoji: '🎯' },
                { type: 'power', label: 'Bomba', emoji: '🚀' },
                { type: 'panenka', label: 'Cavadinha', emoji: '🥄' }
              ].map((item) => (
                <button
                  key={item.type}
                  id={`shoot-${item.type}`}
                  disabled={state.gameStatus !== 'idle'}
                  onClick={() => selectShotType(item.type as ShotType)}
                  className={`py-2 px-1 rounded-lg text-xs font-black transition-all flex flex-col items-center justify-center gap-1 border ${
                    state.selectedShotType === item.type
                      ? 'bg-gradient-to-b from-brazil-yellow to-gold text-slate-950 border-brazil-yellow'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 disabled:opacity-50'
                  }`}
                >
                  <span className="text-base">{item.emoji}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 italic font-medium leading-normal min-h-[30px]">
              {getStyleTip()}
            </p>
          </div>

          {/* Power controller */}
          <div className="md:col-span-4 flex flex-col justify-center space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Barra de Força</label>
              <span className={`text-xs font-extrabold ${
                power > 88 ? 'text-rose-500' : power > 60 ? 'text-brazil-yellow' : 'text-emerald-400'
              }`}>{power}%</span>
            </div>

            {/* Power bar graphic */}
            <div className="w-full h-5 bg-slate-950 border border-slate-800 rounded-lg overflow-hidden p-[2px] relative">
              <div 
                className="h-full rounded-md transition-all duration-75 bg-gradient-to-r from-emerald-500 via-brazil-yellow to-rose-600"
                style={{ width: `${power}%` }}
              />
              {/* Perfect spot indicator line (around 65% - 85%) */}
              <div className="absolute top-0 bottom-0 left-[65%] right-[15%] border-x border-white/40 bg-white/10 flex items-center justify-center">
                <span className="text-[7px] text-white/70 font-bold tracking-tighter uppercase select-none pointer-events-none">PERFEITO</span>
              </div>
            </div>

            <span className="text-[9px] text-slate-500 block text-center">
              Pressione Chutar para oscilar e clique novamente para Travar e Chutar!
            </span>
          </div>

          {/* Big action button */}
          <div className="md:col-span-3 flex flex-col justify-center items-center">
            {state.gameStatus === 'idle' && (
              <button
                id="kick-button"
                disabled={!state.selectedDirection}
                onClick={startCharge}
                className={`w-full py-4 rounded-xl font-black text-center text-sm uppercase tracking-wider transition-all duration-300 ${
                  state.selectedDirection
                    ? 'bg-gradient-to-r from-brazil-green to-emerald-500 text-slate-950 hover:scale-105 shadow-green-neon cursor-pointer'
                    : 'bg-slate-800 text-slate-500 border border-slate-800 cursor-not-allowed'
                }`}
              >
                {!state.selectedDirection ? 'Escolha o Canto' : 'Preparar Chute'}
              </button>
            )}

            {state.gameStatus === 'charging' && (
              <button
                id="lock-kick-button"
                onClick={kickBall}
                className="w-full py-4 rounded-xl bg-rose-600 text-white font-black text-center text-sm uppercase tracking-wider hover:bg-rose-500 shadow-lg cursor-pointer"
              >
                🔴 TRAVAR E CHUTAR!
              </button>
            )}

            {(state.gameStatus === 'kicking' || state.gameStatus === 'result') && (
              <button
                id="reset-kick-button"
                disabled={state.gameStatus === 'kicking'}
                onClick={resetGame}
                className="w-full py-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 font-extrabold text-sm uppercase flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <RotateCcw className="w-4 h-4" /> Cobrar Outro
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
