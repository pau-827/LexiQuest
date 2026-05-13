export default function Navbar({ theme, setTheme }) {
  const themes = [
    { id: 'night',   label: 'Night City' },
    { id: 'cafe',    label: 'Coffee Shop' },
    { id: 'bedroom', label: 'Bedroom Pop' },
  ]

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="navbar-dot" />
        <div>
          <div className="navbar-title">LexiQuest</div>
          <div className="navbar-sub">lexical analyzer v1.0</div>
        </div>
      </div>
      <div className="navbar-right">
        <div className="theme-switcher">
          {themes.map(t => (
            <button
              key={t.id}
              className={`theme-btn t-${t.id} ${theme === t.id ? 'active' : ''}`}
              title={t.label}
              onClick={() => setTheme(t.id)}
            />
          ))}
        </div>
        <div className="navbar-lang">
          <div className="lang-dot" />
          <span>Python</span>
        </div>
      </div>
    </nav>
  )
}
