export const articleStorageKey = "aniverse-user-articles";
export const profileStorageKey = "aniverse-user-profile";
export const recommendationStorageKey = "aniverse-recommendations";
export const settingsStorageKey = "aniverse-accessibility-settings";

export function getStoredJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}

export function setStoredJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
