import React, { useState } from 'react';
import { IngredientInputProps } from '../types/api';

const IngredientInput: React.FC<IngredientInputProps> = ({ ingredients, setIngredients }) => {
  const [currentIngredient, setCurrentIngredient] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

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

  // Available ingredients organized by category
  const availableIngredients: string[] = [
    'Eggs', 'Rice', 'Onion', 'Garlic', 'Tomato', 'Chicken', 'Pasta', 'Cheese',
    'Milk', 'Bread', 'Butter', 'Salt', 'Pepper', 'Olive Oil', 'Flour', 'Sugar'
  ];

  const addAvailableIngredient = (ingredient: string): void => {
    const lowerIngredient = ingredient.toLowerCase();
    if (!ingredients.includes(lowerIngredient)) {
      setIngredients([...ingredients, lowerIngredient]);
    }
  };

  const filteredIngredients = availableIngredients.filter(ingredient =>
    ingredient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 h-fit">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">What ingredients do you have?</h2>
      <p className="text-gray-600 mb-6">Select or add ingredients you have available</p>
      
      {/* Search Input */}
      <div className="mb-4">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Add Custom Ingredient */}
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add custom ingredient..."
            value={currentIngredient}
            onChange={(e) => setCurrentIngredient(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <button 
            onClick={addIngredient}
            disabled={!currentIngredient.trim()}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Selected Ingredients */}
      {ingredients.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Selected Ingredients</h3>
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ingredient, index) => (
              <span 
                key={index}
                className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                <span className="capitalize">{ingredient}</span>
                <button 
                  onClick={() => removeIngredient(ingredient)}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Available Ingredients */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Available Ingredients</h3>
        <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto">
          {filteredIngredients.map((ingredient, index) => (
            <button
              key={index}
              onClick={() => addAvailableIngredient(ingredient)}
              disabled={ingredients.includes(ingredient.toLowerCase())}
              className="p-3 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-500 transition-colors text-center"
            >
              {ingredient}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IngredientInput;