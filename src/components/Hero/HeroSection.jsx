"use client";

import React from "react";

const HeroVideoSection = () => {
  return (
  <div className="relative w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[21/9] overflow-hidden">

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/bgs2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Gradient Overlay - Better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/70" />

      {/* Content Container */}
      <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
        <div className="max-w-4xl text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-5">
          
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto">
            
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroVideoSection;