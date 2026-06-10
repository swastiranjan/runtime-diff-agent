from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import traceback

load_dotenv()

from backend.agents.diff_agent import build_agent

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

agent = build_agent()

class AnalyzeRequest(BaseModel):
    repo_path: str
    commit1: str
    commit2: str

class AnalyzeResponse(BaseModel):
    commit1: str
    commit2: str
    explanations: list
    final_report: str

@app.get("/")
def root():
    return {"status": "Runtime Behavior Diff Agent is running"}

@app.post("/analyze", response_model=AnalyzeResponse)
def analyze(request: AnalyzeRequest):
    try:
        result = agent.invoke({
            "repo_path": request.repo_path,
            "commit1": request.commit1,
            "commit2": request.commit2,
            "diffs": [],
            "explanations": [],
            "final_report": ""
        })
        return AnalyzeResponse(
            commit1=request.commit1,
            commit2=request.commit2,
            explanations=result["explanations"],
            final_report=result["final_report"]
        )
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))