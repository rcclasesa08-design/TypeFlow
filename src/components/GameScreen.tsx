import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTypingGame } from '../hooks/useTypingGame';
import TypingEngine from './TypingEngine';
import RaceTrack from './RaceTrack';
import Stats from './Stats';
import VirtualKeyboard from './VirtualKeyboard';
import { GameMode, Level, Language, Theme } from '../types';
import { RefreshCcw, ChevronLeft, Layout, Keyboard, Trophy, Zap, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UI_TRANSLATIONS } from '../constants/translations';

export default function GameScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const gameConfig = location.state;

  const { gameState, resetGame } = useTypingGame(gameConfig?.level || Level.BEGINNER);
  const [showKeyboard, setShowKeyboard] = useState(true);

  const t = UI_TRANSLATIONS[gameState.language];

  // Initialize game with config from state
  useEffect(() => {
    if (gameConfig) {
      resetGame(
        gameConfig.level, 
        gameConfig.mode, 
        gameConfig.language, 
        gameConfig.length, 
        gameConfig.avatar, 
        gameConfig.theme,
        gameConfig.effectsEnabled,
        gameConfig.customTopic
      );
    }
  }, [gameConfig, resetGame]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isLowTime = gameState.mode === GameMode.TIME_TRIAL && gameState.timeRemaining < 10 && gameState.timeRemaining > 0;
  const themeClass = gameState.theme === Theme.MARIO ? 'theme-mario' : 
                     gameState.theme === Theme.PACMAN ? 'theme-pacman' : 'theme-default';

  // Responsive scale factor to ensure everything fits
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      const width = window.innerWidth;
      // Target design height is around 900px
      const scaleH = Math.min(1, height / 850);
      const scaleW = Math.min(1, width / 700);
      setScale(Math.min(scaleH, scaleW));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`min-h-screen w-screen flex flex-col items-center bg-black p-2 md:p-8 overflow-hidden relative pixel-font ${themeClass}`}>
       {/* SCANLINES */}
       {gameState.effectsEnabled && <div className="scanlines" />}

       <AnimatePresence>
         {gameState.isGenerating && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/99 backdrop-blur-xl"
           >
             <div className="relative w-24 h-24 mb-8">
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                 className="absolute inset-0 border-4 border-brand/20 rounded-full"
               />
               <motion.div 
                 animate={{ rotate: -360 }}
                 transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                 className="absolute inset-2 border-4 border-correct/40 border-t-transparent rounded-full shadow-[0_0_15px_rgba(57,255,20,0.3)]"
               />
               <div className="absolute inset-0 flex items-center justify-center">
                 <Zap className="text-brand animate-pulse" size={32} />
               </div>
             </div>
             <p className="arcade-text text-xs text-brand animate-pixel-blink tracking-[0.2em]">
               {t.generating}
             </p>
           </motion.div>
         )}
       </AnimatePresence>

      <div 
        className="w-full max-w-6xl flex flex-col items-center flex-1"
        style={{ transform: scale < 1 ? `scale(${scale})` : 'none', transformOrigin: 'top center' }}
      >
        {/* Header */}
        <header className="w-full flex flex-col md:flex-row justify-between items-center z-20 mb-4 md:mb-10 gap-4 mt-2">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-correct hover:text-brand transition-colors text-[8px] md:text-[10px] font-black tracking-widest uppercase"
          >
            <ChevronLeft size={16} /> [ESC] {t.quit}
          </button>

          <div className="flex gap-8 md:gap-12 items-end">
            {/* Timer View */}
            <div className={`flex flex-col items-center md:items-end transition-all ${isLowTime ? 'scale-110' : ''}`}>
              <span className="text-[8px] md:text-[10px] uppercase opacity-40 tracking-[0.2em] font-black">
                {gameState.mode === GameMode.TIME_TRIAL ? 'Time Left' : 'Engine Uptime'}
              </span>
              <div className={`text-2xl md:text-4xl font-mono font-black ${isLowTime ? 'text-incorrect animate-pulse' : 'text-correct'}`}>
                {gameState.mode === GameMode.TIME_TRIAL ? formatTime(gameState.timeRemaining) : formatTime((gameState.startTime ? (gameState.endTime || Date.now()) - gameState.startTime : 0) / 1000)}
              </div>
            </div>
          </div>
        </header>

        {/* Main Viewport */}
        <main className="w-full max-w-5xl flex flex-col items-center justify-start z-10 gap-4 md:gap-8 min-h-0">
          <AnimatePresence mode="wait">
            {!gameState.isFinished ? (
              <motion.div
                layoutId="game-container"
                key="game"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full flex flex-col gap-4 md:gap-8"
              >
                {/* Header Stats */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end w-full max-w-4xl mx-auto mb-1 md:mb-4 border-b-4 border-double border-correct/20 pb-2 md:pb-8 gap-2">
                  <Stats gameState={gameState} />
                  
                  <div className="flex flex-col items-center md:items-end gap-1">
                    <div className="flex items-center gap-3">
                        <span className="text-[8px] md:text-[10px] uppercase font-black text-correct/30 tracking-widest leading-none">SCORE</span>
                        <span className="text-xl md:text-4xl font-black text-brand tracking-tighter leading-none decoration-double underline underline-offset-4 md:underline-offset-8">{gameState.score}</span>
                    </div>
                  </div>
                </div>

                {/* Race Track */}
                {gameState.mode === GameMode.RACE && (
                  <div className="px-4">
                    <RaceTrack 
                      userProgress={gameState.currentIndex / (gameState.targetText.length || 1)} 
                      ghostProgress={gameState.ghostProgress} 
                      theme={gameState.theme}
                    />
                  </div>
                )}
                
                {/* Central Engine with scrolling logic built-in to TypingEngine */}
                <div className="px-1 md:px-0">
                  <TypingEngine gameState={gameState} />
                </div>

                {/* UI Controls */}
                <div className="flex justify-center gap-4 md:gap-12 items-center">
                  <button 
                    onClick={() => setShowKeyboard(!showKeyboard)}
                    className={`flex items-center gap-2 px-4 md:px-8 py-2 md:py-4 border-4 transition-all ${showKeyboard ? 'bg-correct/10 retro-border text-correct shadow-[0_0_20px_rgba(57,255,20,0.2)]' : 'border-correct/10 text-correct/20 hover:text-correct'}`}
                  >
                    <Keyboard size={16} />
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest leading-none">GUIDE</span>
                  </button>

                  <button
                    onClick={() => resetGame()}
                    className="p-2 md:p-4 text-correct hover:text-brand transition-all bg-black border-4 retro-border hover:scale-110 active:rotate-180 duration-500"
                    title={`${t.restart} (Esc)`}
                  >
                    <RefreshCcw size={18} />
                  </button>
                </div>

                {showKeyboard && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="scale-50 sm:scale-75 md:scale-90 origin-top overflow-x-auto w-full flex justify-center mt-[-10px]"
                  >
                    <div className="min-w-fit">
                      <VirtualKeyboard currentKey={gameState.targetText[gameState.currentIndex] || ''} />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                layoutId="game-container"
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4 md:py-12 px-2 md:px-16 bg-black border-4 retro-border backdrop-blur-3xl relative max-w-4xl w-full mx-auto"
              >
                <div className="mb-4 md:mb-12 inline-flex items-center justify-center p-2 md:p-8 bg-correct/10 border-4 retro-border text-correct shadow-[0_0_60px_rgba(57,255,20,0.2)]">
                  <Trophy size={32} className="md:size-[80px] animate-pixel-blink" />
                </div>

                <h2 className="text-[8px] md:text-[12px] uppercase tracking-[0.2em] md:tracking-[0.8em] text-correct/40 mb-4 md:mb-12 font-black">{t.results}</h2>
                
                <div className="grid grid-cols-2 gap-4 md:gap-20 mb-4 md:mb-16">
                  <div>
                    <div className="text-3xl md:text-8xl font-black text-brand tracking-tighter mb-1 md:mb-4 drop-shadow-[0_0_40px_rgba(255,255,0,0.3)]">{gameState.wpm}</div>
                    <div className="text-[8px] md:text-[10px] uppercase tracking-[0.1em] md:tracking-[0.4em] text-correct/30 font-black">{t.wpm}</div>
                  </div>
                  <div>
                    <div className="text-3xl md:text-8xl font-black text-brand tracking-tighter mb-1 md:mb-4 drop-shadow-[0_0_40px_rgba(255,255,0,0.3)]">{gameState.accuracy}%</div>
                    <div className="text-[8px] md:text-[10px] uppercase tracking-[0.1em] md:tracking-[0.4em] text-correct/30 font-black">{t.accuracy}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8 mb-4 md:mb-16 px-2 md:px-12">
                  <div className="bg-correct/5 p-2 md:p-8 border-4 border-double border-correct/20 flex flex-col items-center justify-center group">
                      <span className="text-[6px] md:text-[8px] uppercase font-black text-correct/40 mb-1 tracking-widest">{t.score}</span>
                      <span className="text-2xl md:text-5xl font-black text-correct tracking-tighter"> {gameState.score}</span>
                  </div>
                  <div className="bg-correct/5 p-2 md:p-8 border-4 border-double border-correct/20 flex flex-col items-center justify-center group">
                      <span className="text-[6px] md:text-[8px] uppercase font-black text-correct/40 mb-1 tracking-widest">{t.combo}</span>
                      <span className="text-2xl md:text-5xl font-black text-correct tracking-tighter">{gameState.combo}</span>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4 md:gap-10">
                  {gameState.mode === GameMode.NORMAL && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => resetGame()}
                        className="group relative flex items-center gap-2 md:gap-4 px-6 md:px-16 py-3 md:py-6 bg-brand text-black font-black tracking-[0.1em] md:tracking-[0.4em] text-[8px] md:text-xs transition-all shadow-[0_0_40px_rgba(255,255,0,0.4)] mb-1"
                      >
                        <Zap size={16} className="group-hover:animate-pulse" />
                        {gameState.language === Language.SPANISH ? 'SIGUIENTE NIVEL' : 
                        gameState.language === Language.GERMAN ? 'NÄCHSTES LEVEL' :
                        gameState.language === Language.FRENCH ? 'NIVEAU SUIVANT' : 'NEXT LEVEL'}
                      </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => resetGame()}
                    className="group relative flex items-center gap-2 md:gap-6 px-6 md:px-16 py-4 md:py-8 bg-correct text-black font-black tracking-[0.1em] md:tracking-[0.4em] text-[8px] md:text-xs transition-all shadow-[0_0_40px_rgba(57,255,20,0.4)]"
                  >
                    <RefreshCcw size={18} className="group-hover:rotate-180 transition-transform duration-1000" />
                    {t.restartChallenge}
                  </motion.button>

                  <div className="flex flex-wrap justify-center gap-4 md:gap-12 text-[7px] md:text-[10px] text-correct/30 font-black uppercase tracking-[0.2em] md:tracking-[0.6em] pt-2">
                    <button onClick={() => navigate('/')} className="hover:text-correct transition-all">{t.mainMenu}</button>
                    <button onClick={() => navigate(-1)} className="hover:text-correct transition-all">{t.reconfigure}</button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      <footer className="mt-auto mb-4 text-[7px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.8em] text-dark/5 text-center z-20">
        TypeFlow • {t.engineStable} • {t.tip}
      </footer>
    </div>
  );
}

