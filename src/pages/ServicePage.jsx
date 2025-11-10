import { useParams, Link } from "react-router-dom";
import { services } from "../data/services";
import { track } from "../utils/analytics";
import { useState, useEffect } from "react";

export default function ServicePage() {
  const { slug } = useParams();
  const svc = services.find((s) => s.slug === slug);

  // Fallback if unknown slug
  if (!svc) {
    return (
      <div className="min-h-screen bg-black text-white grid place-items-center p-6">
        <div className="text-center">
          <p className="text-2xl mb-4">Service not found</p>
          <Link to="/" className="text-yellow-400 hover:text-yellow-300 underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  // Local Calendly popup fallback
  const [show, setShow] = useState(false);
  const url = "https://calendly.com/aitheron/new-meeting?background_color=000000&text_color=ffffff&primary_color=d4a017";
  function openCalendly(e) {
    e?.preventDefault?.();
    if (window.Calendly?.initPopupWidget) return window.Calendly.initPopupWidget({ url });
    setShow(true);
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10 px-6 py-4">
        <Link to="/" className="text-yellow-400 font-semibold hover:text-yellow-300">← Back to Aitheron</Link>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-3xl font-bold text-yellow-400">{svc.title}</h1>
        <p className="mt-4 text-white/80">{svc.description}</p>

        <ul className="mt-8 grid gap-3 text-left text-sm text-white/70">
          {svc.bullets.map((b) => <li key={b}>• {b}</li>)}
        </ul>

        <div className="mt-10 flex flex-wrap gap-3">
          <a href="/#contact" onClick={() => track(`${slug}_assessment_click`)}
             className="rounded-xl bg-yellow-500/20 px-5 py-3 ring-1 ring-yellow-500/40 text-yellow-200 hover:bg-yellow-500/30">
            Request an Assessment
          </a>
          <a href="/#cta" onClick={() => track(`${slug}_engage_click`)}
             className="rounded-xl bg-white/5 px-5 py-3 ring-1 ring-white/10 hover:bg-white/10">
            See How We Engage
          </a>
          <button onClick={(e) => { track(`${slug}_book_call_click`); openCalendly(e); }}
                  className="rounded-xl bg-white/5 px-5 py-3 ring-1 ring-white/10 hover:bg-white/10">
            Book a Call
          </button>
        </div>
      </main>

      {/* Animated overlay fallback */}
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4
                        opacity-0 animate-[fadeIn_180ms_ease-out_forwards]"
             onClick={() => setShow(false)}>
          <style>{`
            @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
            @keyframes scaleIn { from { transform: scale(.96) } to { transform: scale(1) } }
          `}</style>
          <div className="relative w-full max-w-2xl h-[80vh] rounded-2xl overflow-hidden
                          ring-1 ring-yellow-500/30 bg-black
                          animate-[scaleIn_180ms_ease-out_forwards]"
               onClick={(e) => e.stopPropagation()}>
            <iframe src={url} title="Calendly" className="w-full h-full border-0" allow="camera; microphone; autoplay" />
            <button onClick={() => setShow(false)}
                    className="absolute top-2 right-2 rounded-full bg-yellow-500/20 text-yellow-200 px-3 py-1 text-sm
                               ring-1 ring-yellow-500/40 hover:bg-yellow-500/30" aria-label="Close">✕</button>
          </div>
        </div>
      )}
    </div>
  );
}
