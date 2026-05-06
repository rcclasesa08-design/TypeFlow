# TypeFlow Persistence Schema

This document outlines the JSON structure recommended for storing user progress in a NoSQL database like Firestore or MongoDB.

## User Document
```json
{
  "uid": "user_12345",
  "displayName": "SpeedTyper",
  "email": "user@example.com",
  "stats": {
    "level": 42,
    "totalExperience": 154200,
    "totalPoints": 500000,
    "gamesPlayed": 125,
    "bestWpm": 115,
    "averageAccuracy": 98.2,
    "topLanguage": "en",
    "favoriteMode": "race"
  },
  "preferences": {
    "theme": "dark",
    "keyboardVisible": true,
    "soundEnabled": true,
    "language": "en"
  },
  "achievements": [
    { "id": "speed_demon_100", "unlockedAt": "2024-03-20T10:00:00Z" },
    { "id": "perfect_accuracy", "unlockedAt": "2024-03-15T15:30:00Z" }
  ]
}
```

## Session Result (Sub-collection)
```json
{
  "sessionId": "session_abc123",
  "timestamp": "2024-04-29T16:15:00Z",
  "wpm": 85,
  "accuracy": 99,
  "score": 2550,
  "multiplier": 3,
  "mode": "Time Trial",
  "difficulty": "Advanced",
  "language": "es",
  "length": "Long",
  "errors": {
    "ñ": 5,
    "p": 2,
    "m": 1
  }
}
```

## Progression Calculation
- **Experience Points (XP)**: `Points * 0.1`
- **Level Up Requirement**: `Level * 1000` (linear progression)
- **Score Multipliers**:
  - Short: `(WPM * Accuracy) * 1`
  - Medium: `(WPM * Accuracy) * 2`
  - Long: `(WPM * Accuracy) * 3`
