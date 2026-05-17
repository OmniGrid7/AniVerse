export function getReadTime(text) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 180));
}

export function todayLabel() {
  return new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  });
}

export function currentRoute() {
  return window.location.hash.replace("#", "") || "home";
}

export function getAuthorKey(articleOrProfile) {
  return (articleOrProfile.userEmail || articleOrProfile.email || articleOrProfile.author || articleOrProfile.fullName || "")
    .trim()
    .toLowerCase();
}

export function getAuthorPostCounts(articles) {
  return articles.reduce((counts, article) => {
    const key = getAuthorKey(article);
    if (!key) return counts;
    return {
      ...counts,
      [key]: (counts[key] || 0) + 1
    };
  }, {});
}

export function getAuthorRank(postCount = 0) {
  if (postCount >= 7) {
    return {
      label: "Front Page Author",
      next: "Top tier reached",
      boost: 90
    };
  }

  if (postCount >= 4) {
    return {
      label: "Featured Reviewer",
      next: `${7 - postCount} more posts to reach Front Page Author`,
      boost: 60
    };
  }

  if (postCount >= 2) {
    return {
      label: "Rising Writer",
      next: `${4 - postCount} more posts to reach Featured Reviewer`,
      boost: 32
    };
  }

  if (postCount === 1) {
    return {
      label: "New Contributor",
      next: "1 more post to reach Rising Writer",
      boost: 12
    };
  }

  return {
    label: "Reader",
    next: "Publish your first article to become a contributor",
    boost: 0
  };
}

export function promoteArticles(articles) {
  const postCounts = getAuthorPostCounts(articles);

  return articles
    .map((article, index) => {
      const authorKey = getAuthorKey(article);
      const authorPostCount = postCounts[authorKey] || 0;
      const authorRank = getAuthorRank(authorPostCount);

      return {
        ...article,
        authorPostCount,
        authorRank,
        originalIndex: index
      };
    })
    .sort((a, b) => {
      if (b.authorRank.boost !== a.authorRank.boost) {
        return b.authorRank.boost - a.authorRank.boost;
      }

      if (b.authorPostCount !== a.authorPostCount) {
        return b.authorPostCount - a.authorPostCount;
      }

      return a.originalIndex - b.originalIndex;
    })
    .map(({ originalIndex, ...article }) => article);
}
