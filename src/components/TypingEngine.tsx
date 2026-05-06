import { motion, AnimatePresence } from 'motion/react';
import React, { useMemo } from 'react';
import { GameState, Theme } from '../types';

interface TypingEngineProps {
  gameState: GameState;
}

const TypingEngine = React.memo(({ gameState }: TypingEngineProps) => {
  const { 
    targetText, userInput, currentIndex, multiplier, comboMultiplier, 
    theme, starModeActive, lives, energy, ghostDistance 
  } = gameState;

  const containerRef = React.useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = React.useState(0);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const isGlowing = multiplier >= 3 || comboMultiplier > 1 || starModeActive;

  // Responsive character density
  const charWidth = containerWidth < 600 ? 18 : 26;
  const focusPoint = containerWidth ? containerWidth * 0.3 : 150; 

  const getGhostIcon = (distance: number) => {
    if (distance > 75) return '💀';
    if (distance > 50) return '👾';
    return '👻';
  };

  const renderScrollingText = () => {
    return (
      <div className="relative w-full h-full overflow-hidden flex items-center">
        <motion.div
          className="flex items-center font-retro text-2xl whitespace-nowrap will-change-transform"
          animate={{ x: focusPoint - (currentIndex * charWidth) }}
          transition={{ type: 'spring', stiffness: 300, damping: 35, mass: 0.8 }}
          style={{ letterSpacing: containerWidth < 600 ? '2px' : '6px' }}
        >
          {targetText.split('').map((char, charIdx) => {
            const absoluteIndex = charIdx;
            let charColor = 'text-white/10';
            let isUppercase = char !== ' ' && char === char.toUpperCase() && /[A-Z]/.test(char);

            if (absoluteIndex < userInput.length) {
              if (userInput[absoluteIndex] === targetText[absoluteIndex]) {
                charColor = starModeActive ? 'star-glow-border' : (
                  theme === Theme.MARIO ? 'text-green-500' : 
                  theme === Theme.PACMAN ? 'text-neon-cyan' : 
                  'text-white'
                );
              } else {
                charColor = 'text-incorrect';
              }
            } else if (absoluteIndex === currentIndex) {
              charColor = isUppercase ? 'char-uppercase border-b-2 border-white bg-white/10' : 'text-white border-b-2 border-white/50';
            } else if (isUppercase) {
              charColor = 'char-uppercase opacity-60';
            } else {
               charColor = 'char-lowercase';
            }

            return (
              <span
                key={charIdx}
                style={{ width: `${charWidth}px` }}
                className={`relative inline-flex items-center justify-center transition-all duration-75 ${charColor} ${containerWidth < 600 ? 'text-lg' : 'text-2xl'}`}
              >
                {char === ' ' ? '\u00A0' : char}
                {absoluteIndex === currentIndex && (
                   <motion.div 
                     layoutId="cursor" 
                     className="absolute inset-0 border-2 border-brand bg-brand/10" 
                     transition={{ duration: 0.1 }}
                   />
                )}
              </span>
            );
          })}
        </motion.div>
      </div>
    );
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full max-w-5xl mx-auto min-h-[240px] md:h-[320px] flex items-center justify-center bg-black border-4 retro-border overflow-hidden transition-all duration-700 ${
        theme === Theme.MARIO ? 'theme-mario border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)]' : 
        theme === Theme.PACMAN ? 'theme-pacman border-neon-cyan shadow-[0_0_30px_rgba(0,228,255,0.2)]' : 
        'border-white/20'
      }`}
    >
      {gameState.effectsEnabled && <div className="scanlines" />}

      {/* STAR MODE DYNAMIC BACKGROUND ELEMENTS */}
      {starModeActive && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {theme === Theme.PACMAN && Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={`ghost-flee-${i}`}
              initial={{ x: '110%', y: `${20 + i * 20}%` }}
              animate={{ x: '-10%' }}
              transition={{ 
                duration: 2 + Math.random() * 2, 
                repeat: Infinity, 
                delay: i * 0.4,
                ease: 'linear'
              }}
              className="absolute text-4xl opacity-20 ghost-scared"
            >
              💠
            </motion.div>
          ))}
          {theme === Theme.MARIO && Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={`enemy-defeat-${i}`}
              initial={{ x: '110%', y: '70%', rotate: 0 }}
              animate={{ 
                x: '-10%', 
                y: ['70%', '50%', '90%'],
                rotate: 720
              }}
              transition={{ 
                duration: 3 + Math.random() * 2, 
                repeat: Infinity, 
                delay: i * 0.8,
                ease: 'linear'
              }}
              className="absolute text-3xl opacity-20"
            >
              {i % 2 === 0 ? '🐢' : '🍄'}
            </motion.div>
          ))}
        </div>
      )}

      {/* HUD: LIVES, ENERGY, STAR INDICATOR */}
      <div className="absolute top-2 left-2 md:top-6 md:left-8 z-50 flex flex-col gap-1 md:gap-3 scale-75 md:scale-100 origin-top-left">
         <div className="flex gap-2 md:gap-3 items-center">
           <div className="flex gap-1 md:gap-2 text-base md:text-xl items-center">
             {Array.from({ length: 3 }).map((_, i) => (
               <span key={i} className={i < lives ? (theme === Theme.MARIO ? 'text-red-500 drop-shadow-[0_0_5px_red]' : 'text-yellow-400 drop-shadow-[0_0_5px_yellow]') : 'opacity-10 grayscale'}>
                 {theme === Theme.MARIO ? '❤️' : '🟡'}
               </span>
             ))}
           </div>
           
           {/* STAR ICON FEEDBACK */}
           {starModeActive && (
             <motion.div 
               animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }}
               transition={{ duration: 0.5, repeat: Infinity }}
               className="text-lg md:text-2xl drop-shadow-[0_0_10px_yellow]"
             >
               ⭐
             </motion.div>
           )}
         </div>

         <div className="flex items-center gap-2 md:gap-3">
            <div className="w-24 md:w-48 h-2 md:h-4 bg-black border-2 border-white/20 p-0.5 relative overflow-hidden">
               <motion.div 
                 className={`h-full ${starModeActive ? 'bg-white' : 'bg-brand'}`}
                 animate={{ width: `${energy}%` }}
               />
               {starModeActive && <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] animate-[pulse_1s_infinite]" />}
            </div>
            {!starModeActive && (
              <span className="text-[5px] md:text-[8px] font-black tracking-widest text-white/30 uppercase">
                POW: {gameState.streak}/35
              </span>
            )}
         </div>
      </div>

      {/* MARIO COINS FEEDBACK */}
      <AnimatePresence>
        {theme === Theme.MARIO && currentIndex > 0 && 
         targetText[currentIndex - 1] === targetText[currentIndex - 1].toUpperCase() && 
         targetText[currentIndex - 1] !== ' ' && (
          <motion.div 
            key={`coin-${currentIndex}`}
            className="absolute top-1/4 left-1/2 z-[70] text-3xl coin-jump"
          >
            🪙
          </motion.div>
        )}
      </AnimatePresence>

      {/* SMOOTH SCROLLING TEXT AREA */}
      <div className="w-full h-full px-4 z-10">
        {renderScrollingText()}
      </div>

      {/* PAC-MAN GHOSTS - SIDE DECORATION */}
      {theme === Theme.PACMAN && !gameState.isFinished && (
        <>
          <motion.div 
            className={`absolute left-8 top-1/2 -translate-y-1/2 text-4xl ${starModeActive ? 'ghost-scared text-blue-500' : 'opacity-40 filter grayscale'}`}
            animate={{ scale: starModeActive ? 1.2 : 1, opacity: starModeActive ? 1 : 0.4 }}
          >
             {starModeActive ? '💠' : '👻'}
          </motion.div>
          <motion.div 
            className={`absolute right-8 top-1/2 -translate-y-1/2 text-4xl ${starModeActive ? 'ghost-scared text-blue-500' : 'opacity-40 filter grayscale'}`}
            animate={{ scale: starModeActive ? 1.2 : 1, opacity: starModeActive ? 1 : 0.4 }}
          >
             {starModeActive ? '💠' : '👾'}
          </motion.div>
          
          {/* MOVING GHOST INDICATOR AT BOTTOM */}
          <motion.div 
            className="absolute bottom-4 z-40 text-2xl"
            animate={{ left: `${ghostDistance}%` }}
            transition={{ type: 'spring', stiffness: 50, damping: 20 }}
          >
            {starModeActive ? '🧊' : getGhostIcon(ghostDistance)}
          </motion.div>
        </>
      )}

      {/* FINISH OVERLAY */}
      {currentIndex === targetText.length && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm"
        >
          <div className="text-brand font-retro text-2xl animate-pulse">
            GAME OVER - INSERT COIN
          </div>
        </motion.div>
      )}

      {/* COMBO MULTIPLIER POPUP */}
      {comboMultiplier > 1 && (
        <motion.div 
          initial={{ scale: 0, x: -50 }}
          animate={{ scale: 1, x: 0 }}
          className="absolute left-8 bottom-8 px-4 py-2 bg-black border-2 border-white/20 z-50 rounded-lg shadow-xl"
        >
          <div className={`font-black text-xs ${starModeActive ? 'star-mode-text' : 'text-brand'}`}>
             {starModeActive ? 'MAX POWER' : `COMBO X${comboMultiplier}`}
          </div>
        </motion.div>
      )}
      
      {/* STAR MODE TEXT */}
      <AnimatePresence>
        {starModeActive && (
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] text-3xl font-black star-mode-text pointer-events-none"
          >
            🌟 STAR POWER 🌟
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

TypingEngine.displayName = 'TypingEngine';
export default TypingEngine;
