from fastapi import Request, HTTPException
from supabase import create_client
import os
from dotenv import load_dotenv

load_dotenv()

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
supabase = create_client(url, key)

async def store_user(request: Request):
    data = await request.json()

    try:
        response = supabase.table("user_profiles").insert(data).execute()
        return {"message": "User stored", "data": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
