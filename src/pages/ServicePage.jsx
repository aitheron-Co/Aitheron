// src/pages/ServicePage.jsx
import { useParams, Link } from "react-router-dom";
import { useState } from "react";

const CAL_URL =
  "https://calendly.com/aitheron/new-meeting?background_color=000000&text_color=ffffff&primary_color=d4a017";

const services = [
  {
    slug: "azure",
    name: "Microsoft Azure & Fabric",
    sub:
      "Modern data estates, Fabric lakehouse, Purview governance, and Power BI dashboards.",
    bullets: [
      "Landing zone & security baseline (CAF)",
      "Migration: SQL/DB2/Oracle → Azure SQL/MI",
      "Fabric Lakehouse, Notebooks, Power BI",
      "Purview governance, FinOps cost control",
    ],
    highlights: [
      {
        title: "Data Estate Modernization",
        items: [
          "Medallion data architecture on OneLake",
          "Reliable ingestion with ADF & pipelines",
          "Delta tables, notebooks, semantic models",
        ],
      },
      {
        title: "Security & Compliance",
        items: [
          "Azure RBAC, PIM, Key Vault, Defender",
          "Purview data catalog & lineage",
          "Policy-as-code and least-privilege",
        ],
      },
      {
        title: "Cost & Operability",
        items: [
          "Well-Architected Framework reviews",
          "FinOps controls & showback dashboards",
          "Observability: Logs, Metrics, Alerts",
        ],
      },
    ],
    packages: [
      {
        name: "Azure Readiness Assessment",
        desc:
          "2-week discovery of your current estate, risks, costs and a prioritized roadmap.",
      },
      {
        name: "Fabric Pilot",
        desc:
          "4–6 weeks to stand up a lakehouse, ingest real data, and deliver a live Power BI dashboard.",
      },
      {
        name: "Cost Governance Sprint",
        desc:
          "4 weeks to implement tagging, budgets, policies and 15–30% cost opportunities.",
      },
    ],
    ctas: [
      { label: "Request an Azure Assessment", action: "assessment" },
      { label: "See How We Engage", action: "engage" },
      { label: "Book a Call", action: "calendly" },
    ],
  },
];

export default function ServicePage() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  const [showCal, setShowCal] = useState(false);

  function openCalendly(e) {
    e?.preventDefault?.();
    if (window.Calendly?.initPopupWidget) {
      window.Calendly.initPopupWidget({ url: CAL_URL });
      return;
    }
    setShowCal(true);
  }

  function handleCTA(action) {
    if (action === "calendly") return openCalendly();
    if (action === "assessment") {
      // scroll to contact form on homepage (or replace with a dedicated route later)
      window.location.href = "/#contact";
      return;
    }
    if (action === "engage") {
      // simple inline scroll to “How we engage” section on this page
      const el = document.getElementById("engagement-model");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-black text-white grid place-items-center p-6">
        <div className="text-center">
          <p className="text-white/80 mb-4">Service not found.</p>
          <Link to="/" className="text-yellow-400 underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top bar */}
      <header className="border-b border-white/10 px-6 py-4">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <Link to="/" className="text-yellow-400 font-semibold hover:text-yellow-300">
            ← Back to Aitheron
          </Link>
          <Link to="/#partnerships" className="text-white/60 hover:text-white">
            Partnerships
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Hero */}
        <section>
          <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-400">
            {service.name}
          </h1>
          <p className="mt-3 text-white/80">{service.sub}</p>

          <ul className="mt-6 grid gap-2 text-sm text-white/80">
            {service.bullets.map((b) => (
              <li key={b}>• {b}</li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            {service.ctas.map((c) => (
              <button
                key={c.label}
                onClick={() => handleCTA(c.action)}
                className={
                  c.action === "assessment"
                    ? "rounded-xl bg-yellow-500/20 px-5 py-3 ring-1 ring-yellow-500/40 text-yellow-200 hover:bg-yellow-500/30"
                    : "rounded-xl bg-white/5 px-5 py-3 ring-1 ring-white/10 hover:bg-white/10"
                }
              >
                {c.label}
              </button>
            ))}
          </div>
        </section>

        {/* Highlights */}
        <section className="mt-12 grid gap-6 md:grid-cols-3">
          {service.highlights.map((box) => (
            <div
              key={box.title}
              className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10"
            >
              <h3 className="text-lg font-semibold text-yellow-300">{box.title}</h3>
              <ul className="mt-3 space-y-1 text-sm text-white/80">
                {box.items.map((it) => (
                  <li key={it}>• {it}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Engagement model */}
        <section id="engagement-model" className="mt-12">
          <h2 className="text-xl font-semibold text-yellow-300">How We Engage</h2>
          <ol className="mt-3 list-decimal pl-5 space-y-1 text-white/80">
            <li>Discovery & objectives alignment (1–2 workshops)</li>
            <li>Architecture & security baseline</li>
            <li>Implementation sprints with demos</li>
            <li>Handover, docs, and enablement</li>
          </ol>
        </section>

        {/* Packages */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-yellow-300">Packages</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {service.packages.map((p) => (
              <div key={p.name} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                <h3 className="font-semibold text-white">{p.name}</h3>
                <p className="mt-2 text-sm text-white/80">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Secondary CTAs */}
        <section className="mt-12 flex flex-wrap gap-3">
          <button
            onClick={() => handleCTA("assessment")}
            className="rounded-xl bg-yellow-500/20 px-5 py-3 ring-1 ring-yellow-500/40 text-yellow-200 hover:bg-yellow-500/30"
          >
            Request an Azure Assessment
          </button>
          <button
            onClick={() => handleCTA("engage")}
            className="rounded-xl bg-white/5 px-5 py-3 ring-1 ring-white/10 hover:bg-white/10"
          >
            See How We Engage
          </button>
          <button
            onClick={() => handleCTA("calendly")}
            className="rounded-xl bg-white/5 px-5 py-3 ring-1 ring-white/10 hover:bg-white/10"
          >
            Book a Call
          </button>
        </section>
      </main>

      {/* Inline Calendly fallback (only if global widget not ready) */}
      {showCal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setShowCal(false)}
        >
          <div
            className="relative w-full max-w-2xl h-[80vh] rounded-2xl overflow-hidden ring-1 ring-yellow-500/30 bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={CAL_URL}
              title="Calendly"
              className="w-full h-full border-0"
              allow="camera; microphone; autoplay"
            />
            <button
              onClick={() => setShowCal(false)}
              className="absolute top-2 right-2 rounded-full bg-yellow-500/20 text-yellow-200 px-3 py-1 text-sm ring-1 ring-yellow-500/40 hover:bg-yellow-500/30"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
