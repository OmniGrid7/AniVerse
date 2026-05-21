import ArticlesView from "./ArticlesView.jsx";
import Hero from "./Hero.jsx";
import MissionSection from "./MissionSection.jsx";
import Stats from "./Stats.jsx";

export default function HomeView({ articles, profile, profileRank, profilePostCount, setRoute, openArticle }) {
  return (
    <>
      <Hero setRoute={setRoute} />
      <Stats articles={articles} profile={profile} profileRank={profileRank} profilePostCount={profilePostCount} />
      <section className="aniverse-map" aria-labelledby="aniverseMapTitle">
        <div className="section-head">
          <div>
            <h2 id="aniverseMapTitle">Inside AniVerse</h2>
            <p>Move through the app at your own pace: read, recommend, write, and follow what is coming next.</p>
          </div>
        </div>

        <div className="map-grid">
          <button className="map-card" type="button" onClick={() => setRoute("articles")}>
            <span>01</span>
            <strong>Anime Articles</strong>
            <p>Reviews, guides, theories, soundtracks, worldbuilding, and community writing.</p>
          </button>
          <button className="map-card" type="button" onClick={() => setRoute("recommendations")}>
            <span>02</span>
            <strong>Anime And Manga Recommendations</strong>
            <p>Add titles with posters and explain why other fans should watch or read them.</p>
          </button>
          <button className="map-card" type="button" onClick={() => setRoute("updates")}>
            <span>03</span>
            <strong>Future Updates</strong>
            <p>Preview planned ideas like watchlists, manga shelves, reactions, and collections.</p>
          </button>
          <button className="map-card" type="button" onClick={() => setRoute("anime-updates")}>
            <span>04</span>
            <strong>Live Anime Updates</strong>
            <p>Use Jikan to view airing anime, available trailers, and featured character lists.</p>
          </button>
          <button className="map-card" type="button" onClick={() => setRoute(profile ? "dashboard" : "signup")}>
            <span>05</span>
            <strong>Profile And Writing</strong>
            <p>Create your identity, upload a photo, publish posts, and track your contributor rank.</p>
          </button>
        </div>
      </section>
      <MissionSection setRoute={setRoute} />
      <ArticlesView articles={articles.slice(0, 6)} openArticle={openArticle} profile={profile} compact />
    </>
  );
}
