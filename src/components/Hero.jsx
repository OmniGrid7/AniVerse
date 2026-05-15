import { StarIcon } from "./Icons.jsx";

export default function Hero({ setRoute }) {
  return (
    <section className="hero" aria-label="Anime article website hero">
      <div className="hero-content">
        <p className="eyebrow">
          <StarIcon />
          Anime culture, reviews, guides
        </p>
        <h1>Anime Stories Worth Sharing</h1>
        <p>Read crisp articles about anime worlds, characters, seasons, soundtracks, and fandom. Sign up, add your details, and publish your own articles instantly.</p>

        <div className="hero-tools">
          <a className="primary-btn" href="#signup" onClick={() => setRoute("signup")}>Create User Profile</a>
          <a className="ghost-link" href="#articles" onClick={() => setRoute("articles")}>Browse Articles</a>
        </div>
      </div>
    </section>
  );
}
