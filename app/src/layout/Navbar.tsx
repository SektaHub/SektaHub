

export default function Navbar() {
  return (
    <nav className="navbar">
        <div className="logo-container">
            <img className="logo" src="SektaHub.svg" alt="Logo" />
        </div>
        <div className="nav-elements">
            <a href="/">Home</a>
            <a href="/news">News</a>
        </div>
    </nav>
  )
}
