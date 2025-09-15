import React from 'react';
import { PreferencesSectionProps, DietaryOption, TimePreset } from '../types/api';

const PreferencesSection: React.FC<PreferencesSectionProps> = ({ 
  dietaryPreferences, 
  setDietaryPreferences, 
  maxPrepTime, 
  setMaxPrepTime 
}) => {
  const dietaryOptions: DietaryOption[] = [
    { value: 'vegetarian', label: '🥬 Vegetarian' },
    { value: 'vegan', label: '🌱 Vegan' },
    { value: 'gluten-free', label: '🌾 Gluten-Free' },
    { value: 'dairy-free', label: '🥛 Dairy-Free' },
    { value: 'halal', label: '☪️ Halal' },
    { value: 'kosher', label: '✡️ Kosher' },
    { value: 'keto', label: '🥑 Keto' },
    { value: 'low-carb', label: '🥩 Low-Carb' }
  ];

  const handleDietaryChange = (preference: string): void => {
    if (dietaryPreferences.includes(preference)) {
      setDietaryPreferences(dietaryPreferences.filter((p: string) => p !== preference));
    } else {
      setDietaryPreferences([...dietaryPreferences, preference]);
    }
  };

  const timePresets: TimePreset[] = [
    { value: 15, label: '⚡ Super Quick (15 min)' },
    { value: 30, label: '🏃 Quick (30 min)' },
    { value: 60, label: '⏰ Medium (1 hour)' },
    { value: '', label: '🕐 No time limit' }
  ];

  return (
    <div className="preferences-section">
      <h2>⚙️ Preferences</h2>
      
      <div className="preferences-grid">
        <div className="preference-group">
          <h3>🍽️ Dietary Restrictions</h3>
          <div className="checkbox-group">
            {dietaryOptions.map((option: DietaryOption) => (
              <label key={option.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={dietaryPreferences.includes(option.value)}
                  onChange={() => handleDietaryChange(option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="preference-group">
          <h3>⏱️ How much time do you have?</h3>
          <div className="checkbox-group">
            {timePresets.map((preset: TimePreset, index: number) => (
              <label key={index} className="checkbox-item">
                <input
                  type="radio"
                  name="timePreset"
                  checked={maxPrepTime === preset.value.toString() || (preset.value === '' && maxPrepTime === '')}
                  onChange={() => setMaxPrepTime(preset.value.toString())}
                />
                <span>{preset.label}</span>
              </label>
            ))}
          </div>
          
          <div className="time-input">
            <label>Or custom time:</label>
            <input
              type="number"
              placeholder="minutes"
              min="5"
              max="300"
              value={maxPrepTime}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMaxPrepTime(e.target.value)}
            />
            <span>minutes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencesSection;
