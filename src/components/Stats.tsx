import { GameState } from '../types';
import { UI_TRANSLATIONS } from '../constants/translations';

interface StatsProps {
  gameState: GameState;
}

export default function Stats({ gameState }: StatsProps) {
  const t = UI_TRANSLATIONS[gameState.language];
  
  return (
    <div className="flex gap-8 justify-center items-center py-4 pixel-font">
      <div className="text-center group">
        <div className="text-[8px] uppercase opacity-40 tracking-widest mb-2">{t.wpm}</div>
        <div className="text-2xl font-black text-correct">{gameState.wpm}</div>
      </div>
      <div className="text-center group">
        <div className="text-[8px] uppercase opacity-40 tracking-widest mb-2">{t.accuracy}</div>
        <div className="text-2xl font-black text-correct">
          {gameState.accuracy}%
        </div>
      </div>
    </div>
  );
}
