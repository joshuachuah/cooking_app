import React, { useState } from 'react';
import axios from 'axios';
import IngredientInput from './components/IngredientInput';
import PreferencesSection from './components/PreferencesSection';
import RecipesList from './components/RecipesList';
import { RecipeResponse, RecipeRequest, FeedbackRequest } from './types/api';

function App(): JSX.Element {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);
  const [maxPrepTime, setMaxPrepTime] = useState<string>('');
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
      const requestData: RecipeRequest = {
        ingredients,
        dietary_preferences: dietaryPreferences,
        max_prep_time: maxPrepTime ? parseInt(maxPrepTime) : undefined
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
    <div className="container">
      <header className="header">
        <h1>🍳 Cook Fast</h1>
        <p>Tell us what ingredients you have, and we'll suggest delicious recipes!</p>
      </header>

      <main className="main-content">
        <IngredientInput 
          ingredients={ingredients}
          setIngredients={setIngredients}
        />

        <PreferencesSection
          dietaryPreferences={dietaryPreferences}
          setDietaryPreferences={setDietaryPreferences}
          maxPrepTime={maxPrepTime}
          setMaxPrepTime={setMaxPrepTime}
        />

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <button 
          className="get-recipes-btn"
          onClick={handleGetRecipes}
          disabled={loading || ingredients.length === 0}
        >
          {loading ? '🔍 Finding Recipes...' : '🍽️ Get Recipe Suggestions'}
        </button>

        {loading && (
          <div className="loading">
            <p>Our AI chef is working on your recipes...</p>
          </div>
        )}

        {recipes.length > 0 && (
          <RecipesList 
            recipes={recipes}
            onFeedback={handleFeedback}
          />
        )}
      </main>
    </div>
  );
}

export default App;
