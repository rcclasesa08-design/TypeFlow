import { KEYBOARD_LAYOUT } from '../constants/levels';

interface VirtualKeyboardProps {
  currentKey: string;
}

export default function VirtualKeyboard({ currentKey }: VirtualKeyboardProps) {
  // Simple mapping of fingers for standard QWERTY
  const getFinger = (key: string) => {
    const leftPinky = ['q', 'a', 'z', '1'];
    const leftRing = ['w', 's', 'x', '2'];
    const leftMiddle = ['e', 'd', 'c', '3'];
    const leftIndex = ['r', 't', 'f', 'g', 'v', 'b', '4', '5'];
    const rightIndex = ['y', 'u', 'h', 'j', 'n', 'm', '6', '7'];
    const rightMiddle = ['i', 'k', ',', '8'];
    const rightRing = ['o', 'l', '.', '9'];
    const rightPinky = ['p', 'ñ', '-', '0'];

    if (leftPinky.includes(key.toLowerCase())) return 'L-Pinky';
    if (leftRing.includes(key.toLowerCase())) return 'L-Ring';
    if (leftMiddle.includes(key.toLowerCase())) return 'L-Middle';
    if (leftIndex.includes(key.toLowerCase())) return 'L-Index';
    if (rightIndex.includes(key.toLowerCase())) return 'R-Index';
    if (rightMiddle.includes(key.toLowerCase())) return 'R-Middle';
    if (rightRing.includes(key.toLowerCase())) return 'R-Ring';
    if (rightPinky.includes(key.toLowerCase())) return 'R-Pinky';
    if (key === ' ') return 'Thumb';
    return '';
  };

  const finger = getFinger(currentKey);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-black border-4 retro-border">
      <div className="flex flex-col gap-1.5">
        {/* Layout Rows */}
        {KEYBOARD_LAYOUT.map((row, i) => (
          <div key={i} className="flex justify-center gap-1">
            {row.map((key) => {
              const isActive = currentKey.toLowerCase() === key.toLowerCase();
              return (
                <div
                  key={key}
                  className={`w-10 h-10 flex items-center justify-center border-2 transition-all duration-75 text-[10px] font-black ${
                    isActive 
                      ? 'text-brand border-brand bg-brand/10 shadow-[0_0_15px_var(--theme-correct)] scale-110 z-10' 
                      : 'border-correct/10 bg-black text-correct/20'
                  }`}
                >
                  {key.toUpperCase()}
                </div>
              );
            })}
          </div>
        ))}
        {/* Spacebar */}
        <div className="flex justify-center mt-1.5">
          <div className={`w-80 h-8 border-2 transition-all duration-75 ${
            currentKey === ' ' 
              ? 'border-brand bg-brand/10 shadow-[0_0_15px_var(--theme-correct)]' 
              : 'border-correct/10 bg-black'
          }`} />
        </div>
      </div>
      {finger && (
        <div className="mt-4 flex items-center justify-center gap-3">
          <span className="text-[8px] uppercase tracking-[0.2em] font-black text-brand animate-pixel-blink">
            NEXT KEY: {finger}
          </span>
        </div>
      )}
    </div>
  );
}
