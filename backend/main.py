from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from supabase_client import supabase

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserProfile(BaseModel):
    user_id: str
    age: Optional[int] = None
    gender: Optional[str] = None
    city: Optional[str] = None
    wedding_date: Optional[str] = None
    budget: Optional[float] = None

@app.get("/")
def read_root():
    return {"message": "FastAPI backend is running!"}

@app.get("/profiles")
def get_profiles():
    response = supabase.table("user_profiles").select("*").execute()
    return response.data

@app.post("/add-profile")
def add_user_profile(profile: UserProfile):
    response = supabase.table("user_profiles").insert({
        "user_id": profile.user_id,
        "age": profile.age,
        "gender": profile.gender,
        "city": profile.city,
        "wedding_date": profile.wedding_date,
        "budget": profile.budget
    }).execute()

    return {"message": "User profile created", "data": response.data}
