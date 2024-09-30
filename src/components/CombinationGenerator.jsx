import React, { useState } from 'react';

const CombinationGenerator = () => {
  const [combinations, setCombinations] = useState([]);
  const [inputNumbers, setInputNumbers] = useState('');
  const [error, setError] = useState('');

  const validateInput = (numbers) => {
    if (numbers.length !== 7) {
      setError('Please enter exactly 7 numbers.');
      return false;
    }

    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== 7) {
      setError('Please enter 7 unique numbers.');
      return false;
    }

    for (let num of numbers) {
      if (num < 1 || num > 35) {
        setError('All numbers must be between 1 and 35.');
        return false;
      }
    }

    setError('');
    return true;
  };

  const generateRandomCombination = () => {
    const numbersArray = inputNumbers.split(',').map(num => parseInt(num.trim(), 10)).filter(Boolean);

    if (!validateInput(numbersArray)) {
      return;
    }

    const newCombination = replaceThreeNumbers(numbersArray);
    setCombinations([...combinations, newCombination]);
  };

  const replaceThreeNumbers = (arr) => {
    const newCombination = [...arr];
    const availableNumbers = Array.from({ length: 35 }, (_, i) => i + 1);
    const remainingNumbers = availableNumbers.filter(num => !arr.includes(num));

    const indicesToReplace = [];
    while (indicesToReplace.length < 3) {
      const randomIndex = Math.floor(Math.random() * newCombination.length);
      if (!indicesToReplace.includes(randomIndex)) {
        indicesToReplace.push(randomIndex);
      }
    }

    indicesToReplace.forEach(index => {
      const randomNewNumber = remainingNumbers.splice(Math.floor(Math.random() * remainingNumbers.length), 1)[0];
      newCombination[index] = randomNewNumber;
    });

    return newCombination;
  };

  return (
    <div className="bg-primary p-6 rounded-lg shadow-lg flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4 text-center text-white">Combination Generator</h2>

      <div className="w-full max-w-md">
        <input
          className="border rounded-lg p-2 w-full mb-4 text-gray-800"
          placeholder="Enter 7 unique numbers (1-35) separated by commas"
          value={inputNumbers}
          onChange={(e) => setInputNumbers(e.target.value)}
        />

        {error && <p className="text-red-500 mb-2 text-center">{error}</p>}

        <button
          className="bg-light text-dark py-2 px-4 rounded-lg mb-4 w-full transition-transform duration-300 transform hover:scale-105"
          onClick={generateRandomCombination}
        >
          Generate Random Combination
        </button>
      </div>

      {combinations.length > 0 && (
        <div className="text-lg mt-4 w-full">
          <h3 className="font-semibold text-center text-white">Your Random Combinations:</h3>
          <ul className="flex flex-col items-center gap-4 mt-2">
            {combinations.map((combo, index) => (
              <li key={index} className="flex flex-wrap justify-center gap-2">
                {combo.map((num, idx) => (
                  <div
                    key={idx}
                    className="bg-yellow-400 text-black w-10 h-10 flex items-center justify-center rounded-full border-2 border-black"
                  >
                    {num}
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CombinationGenerator;