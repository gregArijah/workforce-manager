import React from 'react';

function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-500 h-screen flex items-center justify-center">
      <div className="text-white text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to PunchClockApp</h1>
        <p className="text-lg mb-8">Track your work hours with ease and accuracy.</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
