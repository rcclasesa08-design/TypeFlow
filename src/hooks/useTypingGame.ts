import { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, Level, GameMode, Language, TextLength, Avatar, Theme } from '../types';
import { generateText } from '../constants/texts';
import { AVATARS } from '../constants/avatars';
import { generateCustomText } from '../services/geminiService';

export function useTypingGame(initialLevel: Level = Level.INTERMEDIATE) {
  const [gameState, setGameState] = useState<GameState>({
    targetText: '',
    userInput: '',
    startTime: null,
    endTime: null,
    wpm: 0,
    accuracy: 100,
    errors: {},
    currentIndex: 0,
    isFinished: false,
    mode: GameMode.NORMAL,
    language: Language.ENGLISH,
    level: initialLevel,
    length: TextLength.SHORT,
    avatar: AVATARS[0],
    theme: Theme.PACMAN,
    score: 0,
    timeRemaining: 60,
    ghostProgress: 0,
    multiplier: 1,
    combo: 0,
    comboMultiplier: 1,
    lives: 3,
    energy: 0,
    starModeActive: false,
    powerPelletActive: false,
    ghostDistance: 0,
    streak: 0,
    visibleLineRange: [0, 2],
    errorActive: false,
    effectsEnabled: true,
    subLevel: 0,
    consecutiveErrors: 0,
    isGenerating: false,
  } as GameState);

  const resetGame = useCallback(async (
    newLevel?: Level, 
    newMode?: GameMode, 
    newLang?: Language, 
    newLength?: TextLength,
    newAvatar?: Avatar,
    newTheme?: Theme,
    newEffects?: boolean,
    newCustomTopic?: string
  ) => {
    const nextLang = newLang || (localStorage.getItem('typeflow_lang') as Language) || gameState.language;
    const nextLevel = newLevel || gameState.level;
    const nextMode = newMode || gameState.mode;
    const nextLength = newLength || gameState.length;
    const nextAvatar = newAvatar || gameState.avatar;
    const nextTheme = newTheme || gameState.theme;
    const nextEffects = newEffects !== undefined ? newEffects : (localStorage.getItem('typeflow_effects') !== 'false');
    const nextCustomTopic = newCustomTopic !== undefined ? newCustomTopic : gameState.customTopic;

    let targetText = '';
    
    if (nextCustomTopic && nextCustomTopic.trim()) {
      setGameState(prev => ({ ...prev, isGenerating: true }));
      targetText = await generateCustomText(nextCustomTopic.trim(), nextLang);
      // If generation failed or returned empty
      if (!targetText || targetText.length < 5) {
        targetText = generateText(nextLang, nextLevel, nextLength, nextTheme, gameState.subLevel);
      }
      setGameState(prev => ({ ...prev, isGenerating: false }));
    } else {
      let nextSubLevel = gameState.subLevel;
      if (gameState.isFinished) {
         nextSubLevel = (gameState.subLevel + 1) % 20;
      } else if (newLevel && newLevel !== gameState.level) {
         nextSubLevel = 0;
      }
      targetText = generateText(nextLang, nextLevel, nextLength, nextTheme, nextSubLevel);
    }

    setGameState(prev => {
      let nextSubLevel = prev.subLevel;
      if (prev.isFinished) {
         nextSubLevel = (prev.subLevel + 1) % 20;
      } else if (newLevel && newLevel !== prev.level) {
         nextSubLevel = 0;
      }

      let multiplier = 1;
      if (nextLength === TextLength.MEDIUM) multiplier = 2;
      if (nextLength === TextLength.LONG) multiplier = 3;

      return {
        targetText,
        userInput: '',
        startTime: null,
        endTime: null,
        wpm: 0,
        accuracy: 100,
        errors: {},
        currentIndex: 0,
        isFinished: false,
        mode: nextMode,
        language: nextLang,
        level: nextLevel,
        length: nextLength,
        avatar: nextAvatar,
        theme: nextTheme,
        effectsEnabled: nextEffects,
        subLevel: nextSubLevel,
        consecutiveErrors: 0,
        customTopic: nextCustomTopic,
        isGenerating: false,
        score: (prev.isFinished && !newLevel && !newMode) ? prev.score : 0, 
        timeRemaining: 60,
        ghostProgress: 0,
        multiplier,
        combo: 0,
        comboMultiplier: 1,
        lives: 3,
        energy: 0,
        starModeActive: false,
        powerPelletActive: false,
        ghostDistance: 0,
        streak: 0,
        visibleLineRange: [0, 2],
        errorActive: false,
      };
    });
  }, [gameState.level, gameState.mode, gameState.language, gameState.length, gameState.avatar, gameState.theme, gameState.customTopic, gameState.isFinished, gameState.subLevel]);

  // Initial setup
  useEffect(() => {
    resetGame();
  }, [resetGame]);

  // Timer & Race Logic
  useEffect(() => {
    let interval: any;
    if (gameState.startTime && !gameState.isFinished) {
      interval = setInterval(() => {
        setGameState(prev => {
          if (prev.isFinished) return prev;
          
          let nextTimeRemaining = prev.timeRemaining;
          let nextGhostProgress = prev.ghostProgress;
          let nextIsFinished = prev.isFinished;
          let nextEndTime = prev.endTime;

          const now = Date.now();
          const elapsedMinutes = (now - prev.startTime!) / 60000;
          const elapsedSeconds = (now - prev.startTime!) / 1000;

          // Time Trial Logic
          if (prev.mode === GameMode.TIME_TRIAL) {
            nextTimeRemaining = Math.max(0, 60 - (now - prev.startTime!) / 1000);
            if (nextTimeRemaining <= 0) {
              nextIsFinished = true;
              nextEndTime = now;
            }
          }

          // Race Mode Logic: Ghost moves at fluctuating WPM
          if (prev.mode === GameMode.RACE && prev.avatar) {
            // Speed fluctuates using a sin wave + some randomness for a "human-like" bot feel
            const speedFluctuation = Math.sin(elapsedSeconds * 0.5) * 5 + (Math.random() * 2 - 1);
            const currentEffectiveSpeed = prev.avatar.baseSpeed + speedFluctuation;
            const expectedChars = Math.floor(currentEffectiveSpeed * 5 * elapsedMinutes);
            nextGhostProgress = Math.min(1, expectedChars / prev.targetText.length);
            if (nextGhostProgress >= 1 && !prev.isFinished) {
              nextIsFinished = true;
              nextEndTime = now;
            }
          }

          // Pac-man Ghost Pursuit Logic
          let nextGhostDistance = prev.ghostDistance;
          let nextLives = prev.lives;
          if (prev.theme === Theme.PACMAN && !prev.isFinished && prev.startTime) {
            // Ghosts move closer but with fluctuating speed for realism
            const pursuitFluctuation = Math.sin(elapsedSeconds * 0.8) * 0.5 + 0.5; // 0 to 1
            const basePursuitSpeed = 0.8;
            nextGhostDistance = Math.min(100, prev.ghostDistance + basePursuitSpeed + pursuitFluctuation);
            
            if (nextGhostDistance >= 100) {
              nextLives = Math.max(0, prev.lives - 1);
              nextGhostDistance = 0; // Reset after hit
              if (nextLives === 0) {
                nextIsFinished = true;
                nextEndTime = now;
              }
            }
          }

          // Star Mode / Power Pellet Expiration
          let nextStarMode = prev.starModeActive;
          let nextEnergy = prev.energy;
          let nextStreak = prev.streak;
          if (prev.starModeActive || prev.powerPelletActive) {
            nextEnergy = Math.max(0, prev.energy - 1); // 10 seconds duration (100 / 1 * 0.1s)
            if (nextEnergy <= 0) {
              nextStarMode = false;
              nextStreak = 0; // Reset streak after star mode ends
            }
          }

          return {
            ...prev,
            timeRemaining: nextTimeRemaining,
            ghostProgress: nextGhostProgress,
            isFinished: nextIsFinished,
            endTime: nextEndTime,
            ghostDistance: nextGhostDistance,
            lives: nextLives,
            starModeActive: nextStarMode,
            energy: nextEnergy,
            streak: nextStreak,
          };
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [gameState.startTime != null, gameState.isFinished, gameState.mode, gameState.theme]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Prevent default scrolling for Space and navigation keys
    const keysToBlock = [' ', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'];
    if (keysToBlock.includes(e.key) && !gameState.isFinished) {
      e.preventDefault();
    }

    if (e.key === 'Tab' || e.key === 'Escape') {
      e.preventDefault();
      resetGame();
      return;
    }

    setGameState((prev) => {
      if (prev.isFinished || (e.key.length > 1 && e.key !== 'Backspace')) return prev;

      let nextInput = prev.userInput;
      let nextStartTime = prev.startTime;
      let nextEndTime = prev.endTime;
      let nextIsFinished = prev.isFinished;
      let nextTimeRemaining = prev.timeRemaining;
      let nextCombo = prev.combo;
      let nextComboMultiplier = prev.comboMultiplier;
      let nextStreak = prev.streak;
      let nextConsecutiveErrors = prev.consecutiveErrors;
      let nextEnergy = prev.energy;
      let nextStarMode = prev.starModeActive;
      let nextGhostDistance = prev.ghostDistance;
      let nextLives = prev.lives;
      let nextScore = prev.score;
      const nextErrors = { ...prev.errors };

      if (!nextStartTime) {
        nextStartTime = Date.now();
      }

      if (e.key === 'Backspace') {
        if (nextInput.length > 0) {
          nextInput = nextInput.slice(0, -1);
          nextCombo = 0;
          nextComboMultiplier = 1;
          nextStreak = 0;
          // We don't reset consecutiveErrors on backspace, but backspace isn't an error either.
          // Wait, if they backspace, they are fixing a character. 
          // Usually consecutive errors count active wrong presses.
        }
      } else {
        const expectedChar = prev.targetText[nextInput.length];
        if (e.key !== expectedChar) {
          nextConsecutiveErrors++;
          
          // Lose life if hit 5 consecutive errors
          if (nextConsecutiveErrors >= 5) {
            nextLives = Math.max(0, prev.lives - 1);
            nextConsecutiveErrors = 0; // Reset
            if (nextLives === 0) {
              nextIsFinished = true;
              nextEndTime = Date.now();
            }
          }

          // Break Star Mode on error
          if (nextStarMode) {
            nextStarMode = false;
            nextEnergy = 0;
            nextStreak = 0;
          }

          if (!nextStarMode) {
            nextErrors[expectedChar] = (nextErrors[expectedChar] || 0) + 1;
            nextCombo = 0;
            nextComboMultiplier = 1;
            nextStreak = 0;
            
            if (prev.theme === Theme.MARIO) {
               nextScore = Math.max(0, nextScore - 50);
            } else if (prev.theme === Theme.PACMAN) {
               nextGhostDistance = Math.min(100, nextGhostDistance + 15);
            }
          }
        } else {
          nextConsecutiveErrors = 0; // Reset on correct press
          nextStreak++;
          nextCombo++;
          
          // Reward every 10 hits
          if (nextCombo % 10 === 0) {
             nextScore += 100;
          }

          // Star Mode Activation Logic (35 streak for all modes)
          if (nextStreak >= 35 && !nextStarMode) {
             nextStarMode = true;
             nextEnergy = 100;
          }

          // Pac-man Speed Reward
          if (prev.theme === Theme.PACMAN) {
             nextGhostDistance = Math.max(0, nextGhostDistance - 3);
          }

          if (nextCombo >= 20) {
            nextComboMultiplier = nextStarMode ? 5 : 2;
          }

          if (prev.mode === GameMode.TIME_TRIAL) {
            if (nextInput.length % 10 === 0 && nextInput.length > 0) {
              nextTimeRemaining += 1;
            }
          }
        }
        nextInput += e.key;
      }

      const nextIndex = nextInput.length;
      if (nextIndex === prev.targetText.length) {
        nextIsFinished = true;
        nextEndTime = Date.now();
      }

      // Improved Line Tracking for 3-line Carousel
      const charsPerLine = 32; 
      const currentLine = Math.floor(nextIndex / charsPerLine);
      const nextVisibleLineRange: [number, number] = [currentLine - 1, currentLine + 1];

      const now = nextEndTime || Date.now();
      const timeInMinutes = (now - nextStartTime) / 60000;
      const wpm = timeInMinutes > 0 ? Math.round((nextInput.length / 5) / timeInMinutes) : 0;
      
      let correct = 0;
      for (let i = 0; i < nextInput.length; i++) {
        if (nextInput[i] === prev.targetText[i]) correct++;
      }
      const accuracy = nextInput.length > 0 ? Math.round((correct / nextInput.length) * 100) : 100;
      
      const baseScore = (wpm * (accuracy / 100)) * prev.multiplier;
      const precisionBonus = accuracy === 100 ? 500 : 0;
      const finalScore = nextScore + Math.round((baseScore + precisionBonus) * nextComboMultiplier);

      return {
        ...prev,
        userInput: nextInput,
        startTime: nextStartTime,
        endTime: nextEndTime,
        currentIndex: nextIndex,
        isFinished: nextIsFinished,
        wpm,
        accuracy,
        errors: nextErrors,
        score: finalScore,
        timeRemaining: nextTimeRemaining,
        combo: nextCombo,
        comboMultiplier: nextComboMultiplier,
        streak: nextStreak,
        consecutiveErrors: nextConsecutiveErrors,
        energy: nextEnergy,
        starModeActive: nextStarMode,
        ghostDistance: nextGhostDistance,
        lives: nextLives,
        visibleLineRange: nextVisibleLineRange,
        errorActive: e.key !== prev.targetText[nextInput.length - 1] && e.key !== 'Backspace',
      };
    });
  }, [resetGame, gameState.isFinished, gameState.targetText, gameState.theme]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return {
    gameState,
    resetGame,
  };
}


