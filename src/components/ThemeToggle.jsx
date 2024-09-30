import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <button
      onClick={toggleDarkMode}
      className={`w-16 h-8 rounded-full p-1 transition-colors duration-300 focus:outline-none  ${
        isDarkMode ? 'bg-blue-700' : 'bg-yellow-400'
      }`}
    >
      <div
        className={`w-6 h-6 rounded-full transition-transform duration-300 transform ${
          isDarkMode ? 'translate-x-8 bg-blue-100' : 'translate-x-0 bg-white'
        } flex items-center justify-center`}
      >
        {isDarkMode ? (
          <FaMoon className="text-blue-700" />
        ) : (
          <FaSun className="text-yellow-400" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
