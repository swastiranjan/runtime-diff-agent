from typing import TypedDict, List
from langgraph.graph import StateGraph, END

class DiffState(TypedDict):
    repo_path: str
    commit1: str
    commit2: str
    diffs: List[dict]
    explanations: List[dict]
    final_report: str


# DiffState is the shared dictionary that flows through every node. You're defining exactly what fields it carries:

# repo_path, commit1, commit2 — inputs the user provides
# diffs — filled by the extractor node
# explanations — filled by the explainer node
# final_report — filled by the summarizer node

from backend.tools.git_extractor import get_diff
from backend.tools.explainer import explain_diff

def extract_node(state: DiffState) -> DiffState:
    result = get_diff(state["repo_path"], state["commit1"], state["commit2"])
    state["diffs"] = result["diffs"]
    return state

def explain_node(state: DiffState) -> DiffState:
    explanations = []
    for d in state["diffs"]:
        explanation = explain_diff(d["patch"], d["file"])
        explanations.append({
            "file": d["file"],
            "explanation": explanation
        })
    state["explanations"] = explanations
    return state

def summarize_node(state: DiffState) -> DiffState:
    all_explanations = "\n\n".join(
        f"File: {e['file']}\n{e['explanation']}"
        for e in state["explanations"]
    )
    
    from google import genai
    import os
    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
    
    prompt = f"""
You are a senior engineer reviewing a set of code changes.
Here are the explanations for each changed file:

{all_explanations}

Write a concise overall summary (5-7 sentences) of what behavioral changes
were made in this commit, as if explaining to a product manager.
"""
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )
    state["final_report"] = response.text
    return state

# extract_node — calls your git extractor and stores diffs in state
# explain_node — loops over every changed file, calls Gemini for each, stores explanations in state
# summarize_node — takes all explanations together and asks Gemini for one overall summary

def build_agent():
    graph = StateGraph(DiffState)
    
    graph.add_node("extract", extract_node)
    graph.add_node("explain", explain_node)
    graph.add_node("summarize", summarize_node)
    
    graph.set_entry_point("extract")
    graph.add_edge("extract", "explain")
    graph.add_edge("explain", "summarize")
    graph.add_edge("summarize", END)
    
    return graph.compile()

# add_node — registers each function as a node with a name
# set_entry_point — tells LangGraph where to start
# add_edge — connects nodes in sequence
# compile() — locks the graph and makes it runnable
