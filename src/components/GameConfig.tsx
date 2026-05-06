import { Level, GameMode, Language, TextLength } from '../types';

interface GameConfigProps {
  level: Level;
  mode: GameMode;
  language: Language;
  length: TextLength;
  onConfigChange: (config: { level?: Level; mode?: GameMode; language?: Language; length?: TextLength }) => void;
}

export default function GameConfig({ level, mode, language, length, onConfigChange }: GameConfigProps) {
  return (
    <div className="flex flex-wrap gap-8 justify-center items-center py-6 border-b border-white/5 w-full max-w-6xl mx-auto backdrop-blur-sm z-20">
      {/* Mode Selector */}
      <div className="flex gap-4 items-center">
        <span className="text-[10px] uppercase tracking-[0.2em] text-dark/30 font-bold">Mode</span>
        <div className="flex gap-3">
          {Object.values(GameMode).map((m) => (
            <button
              key={m}
              onClick={() => onConfigChange({ mode: m })}
              className={`text-[10px] uppercase tracking-widest font-black transition-all ${
                mode === m ? 'text-brand' : 'text-dark/40 hover:text-correct'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="w-px h-4 bg-dark/10" />

      {/* Language Selector */}
      <div className="flex gap-4 items-center">
        <span className="text-[10px] uppercase tracking-[0.2em] text-dark/30 font-bold">Lang</span>
        <div className="flex gap-3">
          {Object.values(Language).map((l) => (
            <button
              key={l}
              onClick={() => onConfigChange({ language: l })}
              className={`text-[10px] uppercase tracking-widest font-black transition-all ${
                language === l ? 'text-brand' : 'text-dark/40 hover:text-correct'
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="w-px h-4 bg-dark/10" />

      {/* Difficulty Level */}
      <div className="flex gap-4 items-center">
        <span className="text-[10px] uppercase tracking-[0.2em] text-dark/30 font-bold">Difficulty</span>
        <div className="flex gap-3">
          {Object.values(Level).map((l) => (
            <button
              key={l}
              onClick={() => onConfigChange({ level: l })}
              className={`text-[10px] uppercase tracking-widest font-black transition-all ${
                level === l ? 'text-brand' : 'text-dark/40 hover:text-correct'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="w-px h-4 bg-dark/10" />

      {/* Length Selector */}
      <div className="flex gap-4 items-center">
        <span className="text-[10px] uppercase tracking-[0.2em] text-dark/30 font-bold">Length</span>
        <div className="flex gap-3">
          {Object.values(TextLength).map((len) => (
            <button
              key={len}
              onClick={() => onConfigChange({ length: len })}
              className={`text-[10px] uppercase tracking-widest font-black transition-all ${
                length === len ? 'text-brand' : 'text-dark/40 hover:text-correct'
              }`}
            >
              {len}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
