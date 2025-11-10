import { useEffect, useState } from "react";
import { getConsent, setConsent, hasAnalyticsConsent } from "../utils/consent";
import { loadClarityOnce } from "../utils/loadClarity";

const CLARITY_ID = "u3znow4ygn";

export default function CookieBanner() {
  const [consent, setLocal] = useState(getConsent());

  useEffect(() => {
    if (hasAnalyticsConsent()) loadClarityOnce(CLARITY_ID);
  }, []);

  if (consent.decided) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70]">
      <div className="mx-auto max-w-4xl m-3 rounded-2xl bg-black/90 p-4 ring-1 ring-white/10 text-white">
        <p className="text-sm">
          We use privacy-friendly analytics (Microsoft Clarity) to understand how our site is used.
          You can opt in or out of analytics—your choice.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            onClick={() => {
              const next = { analytics: true, decided: true };
              setConsent(next); setLocal(next);
              loadClarityOnce(CLARITY_ID);
            }}
            className="rounded-lg bg-yellow-500/20 px-4 py-2 ring-1 ring-yellow-500/40 text-yellow-200 hover:bg-yellow-500/30"
          >
            Accept analytics
          </button>
          <button
            onClick={() => { const next = { analytics: false, decided: true }; setConsent(next); setLocal(next); }}
            className="rounded-lg bg-white/5 px-4 py-2 ring-1 ring-white/10 hover:bg-white/10"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}

