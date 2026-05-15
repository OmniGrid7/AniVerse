import { useEffect } from "react";
import { getReadTime } from "../utils/articles.js";
import { CloseIcon } from "./Icons.jsx";

export default function ReaderModal({ article, closeArticle }) {
  useEffect(() => {
    if (!article) return undefined;

    document.body.style.overflow = "hidden";

    function closeOnEscape(event) {
      if (event.key === "Escape") closeArticle();
    }

    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [article, closeArticle]);

  return (
    <div
      className={`modal ${article ? "open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
      onClick={(event) => {
        if (event.target === event.currentTarget) closeArticle();
      }}
    >
      {article && (
        <article className="modal-panel">
          <div className="modal-top">
            <button className="icon-btn" type="button" aria-label="Close article" onClick={closeArticle}>
              <CloseIcon />
            </button>
          </div>

          <div className="modal-content">
            <span className="category">{article.category}</span>
            <h2 id="modalTitle">{article.title}</h2>
            <p className="meta">By {article.author} - {article.date} - {getReadTime(article.content)} min read</p>
            <div className="article-text">{article.content}</div>
          </div>
        </article>
      )}
    </div>
  );
}
