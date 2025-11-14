# AI Recipe Suggestion App

An AI-powered cooking app that suggests recipes based on the ingredients you have on hand.

## MVP Features

- **Ingredient Input**: Type or select ingredients you currently have
- **AI Recipe Suggestions**: Get 2-3 recipe suggestions based on your ingredients
- **Basic Preferences**: Set dietary filters and time constraints
- **Feedback Loop**: Rate recipes to help the AI learn your preferences

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: FastAPI
- **AI**: GPT-4o-mini
- **Data**: Recipe datasets (RecipeNLG, Food.com)

## Project Structure

```
cook_fast/
├── backend/          # FastAPI backend
├── frontend/         # React frontend
├── requirements.txt  # Python dependencies
└── README.md        # This file
```

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- OpenAI API key

### Quick Setup

1. **Clone and navigate to the project:**
   ```bash
   cd cook_fast
   ```
2. **Set up virtual environment in the backend directory**
   ```python -m venv venv```

   
2. **Set up the backend:**
   ```bash
   cd backend
   pip install -r requirements.txt
   
   # Create a .env file with your OpenAI API key
   echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
   
   # Start the FastAPI server
   uvicorn main:app --reload
   ```
   The backend will be available at `http://localhost:8000`

3. **Set up the frontend (in a new terminal):**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`

### Environment Variables

Create a `.env` file in the backend directory:
```
OPENAI_API_KEY=your_openai_api_key_here
```

### API Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check
- `POST /recipes/suggest` - Get recipe suggestions
- `POST /feedback` - Submit recipe feedback

### Example Usage

1. Open `http://localhost:3000` in your browser
2. Add ingredients you have (e.g., "eggs", "rice", "onion")
3. Set dietary preferences and time constraints (optional)
4. Click "Get Recipe Suggestions"
5. Rate the recipes with thumbs up/down to improve future suggestions
