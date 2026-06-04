#git diff extractor tool
import git
from dotenv import load_dotenv

load_dotenv()

def get_diff(repo_path: str, commit1: str, commit2: str) -> dict:
    """
    Given a local repo path and two commit hashes,
    returns the diff as a structured dict.
    """
    repo = git.Repo(repo_path)              #opens the git repo at that path on your machine
    
    c1 = repo.commit(commit1)               #fetches commit object for the hash. The commit object will know its parent, its files, its timestamps etc
    c2 = repo.commit(commit2)
    
    diffs = c1.diff(c2, create_patch=True)  #asks git: "what is the difference between these two snapshots.The create_patch=True means give me the actual line-by-line diff text, not just the file names.
    
    result = []
    for d in diffs:
        if d.b_path and d.b_path.endswith('.pyc'):
            continue
        result.append({
            "file": d.b_path,
            "change_type": d.change_type,  # A=added, D=deleted, M=modified, R=renamed
            "patch": d.diff.decode("utf-8", errors="ignore")
        })
    
    return {
        "commit1": commit1,
        "commit2": commit2,
        "files_changed": len(result),
        "diffs": result
    }
