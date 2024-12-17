import React from 'react';

function Hero() {
  return (
    <div id='home' className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/background/20230702/pngtree-d-illustration-of-black-concrete-background-with-blue-credit-card-design-image_3739414.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <div className="relative z-20 text-center text-white">
        <h1 className="text-5xl font-bold mb-4 animate-fade-in-down">
          Credit Card Fraud Detection
        </h1>
        <p className="text-xl mb-8 animate-fade-in-up">
          Protect your business with our advanced AI-powered solution
        </p>
        <a 
          href="#upload" 
          className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 animate-pulse"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}

export default Hero;