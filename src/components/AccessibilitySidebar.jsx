import { BookIcon, HomeIcon, ListIcon, PlusIcon, SlidersIcon, StarIcon, UserIcon } from "./Icons.jsx";

export default function AccessibilitySidebar({
  settings,
  updateSettings,
  setRoute,
  activeRoute,
  profile,
  articleCount,
  recommendationCount,
  profileRank,
  logout
}) {
  const shortcutItems = [
    { key: "home", label: "Home", icon: <HomeIcon /> },
    { key: "articles", label: "Feed", icon: <ListIcon /> },
    { key: "write", label: "Write", icon: <PlusIcon /> },
    { key: "recommendations", label: "Recommend", icon: <StarIcon /> },
    { key: "anime-updates", label: "Anime Updates", icon: <BookIcon /> },
    { key: "updates", label: "Updates", icon: <SlidersIcon /> },
    { key: "dashboard", label: "Dashboard", icon: <UserIcon /> }
  ];

  return (
    <aside id="workspaceSidebar" className="settings-sidebar" aria-labelledby="settingsTitle">
      <div className="workspace-rail" aria-label="Workspace shortcuts">
        <a className="workspace-logo" href="#home" onClick={() => setRoute("home")} aria-label="Go to home">
          <BookIcon size={18} />
        </a>
        <div className="workspace-rail-divider" />
        {shortcutItems.map((item) => (
          <button
            key={item.key}
            className={`workspace-icon-btn ${activeRoute === item.key ? "active" : ""}`}
            type="button"
            title={item.label}
            aria-label={item.label}
            onClick={() => setRoute(item.key)}
          >
            {item.icon}
          </button>
        ))}
      </div>

      <div className="workspace-panels">
        <section className="workspace-card">
          <h2 id="settingsTitle">AniVerse Workspace</h2>
          <p>Move between anime articles, live anime updates, recommendations, and your profile tools.</p>

          <div className="workspace-actions">
            <button className="ghost-link compact-action" type="button" onClick={() => setRoute("write")}>
              <PlusIcon />
              New Article
            </button>
            <button className="ghost-link compact-action" type="button" onClick={() => setRoute("recommendations")}>
              <StarIcon />
              Add Recommendation
            </button>
            {profile && (
              <button className="ghost-link compact-action" type="button" onClick={logout}>
                <UserIcon />
                Logout
              </button>
            )}
          </div>
        </section>

        <section className="workspace-card snapshot-card">
          <strong>{profile?.fullName || "Guest Reader"}</strong>
          <span>{profileRank.label}</span>
          <div className="snapshot-grid">
            <div>
              <strong>{articleCount}</strong>
              <span>Articles</span>
            </div>
            <div>
              <strong>{recommendationCount}</strong>
              <span>Recs</span>
            </div>
          </div>
        </section>

        <section className="workspace-card">
          <div className="workspace-card-head">
            <SlidersIcon />
            <h3>Display Controls</h3>
          </div>

          <div className="setting-field">
            <label htmlFor="theme">Theme</label>
            <select id="theme" value={settings.theme} onChange={(event) => updateSettings({ theme: event.target.value })}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="high-contrast">High contrast</option>
            </select>
          </div>

          <div className="setting-field">
            <label htmlFor="fontSize">Font size</label>
            <select id="fontSize" value={settings.fontSize} onChange={(event) => updateSettings({ fontSize: event.target.value })}>
              <option value="normal">Normal</option>
              <option value="large">Large</option>
              <option value="extra-large">Extra large</option>
            </select>
          </div>

          <div className="setting-field">
            <label htmlFor="linkStyle">Link style</label>
            <select id="linkStyle" value={settings.linkStyle} onChange={(event) => updateSettings({ linkStyle: event.target.value })}>
              <option value="clean">Clean</option>
              <option value="underline">Underline links</option>
            </select>
          </div>

          <div className="setting-field">
            <label htmlFor="motion">Motion</label>
            <select id="motion" value={settings.motion} onChange={(event) => updateSettings({ motion: event.target.value })}>
              <option value="normal">Normal</option>
              <option value="reduced">Reduced</option>
            </select>
          </div>
        </section>
      </div>
    </aside>
  );
}
