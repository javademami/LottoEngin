import React from 'react';

const AboutLottery = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="bg-primary rounded-lg shadow-lg overflow-hidden max-w-4xl w-full mx-4 my-8">
        <img 
          src="https://om.svenskaspel.se/wp-content/uploads/2023/09/lotto-press-2020-4184-1030x658.jpg" 
          alt="Swedish Lotto" 
          className="w-full h-auto object-cover"
        />
        <div className="p-6 bg-opacity-90 bg-primary">
          <h2 className="text-2xl font-semibold mb-4 text-center text-white">About Swedish Lotto</h2>
          <div className="space-y-4 text-white">
            <p className="text-center">
              <strong>Swedish Lotto</strong> or <strong>Svenska Spel Lotto</strong> is a popular lottery game in Sweden, 
              run by the state-owned company Svenska Spel. It's widely played, with many people participating weekly.
            </p>
            <p className="text-center">
              In this lottery, players select seven numbers from a pool of numbers ranging from 1 to 35. 
              In each draw, seven main numbers and one additional number (called "tilläggsnummer") are randomly drawn.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-2 text-center">How to win:</h3>
            <ul className="list-disc list-inside space-y-2 max-w-md mx-auto">
              <li>If a player correctly guesses all seven main numbers, they win the jackpot.</li>
              <li>Players can win various prizes based on how many numbers they correctly guessed, usually starting from 4 correct numbers up to 7.</li>
              <li>The additional number helps to increase the chances of winning smaller prizes (for guessing 4 or 5 correct numbers).</li>
            </ul>
            <p className="mt-4 text-center">
              Swedish Lotto takes place twice a week, typically on Wednesdays and Saturdays, and players can choose to participate in one or both draws. 
              The jackpot prize depends on the number of participants and the total pool of money, but it often reaches substantial amounts.
            </p>
            <p className="text-center">
              Additionally, the game can sometimes include extra draws or side prizes, such as the "Drömvinsten" (Dream Prize), 
              which is a combination of Lotto and other games offered by Svenska Spel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutLottery;