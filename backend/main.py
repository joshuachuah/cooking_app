from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from openai import OpenAI
import os
from dotenv import load_dotenv

# load environment variables
load_dotenv()

app = FastAPI(title="Cook Fast API", description="AI-powered recipe suggestions based on available ingredients")

# configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React development server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# initialize OpenAI client
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    print("WARNING: OPENAI_API_KEY not found in environment variables!")
else:
    print("OpenAI API key loaded successfully")

client = OpenAI(api_key=api_key)

# Pydantic models
class RecipeRequest(BaseModel):
    ingredients: List[str]
    dietary_preferences: Optional[List[str]] = []
    max_prep_time: Optional[int] = None  # in minutes
    
class RecipeResponse(BaseModel):
    title: str
    description: str
    prep_time: int  # in minutes
    steps: List[str]
    substitutions: Optional[List[str]] = []

class FeedbackRequest(BaseModel):
    recipe_title: str
    rating: bool  # True for thumbs up, False for thumbs down
    ingredients_used: List[str]

@app.get("/")
async def root():
    return {"message": "Welcome to Cook Fast API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/recipes/suggest", response_model=List[RecipeResponse])
async def suggest_recipes(request: RecipeRequest):
    """
    Suggest recipes based on available ingredients and preferences
    """
    try:
        # prepare the prompt for OpenAI
        prompt = create_recipe_prompt(request.ingredients, request.dietary_preferences, request.max_prep_time)
        
        # call OpenAI API
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful cooking assistant that suggests recipes based on available ingredients."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=1500
        )
        
        # parse the response and return structured recipes
        recipes = parse_ai_response(response.choices[0].message.content)
        return recipes
        
    except Exception as e:
        print(f"Error in suggest_recipes: {str(e)}")  # Add logging
        import traceback
        traceback.print_exc()  # print full traceback
        raise HTTPException(status_code=500, detail=f"Error generating recipes: {str(e)}")

@app.post("/feedback")
async def submit_feedback(feedback: FeedbackRequest):
    """
    Submit feedback for a recipe to improve future suggestions
    """
    # Log the feedback for now since it's in development
    # In a production app, this would be stored in a database
    print(f"Feedback received: {feedback.recipe_title} - {'👍' if feedback.rating else '👎'}")
    return {"message": "Feedback received successfully"}

def create_recipe_prompt(ingredients: List[str], dietary_preferences: List[str], max_prep_time: Optional[int]) -> str:
    """
    Create a structured prompt for the AI to generate recipes
    """
    ingredients_str = ", ".join(ingredients)
    
    prompt = f"""
    I have these ingredients available: {ingredients_str}
    
    Please suggest 2-3 recipes that I can make using ONLY these ingredients (or common pantry staples like salt, pepper, oil).
    
    Requirements:
    - Use primarily the ingredients I listed
    - If missing a key ingredient, suggest a substitution
    - Include prep time for each recipe
    """
    
    if dietary_preferences:
        dietary_str = ", ".join(dietary_preferences)
        prompt += f"\n- Must be {dietary_str}"
    
    if max_prep_time:
        prompt += f"\n- Must take {max_prep_time} minutes or less to prepare"
    
    prompt += """
    
    Please format your response as JSON with this structure:
    [
        {
            "title": "Recipe Name",
            "description": "Brief description",
            "prep_time": 15,
            "steps": ["List of cooking steps WITHOUT numbers - just the action"],
            "substitutions": ["If missing X, use Y"]
        }
    ]
    
    IMPORTANT: Do NOT include step numbers (1., 2., 3., etc.) in the steps array. Just provide the cooking instructions as plain text.
    """
    
    return prompt

def parse_ai_response(response_text: str) -> List[RecipeResponse]:
    """
    Parse the AI response and convert to structured recipe objects
    """
    import json
    import re
    
    try:
        # Try to extract JSON from the response
        json_match = re.search(r'\[.*\]', response_text, re.DOTALL)
        if json_match:
            json_str = json_match.group()
            recipes_data = json.loads(json_str)
            
            recipes = []
            for recipe_data in recipes_data:
                recipe = RecipeResponse(
                    title=recipe_data.get("title", "Unknown Recipe"),
                    description=recipe_data.get("description", "No description available"),
                    prep_time=recipe_data.get("prep_time", 30),
                    steps=recipe_data.get("steps", []),
                    substitutions=recipe_data.get("substitutions", [])
                )
                recipes.append(recipe)
            
            return recipes
        else:
            # Fallback: create a simple recipe from the text
            return [RecipeResponse(
                title="Generated Recipe",
                description="Recipe based on your ingredients",
                prep_time=30,
                steps=[response_text],
                substitutions=[]
            )]
            
    except Exception as e:
        # Fallback response if parsing fails
        return [RecipeResponse(
            title="Recipe Suggestion",
            description="We found a recipe for you, but had trouble formatting it properly.",
            prep_time=30,
            steps=[response_text],
            substitutions=[]
        )]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

