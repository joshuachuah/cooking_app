import React, { useState } from 'react';
import { RecipesListProps, RecipeResponse } from '../types/api';

interface FeedbackState {
  [recipeTitle: string]: boolean;
}

interface ExpandedState {
  [recipeTitle: string]: boolean;
}

const RecipesList: React.FC<RecipesListProps> = ({ recipes, onFeedback }) => {
  const [feedback, setFeedback] = useState<FeedbackState>({});
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const handleFeedback = (recipeTitle: string, rating: boolean): void => {
    setFeedback({ ...feedback, [recipeTitle]: rating });
    onFeedback(recipeTitle, rating);
  };

  const toggleExpanded = (recipeTitle: string): void => {
    setExpanded({ ...expanded, [recipeTitle]: !expanded[recipeTitle] });
  };

  const formatPrepTime = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMins = minutes % 60;
    return remainingMins > 0 ? `${hours}h ${remainingMins}m` : `${hours}h`;
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Recipe Suggestions</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Delicious recipes crafted just for you based on your ingredients and preferences
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recipes.map((recipe: RecipeResponse, index: number) => (
          <div 
            key={index} 
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 overflow-hidden animate-slide-up group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Compact header with image placeholder and prep time */}
            <div className="relative h-32 bg-gradient-to-br from-orange-400 to-orange-500">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute top-3 right-3">
                <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-gray-700">
                  ⏱️ {formatPrepTime(recipe.prep_time)}
                </div>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2">
                  {recipe.title}
                </h3>
              </div>
            </div>

            {/* Compact content */}
            <div className="p-4">
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {recipe.description}
              </p>

              {/* Quick info row */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <span>{recipe.steps.length} steps</span>
                {recipe.substitutions && recipe.substitutions.length > 0 && (
                  <span>🔄 {recipe.substitutions.length} substitutions</span>
                )}
              </div>

              {/* Expandable details */}
              {expanded[recipe.title] && (
                <div className="border-t pt-3 mt-3 space-y-3">
                  {recipe.substitutions && recipe.substitutions.length > 0 && (
                    <div className="bg-orange-50 rounded-lg p-3">
                      <h4 className="font-medium text-sm mb-2 text-orange-800">Smart Substitutions</h4>
                      <ul className="space-y-1">
                        {recipe.substitutions.map((substitution: string, subIndex: number) => (
                          <li key={subIndex} className="text-xs text-orange-700">
                            • {substitution}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="bg-gray-50 rounded-lg p-3">
                    <h4 className="font-medium text-sm mb-2 text-gray-800">Instructions</h4>
                    <ol className="space-y-1">
                      {recipe.steps.map((step: string, stepIndex: number) => (
                        <li key={stepIndex} className="text-xs text-gray-700 flex gap-2">
                          <span className="bg-orange-500 text-white w-4 h-4 rounded-full flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">
                            {stepIndex + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <button
                  onClick={() => toggleExpanded(recipe.title)}
                  className="text-xs font-medium text-orange-600 hover:text-orange-700 transition-colors"
                >
                  {expanded[recipe.title] ? '↑ Less' : '↓ Details'}
                </button>
                
                <div className="flex gap-1">
                  <button
                    className={`p-1.5 rounded-lg transition-all duration-200 hover:scale-110 ${
                      feedback[recipe.title] === true 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 hover:bg-green-50 text-gray-400 hover:text-green-500'
                    }`}
                    onClick={() => handleFeedback(recipe.title, true)}
                    title="I love this recipe!"
                  >
                    <span className="text-sm">👍</span>
                  </button>
                  <button
                    className={`p-1.5 rounded-lg transition-all duration-200 hover:scale-110 ${
                      feedback[recipe.title] === false 
                        ? 'bg-red-100 text-red-600' 
                        : 'bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-500'
                    }`}
                    onClick={() => handleFeedback(recipe.title, false)}
                    title="Not my taste"
                  >
                    <span className="text-sm">👎</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xl">💡</span>
          </div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Pro Cooking Tips</h3>
          <p className="text-gray-600 mb-4 text-sm">
            Don't have all the ingredients? Check the substitution suggestions above, or experiment with what you have! 
            Cooking is all about creativity and making it your own.
          </p>
          <p className="text-xs text-gray-500">
            🎯 Your feedback helps our AI learn your taste preferences for even better suggestions next time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipesList;
