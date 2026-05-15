import { BookIcon, PlusIcon } from "./Icons.jsx";

export default function Header({ profile, setRoute }) {
  return (
    <header className="site-header">
      <nav className="nav" aria-label="Main navigation">
        <a className="brand" href="#home" onClick={() => setRoute("home")}>
          <span className="brand-mark" aria-hidden="true">
            <BookIcon />
          </span>
          <span>AniVerse Articles</span>
        </a>

        <div className="nav-actions">
          <a className="ghost-link" href="#articles" onClick={() => setRoute("articles")}>Explore</a>
          <a className="ghost-link" href="#recommendations" onClick={() => setRoute("recommendations")}>Recommend</a>
          <a className="ghost-link" href="#signup" onClick={() => setRoute("signup")}>{profile ? "Profile" : "Sign Up"}</a>
          <a className="primary-btn" href="#write" onClick={() => setRoute("write")}>
            <PlusIcon />
            Add Article
          </a>
        </div>
      </nav>
    </header>
  );
}
