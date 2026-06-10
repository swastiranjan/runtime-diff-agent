# Runtime Behavior Diff Agent

An agentic AI tool that takes two git commit hashes and generates plain-English explanations of how program behavior changed between commits.

## Architecture
Two commit hashes
↓
Git Diff Extractor (GitPython)
↓
LangGraph Agent
↓
ChromaDB Cache → if hit: return cached explanation
↓         if miss: call Gemini → store → return
Gemini 2.5 Flash
↓
FastAPI Backend
↓
React Frontend

## Tech Stack

- **LangGraph** — agent orchestration
- **Gemini 2.5 Flash** — behavioral explanation generation
- **ChromaDB** — vector store for caching explanations
- **GitPython** — git diff extraction
- **FastAPI** — REST API backend
- **React + Vite** — frontend UI
- **Docker + docker-compose** — containerization

## Setup

### Without Docker

1. Clone the repo
2. Create a virtual environment and install dependencies:
```bash
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
```
3. Create a `.env` file with your Gemini API key:
GEMINI_API_KEY=your_key_here
4. Start the backend:
```bash
uvicorn backend.api.main:app --reload --port 8000
```
5. Start the frontend:
```bash
cd frontend
npm install
npm run dev
```

### With Docker

1. Make sure Docker Desktop is running
2. Create a `.env` file with your Gemini API key
3. Run:
```bash
docker-compose up --build
```

Open `http://localhost:5173` in your browser.

## Usage

1. Enter the path to a local git repository
2. Enter two commit hashes to compare
3. Click **Analyze**
4. Get plain-English explanations of what behaviorally changed per file, plus an overall summary

## Project Structure

```
runtime-diff-agent/
├── backend/
│   ├── agents/
│   │   └── diff_agent.py
│   ├── tools/
│   │   ├── git_extractor.py
│   │   ├── explainer.py
│   │   └── vector_store.py
│   └── api/
│       └── main.py
├── frontend/
│   └── src/
│       └── App.jsx
├── docker/
│   ├── Dockerfile.backend
│   └── Dockerfile.frontend
├── docker-compose.yml
└── requirements.txt
```
