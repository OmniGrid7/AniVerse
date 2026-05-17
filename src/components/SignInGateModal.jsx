import { CloseIcon } from "./Icons.jsx";

export default function SignInGateModal({ article, closeGate, setRoute }) {
  return (
    <div
      className={`modal ${article ? "open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="gateTitle"
      onClick={(event) => {
        if (event.target === event.currentTarget) closeGate();
      }}
    >
      {article && (
        <article className="modal-panel gate-panel">
          <div className="modal-top">
            <button className="icon-btn" type="button" aria-label="Close sign in message" onClick={closeGate}>
              <CloseIcon />
            </button>
          </div>

          <div className="modal-content">
            <span className="category">Sign in required</span>
            <h2 id="gateTitle">Create a profile to read articles</h2>
            <p className="article-text">
              You can browse the article feed freely, but reading the full article needs a saved reader profile.
              This keeps every reader and writer connected to a clear identity.
            </p>
            <p className="meta">Trying to read: {article.title}</p>
            <div className="form-actions">
              <a
                className="primary-btn"
                href="#signup"
                onClick={() => {
                  closeGate();
                  setRoute("signup");
                }}
              >
               Create Profile
              </a>
              <button className="ghost-link" type="button" onClick={closeGate}>Stay Browsing</button>
            </div>
          </div>
        </article>
      )}
    </div>
  );
}
