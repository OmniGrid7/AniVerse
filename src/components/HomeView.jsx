import ArticlesView from "./ArticlesView.jsx";
import Hero from "./Hero.jsx";
import MissionSection from "./MissionSection.jsx";
import Stats from "./Stats.jsx";

export default function HomeView({ articles, profile, profileRank, profilePostCount, setRoute, openArticle }) {
  return (
    <>
      <Hero setRoute={setRoute} />
      <Stats articles={articles} profile={profile} profileRank={profileRank} profilePostCount={profilePostCount} />
      <MissionSection setRoute={setRoute} />
      <ArticlesView articles={articles.slice(0, 6)} openArticle={openArticle} profile={profile} compact />
    </>
  );
}
