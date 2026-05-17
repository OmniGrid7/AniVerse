import Avatar from "./Avatar.jsx";

export default function UserDashboard({ profile, profileRank, profilePostCount, recommendationCount, setRoute, logout }) {
  if (!profile) {
    return (
      <section className="page-shell dashboard-page" aria-labelledby="userDashboardTitle">
        <div className="dashboard-hero">
          <div>
            <p className="eyebrow">User dashboard</p>
            <h2 id="userDashboardTitle">Create a profile to unlock your dashboard</h2>
            <p>Your dashboard shows your profile, author rank, article count, and recommendation activity.</p>
          </div>
          <button className="primary-btn" type="button" onClick={() => setRoute("signup")}>Create Profile</button>
        </div>
      </section>
    );
  }

  return (
    <section className="page-shell dashboard-page" aria-labelledby="userDashboardTitle">
      <div className="dashboard-hero">
        <div className="dashboard-profile">
          <Avatar avatarId={profile.avatarId} name={profile.fullName} photoUrl={profile.photoUrl} size="large" />
          <div>
            <p className="eyebrow">User dashboard</p>
            <h2 id="userDashboardTitle">{profile.fullName}</h2>
            <p>{profile.bio || "No bio added yet."}</p>
          </div>
        </div>
        <button className="ghost-link" type="button" onClick={logout}>Logout</button>
      </div>

      <div className="dashboard-grid">
        <article className="dashboard-card">
          <span>Current rank</span>
          <strong>{profileRank.label}</strong>
          <p>{profileRank.next}</p>
        </article>
        <article className="dashboard-card">
          <span>Articles posted</span>
          <strong>{profilePostCount}</strong>
          <p>Publishing more articles improves your writer rank.</p>
        </article>
        <article className="dashboard-card">
          <span>Recommendations</span>
          <strong>{recommendationCount}</strong>
          <p>Anime and manga titles you have recommended from this profile.</p>
        </article>
      </div>

      <div className="dashboard-actions">
        <button className="primary-btn" type="button" onClick={() => setRoute("write")}>Write Article</button>
        <button className="ghost-link" type="button" onClick={() => setRoute("recommendations")}>Add Recommendation</button>
        <button className="ghost-link" type="button" onClick={() => setRoute("signup")}>Edit Profile</button>
      </div>
    </section>
  );
}
