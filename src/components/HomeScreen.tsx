import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Play, Trophy, Settings, Zap, Languages } from 'lucide-react';
import { Language, Theme } from '../types';
import { UI_TRANSLATIONS } from '../constants/translations';
import { useState, useEffect } from 'react';

export default function HomeScreen() {
  const navigate = useNavigate();
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem('typeflow_lang') as Language) || Language.ENGLISH;
  });

  const t = UI_TRANSLATIONS[lang];

  useEffect(() => {
    localStorage.setItem('typeflow_lang', lang);
  }, [lang]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'e') navigate('/config/training');
      if (e.key.toLowerCase() === 'r') navigate('/config/race');
      if (e.key.toLowerCase() === 'c') navigate('/config/timer');
      if (e.key.toLowerCase() === 's') navigate('/settings');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const menuItems = [
    { 
      label: t.marioTitle, 
      path: '/config/timer', 
      theme: Theme.MARIO,
      icon: '🪙', 
      desc: t.marioDesc,
      key: 'M',
      color: 'border-red-600 cartridge-glow-red text-red-500'
    },
    { 
      label: t.pacmanTitle, 
      path: '/config/race', 
      theme: Theme.PACMAN,
      icon: '👻', 
      desc: t.pacmanDesc,
      key: 'P',
      color: 'border-blue-600 cartridge-glow-blue text-blue-500'
    },
    { 
      label: t.trainingTitle, 
      path: '/config/training', 
      theme: Theme.NONE,
      icon: '⌨️', 
      desc: t.trainingDesc,
      key: 'T',
      color: 'border-white cartridge-glow-white text-white/80'
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 bg-black overflow-x-hidden overflow-y-auto">
      <div className="scanlines" />

      {/* Language Selector */}
      <div className="md:absolute top-8 right-8 flex gap-4 items-center bg-black/80 p-2 border-2 border-white/10 z-50 rounded mb-8 md:mb-0">
        <Languages size={14} className="text-brand ml-2" />
        <div className="flex gap-2 pr-2">
          {Object.values(Language).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-2 py-1 arcade-text text-[8px] transition-all ${
                lang === l ? 'text-brand underline underline-offset-4' : 'text-white/20 hover:text-white/50'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-8 md:mb-16 relative"
      >
        <div className="absolute -top-8 md:-top-12 left-1/2 -translate-x-1/2 arcade-text text-[8px] md:text-[10px] text-white/20 tracking-[0.6em] md:tracking-[1em] whitespace-nowrap">
           CREDITS 02
        </div>
        <h1 className="text-4xl md:text-7xl arcade-text text-brand mb-4 drop-shadow-[0_0_20px_var(--theme-bright)]">
          TYPEFLOW
        </h1>
        <div className="arcade-text text-[6px] md:text-[8px] text-white/40 tracking-[0.4em] md:tracking-[0.6em]">
           ARCADE MULTI-GAME SYSTEM
        </div>
      </motion.div>

      <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6 md:gap-8 w-full max-w-6xl z-10 px-4">
        {menuItems.map((item, i) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(item.path, { state: { theme: item.theme } })}
            className={`group w-full md:w-72 h-64 md:h-96 arcade-button bg-black/40 backdrop-blur-sm flex flex-col md:flex-col items-center justify-between p-6 md:p-8 text-center transition-all duration-300 border-4 ${item.color}`}
          >
            <div className="arcade-text text-[10px] opacity-20 group-hover:opacity-100 group-hover:animate-pulse">
               {t.player1}
            </div>
            
            <div className="flex flex-col items-center gap-6">
              <div className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-300">
                {item.icon}
              </div>
              <div className="arcade-text text-[20px] leading-tight group-hover:text-white transition-colors mb-2">
                {item.label}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="arcade-text text-[9px] leading-relaxed opacity-40 group-hover:opacity-100">
                {item.desc}
              </div>
              <div className="arcade-text text-[8px] border-t border-white/10 pt-4 opacity-20 group-hover:opacity-100 group-hover:text-white">
                 PRESS [{item.key}]
              </div>
            </div>
          </motion.button>
        ))}
      </div>
      
      <div className="mt-20 arcade-text text-[10px] tracking-[0.4em] text-center">
         <div className="animate-pixel-blink text-white/60 mb-8 whitespace-nowrap">
            - {t.insertCoin} -
         </div>
         <div className="flex justify-center gap-12 text-white/10 text-[8px] tracking-normal">
            <span>© 2026 AI STUDIO</span>
            <span>VER. 1.0.4-ARCADE</span>
         </div>
      </div>
    </div>
  );
}

