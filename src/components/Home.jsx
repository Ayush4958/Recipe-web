import React, { useState, useEffect } from 'react';
import { Github, ChefHat, ArrowRight, Sparkles, Sun, Moon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

function HomePage() {
  const [darkMode, setDarkMode] = useState(true);

  const handleGithubClick = () => {
    window.open('https://github.com/Ayush4958', '_blank');
  };

  const handleRecipeClick = () => {
    // Replace with your actual route
    window.location.href = '/recipes';
  };

  return (
    <div className="min-h-screen transition-all duration-500 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-[#1a0b2e] dark:via-[#16213e] dark:to-[#0f3460] relative overflow-hidden">

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-2 h-2 bg-yellow-400 dark:bg-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-pink-400 dark:bg-pink-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-16 w-3 h-3 bg-blue-400 dark:bg-blue-400 rounded-full animate-bounce"></div>
        <div className="absolute top-60 left-1/4 w-1 h-1 bg-green-400 dark:bg-green-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-purple-400 dark:bg-purple-400 rounded-full animate-ping"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen">
          
          {/* Left Side - Content */}
          <div className="text-slate-800 dark:text-white space-y-6 sm:space-y-8 order-2 lg:order-1">
            
            {/* Catchy Heading */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-orange-600 dark:text-yellow-400 mb-4">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
                <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase">Welcome to RecipeFinder</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight">
                <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 dark:from-yellow-400 dark:via-pink-500 dark:to-purple-600 bg-clip-text text-transparent animate-pulse">
                  Discover
                </span>
                <br />
                <span className="text-slate-800 dark:text-white drop-shadow-2xl">
                  Culinary
                </span>
                <br />
                <span className="bg-gradient-to-r from-emerald-500 to-blue-600 dark:from-green-400 dark:to-blue-500 bg-clip-text text-transparent">
                  Magic ✨
                </span>
              </h1>
            </div>

            {/* Description Paragraph */}
            <div className="space-y-4">
              <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-gray-300 leading-relaxed font-light">
                Embark on a delicious journey through thousands of handcrafted recipes from around the globe. 
                Whether you're a culinary novice or a seasoned chef, our platform brings you closer to the 
                art of cooking with step-by-step guides, authentic flavors, and endless inspiration.
              </p>
              
              <p className="text-sm sm:text-base text-slate-500 dark:text-gray-400 leading-relaxed">
                From quick weeknight dinners to elaborate weekend feasts, discover recipes that match your 
                taste, dietary preferences, and cooking skills. Your next favorite dish is just a click away!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
              
              {/* GitHub Button */}
              <button
                onClick={handleGithubClick}
                className="group flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-slate-200 hover:bg-slate-300 dark:bg-gray-800 dark:hover:bg-gray-700 border border-slate-300 hover:border-slate-400 dark:border-gray-600 dark:hover:border-gray-500 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl text-slate-800 dark:text-white"
              >
                <Github className="h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-sm sm:text-base">View Source Code</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </button>

              {/* Recipe Search Button */}
              <NavLink to='/recipes'>
              <button
                className="group flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-400 hover:to-pink-500 dark:from-orange-500 dark:to-pink-600 dark:hover:from-orange-400 dark:hover:to-pink-500 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-pink-500/30 relative overflow-hidden"
                >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-pink-400/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <ChefHat className="h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
                <span className="relative z-10 text-sm sm:text-base">Explore Recipes</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
              </button>
                </NavLink>
            </div>

            {/* Stats */}
            <div className="flex gap-6 sm:gap-8 pt-6 sm:pt-8 border-t border-slate-300 dark:border-gray-700">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-orange-500 dark:text-yellow-400">1000+</div>
                <div className="text-xs sm:text-sm text-slate-500 dark:text-gray-400">Recipes</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-pink-500 dark:text-pink-400">50+</div>
                <div className="text-xs sm:text-sm text-slate-500 dark:text-gray-400">Cuisines</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-blue-500 dark:text-blue-400">24/7</div>
                <div className="text-xs sm:text-sm text-slate-500 dark:text-gray-400">Available</div>
              </div>
            </div>
          </div>

          {/* Right Side - Rotating Book */}
          <div className="flex items-center justify-center order-1 lg:order-2 mb-8 lg:mb-0">
            <div className="relative">
              
              {/* Glowing backdrop */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-pink-500/20 dark:from-yellow-400/20 dark:to-pink-500/20 rounded-full blur-3xl scale-150 animate-pulse"></div>
              
              {/* Rotating Book Container */}
              <div className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                <div className="w-full h-full animate-spin-slow">
                  
                  {/* Book */}
                  <div className="relative w-full h-full preserve-3d">
                    
                    {/* Book Cover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-red-700 to-red-800 dark:from-amber-600 dark:via-orange-700 dark:to-red-800 rounded-lg shadow-2xl transform-style-preserve-3d">
                      
                      {/* Book spine shadow */}
                      <div className="absolute right-0 top-0 w-3 sm:w-4 h-full bg-gradient-to-b from-orange-800 to-red-900 dark:from-amber-800 dark:to-red-900 rounded-r-lg"></div>
                      
                      {/* Cover content */}
                      <div className="relative z-10 p-4 sm:p-6 lg:p-8 h-full flex flex-col justify-between text-white">
                        
                        {/* Title area */}
                        <div className="text-center space-y-3 sm:space-y-4">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-yellow-400 rounded-full flex items-center justify-center">
                            <ChefHat className="h-6 w-6 sm:h-8 sm:w-8 text-orange-800" />
                          </div>
                          
                          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold drop-shadow-lg">
                            FOOD
                            <br />
                            RECIPES
                          </h2>
                          
                          <div className="w-16 sm:w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
                        </div>

                        {/* Decorative elements */}
                        <div className="space-y-1 sm:space-y-2 text-center opacity-80">
                          <div className="text-xs sm:text-sm">✦ AUTHENTIC FLAVORS ✦</div>
                          <div className="text-xs">From Kitchen to Heart</div>
                        </div>

                        {/* Bottom decoration */}
                        <div className="text-center">
                          <div className="text-xs opacity-60">EST. 2024</div>
                          <div className="flex justify-center gap-1 mt-2">
                            <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                            <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                            <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                          </div>
                        </div>
                      </div>

                      {/* Book pages effect */}
                      <div className="absolute inset-1 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-100 dark:to-gray-200 rounded opacity-90 transform translate-x-1 translate-y-1"></div>
                      <div className="absolute inset-1 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-200 dark:to-gray-300 rounded opacity-80 transform translate-x-2 translate-y-2"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating recipe icons - Responsive sizing */}
              <div className="absolute -top-6 sm:-top-8 -left-6 sm:-left-8 w-8 h-8 sm:w-12 sm:h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce text-lg sm:text-xl">
                🍕
              </div>
              <div className="absolute -bottom-6 sm:-bottom-8 -right-6 sm:-right-8 w-8 h-8 sm:w-12 sm:h-12 bg-pink-400 rounded-full flex items-center justify-center animate-bounce text-lg sm:text-xl" style={{animationDelay: '0.5s'}}>
                🍜
              </div>
              <div className="absolute top-12 sm:top-16 -right-8 sm:-right-12 w-6 h-6 sm:w-10 sm:h-10 bg-green-400 rounded-full flex items-center justify-center animate-bounce text-sm sm:text-base" style={{animationDelay: '1s'}}>
                🥗
              </div>
              <div className="absolute bottom-12 sm:bottom-16 -left-8 sm:-left-12 w-6 h-6 sm:w-10 sm:h-10 bg-blue-400 rounded-full flex items-center justify-center animate-bounce text-sm sm:text-base" style={{animationDelay: '1.5s'}}>
                🍰
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for 3D effects and animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }

        @media (max-width: 640px) {
          .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
          }
        }
      `}</style>
    </div>
  );
}

export default HomePage;