import { motion } from 'motion/react';
import { Theme } from '../types';

interface RaceTrackProps {
  userProgress: number;
  ghostProgress: number;
  theme: Theme;
}

export default function RaceTrack({ userProgress, ghostProgress, theme }: RaceTrackProps) {
  const isMario = theme === Theme.MARIO;

  return (
    <div className="w-full max-w-4xl mx-auto h-24 relative bg-black border-4 retro-border overflow-hidden mb-8">
      {/* SCANLINES */}
      <div className="scanlines" />

      {/* Grid line */}
      <div className="absolute bottom-6 left-0 w-full h-1 bg-correct/20" />
      
      {/* Ghost/AI Progress */}
      <motion.div 
        className="absolute bottom-6 z-20 flex flex-col items-center"
        animate={{ left: `${ghostProgress * 95}%` }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
      >
        <div className="text-3xl filter drop-shadow-[0_0_8px_rgba(255,0,0,0.5)]">
          {isMario ? '🐢' : '👻'}
        </div>
        <div className="text-[8px] font-black text-incorrect/50 uppercase mt-1">RIVAL</div>
      </motion.div>

      {/* User Progress */}
      <motion.div 
        className="absolute bottom-6 z-30 flex flex-col items-center"
        animate={{ left: `${userProgress * 95}%` }}
        transition={{ type: 'spring', stiffness: 100, damping: 25 }}
      >
        <div className="text-3xl filter drop-shadow-[0_0_8px_var(--theme-bright)]">
          {isMario ? '🏃' : '🟡'}
        </div>
        <div className="text-[8px] font-black text-correct uppercase mt-1">YOU</div>
      </motion.div>

      {/* Finish Line */}
      <div className="absolute right-0 top-0 bottom-0 w-4 bg-[repeating-linear-gradient(45deg,#000,#000_4px,var(--theme-correct)_4px,var(--theme-correct)_8px)] opacity-50" />
    </div>
  );
}
