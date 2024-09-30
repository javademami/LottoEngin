import React, { useState } from 'react';
import './../QuickPick.css';

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
  </svg>
);

const QuickPick = () => {
  const [combinations, setCombinations] = useState([]);

  const generateRandomNumbers = () => {
    const randomNumbers = new Set();
    while (randomNumbers.size < 7) {
      const randomNumber = Math.floor(Math.random() * 35) + 1;
      randomNumbers.add(randomNumber);
    }
    setCombinations([...combinations, [...randomNumbers].sort((a, b) => a - b)]);
  };

  const deleteCombination = (indexToDelete) => {
    setCombinations(combinations.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="bg-primary p-6 rounded-lg shadow-lg flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4 text-center text-white">Quick Pick</h2>
      <button
        className="bg-light text-dark py-2 px-4 rounded-lg mb-4 transition-transform duration-300 transform hover:scale-105"
        onClick={generateRandomNumbers}
      >
        Generate Random Numbers
      </button>
      
      {combinations.length > 0 && (
        <div className="text-lg mt-4 w-full">
          <h3 className="font-semibold text-center mb-2 text-white">Your Numbers:</h3>
          <div className="flex flex-col items-center">
            {combinations.map((combo, comboIndex) => (
              <div key={comboIndex} className="flex items-center justify-center mt-2 text-dark w-full">
                <div className="flex flex-wrap justify-center">
                  {combo.map((number, index) => (
                    <div
                      key={number}
                      className="number-circle"
                      style={{
                        animationDelay: `${index * 0.2}s`,
                      }}
                    >
                      {number}
                    </div>
                  ))}
                </div>
                <button
                  className="ml-2 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full focus:outline-none transition-colors duration-300"
                  onClick={() => deleteCombination(comboIndex)}
                  aria-label="Delete combination"
                >
                  <DeleteIcon />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickPick;