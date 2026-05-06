import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import ConfigScreen from './components/ConfigScreen';
import GameScreen from './components/GameScreen';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [isLightMode, setIsLightMode] = useState(false);

  return (
    <Router>
      <div className={`h-screen w-screen transition-all duration-500 overflow-hidden ${isLightMode ? 'light bg-slate-100' : 'bg-[#0f172a]'}`}>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/config/:mode" element={<ConfigScreen />} />
            <Route path="/play" element={<GameScreen />} />
            {/* Fallback */}
            <Route path="*" element={<HomeScreen />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}
