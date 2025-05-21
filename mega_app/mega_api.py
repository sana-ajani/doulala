from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mega_app.knowledge_crib import knowledge_crib_API  # Import the Knowledge Crib API
from mega_app.main import Lala_API  # Import the Lala API
from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime
from typing import List  
from mangum import Mangum
import os
import functions_framework

# Initialize the main FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount the sub-apps
app.mount("/doulala", Lala_API)
app.mount("/crib", knowledge_crib_API)

# Define a router for additional routes
router = APIRouter()

# Profile-related routes
class ProfileData(BaseModel):
    age: int
    monthsToGo: int
    dueDate: str

@router.get("/api/profile")
async def get_profile(mother_age: int = 27, month_of_pregnancy: int = 3):
    # Example values
    months_to_go = 9 - month_of_pregnancy

    # Calculate due date
    due_date = datetime.now().date().replace(month=datetime.now().month + months_to_go)

    return {
        "age": mother_age,
        "monthsToGo": months_to_go,
        "dueDate": due_date.strftime("%Y-%m-%d")
    }

@router.put("/api/profile/due-date")
async def update_due_date(data: dict):
    # Update the due date in your database/storage
    return {"status": "success"}

# Article-related routes
class ArticleRequest(BaseModel):
    category: str

class Article(BaseModel):
    title: str
    author: str
    preview: str
    url: str

@router.get("/categories")
async def get_categories():
    return [
        'patient_development',
        'child_development',
        'lifestyle',
        'risks',
        'wellness_mindfulness'
    ]

@router.post("/articles")
async def get_articles(request: ArticleRequest) -> List[Article]:
    # Placeholder logic for returning articles
    return [
        Article(
            title="Sample Article",
            author="Author Name",
            preview="This is a preview of the article.",
            url="https://example.com"
        )
    ]

# Include the router in the main app
app.include_router(router) 

@app.get("/")
def home():
    return {"message": "it works"}

# Create a single Mangum handler for both environments
handler = Mangum(app)

# AWS Lambda handler
def Expose(request):
    return handler(request)

# Google Cloud Functions handler
@functions_framework.http
def doulala(request):
    return handler(request)

# Start the FastAPI server
#if __name__ == "__main__":
    #import uvicorn
    #uvicorn.run(app, host="0.0.0.0", port=port)    