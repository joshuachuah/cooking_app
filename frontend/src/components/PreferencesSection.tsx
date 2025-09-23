import React from 'react';
import { PreferencesSectionProps } from '../types/api';

const PreferencesSection: React.FC<PreferencesSectionProps> = ({ 
  dietaryPreferences, 
  setDietaryPreferences
}) => {

  const dietaryOptions = [
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'gluten-free', label: 'Gluten-Free' },
    { value: 'dairy-free', label: 'Dairy-Free' },
    { value: 'halal', label: 'Halal' },
    { value: 'kosher', label: 'Kosher' },
    { value: 'keto', label: 'Keto' },
    { value: 'low-carb', label: 'Low-Carb' }
  ];

  const handleDietaryChange = (preference: string): void => {
    if (dietaryPreferences.dietaryRestrictions.includes(preference)) {
      setDietaryPreferences({
        ...dietaryPreferences,
        dietaryRestrictions: dietaryPreferences.dietaryRestrictions.filter((p: string) => p !== preference)
      });
    } else {
      setDietaryPreferences({
        ...dietaryPreferences,
        dietaryRestrictions: [...dietaryPreferences.dietaryRestrictions, preference]
      });
    }
  };

  const timeOptions = [
    { value: 'quick', label: 'Quick (<30min)', icon: '⚡' },
    { value: 'medium', label: 'Medium', icon: '🕐' },
    { value: 'any', label: 'Any time', icon: '🕐' }
  ];

  const difficultyOptions = [
    { value: 'easy', label: 'Easy', icon: '😊' },
    { value: 'medium', label: 'Medium', icon: '😐' },
    { value: 'any', label: 'Any level', icon: '✅' }
  ];

  const handleTimeChange = (value: string) => {
    setDietaryPreferences({
      ...dietaryPreferences,
      timePreference: value
    });
  };

  const handleDifficultyChange = (value: string) => {
    setDietaryPreferences({
      ...dietaryPreferences,
      difficulty: value
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 h-fit">
      <div className="flex items-center gap-2 mb-6">
        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
        </svg>
        <h2 className="text-xl font-semibold text-gray-900">Preferences</h2>
      </div>
      
      {/* Dietary Restrictions */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Dietary Restrictions</h3>
        <div className="grid grid-cols-3 gap-2">
          {dietaryOptions.map((option) => (
            <label 
              key={option.value}
              className="flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                checked={dietaryPreferences.dietaryRestrictions.includes(option.value)}
                onChange={() => handleDietaryChange(option.value)}
                className="mr-2 h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Time Available */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-sm font-medium text-gray-700">Time Available</h3>
        </div>
        <div className="flex gap-2">
          {timeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleTimeChange(option.value)}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                dietaryPreferences.timePreference === option.value
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{option.icon}</span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty Level */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-4">Difficulty Level</h3>
        <div className="flex gap-2">
          {difficultyOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleDifficultyChange(option.value)}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                dietaryPreferences.difficulty === option.value
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{option.icon}</span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </div>

       {/* Active Filters */}
       {(dietaryPreferences.dietaryRestrictions.length > 0 || dietaryPreferences.timePreference !== "any" || dietaryPreferences.difficulty !== "any") && (
        <div className="mt-6 p-3 bg-orange-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Active Filters</h4>
          <div className="flex flex-wrap gap-1">
            {dietaryPreferences.dietaryRestrictions.map((restriction) => (
              <span key={restriction} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                {restriction}
              </span>
            ))}
            {dietaryPreferences.timePreference !== "any" && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {timeOptions.find(opt => opt.value === dietaryPreferences.timePreference)?.label}
              </span>
            )}
            {dietaryPreferences.difficulty !== "any" && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {difficultyOptions.find(opt => opt.value === dietaryPreferences.difficulty)?.label} recipes
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PreferencesSection;
