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
import DiamondSetup from './screens/DiamondSetup';
import ProfileScreen from './screens/ProfileScreen';
import RedeemCodeScreen from './screens/RedeemCodeScreen';
import UpiRedeemScreen from './screens/UpiRedeemScreen';
import StartupProfileScreen from './screens/StartupProfileScreen';
import LoginScreen from './screens/LoginScreen';
import { audio } from './lib/audio';
import { useUserStore } from './store/userStore';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './lib/firebase';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('login');
  const [selectedGame, setSelectedGame] = useState<GameType>('ludo');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const snapshot = await getDoc(userDocRef);
        
        if (snapshot.exists()) {
          useUserStore.getState().setStoreData({ ...snapshot.data(), uid: user.uid });
          setCurrentScreen('menu');
        } else {
          useUserStore.getState().resetStore();
          useUserStore.getState().setUid(user.uid);
          setCurrentScreen('startupProfile');
        }
        setLoading(false);
      } else {
        useUserStore.getState().resetStore();
        setCurrentScreen('login');
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    const unsub = useUserStore.subscribe((state) => {
      if (state.uid && state.profile) {
        const dataToSave = {
          coins: state.coins,
          diamonds: state.diamonds,
          earnedDiamonds: state.earnedDiamonds,
          profile: state.profile,
          unlockedGotis: state.unlockedGotis,
          equippedGotiId: state.equippedGotiId,
          unlockedAvatars: state.unlockedAvatars,
          redemptions: state.redemptions,
          lastDailyRewardDate: state.lastDailyRewardDate,
          dailyMissions: state.dailyMissions,
          stats: state.stats,
          settings: state.settings,
        };
        setDoc(doc(db, 'users', state.uid), dataToSave, { merge: true });
      }
    });
    return unsub;
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-fuchsia-500/30 overflow-hidden">
      {currentScreen === 'login' && <LoginScreen />}
      {currentScreen === 'startupProfile' && <StartupProfileScreen onComplete={() => navigate('menu')} />}
      {currentScreen === 'menu' && <MainMenu onNavigate={navigate} onPlay={startGameSetup} />}
      {currentScreen === 'setup' && <GameSetup gameType={selectedGame} onBack={() => navigate('menu')} onStart={() => navigate(selectedGame)} />}
      {currentScreen === 'diamondSetup' && <DiamondSetup onBack={() => navigate('menu')} onStart={() => { setSelectedGame('diamondLudo'); navigate('ludo'); }} onNavigate={navigate} />}
      {currentScreen === 'upiRedeem' && <UpiRedeemScreen onBack={() => navigate('menu')} />}
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
