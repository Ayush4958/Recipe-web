import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { Heart, Search, Filter, ChefHat, Sparkles, ExternalLink, X, Check } from 'lucide-react'
import { useUser } from "@clerk/clerk-react"

function Recipe() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const [trigger, settrigger] = useState(false)
  const [result, setresult] = useState([])
  const [favoriteLoading, setFavoriteLoading] = useState({})
  
  // Custom alert state
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('success') // 'success' or 'error'

  const cuisines = ["African", "Asian", "American", "British", "Cajun", "Caribbean", "Chinese", "Eastern European", "European", "French", "German", "Greek", "Indian", "Irish", "Italian", "Japanese", "Jewish", "Korean", "Latin American", "Mediterranean", "Mexican", "Middle Eastern", "Nordic", "Southern", "Spanish", "Thai", "Vietnamese"];
  const diets = ["omnivore", "pescetarian", "vegetarian", "ovo vegetarian", "lacto vegetarian", "vegan", "fruitarian", "paleo"]
  const favs = ["energy", "calories", "calcium", "carbs", "iron", "iodine", "protein", "total-fat", "sugar", "zinc"]

  // Custom alert function
  const showCustomAlert = (message, type = 'success') => {
    setAlertMessage(message)
    setAlertType(type)
    setShowAlert(true)
  }

  const hideAlert = () => {
    setShowAlert(false)
    setAlertMessage('')
  }

  useEffect(() => {
      async function api() {
          const apikey = "b97215433a1046a2934bd1140997a4d7"
          const query = watch('query')
          const cuisine = watch("cuisine")
          const no = watch("number")
          const diet = watch("diet")
          const ingd = watch("ingd")
      const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&sort=${ingd}&cuisine=${cuisine}&diet=${diet}&number=${no}&apiKey=${apikey}`

      try {
          const res = await fetch(url)
          if (!res.ok) {
              throw new Error("Invalid response from API")
            }
        const data = await res.json()
        setresult(data.results)
      } catch (err) {
          console.error("Fetch Error:", err.message)
        }
      }
      api()
    },[trigger])

  const { user } = useUser();

  const handleFavorite = async (item) => {
    if (!user) {
      showCustomAlert("Please log in to save favorites.", 'error');
      return;
    }

    const favoriteData = {
      userId: user.id,
      recipeId: item.id,
      title: item.title,
      image: item.image,
    };
    try {
      const res = await fetch("https://recipe-web-x4ys.onrender.com/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(favoriteData),
      });

      if (res.ok) {
        showCustomAlert("Recipe saved to favorites!", 'success');
      } else {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to save recipe");
      }
    } catch (err) {
      console.error("Error saving favorite:", err.message);
      showCustomAlert("Failed to save recipe to favorites. Please try again.", 'error');
    } 
  };

  const onSubmit = (data) => console.log(data)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-[#1a0b2e] dark:via-[#16213e] dark:to-[#0f3460] transition-all duration-500">
      
      {/* Custom Alert Overlay */}
      {showAlert && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-2xl p-6 max-w-md w-full mx-auto shadow-2xl border border-white/20 dark:border-gray-700 transform animate-scale-in">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                alertType === 'success' 
                  ? 'bg-green-100 dark:bg-green-900/30' 
                  : 'bg-red-100 dark:bg-red-900/30'
              }`}>
                {alertType === 'success' ? (
                  <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                ) : (
                  <X className="w-5 h-5 text-red-600 dark:text-red-400" />
                )}
              </div>

              {/* Message */}
              <div className="flex-1">
                <h3 className={`font-semibold text-lg mb-1 ${
                  alertType === 'success' 
                    ? 'text-green-800 dark:text-green-200' 
                    : 'text-red-800 dark:text-red-200'
                }`}>
                  {alertType === 'success' ? 'Success!' : 'Error!'}
                </h3>
                <p className="text-slate-700 dark:text-gray-300 text-sm">
                  {alertMessage}
                </p>
              </div>
            </div>

            {/* OK Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={hideAlert}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                  alertType === 'success'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
                    : 'bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white'
                }`}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      
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
            <span className="text-sm font-semibold tracking-wider uppercase">Recipe Discovery</span>
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 text-slate-800 dark:text-white">
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 dark:from-yellow-400 dark:via-pink-500 dark:to-purple-600 bg-clip-text text-transparent">
              We Got Every
            </span>
            <br />
            <span className="text-slate-800 dark:text-white">
              Recipes Here
            </span>
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Welcome to your ultimate recipe hub! Whether you're a seasoned chef or just starting out in the kitchen, 
            we've got something for everyone. Explore handpicked recipes tailored to your taste, time, and dietary needs. 
            Easily find what you're craving by cuisine, meal type, cooking style, and dietary requirements.
          </p>
        </div>

        {/* Filter Form */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="bg-white/10 dark:bg-black/20 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/20 dark:border-gray-700 shadow-2xl">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="h-5 w-5 text-orange-600 dark:text-yellow-400" />
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">Filter Your Perfect Recipe</h2>
            </div>
            
            <div className="space-y-6">
              
              {/* Filter Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                
                {/* Filter by cuisine */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-gray-300">Cuisine</label>
                  <div className="relative">
                    <input 
                      list="cuisine-options" 
                      placeholder="Select a cuisine" 
                      {...register("cuisine")} 
                      className="w-full px-4 py-3 bg-white/80 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm text-sm sm:text-base focus:ring-2 focus:ring-orange-500 dark:focus:ring-yellow-400 focus:border-transparent transition-all duration-300 text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-gray-400" 
                    />
                    <datalist id="cuisine-options">
                      {cuisines.map((cuisine, index) => (
                        <option value={cuisine} key={index} />
                      ))}
                    </datalist>
                  </div>
                  </div>

                {/* Filter by Query = Dish */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-gray-300">Dish Name</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Enter dish name" 
                      {...register("query")} 
                      className="w-full pl-10 pr-4 py-3 bg-white/80 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm text-sm sm:text-base focus:ring-2 focus:ring-orange-500 dark:focus:ring-yellow-400 focus:border-transparent transition-all duration-300 text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-gray-400" 
                    />
                  </div>
                </div>

                {/* filter for number of dishes */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-gray-300">Number of Recipes</label>
                  <input 
                    type="number" 
                    placeholder="Enter number" 
                    min="1"
                    max="100"
                    {...register("number")} 
                    className="w-full px-4 py-3 bg-white/80 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm text-sm sm:text-base focus:ring-2 focus:ring-orange-500 dark:focus:ring-yellow-400 focus:border-transparent transition-all duration-300 text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-gray-400" 
                  />
                </div>

                {/* filter for Diet */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-gray-300">Diet</label>
                  <input 
                    list="diets-options" 
                    placeholder="Select a diet" 
                    {...register("diet")} 
                    className="w-full px-4 py-3 bg-white/80 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm text-sm sm:text-base focus:ring-2 focus:ring-orange-500 dark:focus:ring-yellow-400 focus:border-transparent transition-all duration-300 text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-gray-400" 
                  />
                  <datalist id="diets-options">
                    {diets.map((diet, index) => (
                      <option value={diet} key={index} />
                    ))}
                  </datalist>
                </div>

                {/* filter for nutrients */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-gray-300">Sort by Nutrient</label>
                  <input 
                    list="fav-options" 
                    placeholder="Select nutrient" 
                    {...register("ingd")} 
                    className="w-full px-4 py-3 bg-white/80 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm text-sm sm:text-base focus:ring-2 focus:ring-orange-500 dark:focus:ring-yellow-400 focus:border-transparent transition-all duration-300 text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-gray-400" 
                  />
                  <datalist id="fav-options">
                    {favs.map((ing, index) => (
                      <option value={ing} key={index} />
                    ))}
                  </datalist>
                 
                </div>
              </div>

              {/* Search Button */}
              <div className="flex justify-center pt-4">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    settrigger(!trigger);
                    handleSubmit(onSubmit)();
                  }}
                  type="button" 
                  disabled={isSubmitting}
                  className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-400 hover:to-pink-500 dark:from-orange-500 dark:to-pink-600 dark:hover:from-orange-400 dark:hover:to-pink-500 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-pink-500/30 relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-pink-400/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <Search className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
                  <span className="relative z-10">{isSubmitting ? 'Searching...' : 'Get Recipes'}</span>
                  <ChefHat className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {result.length > 0 && (
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-2">
                Delicious Recipes Found
              </h3>
              <p className="text-slate-600 dark:text-gray-300">
                {result.length} recipe{result.length !== 1 ? 's' : ''} ready to cook
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {result.map((item) => (
                <div 
                  key={item.id} 
                  className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20 dark:border-gray-700"
                >
                  {/* Recipe Image */}
                  <div className="relative overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Recipe Content */}
                  <div className="p-4 space-y-3">
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-white line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-yellow-400 transition-colors duration-300">
                      {item.title}
                    </h2>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2">
                      <a 
                        href={`https://spoonacular.com/results/${item.title.toLowerCase().replace(/ /g, "-")}-${item.id}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 text-sm"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View Full Recipe
                      </a>

                      <button 
                        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 text-sm ${
                          favoriteLoading[item.id] 
                            ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white'
                        }`}
                        onClick={() => handleFavorite(item)}
                        disabled={favoriteLoading[item.id]}
                      >
                        <Heart className={`h-4 w-4 ${favoriteLoading[item.id] ? '' : 'group-hover:fill-current'}`} />
                        {favoriteLoading[item.id] ? 'Saving...' : 'Add to Favorites'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {result.length === 0 && (
          <div className="text-center py-12">
            <ChefHat className="h-16 w-16 mx-auto text-slate-400 dark:text-gray-500 mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 dark:text-gray-400 mb-2">
              Ready to Find Your Perfect Recipe?
            </h3>
            <p className="text-slate-500 dark:text-gray-500">
              Use the filters above to discover amazing recipes tailored to your taste!
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

export default Recipe