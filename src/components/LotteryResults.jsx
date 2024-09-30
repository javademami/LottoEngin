import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LotteryResults = () => {
  const [results, setResults] = useState(null);
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // استفاده از متغیر محیطی برای تعیین آدرس API
  const API_URL = process.env.REACT_APP_API_URL || '/api';

  const fetchResults = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.get(`${API_URL}/lotto-results`);
      setResults(data.results);
      setDate(data.date);
    } catch (err) {
      console.error('Error fetching results:', err.response || err);
      setError('خطا در دریافت اطلاعات: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const renderNumbers = (numbers, extraNumbers, isJoker = false) => {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="flex justify-center gap-2">
          {numbers.map((num, index) => (
            <div
              key={`number-${index}`}
              className={`bg-white text-black w-10 h-10 flex items-center justify-center rounded-full border-2 border-black ${isJoker ? 'bg-pink-500' : ''}`}
            >
              {num}
            </div>
          ))}
        </div>
        {extraNumbers.length > 0 && (
          <div className="flex justify-center gap-2">
            {extraNumbers.map((num, index) => (
              <div
                key={`extra-${index}`}
                className="bg-green-500 text-white w-10 h-10 flex items-center justify-center rounded-full border-2 border-green-500"
              >
                {num}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-primary p-6 rounded-lg shadow-lg flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4 text-center text-white">Latest Lotto Results</h2>

      {loading && <p className="text-center">در حال بارگذاری نتایج...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {results && (
        <div className="text-lg mt-4 w-full">
          <h3 className="font-semibold text-center text-white">Results for : {date}</h3>

          <div className="mt-4">
            <h4 className="font-semibold text-center text-white">Lotto 1:</h4>
            {renderNumbers(results.lotto1.numbers, results.lotto1.extraNumbers)}
          </div>

          <div className="mt-4">
            <h4 className="font-semibold text-center text-white">Lotto 2:</h4>
            {renderNumbers(results.lotto2.numbers, results.lotto2.extraNumbers)}
          </div>

          <div className="mt-4">
            <h4 className="font-semibold text-center text-white">Joker:</h4>
            {renderNumbers(results.joker, [], true)} 
          </div>
        </div>
      )}

      <button
        className="bg-light text-dark py-2 px-4 rounded-lg mt-4"
        onClick={fetchResults}
        disabled={loading}
      >
        Refresh Results
      </button>
    </div>
  );
};

export default LotteryResults;