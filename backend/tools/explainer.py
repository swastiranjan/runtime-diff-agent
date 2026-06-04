import os
from google import genai
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def explain_diff(patch: str, filename: str) -> str:
    prompt = f"""
You are a senior software engineer reviewing a code diff.
File changed: {filename}

Diff:
{patch}

Explain in 3-5 plain English sentences:
1. What this code did before
2. What it does now
3. What behavioral difference a user or caller would notice
Do not describe line numbers or syntax. Focus on behavior.
"""
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )
    return response.text