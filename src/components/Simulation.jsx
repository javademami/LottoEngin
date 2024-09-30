import React, { useState } from 'react';

const NumberCircle = ({ number, color }) => (
  <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white font-bold m-1`}>
    {number}
  </div>
);

const Simulation = () => {
  const [selectedNumbers, setSelectedNumbers] = useState(new Set());
  const [lotteryNumbers, setLotteryNumbers] = useState([]);
  const [matchingNumbers, setMatchingNumbers] = useState([]);
  const [result, setResult] = useState('');

  const toggleNumber = (number) => {
    if (selectedNumbers.size >= 7 && !selectedNumbers.has(number)) {
      return;
    }

    const newSelectedNumbers = new Set(selectedNumbers);
    if (newSelectedNumbers.has(number)) {
      newSelectedNumbers.delete(number);
    } else {
      newSelectedNumbers.add(number);
    }
    setSelectedNumbers(newSelectedNumbers);
  };

  const simulateLottery = () => {
    if (selectedNumbers.size !== 7) {
      alert('Please select exactly 7 unique numbers.');
      return;
    }

    const uniqueLotteryNumbers = generateUniqueLotteryNumbers(7);
    setLotteryNumbers(uniqueLotteryNumbers);

    const matches = Array.from(selectedNumbers).filter((num) => uniqueLotteryNumbers.includes(num));
    setMatchingNumbers(matches);

    setResult(`Number of matches: ${matches.length}`);
  };

  const generateUniqueLotteryNumbers = (count) => {
    const numbers = new Set();
    while (numbers.size < count) {
      numbers.add(Math.floor(Math.random() * 35) + 1);
    }
    return Array.from(numbers);
  };

  const renderNumberGrid = () => {
    const numbers = Array.from({ length: 35 }, (_, index) => index + 1);

    return (
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 gap-2 justify-center">
        {numbers.map((number) => (
          <div
            key={number}
            className={`w-10 h-10 flex items-center justify-center border rounded-full cursor-pointer ${
              selectedNumbers.has(number) ? 'bg-blue-500 text-white' : 'bg-white text-black'
            } ${selectedNumbers.size >= 7 ? 'pointer-events-none' : ''}`}
            onClick={() => toggleNumber(number)}
          >
            {number}
          </div>
        ))}
      </div>
    );
  };

  const resetSelection = () => {
    setSelectedNumbers(new Set());
    setLotteryNumbers([]);
    setMatchingNumbers([]);
    setResult('');
  };

  return (
    <div className="bg-primary p-6 rounded-lg shadow-lg flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4 text-center text-white">Simulation</h2>
      <h3 className="text-lg mb-4 text-center text-white">Select up to 7 numbers:</h3>
      <div className="w-full max-w-md">
        {renderNumberGrid()}
      </div>
      <div className="flex space-x-4 mt-4">
        <button
          className="bg-light text-dark py-2 px-4 rounded-lg transition-transform duration-300 transform hover:scale-105"
          onClick={simulateLottery}
        >
          Simulate Lottery
        </button>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-lg transition-transform duration-300 transform hover:scale-105"
          onClick={resetSelection}
        >
          Reset Selection
        </button>
      </div>
      {result && (
        <div className="mt-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-2 text-center text-white">Your numbers:</h3>
          <div className="flex flex-wrap justify-center">
            {Array.from(selectedNumbers).map((num) => (
              <NumberCircle key={num} number={num} color="bg-blue-500" />
            ))}
          </div>
          <h3 className="text-lg font-semibold mt-4 mb-2 text-center text-white">Lottery numbers:</h3>
          <div className="flex flex-wrap justify-center">
            {lotteryNumbers.map((num) => (
              <NumberCircle key={num} number={num} color="bg-green-500" />
            ))}
          </div>
          <h3 className="text-lg font-semibold mt-4 mb-2 text-center text-white">Matching numbers:</h3>
          <div className="flex flex-wrap justify-center text-white">
            {matchingNumbers.map((num) => (
              <NumberCircle key={num} number={num} color="bg-yellow-500" />
            ))}
          </div>
          <p className="text-lg mt-4 text-center text-white">{result}</p>
        </div>
      )}
    </div>
  );
};

export default Simulation;