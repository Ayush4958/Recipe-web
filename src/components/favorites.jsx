import React, { useState, useEffect } from 'react';
import { Heart, Trash2, RefreshCw, ChefHat, Sparkles, ExternalLink } from 'lucide-react';
import { useUser } from "@clerk/clerk-react";
import { NavLink } from 'react-router-dom';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState({});

  const { user } = useUser();

  // Fetch favorites from the backend
  const fetchFavorites = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`https://recipe-web-x4ys.onrender.com/favorites/${user.id}`);

      if (res.ok) {
        const data = await res.json();
        setFavorites(data);
      } else {
        throw new Error('Failed to fetch favorites');
      }
    } catch (err) {
      console.error("Error fetching favorites:", err.message);
      setError("Failed to load favorites. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a favorite (you'll need to add this endpoint to your backend)
  const deleteFavorite = async (favoriteId, recipeId) => {
    setDeleteLoading(prev => ({ ...prev, [recipeId]: true }));
    
    try {
      const response = await fetch(`https://recipe-web-x4ys.onrender.com/favorites/${favoriteId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove from local state
        setFavorites(prev => prev.filter(item => item._id !== favoriteId));
      } else {
        throw new Error('Failed to delete favorite');
      }
    } catch (err) {
      console.error("Error deleting favorite:", err.message);
      alert("Failed to remove from favorites. Please try again.");
    } finally {
      setDeleteLoading(prev => ({ ...prev, [recipeId]: false }));
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-[#1a0b2e] dark:via-[#16213e] dark:to-[#0f3460] transition-all duration-500 flex items-center justify-center px-4">

        {/* Animated background elements */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-20 left-20 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-pink-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-32 left-16 w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="absolute top-60 left-1/4 w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
        </div>

        <div className="relative z-20 text-center max-w-md mx-auto">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-orange-200/20 dark:bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
            <Heart className="h-24 w-24 mx-auto text-orange-400 dark:text-yellow-400 relative z-10" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-slate-800 dark:text-white">
            Please Log In
          </h2>
          <p className="text-slate-600 dark:text-gray-300 text-lg leading-relaxed">
            You need to be logged in to view your favorite recipes and create your personal collection.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-[#1a0b2e] dark:via-[#16213e] dark:to-[#0f3460] transition-all duration-500 flex items-center justify-center px-4">

        {/* Animated background elements */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-20 left-20 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-pink-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-32 left-16 w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="absolute top-60 left-1/4 w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
        </div>

        <div className="relative z-20 text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-orange-200/20 dark:bg-yellow-400/20 rounded-full blur-2xl animate-pulse"></div>
            <RefreshCw className="h-12 w-12 animate-spin text-orange-500 dark:text-yellow-400 mx-auto relative z-10" />
          </div>
          <p className="text-slate-600 dark:text-gray-300 text-lg animate-pulse">Loading your favorite recipes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-[#1a0b2e] dark:via-[#16213e] dark:to-[#0f3460] transition-all duration-500 flex items-center justify-center px-4">

        {/* Animated background elements */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-20 left-20 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-pink-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-32 left-16 w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="absolute top-60 left-1/4 w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
        </div>

        <div className="relative z-20 text-center max-w-md mx-auto">
          <div className="bg-white/10 dark:bg-black/20 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-gray-700 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-red-500 dark:text-red-400">Oops! Something went wrong</h2>
            <p className="mb-6 text-red-600 dark:text-red-300">{error}</p>
            <button
              onClick={fetchFavorites}
              className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-400 hover:to-pink-500 dark:from-orange-500 dark:to-pink-600 dark:hover:from-orange-400 dark:hover:to-pink-500 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-pink-500/30 mx-auto"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-[#1a0b2e] dark:via-[#16213e] dark:to-[#0f3460] transition-all duration-500">

      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-20 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-pink-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-16 w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
        <div className="absolute top-60 left-1/4 w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
      </div>

      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">

        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-orange-600 dark:text-yellow-400 mb-4">
            <Sparkles className="h-5 w-5 animate-pulse" />
            <span className="text-sm font-semibold tracking-wider uppercase">Your Recipe Collection</span>
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 text-slate-800 dark:text-white">
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 dark:from-yellow-400 dark:via-pink-500 dark:to-purple-600 bg-clip-text text-transparent">
              Your Favorite
            </span>
            <br />
            <span className="text-slate-800 dark:text-white">
              Recipes
            </span>
          </h1>

          <div className="flex items-center justify-center gap-2 bg-white/10 dark:bg-black/20 backdrop-blur-lg rounded-full px-6 py-3 border border-white/20 dark:border-gray-700 shadow-lg">
            <ChefHat className="h-5 w-5 text-orange-500 dark:text-yellow-400" />
            <span className="text-slate-700 dark:text-gray-300 text-lg font-medium">
              {favorites.length} recipe{favorites.length !== 1 ? 's' : ''} in your collection
            </span>
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center text-slate-800 dark:text-white max-w-2xl mx-auto">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-orange-200/20 dark:bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
              <Heart className="h-32 w-32 mx-auto text-orange-300 dark:text-yellow-300 relative z-10" />
            </div>
            <h2 className="text-4xl font-bold mb-6 text-slate-800 dark:text-white">
              No Favorites Yet
            </h2>
            <p className="text-slate-600 dark:text-gray-300 text-xl leading-relaxed mb-8">
              Start exploring delicious recipes and add them to your favorites to create your personal cookbook!
            </p>
            <NavLink
              to="/recipes"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-400 hover:to-pink-500 dark:from-orange-500 dark:to-pink-600 dark:hover:from-orange-400 dark:hover:to-pink-500 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-pink-500/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-pink-400/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <ChefHat className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
              <span className="relative z-10">Browse Recipes</span>
            </NavLink>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((item, index) => (
                <div
                  key={item._id}
                  className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20 dark:border-gray-700"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  {/* Recipe Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Favorite Heart Icon */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white p-2 rounded-full shadow-lg">
                      <Heart className="h-4 w-4 fill-current" />
                    </div>
                  </div>

                  {/* Recipe Content */}
                  <div className="p-4 space-y-3">
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-white line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-yellow-400 transition-colors duration-300">
                      {item.title}
                    </h2>

                    {/* Recipe ID */}
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-gray-400 bg-slate-100 dark:bg-gray-700 px-3 py-1 rounded-full w-fit">
                      <ChefHat className="h-3 w-3" />
                      <span>Recipe ID: {item.recipeId}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2">
                      <a
                        href={`https://spoonacular.com/results/${item.title.toLowerCase().replace(/ /g, "-")}-${item.recipeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 text-sm"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View Full Recipe
                      </a>

                      <button
                        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 text-sm ${deleteLoading[item.recipeId]
                            ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                            : 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white'
                          }`}
                        onClick={() => deleteFavorite(item._id, item.recipeId)}
                        disabled={deleteLoading[item.recipeId]}
                      >
                        <Trash2 className="h-4 w-4" />
                        {deleteLoading[item.recipeId] ? 'Removing...' : 'Remove'}
                      </button>
                    </div>


                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default Favorites;