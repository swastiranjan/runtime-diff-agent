import chromadb

CHROMA_PATH = "./data/chroma_db"
COLLECTION_NAME = "diff_explanations"

def get_collection():
    client = chromadb.PersistentClient(path=CHROMA_PATH)
    collection = client.get_or_create_collection(
        name=COLLECTION_NAME
    )
    return collection

def store_explanation(commit1: str, commit2: str, filename: str, explanation: str):
    collection = get_collection()
    doc_id = f"{commit1}_{commit2}_{filename}"
    collection.upsert(
        ids=[doc_id],
        documents=[explanation],
        metadatas=[{
            "commit1": commit1,
            "commit2": commit2,
            "filename": filename
        }]
    )

def get_cached_explanation(commit1: str, commit2: str, filename: str) -> str | None:
    collection = get_collection()
    doc_id = f"{commit1}_{commit2}_{filename}"
    result = collection.get(ids=[doc_id])
    if result["documents"]:
        return result["documents"][0]
    return None