from supabase import create_client, Client
from dotenv import load_dotenv
import os

load_dotenv()  # ✅ Loads variables from .env

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_KEY:
    raise Exception("SUPABASE_KEY is missing from environment")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
