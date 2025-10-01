"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Coffee, Cookie, Utensils, Star } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [showWelcome, setShowWelcome] = useState(false);
  const [showSnack, setShowSnack] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    // Start the animation sequence
    const timer1 = setTimeout(() => setShowLogo(true), 200);
    const timer2 = setTimeout(() => setShowWelcome(true), 800);
    const timer3 = setTimeout(() => setShowSnack(true), 1500);
    const timer4 = setTimeout(() => onComplete(), 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-yellow-200/20 to-amber-200/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-orange-200/15 to-yellow-200/15 rounded-full blur-2xl animate-pulse"></div>

      {/* Floating snack icons */}
      <div className="absolute top-32 left-16 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3s' }}>
        <Coffee className="h-8 w-8 text-amber-500/60" />
      </div>
      <div className="absolute top-40 right-32 animate-bounce" style={{ animationDelay: '1s', animationDuration: '2.5s' }}>
        <Cookie className="h-6 w-6 text-orange-500/60" />
      </div>
      <div className="absolute bottom-32 left-32 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '2.8s' }}>
        <Utensils className="h-7 w-7 text-yellow-500/60" />
      </div>
      <div className="absolute bottom-40 right-16 animate-bounce" style={{ animationDelay: '0.8s', animationDuration: '3.2s' }}>
        <Star className="h-5 w-5 text-amber-400/60" />
      </div>
      <div className="absolute top-1/3 left-1/4 animate-bounce" style={{ animationDelay: '2s', animationDuration: '2.2s' }}>
        <Coffee className="h-5 w-5 text-orange-400/50" />
      </div>
      <div className="absolute top-2/3 right-1/4 animate-bounce" style={{ animationDelay: '1.2s', animationDuration: '2.7s' }}>
        <Cookie className="h-6 w-6 text-amber-400/50" />
      </div>

      <div className="text-center space-y-8 relative z-10">
        {/* Logo with bounce animation */}
        <div className={`transition-all duration-1000 ${showLogo ? 'animate-bounce-in' : 'opacity-0 scale-75'}`}>
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 rounded-3xl shadow-2xl mx-auto w-fit mb-8">
            <Image 
              src="/snack-corner-footer.png" 
              alt="Snack Corner Logo"
              width={80} 
              height={80} 
              className="rounded-xl"
            />
          </div>
        </div>

        {/* Welcome text with bouncing animation */}
        <div className={`transition-all duration-1000 ${showWelcome ? 'animate-bounce-in-delayed' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-6xl lg:text-8xl font-bold text-gray-900 leading-tight">
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Welcome to
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Snack Corner!
            </span>
          </h1>
        </div>

        {/* Snack text with glow animation */}
        <div className={`transition-all duration-1000 ${showSnack ? 'animate-glow-in' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 leading-relaxed">
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent animate-glow">
              Let's Snack!
            </span>
          </h2>
        </div>

        {/* Loading dots */}
        <div className={`flex justify-center space-x-2 mt-12 transition-opacity duration-500 ${showSnack ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}
