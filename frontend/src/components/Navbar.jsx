export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="navbar-dot" />
        <div>
          <div className="navbar-title">LexiQuest</div>
          <div className="navbar-sub">lexical analyzer v1.0</div>
        </div>
      </div>
      <div className="navbar-sub" style={{ textAlign: 'right' }}>
        say · add · mul<br />weather · play
      </div>
    </nav>
  )
}
