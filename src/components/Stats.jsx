export default function Stats({ articles, profile, profileRank, profilePostCount }) {
  return (
    <section className="stats" aria-label="Site statistics">
      <div className="stat">
        <strong>{articles.length}</strong>
        <span>Published articles</span>
      </div>
      <div className="stat">
        <strong>{profile ? "Signed" : "Guest"}</strong>
        <span>Current user mode</span>
      </div>
      <div className="stat">
        <strong>{profile ? profileRank.label : "Locked"}</strong>
        <span>{profile ? `${profilePostCount} user posts` : "Sign in to read full articles"}</span>
      </div>
    </section>
  );
}
