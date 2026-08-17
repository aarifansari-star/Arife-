import React, { useState, useEffect } from 'react';
import { AppScreen, GameType, Player } from './types';
import MainMenu from './screens/MainMenu';
import GameSetup from './screens/GameSetup';
import Shop from './screens/Shop';
import Settings from './screens/Settings';
import Stats from './screens/Stats';
import LudoGame from './screens/LudoGame';
import SnakesGame from './screens/SnakesGame';
import HowToPlay from './screens/HowToPlay';
import DiamondCenter from './screens/DiamondCenter';
import DiamondSetup from './screens/DiamondSetup';
import ProfileScreen from './screens/ProfileScreen';
import RedeemCodeScreen from './screens/RedeemCodeScreen';
import { audio } from './lib/audio';
import { useUserStore } from './store/userStore';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('menu');
  const [selectedGame, setSelectedGame] = useState<GameType>('ludo');

  useEffect(() => {
    // One-time developer adjustment for the current existing player profile only
    const existingStorage = localStorage.getItem('ludo-user-storage');
    const hasAppliedDiamond = localStorage.getItem('dev-diamond-999g');
    const hasAppliedCoin = localStorage.getItem('dev-coin-999g');
    const isDevEnvironment = window.location.hostname === 'localhost' || window.location.hostname.includes('run.app');
    
    if (!hasAppliedDiamond) {
      if (existingStorage && isDevEnvironment) {
        // Apply 999999999999 Diamonds ONLY to the already existing player profile in the dev environment
        useUserStore.setState({ diamonds: 999999999999 });
      }
      // Mark as applied so future/new players (and public players) don't receive it
      localStorage.setItem('dev-diamond-999g', 'true');
    }

    if (!hasAppliedCoin) {
      if (existingStorage && isDevEnvironment) {
        // Apply 999999999999 Coins ONLY to the already existing player profile in the dev environment
        useUserStore.setState({ coins: 999999999999 });
      }
      // Mark as applied so future/new players (and public players) don't receive it
      localStorage.setItem('dev-coin-999g', 'true');
    }
  }, []);

  // Initialize audio context on first user interaction
  const handleInteraction = () => {
    audio.init();
    document.removeEventListener('click', handleInteraction);
    document.removeEventListener('touchstart', handleInteraction);
  };
  
  React.useEffect(() => {
    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  const navigate = (screen: AppScreen) => {
    audio.playClick();
    setCurrentScreen(screen);
  };

  const startGameSetup = (game: GameType) => {
    setSelectedGame(game);
    navigate('setup');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-fuchsia-500/30 overflow-hidden">
      {currentScreen === 'menu' && <MainMenu onNavigate={navigate} onPlay={startGameSetup} />}
      {currentScreen === 'setup' && <GameSetup gameType={selectedGame} onBack={() => navigate('menu')} onStart={() => navigate(selectedGame)} />}
      {currentScreen === 'diamondSetup' && <DiamondSetup onBack={() => navigate('menu')} onStart={() => { setSelectedGame('diamondLudo'); navigate('ludo'); }} />}
      {currentScreen === 'diamondCenter' && <DiamondCenter onBack={() => navigate('menu')} />}
      {currentScreen === 'shop' && <Shop onBack={() => navigate('menu')} />}
      {currentScreen === 'settings' && <Settings onBack={() => navigate('menu')} />}
      {currentScreen === 'stats' && <Stats onBack={() => navigate('menu')} />}
      {currentScreen === 'howToPlay' && <HowToPlay onBack={() => navigate('menu')} />}
      {currentScreen === 'profile' && <ProfileScreen onBack={() => navigate('menu')} />}
      {currentScreen === 'redeemCode' && <RedeemCodeScreen onBack={() => navigate('menu')} />}
      {currentScreen === 'ludo' && <LudoGame onExit={() => navigate('menu')} />}
      {currentScreen === 'snakes' && <SnakesGame onExit={() => navigate('menu')} />}
    </div>
  );
}
