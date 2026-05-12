export default function StatsCard({ stats }) {
  const total   = stats?.total   ?? 0
  const errors  = stats?.ERROR   ?? 0
  const unknown = stats?.UNKNOWN_CMD ?? 0
  const valid   = total - errors - unknown

  return (
    <div className="stats-row">
      <div className="stat-chip success">
        <div className="val">{valid}</div>
        <div className="lbl">valid</div>
      </div>
      <div className="stat-chip">
        <div className="val">{total}</div>
        <div className="lbl">total</div>
      </div>
      <div className="stat-chip errors">
        <div className="val">{errors + unknown}</div>
        <div className="lbl">errors</div>
      </div>
    </div>
  )
}
