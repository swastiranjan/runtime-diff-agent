import { useState } from "react"

const styles = {
  root: {
    minHeight: "100vh",
    background: "#0a0a0f",
    color: "#e2e8f0",
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
    padding: "0",
    margin: "0",
  },
  header: {
    borderBottom: "1px solid #1e1e2e",
    padding: "1.5rem 2rem",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    background: "#0d0d17",
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#6366f1",
    boxShadow: "0 0 8px #6366f1",
    flexShrink: 0,
  },
  headerTitle: {
    fontSize: "0.85rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#94a3b8",
    fontWeight: "500",
  },
  headerBadge: {
    marginLeft: "auto",
    fontSize: "0.7rem",
    color: "#4ade80",
    border: "1px solid #166534",
    borderRadius: "4px",
    padding: "2px 8px",
    letterSpacing: "0.05em",
  },
  main: {
    maxWidth: "760px",
    margin: "0 auto",
    padding: "3rem 2rem",
  },
  hero: {
    marginBottom: "3rem",
  },
  heroTitle: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#f1f5f9",
    marginBottom: "0.5rem",
    letterSpacing: "-0.02em",
    lineHeight: "1.2",
  },
  heroAccent: {
    color: "#818cf8",
  },
  heroSub: {
    fontSize: "0.875rem",
    color: "#64748b",
    lineHeight: "1.6",
    fontFamily: "system-ui, sans-serif",
    fontWeight: "400",
  },
  card: {
    background: "#0f0f1a",
    border: "1px solid #1e1e2e",
    borderRadius: "10px",
    padding: "1.75rem",
    marginBottom: "1rem",
  },
  label: {
    fontSize: "0.7rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#475569",
    marginBottom: "0.5rem",
    display: "block",
  },
  input: {
    width: "100%",
    background: "#080810",
    border: "1px solid #1e1e2e",
    borderRadius: "6px",
    padding: "0.65rem 0.85rem",
    color: "#e2e8f0",
    fontSize: "0.85rem",
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.15s",
  },
  inputFocus: {
    borderColor: "#4338ca",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0.75rem",
    marginTop: "0.75rem",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
  },
  button: {
    width: "100%",
    marginTop: "1.25rem",
    padding: "0.8rem",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "0.8rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontFamily: "inherit",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.15s, opacity 0.15s",
  },
  buttonDisabled: {
    opacity: "0.4",
    cursor: "not-allowed",
  },
  buttonLoading: {
    background: "#3730a3",
  },
  divider: {
    height: "1px",
    background: "#1e1e2e",
    margin: "2rem 0",
  },
  sectionLabel: {
    fontSize: "0.7rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#475569",
    marginBottom: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  sectionLine: {
    flex: 1,
    height: "1px",
    background: "#1e1e2e",
  },
  fileCard: {
    background: "#0a0a14",
    border: "1px solid #1e1e2e",
    borderRadius: "8px",
    padding: "1.25rem",
    marginBottom: "0.75rem",
    borderLeft: "3px solid #4f46e5",
  },
  fileName: {
    fontSize: "0.78rem",
    color: "#818cf8",
    fontWeight: "600",
    marginBottom: "0.6rem",
    letterSpacing: "0.02em",
  },
  fileExplanation: {
    fontSize: "0.875rem",
    color: "#94a3b8",
    lineHeight: "1.7",
    fontFamily: "system-ui, sans-serif",
    fontWeight: "400",
  },
  reportCard: {
    background: "#0a0a14",
    border: "1px solid #312e81",
    borderRadius: "8px",
    padding: "1.5rem",
    borderLeft: "3px solid #6366f1",
  },
  reportText: {
    fontSize: "0.9rem",
    color: "#cbd5e1",
    lineHeight: "1.8",
    fontFamily: "system-ui, sans-serif",
    fontWeight: "400",
  },
  error: {
    background: "#130a0a",
    border: "1px solid #450a0a",
    borderRadius: "8px",
    padding: "1rem 1.25rem",
    borderLeft: "3px solid #ef4444",
    fontSize: "0.85rem",
    color: "#fca5a5",
    fontFamily: "system-ui, sans-serif",
  },
  spinner: {
    display: "inline-block",
    width: "10px",
    height: "10px",
    border: "2px solid rgba(255,255,255,0.2)",
    borderTopColor: "#fff",
    borderRadius: "50%",
    marginRight: "0.5rem",
    animation: "spin 0.7s linear infinite",
  },
}

function Field({ label, value, onChange, placeholder, mono = true }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={styles.fieldGroup}>
      <span style={styles.label}>{label}</span>
      <input
        style={{
          ...styles.input,
          ...(focused ? styles.inputFocus : {}),
          fontFamily: mono ? "inherit" : "system-ui, sans-serif",
        }}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  )
}

export default function App() {
  const [repoPath, setRepoPath] = useState("")
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
      const response = await fetch("https://runtime-diff-agent.onrender.com/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repo_path: repoPath || ".", commit1, commit2 }),
      })
      if (!response.ok) throw new Error(`Server error ${response.status}`)
      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0a0f; }
        input::placeholder { color: #2d2d3d; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .result-item { animation: fadeIn 0.3s ease both; }
      `}</style>

      <div style={styles.root}>
        <header style={styles.header}>
          <div style={styles.dot} />
          <span style={styles.headerTitle}>Runtime Diff Agent</span>
          <span style={styles.headerBadge}>● LIVE</span>
        </header>

        <main style={styles.main}>
          <div style={styles.hero}>
            <h1 style={styles.heroTitle}>
              What actually<br />
              <span style={styles.heroAccent}>changed?</span>
            </h1>
            <p style={styles.heroSub}>
              Paste a GitHub repo and two commit hashes. Get a plain-English explanation of what changed behaviorally — not just what lines changed.
            </p>
          </div>

          <div style={styles.card}>
            <Field
              label="Repository"
              value={repoPath}
              onChange={setRepoPath}
              placeholder="https://github.com/user/repo  or  ."
            />
            <div style={styles.row}>
              <Field
                label="Base commit"
                value={commit1}
                onChange={setCommit1}
                placeholder="abc1234"
              />
              <Field
                label="Target commit"
                value={commit2}
                onChange={setCommit2}
                placeholder="def5678"
              />
            </div>
            <button
              style={{
                ...styles.button,
                ...(loading || !commit1 || !commit2 ? styles.buttonDisabled : {}),
                ...(loading ? styles.buttonLoading : {}),
              }}
              onClick={analyze}
              disabled={loading || !commit1 || !commit2}
            >
              {loading && <span style={styles.spinner} />}
              {loading ? "Analyzing..." : "Run Analysis →"}
            </button>
          </div>

          {error && (
            <div style={styles.error}>
              ✗ {error}
            </div>
          )}

          {result && (
            <div>
              <div style={styles.divider} />

              <div style={styles.sectionLabel}>
                <span>File Explanations</span>
                <span style={styles.sectionLine} />
                <span>{result.explanations.length} files</span>
              </div>

              {result.explanations.map((e, i) => (
                <div
                  key={i}
                  className="result-item"
                  style={{ ...styles.fileCard, animationDelay: `${i * 0.05}s` }}
                >
                  <div style={styles.fileName}>{e.file}</div>
                  <p style={styles.fileExplanation}>{e.explanation}</p>
                </div>
              ))}

              <div style={{ ...styles.sectionLabel, marginTop: "1.5rem" }}>
                <span>Final Report</span>
                <span style={styles.sectionLine} />
              </div>

              <div style={styles.reportCard}>
                <p style={styles.reportText}>{result.final_report}</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  )
}