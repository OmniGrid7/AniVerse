import { useEffect, useMemo, useRef, useState } from "react";
import { defaultArticles } from "./data/defaultArticles.js";
import {
  articleStorageKey,
  getStoredJson,
  profileStorageKey,
  recommendationStorageKey,
  setStoredJson,
  settingsStorageKey
} from "./utils/storage.js";
import { currentRoute, getAuthorKey, getAuthorPostCounts, getAuthorRank, promoteArticles } from "./utils/articles.js";
import AccessibilitySidebar from "./components/AccessibilitySidebar.jsx";
import ArticlesView from "./components/ArticlesView.jsx";
import Header from "./components/Header.jsx";
import HomeView from "./components/HomeView.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import RecommendationsView from "./components/RecommendationsView.jsx";
import ReaderModal from "./components/ReaderModal.jsx";
import SignInGateModal from "./components/SignInGateModal.jsx";
import SignupView from "./components/SignupView.jsx";
import WriteView from "./components/WriteView.jsx";

const defaultSettings = {
  theme: "light",
  fontSize: "normal",
  linkStyle: "clean",
  motion: "normal"
};

export default function App() {
  const [route, setRoute] = useState(currentRoute);
  const [userArticles, setUserArticles] = useState(() => getStoredJson(articleStorageKey, []));
  const [recommendations, setRecommendations] = useState(() => getStoredJson(recommendationStorageKey, []));
  const [profile, setProfile] = useState(() => getStoredJson(profileStorageKey, null));
  const [settings, setSettings] = useState(() => ({
    ...defaultSettings,
    ...getStoredJson(settingsStorageKey, defaultSettings)
  }));
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [lockedArticle, setLockedArticle] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const transitionTimer = useRef(null);

  const articles = useMemo(() => promoteArticles([...userArticles, ...defaultArticles]), [userArticles]);
  const postCounts = useMemo(() => getAuthorPostCounts(articles), [articles]);
  const profilePostCount = profile ? postCounts[getAuthorKey(profile)] || 0 : 0;
  const profileRank = getAuthorRank(profilePostCount);

  useEffect(() => {
    function syncRoute() {
      startRouteTransition(currentRoute());
    }

    window.addEventListener("hashchange", syncRoute);

    return () => {
      window.removeEventListener("hashchange", syncRoute);
      window.clearTimeout(transitionTimer.current);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = settings.theme;
    document.documentElement.dataset.fontSize = settings.fontSize;
    document.documentElement.dataset.linkStyle = settings.linkStyle;
    document.documentElement.dataset.motion = settings.motion;
  }, [settings]);

  function startRouteTransition(nextRoute) {
    setIsPageLoading(true);
    window.clearTimeout(transitionTimer.current);

    transitionTimer.current = window.setTimeout(() => {
      setRoute(nextRoute);
      setIsPageLoading(false);
      window.scrollTo({ top: 0, behavior: settings.motion === "reduced" ? "auto" : "smooth" });
    }, 520);
  }

  function navigate(nextRoute) {
    const nextHash = `#${nextRoute}`;

    if (window.location.hash === nextHash) {
      startRouteTransition(nextRoute);
      return;
    }

    setIsPageLoading(true);
    window.location.hash = nextRoute;
  }

  function addArticle(article) {
    setUserArticles((current) => {
      const nextArticles = [article, ...current];
      setStoredJson(articleStorageKey, nextArticles);
      return nextArticles;
    });
  }

  function clearUserArticles() {
    setUserArticles([]);
    setStoredJson(articleStorageKey, []);
  }

  function addRecommendation(recommendation) {
    setRecommendations((current) => {
      const nextRecommendations = [recommendation, ...current];
      setStoredJson(recommendationStorageKey, nextRecommendations);
      return nextRecommendations;
    });
  }

  function updateSettings(nextSettings) {
    setSettings((current) => {
      const merged = { ...current, ...nextSettings };
      setStoredJson(settingsStorageKey, merged);
      return merged;
    });
  }

  function saveProfile(nextProfile) {
    setProfile(nextProfile);
    setStoredJson(profileStorageKey, nextProfile);

    if (profile) {
      const previousKey = getAuthorKey(profile);
      setUserArticles((current) => {
        const nextArticles = current.map((article) => {
          if (getAuthorKey(article) !== previousKey) {
            return article;
          }

          return {
            ...article,
            author: nextProfile.fullName,
            userEmail: nextProfile.email,
            authorAvatarId: nextProfile.avatarId,
            authorPhotoUrl: nextProfile.photoUrl || ""
          };
        });

        setStoredJson(articleStorageKey, nextArticles);
        return nextArticles;
      });
    }
  }

  function requestArticleRead(article) {
    if (!profile) {
      setLockedArticle(article);
      return;
    }

    setSelectedArticle(article);
  }

  function renderPage() {
    if (route === "articles") {
      return (
        <div className="page-shell">
          <ArticlesView articles={articles} openArticle={requestArticleRead} profile={profile} />
        </div>
      );
    }

    if (route === "write") {
      return (
        <WriteView
          profile={profile}
          profileRank={profileRank}
          profilePostCount={profilePostCount}
          addArticle={addArticle}
          clearUserArticles={clearUserArticles}
          setRoute={navigate}
        />
      );
    }

    if (route === "signup") {
      return <SignupView profile={profile} saveProfile={saveProfile} profileRank={profileRank} profilePostCount={profilePostCount} />;
    }

    if (route === "recommendations") {
      return <RecommendationsView recommendations={recommendations} addRecommendation={addRecommendation} profile={profile} />;
    }

    return (
      <HomeView
        articles={articles}
        profile={profile}
        profileRank={profileRank}
        profilePostCount={profilePostCount}
        setRoute={navigate}
        openArticle={requestArticleRead}
      />
    );
  }

  return (
    <>
      <Header profile={profile} setRoute={navigate} />
      <div className="content-grid">
        <AccessibilitySidebar
          settings={settings}
          updateSettings={updateSettings}
          setRoute={navigate}
          activeRoute={route}
          profile={profile}
          articleCount={userArticles.length}
          recommendationCount={recommendations.length}
          profileRank={profileRank}
        />
        <main>{renderPage()}</main>
      </div>
      <ReaderModal article={selectedArticle} closeArticle={() => setSelectedArticle(null)} />
      <SignInGateModal article={lockedArticle} closeGate={() => setLockedArticle(null)} setRoute={navigate} />
      <LoadingScreen visible={isPageLoading} />
      <footer>Built for anime fans who always have one more theory to write.</footer>
    </>
  );
}
