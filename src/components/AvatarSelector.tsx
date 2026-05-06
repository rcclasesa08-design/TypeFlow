import { AVATARS } from '../constants/avatars';
import { Avatar } from '../types';
import * as LucideIcons from 'lucide-react';
import { motion } from 'motion/react';

interface AvatarSelectorProps {
  selectedAvatarId: string;
  onSelect: (avatar: Avatar) => void;
}

export default function AvatarSelector({ selectedAvatarId, onSelect }: AvatarSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl mx-auto p-4">
      {AVATARS.map((avatar) => {
        const IconComponent = (LucideIcons as any)[avatar.icon];
        const isSelected = selectedAvatarId === avatar.id;

        return (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            key={avatar.id}
            onClick={() => onSelect(avatar)}
            className={`flex flex-col items-center p-6 border-4 border-double transition-all gap-4 ${
              isSelected 
                ? 'bg-correct/10 border-brand shadow-[0_0_20px_rgba(255,255,0,0.2)]' 
                : 'bg-black border-correct/10 hover:border-correct/40'
            }`}
          >
            <div className={`p-4 ${isSelected ? 'bg-brand text-black' : 'bg-correct/10 text-correct'}`}>
              {IconComponent && <IconComponent size={32} />}
            </div>
            <div className="text-center">
              <div className={`font-black uppercase tracking-widest text-xs ${isSelected ? 'text-brand' : 'text-correct/40'}`}>
                {avatar.name}
              </div>
              <div className="text-[8px] text-correct/20 font-black mt-2 uppercase">
                {avatar.baseSpeed} WPM
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
