import { useState } from "react";

export default function AzureServicesSection() {
  const [showCalendly, setShowCalendly] = useState(false);

  const CALENDLY_URL =
    "https://calendly.com/aitheron/new-meeting?background_color=000000&text_color=ffffff&primary_color=d4a017";

  function openCalendly(e) {
    e?.preventDefault?.();
    // Try Calendly's own popup (if script is ready)
    if (window.Calendly && typeof window.Calendly.initPopupWidget === "function") {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
      return;
    }
    // Fallback: our own centered overlay
    setShowCalendly(true);
  }

  return (
    <section
      id="azure-services"
      className="relative mx-auto max-w-7xl px-6 py-16 text-white"
    >
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold text-yellow-400">
          Microsoft Azure &amp; Fabric Services
        </h2>
        <p className="mt-4 text-white/80">
          We deliver enterprise-grade cloud modernization, analytics, and AI solutions built
          on Microsoft Azure and Fabric — with secure, scalable, and cost-optimized architectures.
        </p>

        <ul className="mt-8 grid gap-3 text-left text-sm text-white/70">
          <li>• Azure data estate modernization &amp; migration</li>
          <li>• Fabric lakehouse design, Data Factory ingestion, Purview governance</li>
          <li>• Power BI &amp; Copilot for Data analytics enablement</li>
          <li>• FinOps &amp; cloud cost governance frameworks</li>
        </ul>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href="/#contact"
            className="rounded-xl bg-yellow-500/20 px-5 py-3 ring-1 ring-yellow-500/40 text-yellow-200 hover:bg-yellow-500/30"
          >
            Request an Azure Assessment
          </a>

          <a
            href="/#cta"
            className="rounded-xl bg-white/5 px-5 py-3 ring-1 ring-white/10 hover:bg-white/10"
          >
            See How We Engage
          </a>

          <button
            onClick={openCalendly}
            className="rounded-xl bg-white/5 px-5 py-3 ring-1 ring-white/10 hover:bg-white/10"
          >
            Book a Call
          </button>
        </div>
      </div>

      {/* Animated centered overlay (fallback if Calendly script not ready) */}
      {showCalendly && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4
                     opacity-0 animate-[fadeIn_180ms_ease-out_forwards]"
          onClick={() => setShowCalendly(false)}
        >
          <style>{`
            @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
            @keyframes scaleIn { from { transform: scale(.96) } to { transform: scale(1) } }
          `}</style>

          <div
            className="relative w-full max-w-2xl h-[80vh] rounded-2xl overflow-hidden
                       ring-1 ring-yellow-500/30 bg-black
                       animate-[scaleIn_180ms_ease-out_forwards]"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={CALENDLY_URL}
              title="Calendly"
              className="w-full h-full border-0"
              allow="camera; microphone; autoplay"
            />
            <button
              onClick={() => setShowCalendly(false)}
              className="absolute top-2 right-2 rounded-full bg-yellow-500/20 text-yellow-200 px-3 py-1 text-sm
                         ring-1 ring-yellow-500/40 hover:bg-yellow-500/30"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
