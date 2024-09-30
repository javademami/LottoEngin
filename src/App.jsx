import React, { useState } from 'react';
import Logo from './components/Logo';
import ThemeToggle from './components/ThemeToggle';
import LotteryResults from './components/LotteryResults';
import QuickPick from './components/QuickPick';
import HotColdNumbers from './components/HotColdNumbers';
import CombinationGenerator from './components/CombinationGenerator';
import Simulation from './components/Simulation';
import AboutLottery from './components/AboutLottery';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} flex flex-col`}>
      <nav className={`fixed top-0 left-0 right-0 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md z-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Logo className="h-12 w-auto" />
            </div>
            <div className="flex items-center">
              <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow mt-20 p-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <LotteryResults className="w-full" />
          <QuickPick className="w-full" />
          <HotColdNumbers className="w-full" />
          <CombinationGenerator className="w-full" />
          <Simulation className="w-full" />
          <AboutLottery className="w-full" />
        </div>
      </main>

      <footer className={`w-full p-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-900'}`}>
        <p className="text-center">© 2023 Lottery App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;