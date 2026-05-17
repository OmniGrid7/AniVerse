const plannedUpdates = [
  {
    title: "Season Watchlists",
    timeline: "Planned",
    description: "Save anime you are watching, finished, or planning to start, then use that list to guide future article ideas."
  },
  {
    title: "Manga Shelf",
    timeline: "Planned",
    description: "Create a personal manga shelf with favorite volumes, reading notes, and recommendations for other readers."
  },
  {
    title: "Community Reactions",
    timeline: "Later",
    description: "Let readers react to articles and recommendations with simple, calm feedback instead of noisy comment threads."
  },
  {
    title: "Creator Collections",
    timeline: "Later",
    description: "Group articles, recommendations, and watch notes into collections like comfort anime, deep lore, or weekend picks."
  }
];

export default function FutureUpdatesView({ setRoute }) {
  return (
    <section className="page-shell updates-view" aria-labelledby="updatesTitle">
      <div className="updates-hero">
        <p className="eyebrow">Future updates</p>
        <h2 id="updatesTitle">AniVerse is growing into a calmer anime home</h2>
        <p>
          The app already supports articles, profiles, recommendations, uploads, and display controls. These are the next
          ideas planned for a richer anime space.
        </p>
        <div className="dashboard-actions">
          <button className="primary-btn" type="button" onClick={() => setRoute("recommendations")}>Add Recommendation</button>
          <button className="ghost-link" type="button" onClick={() => setRoute("write")}>Write Article</button>
        </div>
      </div>

      <div className="updates-grid">
        {plannedUpdates.map((update) => (
          <article className="update-card" key={update.title}>
            <span>{update.timeline}</span>
            <h3>{update.title}</h3>
            <p>{update.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
