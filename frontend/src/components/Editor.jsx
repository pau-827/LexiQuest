export default function Editor({ value, onChange, onAnalyze, onClear, loading }) {
  const handleKey = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) onAnalyze()
  }

  return (
    <div className="editor-wrap">
      <div className="editor-label">// input source</div>
      <textarea
        className="editor"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKey}
        placeholder={'say "Hello World"\nadd 5 10\nmul 4 7\nweather "Naga"\nplay "Lofi Beats"'}
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
