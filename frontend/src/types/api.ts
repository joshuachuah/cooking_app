// API Request and Response Types

export interface RecipeRequest {
  ingredients: string[];
  dietary_preferences: string[];
  max_prep_time?: number;
}

export interface RecipeResponse {
  title: string;
  description: string;
  prep_time: number;
  steps: string[];
  substitutions?: string[];
}

export interface FeedbackRequest {
  recipe_title: string;
  rating: boolean;
  ingredients_used: string[];
}

export interface FeedbackResponse {
  message: string;
}

// Component Props Types

export interface IngredientInputProps {
  ingredients: string[];
  setIngredients: (ingredients: string[]) => void;
}

export interface PreferencesSectionProps {
  dietaryPreferences: string[];
  setDietaryPreferences: (preferences: string[]) => void;
  maxPrepTime: string;
  setMaxPrepTime: (time: string) => void;
}

export interface RecipesListProps {
  recipes: RecipeResponse[];
  onFeedback: (recipeTitle: string, rating: boolean) => void;
}

// Utility Types

export interface DietaryOption {
  value: string;
  label: string;
}

export interface TimePreset {
  value: number | '';
  label: string;
}
