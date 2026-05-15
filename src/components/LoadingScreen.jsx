export default function LoadingScreen({ visible }) {
  return (
    <div className={`loading-screen ${visible ? "visible" : ""}`} aria-hidden={!visible}>
      <div className="loading-panel" role="status" aria-live="polite">
        <div className="loading-mark">
          <span />
          <span />
          <span />
        </div>
        <p className="eyebrow">AniVerse is loading</p>
        <h2>Turning the page</h2>
        <div className="loading-bar">
          <span />
        </div>
      </div>
    </div>
  );
}
