export default function TokenTable({ tokens, errors, loading }) {
  const all = [...(tokens ?? []), ...(errors ?? [])]

  if (loading) {
    return (
      <div className="token-wrap">
        <div className="empty-state">
          <div className="loading-dots">
            <span /><span /><span />
          </div>
        </div>
      </div>
    )
  }

  if (all.length === 0) {
    return (
      <div className="token-wrap">
        <div className="empty-state">
          <div className="icon">🌙</div>
          type some commands<br />and hit analyze
        </div>
      </div>
    )
  }

  return (
    <div className="token-wrap">
      <table className="token-table">
        <thead>
          <tr>
            <th>type</th>
            <th>value</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((t, i) => (
            <tr key={`t-${i}`}>
              <td><span className={`badge badge-${t.type}`}>{t.type}</span></td>
              <td className="token-value">{t.value}</td>
            </tr>
          ))}
          {errors.map((e, i) => (
            <tr key={`e-${i}`}>
              <td><span className="badge badge-ERROR">ERROR</span></td>
              <td className="token-value is-error">{e.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
