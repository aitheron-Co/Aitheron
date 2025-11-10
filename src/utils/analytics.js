// src/utils/analytics.js
// Tiny wrapper for analytics calls (works with Google Analytics and Microsoft Clarity)

export function track(event, params = {}) {
  try {
    // Google Analytics (gtag)
    if (window.gtag) {
      window.gtag("event", event, params);
    }

    // Microsoft Clarity (optional)
    if (window.clarity) {
      window.clarity("event", event);
    }

    if (!window.gtag && !window.clarity) {
      console.debug("[Analytics]", event, params);
    }
  } catch (err) {
    console.warn("Analytics tracking error:", err);
  }
}
