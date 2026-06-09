import { useState } from "react"

function App() {
  const [repoPath, setRepoPath] = useState(".")
  const [commit1, setCommit1] = useState("")
  const [commit2, setCommit2] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const analyze = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
        const response = await fetch("http://localhost:8000/analyze", {        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repo_path: repoPath, commit1, commit2 })
      })

      if (!response.ok) throw new Error("API request failed")

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Runtime Behavior Diff Agent</h1>
      <p style={{ color: "#666", marginBottom: "2rem" }}>Compare two commits and get a plain English explanation of what changed behaviorally.</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
        <input
          placeholder="Repo path (e.g. .)"
          value={repoPath}
          onChange={e => setRepoPath(e.target.value)}
          style={{ padding: "0.6rem", borderRadius: "6px", border: "1px solid #ccc", fontSize: "1rem" }}
        />
        <input
          placeholder="Commit 1 hash"
          value={commit1}
          onChange={e => setCommit1(e.target.value)}
          style={{ padding: "0.6rem", borderRadius: "6px", border: "1px solid #ccc", fontSize: "1rem" }}
        />
        <input
          placeholder="Commit 2 hash"
          value={commit2}
          onChange={e => setCommit2(e.target.value)}
          style={{ padding: "0.6rem", borderRadius: "6px", border: "1px solid #ccc", fontSize: "1rem" }}
        />
        <button
          onClick={analyze}
          disabled={loading || !commit1 || !commit2}
          style={{ padding: "0.7rem", borderRadius: "6px", background: "#4f46e5", color: "white", border: "none", fontSize: "1rem", cursor: "pointer" }}
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div>
          <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>File Explanations</h2>
          {result.explanations.map((e, i) => (
            <div key={i} style={{ background: "#f9f9f9", border: "1px solid #eee", borderRadius: "8px", padding: "1rem", marginBottom: "1rem" }}>
              <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>{e.file}</p>
              <p style={{ color: "#444", lineHeight: "1.6" }}>{e.explanation}</p>
            </div>
          ))}

          <h2 style={{ fontSize: "1.2rem", margin: "1.5rem 0 1rem" }}>Final Report</h2>
          <div style={{ background: "#eef2ff", border: "1px solid #c7d2fe", borderRadius: "8px", padding: "1rem" }}>
            <p style={{ color: "#333", lineHeight: "1.6" }}>{result.final_report}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App