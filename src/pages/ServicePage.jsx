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
      { title: "Data Estate Modernization", items: [
        "Medallion data architecture on OneLake",
        "Reliable ingestion with ADF & pipelines",
        "Delta tables, notebooks, semantic models",
      ]},
      { title: "Security & Compliance", items: [
        "Azure RBAC, PIM, Key Vault, Defender",
        "Purview data catalog & lineage",
        "Policy-as-code and least-privilege",
      ]},
      { title: "Cost & Operability", items: [
        "Well-Architected Framework reviews",
        "FinOps controls & showback dashboards",
        "Observability: Logs, Metrics, Alerts",
      ]},
    ],
    packages: [
      { name: "Azure Readiness Assessment", desc: "2-week discovery of your current estate, risks, costs and a prioritized roadmap." },
      { name: "Fabric Pilot", desc: "4–6 weeks to stand up a lakehouse, ingest real data, and deliver a live Power BI dashboard." },
      { name: "Cost Governance Sprint", desc: "4 weeks to implement tagging, budgets, policies and 15–30% cost opportunities." },
    ],
    ctas: [
      { label: "Request an Azure Assessment", action: "assessment" },
      { label: "See How We Engage", action: "engage" },
      { label: "Book a Call", action: "calendly" },
    ],
  },

  {
    slug: "aws",
    name: "AWS Data & Analytics",
    sub:
      "Lake Formation governance, Glue pipelines, Redshift/S3 analytics, and cost-optimized architectures.",
    bullets: [
      "Landing zone & org setup (Control Tower)",
      "ETL/ELT with AWS Glue & Lambda",
      "Data lake on S3 + Redshift for analytics",
      "Lake Formation governance & catalog",
    ],
    highlights: [
      { title: "Modern Data Platform on AWS", items: [
        "S3 data lake with ACID table formats",
        "Glue jobs, crawlers, workflows",
        "Redshift data warehouse & Spectrum",
      ]},
      { title: "Security & Compliance", items: [
        "IAM least-privilege, KMS, Secrets Manager",
        "Lake Formation permissions & column masking",
        "GuardDuty, Security Hub, CloudTrail",
      ]},
      { title: "Cost & Operability", items: [
        "Well-Architected + Cost Optimization",
        "Tagging, budgets, and anomaly detection",
        "CloudWatch/CloudWatch Synthetics & alarms",
      ]},
    ],
    packages: [
      { name: "AWS Data Readiness", desc: "2-week assessment of workloads, data flows, security posture and a practical roadmap." },
      { name: "S3 + Glue Pilot", desc: "4–6 weeks to stand up a governed data lake with Glue jobs and a Redshift analytics slice." },
      { name: "AWS FinOps Sprint", desc: "4 weeks to implement tagging, budgets, lifecycle policies and cost guardrails." },
    ],
    ctas: [
      { label: "Request an AWS Assessment", action: "assessment" },
      { label: "See How We Engage", action: "engage" },
      { label: "Book a Call", action: "calendly" },
    ],
  },

  {
    slug: "confluent",
    name: "Confluent (Apache Kafka) Streaming",
    sub:
      "Event-driven architectures, CDC pipelines, real-time analytics, and microservices with Confluent Cloud.",
    bullets: [
      "Kafka topics, schemas, producers/consumers",
      "Connectors for CDC and SaaS ingestion",
      "ksqlDB streaming transforms & enrichment",
      "Observability and platform governance",
    ],
    highlights: [
      { title: "Streaming Foundations", items: [
        "Topic design, partitions, retention policies",
        "Schema Registry & compatibility rules",
        "Client patterns and idempotency",
      ]},
      { title: "Data Integration & CDC", items: [
        "Confluent/Kafka Connect managed connectors",
        "Debezium CDC for relational sources",
        "Stream processing with ksqlDB",
      ]},
      { title: "Operate & Secure", items: [
        "RBAC, API keys, private networking",
        "Metrics, lag monitoring, dead-letter queues",
        "Throughput testing & capacity planning",
      ]},
    ],
    packages: [
      { name: "Streaming Readiness Workshop", desc: "1–2 weeks to identify real-time use cases, design topics, and a secure platform baseline." },
      { name: "CDC → Kafka Pilot", desc: "4–6 weeks to enable CDC from a source system, process with ksqlDB, and serve to consumers." },
      { name: "Streaming Ops Sprint", desc: "4 weeks to add observability, DLQs, governance, and performance guardrails." },
    ],
    ctas: [
      { label: "Request a Streaming Assessment", action: "assessment" },
      { label: "See How We Engage", action: "engage" },
      { label: "Book a Call", action: "calendly" },
    ],
  },
];

function ConfluentPulse() {
  // A subtle animated network of dots/lines
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        viewBox="0 0 800 400"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#00ffff" />
            <stop offset="100%" stopColor="#66ccff" />
          </linearGradient>
        </defs>
        {/* flowing lines */}
        <path d="M0,200 C150,150 250,250 400,200 C550,150 650,250 800,200" stroke="url(#g)" fill="none">
          <animate
            attributeName="d"
            dur="6s"
            repeatCount="indefinite"
            values="
              M0,200 C150,150 250,250 400,200 C550,150 650,250 800,200;
              M0,210 C150,120 250,280 400,190 C550,220 650,160 800,210;
              M0,200 C150,150 250,250 400,200 C550,150 650,250 800,200
            "
          />
        </path>
        {/* dots */}
        {[...Array(30)].map((_, i) => {
          const x = (i * 27) % 800;
          const y = 180 + Math.sin(i) * 40;
          return <circle key={i} cx={x} cy={y} r="2" fill="url(#g)">
            <animate attributeName="cy" dur="4s" values={`${y};${y+8};${y}`} repeatCount="indefinite" />
          </circle>;
        })}
      </svg>
    </div>
  );
}

// Simple, lightweight Kafka flow card with animated arrows
function KafkaQuickDiagram() {
  return (
    <div className="mt-8 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
      <h3 className="text-lg font-semibold text-cyan-300">Kafka Quick Diagram</h3>
      <p className="mt-1 text-sm text-white/70">
        High-level data flow across Producers, Kafka Topics and Consumers.
      </p>

      <div className="relative mt-5 grid grid-cols-1 gap-4 md:grid-cols-3 items-center">
        {/* Producers */}
        <div className="rounded-xl bg-white/[0.04] p-4 ring-1 ring-white/10">
          <p className="text-sm font-medium text-white/80 mb-2">Producers</p>
          <ul className="text-sm text-white/70 space-y-1 list-disc pl-4">
            <li>Apps / Services</li>
            <li>CDC Connectors</li>
            <li>IoT / Logs</li>
          </ul>
        </div>

        {/* Center: Topics with animated arrows */}
        <div className="relative rounded-xl bg-white/[0.04] p-4 ring-1 ring-white/10 overflow-hidden">
          <p className="text-sm font-medium text-white/80 mb-2">Kafka Topics</p>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-lg bg-cyan-500/10 px-2 py-1 text-xs text-cyan-200 ring-1 ring-cyan-500/20">orders</span>
            <span className="rounded-lg bg-cyan-500/10 px-2 py-1 text-xs text-cyan-200 ring-1 ring-cyan-500/20">payments</span>
            <span className="rounded-lg bg-cyan-500/10 px-2 py-1 text-xs text-cyan-200 ring-1 ring-cyan-500/20">shipments</span>
          </div>

          {/* animated arrows L→R and R→L for a subtle motion */}
          <svg className="pointer-events-none absolute inset-x-0 -bottom-1 h-8 opacity-40" viewBox="0 0 400 40" preserveAspectRatio="none">
            <defs>
              <linearGradient id="kafkaFlow" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#67e8f9" />
              </linearGradient>
              <marker id="arrowHead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 z" fill="#67e8f9" />
              </marker>
            </defs>
            <path
              d="M10 20 C 120 10, 280 10, 390 20"
              stroke="url(#kafkaFlow)"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowHead)"
            >
              <animate attributeName="stroke-dashoffset" from="200" to="0" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="stroke-dasharray" values="2 6; 2 6" dur="2.5s" repeatCount="indefinite" />
            </path>
            <path
              d="M390 30 C 280 20, 120 20, 10 30"
              stroke="url(#kafkaFlow)"
              strokeWidth="1.5"
              opacity="0.6"
              fill="none"
              markerStart="url(#arrowHead)"
            >
              <animate attributeName="stroke-dashoffset" from="0" to="200" dur="3s" repeatCount="indefinite" />
              <animate attributeName="stroke-dasharray" values="1 7; 1 7" dur="3s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>

        {/* Consumers */}
        <div className="rounded-xl bg-white/[0.04] p-4 ring-1 ring-white/10">
          <p className="text-sm font-medium text-white/80 mb-2">Consumers</p>
          <ul className="text-sm text-white/70 space-y-1 list-disc pl-4">
            <li>Microservices</li>
            <li>ksqlDB / Flink</li>
            <li>Warehouses / BI</li>
          </ul>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-white/60">
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-2 w-5 rounded-sm bg-cyan-300/70" />
          flow
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded bg-cyan-500/25 ring-1 ring-cyan-500/30" />
          topic
        </span>
      </div>
    </div>
  );
}


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
      window.location.href = "/#contact";
      return;
    }
    if (action === "engage") {
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
<section className="relative rounded-3xl bg-white/[0.03] ring-1 ring-white/10 p-6 overflow-hidden">
  {service.slug === "confluent" && <ConfluentPulse />}

  <h1 className="text-3xl md:text-4xl font-extrabold text-cyan-400">
    {service.name}
  </h1>
  <p className="mt-3 text-white/80">{service.sub}</p>

  <ul className="mt-6 grid gap-2 text-sm text-white/80 relative">
    {service.bullets.map((b) => (
      <li key={b}>• {b}</li>
    ))}
  </ul>
</section>

        {service.slug === "confluent" && <KafkaQuickDiagram />}

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

        {/* CTA buttons at the bottom */}
        <section className="mt-12 flex flex-wrap justify-center gap-3">
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
