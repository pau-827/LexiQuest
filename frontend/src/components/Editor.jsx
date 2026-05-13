export default function Editor({ value, onChange, onAnalyze, onClear, loading }) {
  const handleKey = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) onAnalyze()
  }

  const placeholder = `def greet(name):
    print("Hello", name)

x = 3.14
if x > 0 and x != 5:
    return True  # positive`

  return (
    <div className="editor-wrap">
      <div className="editor-label">// input source</div>
      <textarea
        className="editor"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKey}
        placeholder={placeholder}
        spellCheck={false}
      />
      <div className="editor-actions">
        <button className="btn-analyze" onClick={onAnalyze} disabled={loading}>
          {loading ? 'analyzing...' : 'analyze  ⌃↵'}
        </button>
        <button className="btn-clear" onClick={onClear}>clear</button>
      </div>
    </div>
  )
}
