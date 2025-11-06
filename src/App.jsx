// src/App.jsx
import { useEffect, useState } from "react";

export default function AitheronSite() {
  // Logo (placed in /public/logo.png)
  const logoSrc = "/logo.png";

  // ===== Calendly =====
  const CALENDLY_URL = "https://calendly.com/aitheron/new-meeting?background_color=000000&text_color=ffffff&primary_color=d4a017"; // ← put your real link
  const openCalendly = (e) => {
  e?.preventDefault?.();

  if (!CALENDLY_URL || CALENDLY_URL.includes("your-handle")) {
    alert("Please set CALENDLY_URL in App.jsx to your real Calendly link.");
    return;
  }

  // If widget is ready, open popup
  if (window.Calendly && typeof window.Calendly.initPopupWidget === "function") {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    return;
  }

  // Otherwise, try again shortly once the widget script loads
  const tryLater = setInterval(() => {
    if (window.Calendly && typeof window.Calendly.initPopupWidget === "function") {
      clearInterval(tryLater);
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    }
  }, 200);

  // Hard fallback after ~1.5s: just navigate to your Calendly page
  setTimeout(() => {
    try { clearInterval(tryLater); } catch {}
    if (!(window.Calendly && typeof window.Calendly.initPopupWidget === "function")) {
      window.location.href = CALENDLY_URL;
    }
  }, 1500);
};


  // ===== Formspree =====
  // 1) Create form at https://formspree.io
  // 2) Paste your endpoint below (e.g., https://formspree.io/f/abcdwxyz)
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xrbywnyj";

  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      if (res.ok) {
        setSuccess(true);
        form.reset();
      } else {
        const j = await res.json().catch(() => ({}));
        setError(j?.errors?.[0]?.message || "Submission failed. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // Close modal on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setShowForm(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Load Calendly widget script once
  useEffect(() => {
    if (!document.querySelector("#calendly-widget-js")) {
      const s = document.createElement("script");
      s.id = "calendly-widget-js";
      s.src = "https://assets.calendly.com/assets/external/widget.js";
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  return (
    <div className="min-h-screen w-full text-white bg-black selection:bg-yellow-500/30 selection:text-yellow-200">
      {/* Top banner */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,160,23,0.25),rgba(0,0,0,0.1)_40%,rgba(0,0,0,1))]" />
        <div className="relative mx-auto max-w-7xl px-6 py-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoSrc} alt="Aitheron Logo" className="h-12 w-12 object-contain rounded-full" />
            <span className="text-xl font-semibold tracking-widest text-yellow-400">AITHERON</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="#services" className="hover:text-yellow-400">Services</a>
            <a href="#industries" className="hover:text-yellow-400">Industries</a>
            <a href="#why" className="hover:text-yellow-400">Why Us</a>
            <a href="#contact" className="hover:text-yellow-400">Contact</a>
            <a
              href={CALENDLY_URL}
              onClick={openCalendly}
              className="ml-2 rounded-full bg-yellow-500/20 px-4 py-2 text-yellow-300 ring-1 ring-yellow-500/40 hover:bg-yellow-500/30"
            >
              Book a Call
            </a>
          </nav>
        </div>
      </header>

      
      {/* Hero */}

      <section id="hero" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10" />
        <div className="mx-auto max-w-7xl px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Full-Stack <span className="text-yellow-400">Database → Cloud → AI</span> Services
            </h1>
            <p className="mt-5 text-base md:text-lg text-white/80">
              We help enterprises modernize mission-critical databases, build secure cloud platforms, and ship AI that delivers measurable ROI.
            </p>
            <div className="mt-8 flex flex-wrap gap-3" id="cta">
              <button
                onClick={() => { setShowForm(true); setSuccess(false); setError(""); }}
                className="rounded-xl bg-yellow-500/20 px-5 py-3 ring-1 ring-yellow-500/40 text-yellow-200 hover:bg-yellow-500/30"
              >
                Get a Proposal
              </button>
              <a href="#services" className="rounded-xl bg-white/5 px-5 py-3 ring-1 ring-white/10 hover:bg-white/10">
                Explore Services
              </a>
              <button
                onClick={openCalendly}
                className="rounded-xl bg-yellow-500/20 px-5 py-3 ring-1 ring-yellow-500/40 text-yellow-200 hover:bg-yellow-500/30"
              >
                Book a Call
              </button>
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-white/70">
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-yellow-400" /> Senior DBAs (15+ yrs)</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-yellow-400" /> Azure • AWS • Oracle</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-yellow-400" /> FinOps & Security First</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-yellow-400" /> Greece-based • Global</li>
            </ul>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-black overflow-hidden ring-1 ring-yellow-500/30 p-2 grid place-items-center">
              <img src={logoSrc} alt="Aitheron Logo" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-t border-white/10 bg-neutral-950/40">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-400">Services</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <Card title="Advanced Database Solutions" points={[
              "Performance tuning & observability",
              "HADR architecture & DR testing",
              "Consolidation & licensing optimization",
              "Security & compliance frameworks",
            ]} />
            <Card title="Cloud Infrastructure" points={[
              "Cloud migration & modernization",
              "Kubernetes & CI/CD enablement",
              "Multi-cloud networking & SSO/IAM",
              "FinOps cost governance",
            ]} />
            <Card title="AI-Driven Applications" points={[
              "Predictive analytics & dashboards",
              "Intelligent automation & copilots",
              "NLP chatbots & personalization",
              "AI readiness & ROI roadmap",
            ]} />
          </div>

          <div className="mt-10 text-sm text-white/60">
            <p className="uppercase tracking-widest text-white/40">Ecosystem</p>
            <p>Azure (SQL, Synapse, Purview, ML, Arc) • AWS (RDS/Aurora, Glue, Lake Formation, SageMaker) • Oracle (Autonomous DB, OCI, AI Services)</p>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section id="industries" className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-400">Industries We Serve</h2>
        <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-white/80">
          {[
            "Financial Services",
            "Healthcare & Life Sciences",
            "Retail & E-commerce",
            "Manufacturing & Supply Chain",
            "Telecom & Media",
            "Public Sector (Greece & Cyprus)",
          ].map((it) => (
            <li key={it} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">{it}</li>
          ))}
        </ul>
        </div>
      </section>

      {/* Why Us */}
      <section id="why" className="border-t border-white/10 bg-neutral-950/30">
        <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-yellow-400">Why AITHERON?</h2>
            <ul className="mt-6 space-y-3 text-white/80">
              <li>End-to-end delivery from database → cloud → AI.</li>
              <li>Outcome-based engagements (uptime, performance, cost savings).</li>
              <li>Boutique agility — senior experts lead every project.</li>
              <li>Security & compliance built in (GDPR-ready).</li>
            </ul>
          </div>
          <div className="rounded-3xl bg-yellow-600/10 p-6 ring-1 ring-yellow-500/30">
            <h3 className="text-lg font-semibold text-yellow-300">Signature Packages</h3>
            <ol className="mt-3 list-decimal pl-5 text-white/80 space-y-1">
              <li>DB Performance Sprint (2 weeks)</li>
              <li>Cloud Cost Governance (FinOps) Accelerator (4 weeks)</li>
              <li>AI Readiness & Pilot (6–8 weeks)</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-white/10">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-400">Let’s Build Your Next Advantage</h2>
          <p className="mt-3 text-white/80">Based in Greece • Serving Greece, Cyprus, and global clients remotely</p>
          <div className="mt-6 grid sm:grid-cols-3 gap-3">
            <ContactCard label="Email" value="contact@aitheron.gr" />
            <ContactCard label="Office" value="Piraeus, Attica, Greece" />
            <ContactCard label="Web" value="www.aitheron.gr" />
          </div>
          <div className="mt-6">
            <button onClick={openCalendly} className="rounded-xl bg-yellow-500/20 px-6 py-3 ring-1 ring-yellow-500/40 text-yellow-200 hover:bg-yellow-500/30">
              Book a Call
            </button>
          </div>
          <a href="#hero" className="mt-8 inline-block rounded-xl bg-yellow-500/20 px-6 py-3 ring-1 ring-yellow-500/40 text-yellow-200 hover:bg-yellow-500/30">
            Back to top
          </a>
        </div>
      </section>

      {/* Modal: Proposal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-lg rounded-2xl bg-neutral-900 p-6 ring-1 ring-yellow-500/40">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-yellow-300">Request a Proposal</h3>
              <button onClick={() => setShowForm(false)} aria-label="Close" className="text-white/60 hover:text-white">✕</button>
            </div>

            {success ? (
              <div className="mt-6 rounded-xl bg-green-600/15 p-4 ring-1 ring-green-600/30 text-green-200">
                Thank you! Your request has been sent. We'll get back to you within one business day.
                <div className="mt-4 flex justify-end">
                  <button onClick={() => setShowForm(false)} className="rounded bg-white/10 px-4 py-2 text-white hover:bg-white/15">Close</button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                {/* Honeypot anti-spam */}
                <input type="text" name="_gotcha" className="hidden" tabIndex="-1" autoComplete="off" />

                <div className="grid gap-3 sm:grid-cols-2">
                  <input required name="name" placeholder="Your name" className="w-full rounded bg-black/40 p-2 ring-1 ring-white/10 focus:ring-yellow-500/50 outline-none" />
                  <input required type="email" name="email" placeholder="Email" className="w-full rounded bg-black/40 p-2 ring-1 ring-white/10 focus:ring-yellow-500/50 outline-none" />
                </div>
                <input name="company" placeholder="Company" className="w-full rounded bg-black/40 p-2 ring-1 ring-white/10 focus:ring-yellow-500/50 outline-none" />
                <textarea required name="message" rows={5} placeholder="Project details, timelines, budgets..." className="w-full rounded bg-black/40 p-2 ring-1 ring-white/10 focus:ring-yellow-500/50 outline-none" />

                {/* Subject for emails you receive */}
                <input type="hidden" name="_subject" value="AITHERON: Proposal Request" />

                {error && <p className="text-red-300 text-sm">{error}</p>}

                <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                  <button type="button" onClick={() => setShowForm(false)} className="text-white/60 hover:text-white">Cancel</button>
                  <button type="button" onClick={openCalendly} className="rounded bg-white/10 px-4 py-2 text-yellow-200 ring-1 ring-white/15 hover:bg-white/15">Book a Call</button>
                  <button disabled={submitting} type="submit" className="rounded bg-yellow-500/20 px-4 py-2 text-yellow-200 ring-1 ring-yellow-500/40 hover:bg-yellow-500/30 disabled:opacity-60 disabled:cursor-not-allowed">
                    {submitting ? "Sending…" : "Send"}
                  </button>
                </div>
                <p className="text-xs text-white/50">We respect your privacy. Your details are used only to contact you about this request.</p>
              </form>
            )}
          </div>
        </div>
      )}
<section id="legal" className="border-t border-white/10 bg-neutral-950/30">
  <div className="mx-auto max-w-5xl px-6 py-12 text-left text-white/70 space-y-4">
    <h2 className="text-xl font-semibold text-yellow-400">Privacy Policy & Legal Notice</h2>

    <p>
      AITHERON respects your privacy and complies with the EU General Data Protection Regulation (GDPR).
      We only collect the personal information that you voluntarily provide through our contact forms or business communications.
      This information is used exclusively for responding to your inquiries, preparing proposals, or maintaining a business relationship.
    </p>

    <p>
      We do not share, sell, or rent your data to any third parties.
      All submitted information is stored securely and only for as long as necessary for the purposes outlined above.
    </p>

    <p>
      If you wish to request access to, correction, or deletion of your personal data, you may contact us at
      <a href="mailto:privacy@aitheron.gr" className="text-yellow-400 hover:underline ml-1">privacy@aitheron.gr</a>.
    </p>

    <p>
      <strong>Company:</strong> AITHERON • Πλ. Ιπποδαμείας 8, Πειραιάς, Αττική, 18531, Greece • VAT: EL803032552  
      <br />
      <strong>Website:</strong> <a href="https://www.aitheron.gr" className="text-yellow-400 hover:underline">www.aitheron.gr</a>
    </p>

    <p className="text-sm text-white/50">
      By using this website, you agree to our Privacy Policy.  
      This site may use cookies or analytics tools solely to understand aggregated traffic and improve user experience.
    </p>
  </div>
</section>

<footer className="border-t border-white/10 text-center text-xs text-white/60 py-8 space-y-4">
  <p>© {new Date().getFullYear()} <span className="font-semibold text-white">AITHERON</span>. All rights reserved.</p>

  <div className="flex justify-center gap-6 text-yellow-400">
    <a
      href="https://www.linkedin.com/company/aitheron"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 hover:text-yellow-300 transition"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.762 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11.75 20h-2.5v-10h2.5v10zm-1.25-11.5c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5zm13 11.5h-2.5v-5.604c0-1.337-.025-3.061-1.865-3.061-1.867 0-2.155 1.458-2.155 2.964v5.701h-2.5v-10h2.4v1.367h.034c.334-.632 1.155-1.299 2.377-1.299 2.541 0 3.009 1.673 3.009 3.848v6.084z"/>
      </svg>
      <span>Follow us on LinkedIn</span>
    </a>
  </div>

  <p className="text-white/40 text-[10px]">
    AITHERON is a Greece-based technology company providing advanced Database, Cloud, and AI solutions.
  </p>
</footer>


    </div>
  );
}

function Card({ title, points }) {
  return (
    <div className="h-full rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
      <h3 className="text-lg font-semibold text-yellow-300">{title}</h3>
      <ul className="mt-3 space-y-2 text-white/80 text-sm">
        {points.map((p) => (
          <li key={p} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-yellow-400" />{p}</li>
        ))}
      </ul>
    </div>
  );
}

function ContactCard({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
      <p className="text-white/60 text-xs uppercase tracking-widest">{label}</p>
      <p className="text-white/90 mt-1">{value}</p>
    </div>
  );
}
