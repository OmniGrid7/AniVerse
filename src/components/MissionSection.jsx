export default function MissionSection({ setRoute }) {
  return (
    <section className="mission-section" aria-labelledby="missionTitle">
      <div>
        <p className="eyebrow">What AniVerse is</p>
        <h2 id="missionTitle">A softer home for anime thoughts, picks, and creative fandom notes</h2>
        <p>
          AniVerse is built for fans who want anime articles, recommendations, manga suggestions, and future updates
          in one peaceful place. It keeps the experience focused, personal, and easy to return to.
        </p>
      </div>

      <div className="mission-grid">
        <div className="mission-item">
          <strong>Read anime articles</strong>
          <span>Explore reviews, theories, guides, character notes, and worldbuilding ideas from the feed.</span>
        </div>
        <div className="mission-item">
          <strong>Recommend titles</strong>
          <span>Add anime or manga suggestions with posters so other fans can discover them quickly.</span>
        </div>
        <div className="mission-item">
          <strong>Grow over time</strong>
          <span>Future updates can expand AniVerse with watchlists, shelves, collections, and community tools.</span>
        </div>
      </div>

      <div className="rank-ladder" aria-label="Author promotion hierarchy">
        <div>
          <strong>Reader</strong>
          <span>0 posts</span>
        </div>
        <div>
          <strong>New Contributor</strong>
          <span>1 post</span>
        </div>
        <div>
          <strong>Rising Writer</strong>
          <span>2-3 posts</span>
        </div>
        <div>
          <strong>Featured Reviewer</strong>
          <span>4-6 posts</span>
        </div>
        <div>
          <strong>Front Page Author</strong>
          <span>7+ posts</span>
        </div>
      </div>

      <div className="mission-actions">
        <a className="primary-btn" href="#signup" onClick={() => setRoute("signup")}>Create Profile</a>
        <a className="ghost-link" href="#updates" onClick={() => setRoute("updates")}>View Updates</a>
      </div>
    </section>
  );
}
