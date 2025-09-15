import React, { useState } from 'react';
import { RecipesListProps, RecipeResponse } from '../types/api';

interface FeedbackState {
  [recipeTitle: string]: boolean;
}

const RecipesList: React.FC<RecipesListProps> = ({ recipes, onFeedback }) => {
  const [feedback, setFeedback] = useState<FeedbackState>({});

  const handleFeedback = (recipeTitle: string, rating: boolean): void => {
    setFeedback({ ...feedback, [recipeTitle]: rating });
    onFeedback(recipeTitle, rating);
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
    <div className="recipes-section">
      <h2>🍽️ Recipe Suggestions</h2>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
        Here are some delicious recipes you can make with your ingredients!
      </p>
      
      <div className="recipes-grid">
        {recipes.map((recipe: RecipeResponse, index: number) => (
          <div key={index} className="recipe-card">
            <h3>{recipe.title}</h3>
            <div className="prep-time">
              ⏱️ {formatPrepTime(recipe.prep_time)}
            </div>
            <p className="description">{recipe.description}</p>

            {recipe.substitutions && recipe.substitutions.length > 0 && (
              <div className="substitutions">
                <h4>💡 Ingredient Substitutions:</h4>
                <ul>
                  {recipe.substitutions.map((substitution: string, subIndex: number) => (
                    <li key={subIndex}>{substitution}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="recipe-steps">
              <h4>📝 Instructions:</h4>
              <ol>
                {recipe.steps.map((step: string, stepIndex: number) => (
                  <li key={stepIndex}>{step}</li>
                ))}
              </ol>
            </div>

            <div className="feedback-buttons">
              <button
                className={`feedback-btn thumbs-up ${
                  feedback[recipe.title] === true ? 'active' : ''
                }`}
                onClick={() => handleFeedback(recipe.title, true)}
                title="I like this recipe!"
              >
                👍
              </button>
              <button
                className={`feedback-btn thumbs-down ${
                  feedback[recipe.title] === false ? 'active' : ''
                }`}
                onClick={() => handleFeedback(recipe.title, false)}
                title="Not my taste"
              >
                👎
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ 
        textAlign: 'center', 
        marginTop: '40px', 
        padding: '20px', 
        background: '#f8f9fa', 
        borderRadius: '12px',
        color: '#666'
      }}>
        <p>
          💡 <strong>Pro tip:</strong> Don't have all the ingredients? 
          Check the substitution suggestions above, or try the recipe with what you have!
        </p>
        <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>
          🎯 Your feedback helps our AI learn your preferences for better suggestions next time.
        </p>
      </div>
    </div>
  );
};

export default RecipesList;
