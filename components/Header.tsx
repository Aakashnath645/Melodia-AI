
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center p-4 md:p-6 text-white">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        Melodia AI
      </h1>
      <p className="mt-2 text-md md:text-lg text-gray-300">Your AI-Powered Music Theory and Creativity Suite</p>
    </header>
  );
};

export default Header;
