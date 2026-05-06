import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Level, GameMode, Language, TextLength, Theme } from '../types';
import { AVATARS } from '../constants/avatars';
import AvatarSelector from './AvatarSelector';
import { ChevronLeft, Play } from 'lucide-react';
import { UI_TRANSLATIONS } from '../constants/translations';

const modeMap: Record<string, GameMode> = {
  training: GameMode.NORMAL,
  race: GameMode.RACE,
  timer: GameMode.TIME_TRIAL
};

export default function ConfigScreen() {
  const { mode = 'training' } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [config, setConfig] = useState({
    level: Level.BEGINNER,
    language: (localStorage.getItem('typeflow_lang') as Language) || Language.ENGLISH,
    length: TextLength.SHORT,
    avatar: AVATARS[0],
    theme: location.state?.theme || Theme.PACMAN,
    effectsEnabled: (localStorage.getItem('typeflow_effects') !== 'false'),
    customTopic: ''
  });

  const [showCustomTopic, setShowCustomTopic] = useState(false);

  const t = UI_TRANSLATIONS[config.language];

  const handleStart = () => {
    localStorage.setItem('typeflow_lang', config.language);
    localStorage.setItem('typeflow_effects', String(config.effectsEnabled));
    navigate('/play', { state: { ...config, mode: modeMap[mode] } });
  };

  const renderSelector = (theme: Theme) => {
    if (theme === Theme.MARIO) return <span className="mr-2">🍄</span>;
    if (theme === Theme.PACMAN) return <span className="mr-2">🟡</span>;
    return <span className="mr-2">⌨️</span>;
  };

  return (
    <div className={`min-h-screen p-8 flex flex-col items-center bg-black transition-all duration-700 ${
      config.theme === Theme.MARIO ? 'theme-mario border-red-500' : 
      config.theme === Theme.PACMAN ? 'theme-pacman border-neon-cyan' : 
      'border-white/10'
    }`}>
      {config.effectsEnabled && <div className="scanlines" />}

      <header className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-center mb-8 md:mb-16 z-20 gap-4">
        <button 
          onClick={() => navigate('/')}
          className="order-2 md:order-1 flex items-center gap-2 text-white/50 hover:text-white transition-colors arcade-text text-[8px] md:text-[10px]"
        >
          <ChevronLeft size={16} /> [ESC] {t.back}
        </button>
        <div className="order-1 md:order-2 text-xl md:text-2xl arcade-text text-brand drop-shadow-[0_0_15px_var(--theme-bright)] text-center">
          {t.missionConfig}
        </div>
      </header>

      <div className="w-full max-w-4xl flex flex-col gap-8 md:gap-12 z-10">
        {/* PLAYER SELECT (Avatar) */}
        {mode === 'race' && (
          <div className="flex flex-col gap-4 md:gap-6 text-center">
            <span className="arcade-text text-[8px] md:text-[10px] text-white/40 tracking-[0.4em]">{t.selectPlayer}</span>
            <div className="bg-black/80 border-4 border-white/10 p-4 md:p-6 backdrop-blur-md">
              <AvatarSelector 
                selectedAvatarId={config.avatar.id} 
                onSelect={(a) => setConfig(prev => ({ ...prev, avatar: a }))} 
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 overflow-y-auto max-h-[60vh] md:max-h-none p-2">
          {/* THEME SELECT */}
          <div className="flex flex-col gap-4 md:gap-6">
            <span className="arcade-text text-[8px] md:text-[10px] text-white/40 tracking-[0.4em] mb-2 text-center md:text-left uppercase">{t.theme}</span>
            <div className="grid grid-cols-2 md:flex md:flex-col gap-2 md:gap-4">
               {Object.values(Theme).map(th => (
                <button 
                  key={th}
                  onClick={() => setConfig(prev => ({ ...prev, theme: th }))}
                  className={`arcade-button p-2 md:p-4 text-[8px] md:text-[12px] flex items-center justify-center ${config.theme === th ? 'selected' : ''}`}
                >
                  {config.theme === th && renderSelector(config.theme)}
                  <span className="uppercase">{th === Theme.NONE ? t.short : th}</span>
                </button>
              ))}
            </div>
          </div>

          {/* GAME PARAMS */}
          <div className="flex flex-col gap-4 md:gap-6">
            <span className="arcade-text text-[8px] md:text-[10px] text-white/40 tracking-[0.4em] mb-2 text-center md:text-left uppercase">{t.parameters}</span>
            <div className="grid grid-cols-1 gap-3 md:gap-4">
               {/* Level */}
               <div className="flex bg-black/40 border-2 border-white/5 overflow-hidden rounded-sm">
                 {Object.values(Level).map(l => (
                  <button 
                    key={l}
                    onClick={() => setConfig(prev => ({ ...prev, level: l }))}
                    className={`flex-1 py-3 arcade-text text-[6px] md:text-[8px] transition-all ${
                      config.level === l ? 'bg-brand text-black' : 'text-white/20 hover:text-white/50'
                    }`}
                  >
                    {l}
                  </button>
                ))}
               </div>

               {/* Lang */}
               <div className="flex bg-black/40 border-2 border-white/5 overflow-hidden rounded-sm">
                 {Object.values(Language).map(lang => (
                  <button 
                    key={lang}
                    onClick={() => setConfig(prev => ({ ...prev, language: lang }))}
                    className={`flex-1 py-3 arcade-text text-[6px] md:text-[8px] transition-all ${
                      config.language === lang ? 'bg-brand text-black' : 'text-white/20 hover:text-white/50'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
               </div>

               {/* Length */}
               <div className="flex bg-black/40 border-2 border-white/5 overflow-hidden rounded-sm">
                 {Object.values(TextLength).map(len => (
                  <button 
                    key={len}
                    onClick={() => setConfig(prev => ({ ...prev, length: len }))}
                    className={`flex-1 py-3 arcade-text text-[6px] md:text-[8px] transition-all ${
                      config.length === len ? 'bg-brand text-black' : 'text-white/20 hover:text-white/50'
                    }`}
                  >
                    {t[len.toLowerCase()]}
                  </button>
                ))}
               </div>

               {/* Effects Toggle */}
               <button 
                 onClick={() => setConfig(prev => ({ ...prev, effectsEnabled: !prev.effectsEnabled }))}
                 className={`py-3 arcade-text text-[6px] md:text-[8px] border-2 transition-all rounded-sm ${
                   config.effectsEnabled ? 'border-brand text-brand shadow-[0_0_10px_rgba(255,255,255,0.1)]' : 'border-white/10 text-white/20'
                 }`}
               >
                 {t.effects}: {config.effectsEnabled ? t.on : t.off}
               </button>

               {/* Custom Topic Button */}
               <div className="flex flex-col gap-3">
                 <button 
                   onClick={() => setShowCustomTopic(!showCustomTopic)}
                   className={`py-3 arcade-text text-[6px] md:text-[8px] border-2 transition-all rounded-sm ${
                     showCustomTopic ? 'border-brand bg-brand/10 text-brand shadow-[0_0_15px_rgba(255,255,0,0.2)]' : 'border-white/10 text-white/40 hover:text-white'
                   }`}
                 >
                   {t.chooseTopic}
                 </button>
                 
                 {showCustomTopic && (
                   <motion.div 
                     initial={{ opacity: 0, y: -10 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="flex flex-col gap-2"
                   >
                     <input 
                       type="text"
                       value={config.customTopic}
                       onChange={(e) => setConfig(prev => ({ ...prev, customTopic: e.target.value }))}
                       placeholder={t.enterTopic}
                       className="bg-black/80 border-2 border-brand/30 p-2 md:p-3 text-[8px] md:text-[10px] text-brand focus:border-brand outline-none arcade-text placeholder:opacity-30"
                     />
                   </motion.div>
                 )}
               </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 md:gap-6 mt-4 md:mt-12 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            className="group flex flex-col items-center gap-3 md:gap-4 px-12 md:px-20 py-6 md:py-8 bg-brand text-black arcade-text shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_80px_rgba(255,255,0,0.4)] border-4 border-yellow-200"
          >
            <div className="flex items-center gap-3 md:gap-4 text-sm md:text-xl">
               <Play size={20} className="md:size-[24px]" fill="currentColor" />
               <span className="tracking-widest">{t.pressStart}</span>
            </div>
            <span className="text-[8px] md:text-[10px] opacity-60 tracking-widest">{t.level01}</span>
          </motion.button>
          
          <div className="arcade-text text-[6px] md:text-[8px] animate-pulse text-white/30 tracking-[0.2em]">
             - {t.player1} READY -
          </div>
        </div>
      </div>
    </div>
  );
}

