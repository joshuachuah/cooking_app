import React, { useState } from 'react';
import { IngredientInputProps } from '../types/api';

const IngredientInput: React.FC<IngredientInputProps> = ({ ingredients, setIngredients }) => {
  const [currentIngredient, setCurrentIngredient] = useState<string>('');

  const addIngredient = (): void => {
    const ingredient = currentIngredient.trim().toLowerCase();
    if (ingredient && !ingredients.includes(ingredient)) {
      setIngredients([...ingredients, ingredient]);
      setCurrentIngredient('');
    }
  };

  const removeIngredient = (ingredientToRemove: string): void => {
    setIngredients(ingredients.filter(ingredient => ingredient !== ingredientToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      addIngredient();
    }
  };

  // Common ingredients for quick selection
  const commonIngredients: string[] = [
    'eggs', 'rice', 'chicken', 'onion', 'garlic', 'tomato', 'potato', 'carrot',
    'bell pepper', 'broccoli', 'pasta', 'cheese', 'milk', 'butter', 'flour',
    'olive oil', 'ground beef', 'salmon', 'spinach', 'mushrooms'
  ];

  const addCommonIngredient = (ingredient: string): void => {
    if (!ingredients.includes(ingredient)) {
      setIngredients([...ingredients, ingredient]);
    }
  };

  return (
    <div className="ingredient-section">
      <h2>🥘 What ingredients do you have?</h2>
      
      <div className="ingredient-input">
        <input
          type="text"
          placeholder="Type an ingredient (e.g., eggs, rice, chicken)"
          value={currentIngredient}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentIngredient(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button 
          className="add-btn"
          onClick={addIngredient}
          disabled={!currentIngredient.trim()}
        >
          Add
        </button>
      </div>

      {ingredients.length > 0 && (
        <div>
          <h3>Your ingredients:</h3>
          <div className="ingredients-list">
            {ingredients.map((ingredient: string, index: number) => (
              <div key={index} className="ingredient-tag">
                <span>{ingredient}</span>
                <button 
                  className="remove-btn"
                  onClick={() => removeIngredient(ingredient)}
                  title="Remove ingredient"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <h3>🔥 Quick add common ingredients:</h3>
        <div className="ingredients-list">
          {commonIngredients
            .filter((ingredient: string) => !ingredients.includes(ingredient))
            .slice(0, 10)
            .map((ingredient: string, index: number) => (
              <button
                key={index}
                className="ingredient-tag"
                style={{ 
                  cursor: 'pointer',
                  border: '2px dashed #667eea',
                  background: 'transparent',
                  color: '#667eea'
                }}
                onClick={() => addCommonIngredient(ingredient)}
              >
                + {ingredient}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default IngredientInput;
