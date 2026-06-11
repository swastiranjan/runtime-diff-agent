import git
import tempfile
import shutil
import os
from dotenv import load_dotenv

load_dotenv()

def is_github_url(path: str) -> bool:
    return path.startswith("https://") or path.startswith("git@")

def get_diff(repo_path: str, commit1: str, commit2: str) -> dict:
    temp_dir = None
    repo = None
    try:
        if is_github_url(repo_path):
            print(f"[CLONING] {repo_path}")
            temp_dir = tempfile.mkdtemp()
            repo = git.Repo.clone_from(repo_path, temp_dir)
        else:
            repo = git.Repo(repo_path)

        c1 = repo.commit(commit1)
        c2 = repo.commit(commit2)

        diffs = c1.diff(c2, create_patch=True)

        result = []
        for d in diffs:
            if d.b_path and d.b_path.endswith('.pyc'):
                continue
            result.append({
                "file": d.b_path,
                "change_type": d.change_type,
                "patch": d.diff.decode("utf-8", errors="ignore")
            })

        return {
            "commit1": commit1,
            "commit2": commit2,
            "files_changed": len(result),
            "diffs": result
        }

    finally:
        if repo:
            repo.close()
        if temp_dir and os.path.exists(temp_dir):
            import stat
            def remove_readonly(func, path, _):
                os.chmod(path, stat.S_IWRITE)
                func(path)
            shutil.rmtree(temp_dir, onerror=remove_readonly)
            print(f"[CLEANUP] Removed temp dir")

    