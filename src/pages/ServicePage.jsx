// src/pages/ServicePage.jsx
import { useParams, Link } from "react-router-dom";
import { useState } from "react";

const services = [
  {
    slug: "azure",
    name: "Microsoft Azure & Fabric",
    description:
      "Modern data estates, Fabric lakehouse, Purview governance, and Power BI dashboards.",
    bullets: [
      "Landing zone & security baseline (CAF)",
      "Migration: SQL/DB2/Oracle → Azure SQL/MI",
      "Fabric Lakehouse, Notebooks, Power BI",
      "Purview governance, FinOps cost control",
    ],
  },
];

export default function ServicePage() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  const [show, setShow] = useState(false);
  const url =
    "https://calendly.com/aitheron/new-meeting?background_color=000000&text_color=ffffff&primary_color=d4a017";

  function openCalendly(e) {
    e.preventDefault();
    if (window.Calendly?.initPopupWidget)
      return window.Calendly.initPopupWidget({ url });
    setShow(true);
  }

  if (!service)
    return (
      <div className="min-h-screen bg-black text-white grid place-items-center">
        <p>Service not found</p>
        <Link to="/" className="text-yellow-400 underline">
          Back to Home
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10 px-6 py-4">
        <Link to="/" className="text-yellow-400 font-semibold hover:text-yellow-300">
          ← Back to Aitheron
        </Link>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-3xl font-bold text-yellow-400">{service.name}</h1>
        <p className="mt-4 text-white/80">{service.description}</p>

        <ul className="mt-8 grid gap-3 text-left text-sm text-white/70">
          {service.bullets.map((b) => (
            <li key={b}>• {b}</li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-3">
          <button
            onClick={openCalendly}
            className="rounded-xl bg-yellow-500/20 px-5 py-3 ring-1 ring-yellow-500/40 text-yellow-200 hover:bg-yellow-500/30"
          >
            Book a Call
          </button>
        </div>
      </main>

      {show && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setShow(false)}
        >
          <div
            className="relative w-full max-w-2xl h-[80vh] rounded-2xl overflow-hidden ring-1 ring-yellow-500/30 bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={url}
              title="Calendly"
              className="w-full h-full border-0"
              allow="camera; microphone; autoplay"
            />
            <button
              onClick={() => setShow(false)}
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
