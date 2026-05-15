import { getReadTime } from "../utils/articles.js";
import Avatar from "./Avatar.jsx";

export default function ArticleCard({ article, openArticle, profile }) {
  const categoryClass = article.category.toLowerCase();
  const isPromoted = article.authorPostCount >= 2;

  return (
    <article className="article-card">
      <div className={`card-art ${categoryClass}`}>
        <span className="category">{article.category}</span>
      </div>

      <div className="card-body">
        <h3>{article.title}</h3>
        <div className="card-author">
          <Avatar avatarId={article.authorAvatarId} name={article.author} photoUrl={article.authorPhotoUrl} size="small" />
          <p className="meta">By {article.author} - {article.date}</p>
        </div>
        <div className="author-rank-row">
          <span>{article.authorRank.label}</span>
          {isPromoted && <strong>Promoted</strong>}
        </div>
        <p className="excerpt">{article.excerpt}</p>

        <div className="card-footer">
          <button className="read-btn" type="button" onClick={() => openArticle(article)}>
            {profile ? "Read Article" : "Sign In To Read"}
          </button>
          <span className="read-time">{getReadTime(article.content)} min read</span>
        </div>
      </div>
    </article>
  );
}
