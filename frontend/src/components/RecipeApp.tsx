import { useState } from 'react';
import axios from 'axios';
import IngredientInput from './IngredientInput';
import PreferencesSection from './PreferencesSection';
import RecipesList from './RecipesList';
import { RecipeResponse, RecipeRequest, FeedbackRequest, DietaryPreferences } from '../types/api';
import heroImage from "../assets/hero.jpg";

function App(): JSX.Element {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [dietaryPreferences, setDietaryPreferences] = useState<DietaryPreferences>({
    dietaryRestrictions: [],
    timePreference: 'any',
    difficulty: 'any'
  });
  const [recipes, setRecipes] = useState<RecipeResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleGetRecipes = async (): Promise<void> => {
    if (ingredients.length === 0) {
      setError('Please add at least one ingredient');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Convert time preference to max_prep_time
      let maxPrepTime: number | undefined;
      if (dietaryPreferences.timePreference === 'quick') {
        maxPrepTime = 30;
      } else if (dietaryPreferences.timePreference === 'medium') {
        maxPrepTime = 60;
      }

      const requestData: RecipeRequest = {
        ingredients,
        dietary_preferences: dietaryPreferences.dietaryRestrictions,
        max_prep_time: maxPrepTime
      };
      
      const response = await axios.post<RecipeResponse[]>('/recipes/suggest', requestData);
      setRecipes(response.data);
    } catch (err) {
      setError('Failed to get recipe suggestions. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = async (recipeTitle: string, rating: boolean): Promise<void> => {
    try {
      const feedbackData: FeedbackRequest = {
        recipe_title: recipeTitle,
        rating,
        ingredients_used: ingredients
      };
      
      await axios.post('/feedback', feedbackData);
    } catch (err) {
      console.error('Error submitting feedback:', err);
    }
  };

  return (
    <div className="min-h-screen">
     <section className="relative bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                
                <span className="text-2xl font-bold">CookSmart</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Turn Your Ingredients Into
                <span className="block text-orange-100"> Delicious Meals</span>
              </h1>
              
              <p className="text-xl text-white/90 max-w-lg">
                Tell us what ingredients you have, and we'll suggest amazing recipes you can make right now. No more wondering "what should I cook?"
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
              </div>
            </div>
            
            <div className="lg:block">
              <img 
                src={heroImage} 
                alt="Fresh ingredients ready for cooking" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Recipe Finder Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Let's Find Your Perfect Recipe
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Add your ingredients and preferences, then let our AI suggest what you can cook
            </p>
          </div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <IngredientInput 
              ingredients={ingredients}
              setIngredients={setIngredients}
            />

            <PreferencesSection
              dietaryPreferences={dietaryPreferences}
              setDietaryPreferences={setDietaryPreferences}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-8 max-w-md mx-auto">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-center">
                {error}
              </div>
            </div>
          )}

          {/* Get Recipes Button */}
          <div className="text-center mt-8">
            <button 
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              onClick={handleGetRecipes}
              disabled={loading || ingredients.length === 0}
            >
              {loading ? '🔍 Finding Recipes...' : '🍽️ Get Recipe Suggestions'}
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center mt-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-blue-700">
                <p className="text-lg">Our AI chef is working on your recipes...</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Recipes Results */}
      {recipes.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <RecipesList 
              recipes={recipes}
              onFeedback={handleFeedback}
            />
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
