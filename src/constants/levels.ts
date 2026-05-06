import { Level } from '../types';

export const LEVEL_TEXTS: Record<Level, string[]> = {
  [Level.BEGINNER]: [
    "asdf jklñ asdf jklñ",
    "aasd fffj kkkl ññña",
    "sad jlk afs jdl kñf",
    "fada kala ñala fada",
    "asdf jklñ fdsa ñlkj"
  ],
  [Level.INTERMEDIATE]: [
    "The quick brown fox jumps over the lazy dog.",
    "Practice makes perfect in every single way.",
    "Typing fast requires focus and relaxed hands.",
    "Every letter typed correctly brings you closer to mastery.",
    "Success is the sum of small efforts repeated day in and day out."
  ],
  [Level.ADVANCED]: [
    "In the beginning God created the heaven and the earth. And the earth was without form, and void; and darkness was upon the face of the deep.",
    "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.",
    "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer the slings and arrows of outrageous fortune.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. Winston Churchill famously said these words."
  ]
};

export const KEYBOARD_LAYOUT: string[][] = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"],
  ["z", "x", "c", "v", "b", "n", "m", ",", ".", "-"]
];
