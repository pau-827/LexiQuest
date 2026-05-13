import { useState, useEffect } from 'react'
import Navbar     from '../components/Navbar'
import Editor     from '../components/Editor'
import StatsCard  from '../components/StatsCard'
import TokenTable from '../components/TokenTable'
import { analyzeCode } from '../services/api'

export default function Analyzer() {
  const [code,    setCode]    = useState('')
  const [result,  setResult]  = useState(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)
  const [theme,   setTheme]   = useState('night')

  // Apply theme to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const handleAnalyze = async () => {
    if (!code.trim()) return
    setLoading(true)
    setError(null)
    try {
      const data = await analyzeCode(code)
      setResult(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setCode('')
    setResult(null)
    setError(null)
  }

  return (
    <div className="device">
      <Navbar theme={theme} setTheme={setTheme} />
      <Editor
        value={code}
        onChange={setCode}
        onAnalyze={handleAnalyze}
        onClear={handleClear}
        loading={loading}
      />
      <StatsCard stats={result?.stats} />
      <TokenTable
        tokens={result?.tokens ?? []}
        errors={result?.errors ?? []}
        loading={loading}
      />
      <div className="bottom-bar">
        <span className="hint">
          {error ? `⚠ ${error}` : 'ctrl+enter to analyze'}
        </span>
        <div className="status-dot"
          style={{ background: error ? 'var(--error)' : 'var(--success)' }} />
      </div>
    </div>
  )
}
