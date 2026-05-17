import { useState } from "react";
import { categories } from "../data/defaultArticles.js";
import { todayLabel } from "../utils/articles.js";
import { CheckIcon } from "./Icons.jsx";

export default function WriteView({ profile, profileRank, profilePostCount, addArticle, clearUserArticles, setRoute }) {
  const [form, setForm] = useState({
    title: "",
    category: "Review",
    excerpt: "",
    content: ""
  });
  const [status, setStatus] = useState("");

  function updateField(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  }

  function submitArticle(event) {
    event.preventDefault();

    if (!profile) {
      setStatus("Please sign up first so your article has an author profile.");
      return;
    }

    addArticle({
      id: `user-${Date.now()}`,
      title: form.title.trim(),
      author: profile.fullName.trim(),
      category: form.category,
      excerpt: form.excerpt.trim(),
      content: form.content.trim(),
      date: todayLabel(),
      userEmail: profile.email,
      authorAvatarId: profile.avatarId,
      authorPhotoUrl: profile.photoUrl || ""
    });

    setForm({ title: "", category: "Review", excerpt: "", content: "" });
    setStatus("Published. Your article is now at the top of the feed.");
    window.setTimeout(() => setStatus(""), 4000);
    setRoute("articles");
  }

  return (
    <section id="write" className="write-layout" aria-labelledby="writeTitle">
      <div className="write-copy">
        <p className="eyebrow">Community desk</p>
        <h2 id="writeTitle">Add Your Anime Article</h2>
        <p>Create a user profile, then publish articles with your saved details. Your posts stay in this browser and appear immediately in the article feed.</p>

        <div className="feature-list">
          <div className="feature">
            <CheckIcon />
            <span>Write articles with title, category, excerpt, and full text.</span>
          </div>
          <div className="feature">
            <CheckIcon />
            <span>Your saved profile name is used as the article author.</span>
          </div>
        </div>
      </div>

      <form className="article-form" onSubmit={submitArticle}>
        {!profile && (
          <div className="notice">
            You need a user profile before publishing.{" "}
            <a className="ghost-link" href="#signup" onClick={() => setRoute("signup")}>Sign Up</a>
          </div>
        )}

        {profile && <div className="notice">Posting as {profile.fullName} ({profileRank.label}, {profilePostCount} posts). More posts promote your articles higher in the feed.</div>}

        <div className="form-row">
          <div className="field">
            <label htmlFor="title">Article title</label>
            <input id="title" name="title" type="text" maxLength="90" required placeholder="Hidden details in season finales" value={form.title} onChange={updateField} />
          </div>

          <div className="field">
            <label htmlFor="authorPreview">Author</label>
            <input id="authorPreview" type="text" disabled value={profile ? profile.fullName : "Sign up first"} />
          </div>
        </div>

        <div className="form-row">
          <div className="field">
            <label htmlFor="category">Category</label>
            <select id="category" name="category" required value={form.category} onChange={updateField}>
              {categories.filter((category) => category !== "All").map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="excerpt">Short excerpt</label>
            <input id="excerpt" name="excerpt" type="text" maxLength="150" required placeholder="A sharp summary for the article card" value={form.excerpt} onChange={updateField} />
          </div>
        </div>

        <div className="field">
          <label htmlFor="content">Full article</label>
          <textarea id="content" name="content" required placeholder="Write your article here..." value={form.content} onChange={updateField} />
        </div>

        <div className="form-actions">
          <button className="primary-btn" type="submit" disabled={!profile}>Publish Article</button>
          <button className="ghost-link" type="button" onClick={clearUserArticles}>Clear User Posts</button>
        </div>

        <div className="status" role="status">{status}</div>
      </form>
    </section>
  );
}
