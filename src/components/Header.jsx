import { BookIcon, PlusIcon } from "./Icons.jsx";

export default function Header({ profile, setRoute, logout }) {
  return (
    <header className="site-header">
      <nav className="nav" aria-label="Main navigation">
        <a className="brand" href="#home" onClick={() => setRoute("home")}>
          <span className="brand-mark" aria-hidden="true">
            <BookIcon />
          </span>
          <span>AniVerse</span>
        </a>

        <div className="nav-actions">
          <a className="ghost-link" href="#articles" onClick={() => setRoute("articles")}>Explore</a>
          <a className="ghost-link" href="#recommendations" onClick={() => setRoute("recommendations")}>Recommend</a>
          <a className="ghost-link" href="#updates" onClick={() => setRoute("updates")}>Updates</a>
          {profile && <a className="ghost-link" href="#dashboard" onClick={() => setRoute("dashboard")}>Dashboard</a>}
          <a className="ghost-link" href="#signup" onClick={() => setRoute("signup")}>{profile ? "Profile" : "Sign Up"}</a>
          {profile && <button className="ghost-link" type="button" onClick={logout}>Logout</button>}
          <a className="primary-btn" href="#write" onClick={() => setRoute("write")}>
            <PlusIcon />
            Add Article
          </a>
        </div>
      </nav>
    </header>
  );
}
