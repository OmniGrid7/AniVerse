export default function Stats({ articles, profile, profileRank, profilePostCount }) {
  return (
    <section className="stats" aria-label="Site statistics">
      <div className="stat">
        <strong>{articles.length}</strong>
        <span>Anime articles</span>
      </div>
      <div className="stat">
        <strong>{profile ? "Signed" : "Guest"}</strong>
        <span>Reader mode</span>
      </div>
      <div className="stat">
        <strong>{profile ? profileRank.label : "Locked"}</strong>
        <span>{profile ? `${profilePostCount} user posts` : "Create a profile to read deeply"}</span>
      </div>
    </section>
  );
}
