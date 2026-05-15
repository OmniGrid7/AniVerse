import { useMemo, useState } from "react";
import { categories } from "../data/defaultArticles.js";
import ArticleCard from "./ArticleCard.jsx";

export default function ArticlesView({ articles, openArticle, profile, compact = false }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredArticles = useMemo(() => {
    const term = search.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesCategory = activeCategory === "All" || article.category === activeCategory;
      const searchable = `${article.title} ${article.author} ${article.category} ${article.excerpt} ${article.content}`.toLowerCase();
      return matchesCategory && searchable.includes(term);
    });
  }, [activeCategory, articles, search]);

  return (
    <section id="articles" aria-labelledby="articlesTitle">
      <div className="section-head">
        <div>
          <h2 id="articlesTitle">{compact ? "Promoted From The Feed" : "Latest Articles"}</h2>
          <p>Search by title, author, or topic. Full reading is unlocked after sign in, and writers with more posts receive higher placement in the feed.</p>
        </div>
      </div>

      <div className="controls">
        <input
          className="search"
          type="search"
          placeholder="Search anime articles..."
          aria-label="Search articles"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <div className="tabs" aria-label="Article categories">
          {categories.map((category) => (
            <button
              key={category}
              className={`tab ${category === activeCategory ? "active" : ""}`}
              type="button"
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="article-grid">
        {filteredArticles.map((article) => (
          <ArticleCard key={article.id} article={article} openArticle={openArticle} profile={profile} />
        ))}
      </div>

      <div className={`empty ${filteredArticles.length ? "" : "visible"}`}>No articles match your search yet.</div>
    </section>
  );
}
