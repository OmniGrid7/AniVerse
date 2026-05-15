export default function MissionSection({ setRoute }) {
  return (
    <section className="mission-section" aria-labelledby="missionTitle">
      <div>
        <p className="eyebrow">Why this page exists</p>
        <h2 id="missionTitle">A home for anime opinions that deserve more than a comment box</h2>
        <p>
          AniVerse is built for readers who want thoughtful anime reviews, theories, guides, and worldbuilding notes
          in one clean place. Readers sign in to unlock full articles, and writers earn more visibility by publishing
          consistently.
        </p>
      </div>

      <div className="mission-grid">
        <div className="mission-item">
          <strong>Read with identity</strong>
          <span>Full articles open after profile sign in, keeping the community personal and accountable.</span>
        </div>
        <div className="mission-item">
          <strong>Publish your voice</strong>
          <span>Users can add anime articles, update their profile, and build a visible author history.</span>
        </div>
        <div className="mission-item">
          <strong>Grow by posting</strong>
          <span>More articles unlock higher author ranks and stronger placement in the feed.</span>
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
        <a className="primary-btn" href="#signup" onClick={() => setRoute("signup")}>Set Up Profile</a>
        <a className="ghost-link" href="#write" onClick={() => setRoute("write")}>Start Writing</a>
      </div>
    </section>
  );
}
