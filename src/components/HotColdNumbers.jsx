import React, { useState } from 'react';
import { FaThermometerFull, FaSnowflake } from 'react-icons/fa';
import './../HotColdNumbers.css';

const HotColdNumbers = () => {
  // اعداد گرم
  const hotNumbers = [115, 113, 110, 110, 109, 109, 109];
  const hotLabels = ['Num 5', 'Num 26', 'Num 10', 'Num 25', 'Num 6', 'Num 9', 'Num 23'];

  // اعداد سرد
  const coldNumbers = [84, 86, 88, 88, 89, 89, 94];
  const coldLabels = ['Num 1', 'Num 35', 'Num 34', 'Num 3', 'Num 8', 'Num 20', 'Num 4'];

  const [activeTab, setActiveTab] = useState('hot');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // ایجاد دایره برای هر عدد
  const renderCircles = (numbers, labels, isHot) => {
    return numbers.map((number, index) => {
      const color = isHot ? '#e70502' : '#20aaf9';

      return (
        <div
          key={labels[index]}
          className="number-circle"
          style={{
            backgroundColor: color,
          }}
          title={`Count: ${number}`}
        >
          {labels[index].split(' ')[1]}
        </div>
      );
    });
  };

  return (
    <div className="bg-primary p-6 rounded-lg shadow-lg flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4 text-center text-white">Hot & Cold Numbers</h2>

      {/* تب‌ها */}
      <div className="tabs w-full">
        <button
          className={`tab-button ${activeTab === 'hot' ? 'active' : ''}`}
          onClick={() => handleTabChange('hot')}
          style={{ backgroundColor: activeTab === 'hot' ? '#e70502' : '#e70502' }}
        >
          <FaThermometerFull />
          <div className="tab-title">Hot Numbers</div>
        </button>
        <button
          className={`tab-button ${activeTab === 'cold' ? 'active' : ''}`}
          onClick={() => handleTabChange('cold')}
          style={{ backgroundColor: activeTab === 'cold' ? '#20aaf9' : '#20aaf9' }}
        >
          <FaSnowflake />
          <div className="tab-title">Cold Numbers</div>
        </button>
      </div>

      {/* لیست اعداد بر اساس تب فعال */}
      <div className="numbers-list mt-4 w-full">
        <div className="circles-container">
          {activeTab === 'hot'
            ? renderCircles(hotNumbers, hotLabels, true)
            : renderCircles(coldNumbers, coldLabels, false)}
        </div>
      </div>
    </div>
  );
};

export default HotColdNumbers;