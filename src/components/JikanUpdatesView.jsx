import { useEffect, useMemo, useState } from "react";

const jikanBaseUrl = "https://api.jikan.moe/v4";

function getPoster(anime) {
  return anime.images?.webp?.large_image_url || anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url || "";
}

function getTrailer(anime) {
  return anime.trailer?.embed_url || anime.trailer?.url || "";
}

export default function JikanUpdatesView() {
  const [animeList, setAnimeList] = useState([]);
  const [selectedAnimeId, setSelectedAnimeId] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [isLoadingAnime, setIsLoadingAnime] = useState(true);
  const [isLoadingCharacters, setIsLoadingCharacters] = useState(false);
  const [error, setError] = useState("");

  const selectedAnime = useMemo(
    () => animeList.find((anime) => anime.mal_id === selectedAnimeId) || animeList[0],
    [animeList, selectedAnimeId]
  );

  useEffect(() => {
    let isMounted = true;

    async function loadCurrentSeason() {
      try {
        setIsLoadingAnime(true);
        setError("");
        const response = await fetch(`${jikanBaseUrl}/seasons/now?limit=8&sfw`);

        if (!response.ok) {
          throw new Error("Unable to load current anime updates.");
        }

        const payload = await response.json();
        const nextAnime = payload.data || [];

        if (!isMounted) return;
        setAnimeList(nextAnime);
        setSelectedAnimeId(nextAnime[0]?.mal_id || null);
      } catch (requestError) {
        if (!isMounted) return;
        setError(requestError.message);
      } finally {
        if (isMounted) {
          setIsLoadingAnime(false);
        }
      }
    }

    loadCurrentSeason();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!selectedAnime?.mal_id) {
      setCharacters([]);
      return undefined;
    }

    let isMounted = true;

    async function loadCharacters() {
      try {
        setIsLoadingCharacters(true);
        const response = await fetch(`${jikanBaseUrl}/anime/${selectedAnime.mal_id}/characters`);

        if (!response.ok) {
          throw new Error("Unable to load characters.");
        }

        const payload = await response.json();
        if (!isMounted) return;
        setCharacters((payload.data || []).slice(0, 8));
      } catch {
        if (isMounted) {
          setCharacters([]);
        }
      } finally {
        if (isMounted) {
          setIsLoadingCharacters(false);
        }
      }
    }

    loadCharacters();

    return () => {
      isMounted = false;
    };
  }, [selectedAnime?.mal_id]);

  if (isLoadingAnime) {
    return (
      <section className="page-shell jikan-view" aria-live="polite">
        <div className="updates-hero">
          <p className="eyebrow">Anime updates</p>
          <h2>Loading current anime...</h2>
          <p>Fetching current-season titles, trailers, and character data.</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="page-shell jikan-view" aria-live="polite">
        <div className="updates-hero">
          <p className="eyebrow">Anime updates</p>
          <h2>Data could not load</h2>
          <p>{error} Please try again after a moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="page-shell jikan-view" aria-labelledby="jikanTitle">
      <div className="jikan-hero">
        <div>
          <p className="eyebrow">Live from Jikan</p>
          <h2 id="jikanTitle">Latest Anime Updates</h2>
          <p>Browse currently airing anime, watch available trailers, and preview featured characters.</p>
        </div>
        <a className="ghost-link" href="https://docs.api.jikan.moe/" target="_blank" rel="noreferrer">Jikan Docs</a>
      </div>

      {selectedAnime && (
        <div className="jikan-feature">
          <div className="jikan-poster">
            {getPoster(selectedAnime) ? <img src={getPoster(selectedAnime)} alt="" /> : <span>No poster</span>}
          </div>

          <div className="jikan-details">
            <span className="category">{selectedAnime.status || "Anime"}</span>
            <h3>{selectedAnime.title_english || selectedAnime.title}</h3>
            <p>{selectedAnime.synopsis || "No synopsis available yet."}</p>
            <div className="jikan-meta">
              <span>Score: {selectedAnime.score || "N/A"}</span>
              <span>Episodes: {selectedAnime.episodes || "TBA"}</span>
              <span>{selectedAnime.season || "Current"} {selectedAnime.year || ""}</span>
            </div>

            {getTrailer(selectedAnime) ? (
              <div className="trailer-frame">
                {selectedAnime.trailer?.embed_url ? (
                  <iframe
                    src={selectedAnime.trailer.embed_url}
                    title={`${selectedAnime.title} trailer`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <a className="primary-btn" href={getTrailer(selectedAnime)} target="_blank" rel="noreferrer">Watch Trailer</a>
                )}
              </div>
            ) : (
              <div className="empty visible">No trailer is available for this anime yet.</div>
            )}
          </div>
        </div>
      )}

      <div className="jikan-layout">
        <div>
          <div className="section-head compact-head">
            <div>
              <h2>Current Season</h2>
              <p>Select a title to update the trailer and character panel.</p>
            </div>
          </div>
          <div className="jikan-anime-grid">
            {animeList.map((anime) => (
              <button
                className={`jikan-anime-card ${selectedAnime?.mal_id === anime.mal_id ? "active" : ""}`}
                key={anime.mal_id}
                type="button"
                onClick={() => setSelectedAnimeId(anime.mal_id)}
              >
                {getPoster(anime) && <img src={getPoster(anime)} alt="" />}
                <strong>{anime.title_english || anime.title}</strong>
                <span>{anime.type || "Anime"} - {anime.status || "Current"}</span>
              </button>
            ))}
          </div>
        </div>

        <aside className="character-panel" aria-labelledby="charactersTitle">
          <h2 id="charactersTitle">Characters</h2>
          {isLoadingCharacters && <p className="meta">Loading characters...</p>}
          {!isLoadingCharacters && (
            <div className="character-list">
              {characters.map((entry) => (
                <article className="character-row" key={`${entry.character.mal_id}-${entry.role}`}>
                  <img src={entry.character.images?.webp?.image_url || entry.character.images?.jpg?.image_url} alt="" />
                  <div>
                    <strong>{entry.character.name}</strong>
                    <span>{entry.role}</span>
                  </div>
                </article>
              ))}
              <div className={`empty ${characters.length ? "" : "visible"}`}>No character data available yet.</div>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
