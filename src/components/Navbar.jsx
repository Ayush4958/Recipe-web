import React, { useState } from 'react'
import pic from '../assests/logo.jpg'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDark = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    console.log(darkMode)
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-800 dark:text-white transition-all duration-500 ease-in-out shadow-lg border-b border-orange-100 dark:border-gray-700 sticky top-0 z-50 backdrop-blur-sm bg-orange-50/95 dark:bg-gray-900/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <NavLink to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img 
                  src={pic} 
                  className='w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover shadow-md group-hover:shadow-xl transition-all duration-300 border-2 border-orange-300 dark:border-orange-500 group-hover:border-orange-400 dark:group-hover:border-orange-400' 
                  alt="RecipeFinder Logo" 
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400/20 to-red-500/20 group-hover:from-orange-400/30 group-hover:to-red-500/30 transition-all duration-300"></div>
              </div>
              <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 dark:from-orange-400 dark:via-red-400 dark:to-pink-400 bg-clip-text text-transparent group-hover:from-orange-700 group-hover:via-red-700 group-hover:to-pink-700 dark:group-hover:from-orange-300 dark:group-hover:via-red-300 dark:group-hover:to-pink-300 transition-all duration-300">
                RecipeFinder
              </div>
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              <NavLink 
                to='/' 
                className={({ isActive }) => 
                  `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-orange-100 dark:hover:bg-gray-800 hover:text-orange-700 dark:hover:text-orange-400 hover:shadow-md ${
                    isActive ? 'bg-gradient-to-r from-orange-100 to-red-100 dark:from-gray-800 dark:to-gray-700 text-orange-700 dark:text-orange-400 shadow-md border border-orange-200 dark:border-gray-600' : ''
                  }`
                }
              >
                Home
              </NavLink>
              
              <NavLink 
                to='/recipes' 
                className={({ isActive }) => 
                  `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-orange-100 dark:hover:bg-gray-800 hover:text-orange-700 dark:hover:text-orange-400 hover:shadow-md ${
                    isActive ? 'bg-gradient-to-r from-orange-100 to-red-100 dark:from-gray-800 dark:to-gray-700 text-orange-700 dark:text-orange-400 shadow-md border border-orange-200 dark:border-gray-600' : ''
                  }`
                }
              >
                Recipes
              </NavLink>
              
              <NavLink 
                to='/favorites' 
                className={({ isActive }) => 
                  `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-orange-100 dark:hover:bg-gray-800 hover:text-orange-700 dark:hover:text-orange-400 hover:shadow-md ${
                    isActive ? 'bg-gradient-to-r from-orange-100 to-red-100 dark:from-gray-800 dark:to-gray-700 text-orange-700 dark:text-orange-400 shadow-md border border-orange-200 dark:border-gray-600' : ''
                  }`
                }
              >
                Favourite
              </NavLink>
            </div>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Auth Buttons */}
              <NavLink to="/" className={({ isActive }) => isActive ? "text-red-500" : ""}>
                <SignedOut>
                  <button className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium rounded-full hover:from-orange-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-orange-500/30">
                    <SignInButton />
                  </button>
                </SignedOut>
              </NavLink>
              
              <SignedIn>
                <UserButton />
              </SignedIn>

              {/* Theme Toggle */}
              <button 
                onClick={toggleDark} 
                className="p-2 rounded-full bg-orange-100 dark:bg-gray-800 hover:bg-orange-200 dark:hover:bg-gray-700 hover:text-orange-700 dark:hover:text-orange-400 transition-all duration-300 shadow-sm hover:shadow-md border border-orange-200 dark:border-gray-600"
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button 
              className="lg:hidden p-2 rounded-lg hover:bg-orange-100 dark:hover:bg-gray-800 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-300" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="lg:hidden absolute top-16 left-0 right-0 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-black border-t border-orange-100 dark:border-gray-700 shadow-xl backdrop-blur-sm bg-orange-50/95 dark:bg-gray-900/95">
              <div className="px-4 py-6 space-y-4">
                
                {/* Mobile Navigation Links */}
                <div className="space-y-2">
                  <NavLink 
                    to="/" 
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => 
                      `block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                        isActive 
                          ? 'bg-gradient-to-r from-orange-100 to-red-100 dark:from-gray-800 dark:to-gray-700 text-orange-700 dark:text-orange-400 shadow-md border border-orange-200 dark:border-gray-600' 
                          : 'hover:bg-orange-100 dark:hover:bg-gray-800 hover:text-orange-700 dark:hover:text-orange-400'
                      }`
                    }
                  >
                    Home
                  </NavLink>
                  
                  <NavLink 
                    to="/recipes" 
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => 
                      `block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                        isActive 
                          ? 'bg-gradient-to-r from-orange-100 to-red-100 dark:from-gray-800 dark:to-gray-700 text-orange-700 dark:text-orange-400 shadow-md border border-orange-200 dark:border-gray-600' 
                          : 'hover:bg-orange-100 dark:hover:bg-gray-800 hover:text-orange-700 dark:hover:text-orange-400'
                      }`
                    }
                  >
                    Recipes
                  </NavLink>
                  
                  <NavLink 
                    to="/favorites" 
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => 
                      `block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                        isActive 
                          ? 'bg-gradient-to-r from-orange-100 to-red-100 dark:from-gray-800 dark:to-gray-700 text-orange-700 dark:text-orange-400 shadow-md border border-orange-200 dark:border-gray-600' 
                          : 'hover:bg-orange-100 dark:hover:bg-gray-800 hover:text-orange-700 dark:hover:text-orange-400'
                      }`
                    }
                  >
                    Favourite
                  </NavLink>
                </div>

                {/* Mobile Auth & Theme */}
                <div className="pt-4 border-t border-orange-200 dark:border-gray-700 space-y-4">
                  <NavLink to="/" className={({ isActive }) => isActive ? "text-red-500" : ""}>
                    <SignedOut>
                      <button 
                        className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                        onClick={() => setIsOpen(false)}
                      >
                        <SignInButton />
                      </button>
                    </SignedOut>
                  </NavLink>
                  
                  <SignedIn>
                    <div className="flex items-center justify-between px-4 py-2 bg-orange-50 dark:bg-gray-800 rounded-lg border border-orange-200 dark:border-gray-600">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Account</span>
                      <UserButton />
                    </div>
                  </SignedIn>

                  <button 
                    onClick={toggleDark} 
                    className="flex items-center justify-between w-full px-4 py-3 rounded-xl hover:bg-orange-100 dark:hover:bg-gray-800 transition-all duration-300 border border-orange-200 dark:border-gray-600"
                  >
                    <span className="text-base font-medium">
                      {darkMode ? 'Light Mode' : 'Dark Mode'}
                    </span>
                    <div className="p-1 rounded-full bg-orange-100 dark:bg-gray-700 border border-orange-300 dark:border-gray-600">
                      {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navbar