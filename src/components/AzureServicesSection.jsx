// Opens Calendly popup inline (same script used on homepage)
function openCalendly(e) {
  e?.preventDefault?.();
  const CALENDLY_URL = "https://calendly.com/aitheron/new-meeting?background_color=000000&text_color=ffffff&primary_color=d4a017";

  // Try open popup if script loaded
  if (window.Calendly && typeof window.Calendly.initPopupWidget === "function") {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL });
  } else {
    // fallback: open new tab
    window.open(CALENDLY_URL, "_blank");
  }
}


export default function AzureServicesSection() {
  return (
    <section
      id="azure-services"
      className="relative mx-auto max-w-7xl px-6 py-16 text-white"
    >
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold text-yellow-400">
          Microsoft Azure & Fabric Services
        </h2>
        <p className="mt-4 text-white/80">
          We deliver enterprise-grade cloud modernization, analytics, and AI solutions built
          on Microsoft Azure and Fabric — with secure, scalable, and cost-optimized architectures.
        </p>

        <ul className="mt-8 grid gap-3 text-left text-sm text-white/70">
          <li>• Azure data estate modernization & migration</li>
          <li>• Fabric lakehouse design, Data Factory ingestion, Purview governance</li>
          <li>• Power BI & Copilot for Data analytics enablement</li>
          <li>• FinOps & cloud cost governance frameworks</li>
        </ul>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {/* Jump to homepage sections */}
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

          {/* Optional direct Calendly link */}
          
          <button
  onClick={openCalendly}
  className="rounded-xl bg-white/5 px-5 py-3 ring-1 ring-white/10 hover:bg-white/10"
>
  Book a Call
</button>

            Book a Call
          </a>
        </div>
      </div>
    </section>
  );
}
