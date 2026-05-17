import { useState } from "react";

const emptyRecommendation = {
  title: "",
  format: "Anime",
  mood: "",
  reason: "",
  posterUrl: ""
};

export default function RecommendationsView({ recommendations, addRecommendation, profile }) {
  const [form, setForm] = useState(emptyRecommendation);
  const [status, setStatus] = useState("");

  function updateField(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  }

  function updatePoster(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm((current) => ({
        ...current,
        posterUrl: reader.result
      }));
    };
    reader.readAsDataURL(file);
  }

  function submitRecommendation(event) {
    event.preventDefault();

    addRecommendation({
      id: `recommendation-${Date.now()}`,
      title: form.title.trim(),
      format: form.format,
      mood: form.mood.trim(),
      reason: form.reason.trim(),
      posterUrl: form.posterUrl,
      author: profile?.fullName || "Community reader",
      userEmail: profile?.email || "",
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric"
      })
    });

    setForm(emptyRecommendation);
    setStatus("Recommendation added to the community list.");
    window.setTimeout(() => setStatus(""), 4000);
  }

  return (
    <section className="page-shell recommendations-view" aria-labelledby="recommendationsTitle">
      <div className="section-head">
        <div>
          <h2 id="recommendationsTitle">Anime And Manga Recommendations</h2>
          <p>Add a title, explain why it deserves attention, and upload a poster or image so readers can recognize it quickly.</p>
        </div>
      </div>

      <div className="recommendation-layout">
        <form className="recommendation-form" onSubmit={submitRecommendation}>
          <div className="form-row">
            <div className="field">
              <label htmlFor="recommendTitle">Title</label>
              <input id="recommendTitle" name="title" type="text" maxLength="90" required placeholder="Frieren, One Piece, Vinland Saga..." value={form.title} onChange={updateField} />
            </div>

            <div className="field">
              <label htmlFor="format">Format</label>
              <select id="format" name="format" value={form.format} onChange={updateField}>
                <option value="Anime">Anime</option>
                <option value="Manga">Manga</option>
                <option value="Anime and Manga">Anime and Manga</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label htmlFor="mood">Best for</label>
            <input id="mood" name="mood" type="text" maxLength="80" placeholder="Quiet fantasy, intense action, comedy nights..." value={form.mood} onChange={updateField} />
          </div>

          <div className="field">
            <label htmlFor="poster">Poster or image</label>
            <input id="poster" name="poster" type="file" accept="image/*" onChange={updatePoster} />
          </div>

          {form.posterUrl && (
            <div className="poster-preview">
              <img src={form.posterUrl} alt="" />
              <button className="ghost-link compact-action" type="button" onClick={() => setForm((current) => ({ ...current, posterUrl: "" }))}>
                Remove Poster
              </button>
            </div>
          )}

          <div className="field">
            <label htmlFor="reason">Why recommend it?</label>
            <textarea id="reason" name="reason" required maxLength="520" placeholder="What makes this worth watching or reading?" value={form.reason} onChange={updateField} />
          </div>

          <div className="form-actions">
            <button className="primary-btn" type="submit">Add Recommendation</button>
          </div>

          <div className="status" role="status">{status}</div>
        </form>

        <div className="recommendation-grid">
          {recommendations.map((item) => (
            <article className="recommendation-card" key={item.id}>
              <div className="poster-art">
                {item.posterUrl ? <img src={item.posterUrl} alt="" /> : <span>{item.format}</span>}
              </div>
              <div>
                <span className="category">{item.format}</span>
                <h3>{item.title}</h3>
                <p className="meta">Recommended by {item.author} - {item.date}</p>
                <p className="recommendation-mood">{item.mood || "Open recommendation"}</p>
                <p>{item.reason}</p>
              </div>
            </article>
          ))}

          <div className={`empty ${recommendations.length ? "" : "visible"}`}>No recommendations yet. Add the first one.</div>
        </div>
      </div>
    </section>
  );
}
