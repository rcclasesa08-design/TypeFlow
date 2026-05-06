export enum Level {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced'
}

export enum GameMode {
  NORMAL = 'Normal',
  RACE = 'Race',
  TIME_TRIAL = 'Time Trial'
}

export enum Language {
  ENGLISH = 'en',
  SPANISH = 'es',
  FRENCH = 'fr',
  GERMAN = 'de'
}

export enum TextLength {
  SHORT = 'Short',
  MEDIUM = 'Medium',
  LONG = 'Long'
}

export enum Theme {
  PACMAN = 'Pac-man',
  MARIO = 'Mario',
  NONE = 'Standard'
}

export interface Avatar {
  id: string;
  name: string;
  icon: string; // Lucide icon name or emoji
  baseSpeed: number; // WPM
  description: string;
}

export interface GameState {
  targetText: string;
  userInput: string;
  startTime: number | null;
  endTime: number | null;
  wpm: number;
  accuracy: number;
  errors: Record<string, number>;
  currentIndex: number;
  isFinished: boolean;
  
  // Settings
  mode: GameMode;
  language: Language;
  level: Level;
  length: TextLength;
  avatar: Avatar | null;
  theme: Theme;
  effectsEnabled: boolean;
  subLevel: number;
  consecutiveErrors: number;
  customTopic?: string;
  isGenerating?: boolean;
  
  // Live Metrics
  score: number;
  timeRemaining: number;
  ghostProgress: number; // For AI or PB
  multiplier: number;
  combo: number;
  comboMultiplier: number;
  
  // Game Mechanics
  lives: number;
  energy: number; // 0 to 100
  starModeActive: boolean;
  powerPelletActive: boolean;
  ghostDistance: number; // For Pac-man mode, 0 to 100 where 100 is "caught"
  streak: number; 

  // View logic
  visibleLineRange: [number, number]; // [startLine, endLine]
  errorActive: boolean;
}

export interface UserProgress {
  userId: string;
  stats: {
    totalSessions: number;
    bestWpm: number;
    averageAccuracy: number;
    totalPoints: number;
    level: number;
    experience: number;
  };
  history: GameResult[];
}

export interface GameResult {
  date: string;
  wpm: number;
  accuracy: number;
  score: number;
  mode: GameMode;
  level: Level;
  language: Language;
}
