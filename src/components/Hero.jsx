import { StarIcon } from "./Icons.jsx";

export default function Hero({ setRoute }) {
  return (
    <section className="hero" aria-label="AniVerse home hero">
      <div className="hero-content">
        <p className="eyebrow">
          <StarIcon />
          Anime articles, recommendations, updates
        </p>
        <h1>AniVerse</h1>
        <p>A calm anime space for thoughtful articles, manga and anime recommendations, creator profiles, and future fandom tools built around what you love watching and reading.</p>

        <div className="hero-tools">
          <a className="primary-btn" href="#articles" onClick={() => setRoute("articles")}>Explore Articles</a>
          <a className="ghost-link" href="#recommendations" onClick={() => setRoute("recommendations")}>Find Recommendations</a>
          <a className="ghost-link" href="#updates" onClick={() => setRoute("updates")}>Future Updates</a>
        </div>
      </div>
    </section>
  );
}
