// src/utils/consent.js
const KEY = "aitheron_consent_v1";  // bump version if you change categories

export function getConsent() {
  try { return JSON.parse(localStorage.getItem(KEY)) || { analytics: false, decided: false }; }
  catch { return { analytics: false, decided: false }; }
}

export function setConsent(next) {
  localStorage.setItem(KEY, JSON.stringify(next));
}

export function hasAnalyticsConsent() {
  const c = getConsent();
  return !!c.analytics;
}

