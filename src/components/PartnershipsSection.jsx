import { useMemo } from "react";
import { Link } from "react-router-dom";

const statusStyles = {
  official: "bg-emerald-600/10 text-emerald-600 ring-1 ring-emerald-600/20",
  in_progress: "bg-amber-500/10 text-amber-600 ring-1 ring-amber-500/20",
  training: "bg-sky-500/10 text-sky-600 ring-1 ring-sky-500/20",
  planned: "bg-zinc-500/10 text-zinc-600 ring-1 ring-zinc-500/20",
};

const partners = [
  {
    name: "Microsoft",
    category: "Cloud",
    status: "in_progress",
    tagline:
      "Azure & Fabric solutions for analytics, modernization, and AI-ready data platforms.",
    description:
      "We design and implement scalable data estates on Azure and Microsoft Fabric: ingestion with Data Factory, medallion lakehouses, governance with Purview, and Power BI for business insights.",
    cta: { label: "Explore Microsoft Services", href: "/services/azure" },
    logo: (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="h-8 w-8">
        <rect x="2" y="2" width="20" height="20" className="fill-current opacity-90" />
        <rect x="26" y="2" width="20" height="20" className="fill-current opacity-60" />
        <rect x="2" y="26" width="20" height="20" className="fill-current opacity-60" />
        <rect x="26" y="26" width="20" height="20" className="fill-current opacity-90" />
      </svg>
    ),
  },
  {
    name: "AWS",
    category: "Cloud",
    status: "planned",
    tagline: "Future multi-cloud expansion with analytics and migration capabilities.",
    description:
      "Planned enablement for data lake architectures, warehousing, and migration strategies to support multi-cloud requirements.",
    cta: { label: "Our Multi-Cloud Approach", href: "/services/aws" },
    logo: <div className="font-semibold text-xl tracking-tight">aws</div>,
  },
  {
    name: "Confluent",
    category: "Streaming",
    status: "training",
    tagline:
      "Building Kafka-based streaming competence for real-time data and event-driven systems.",
    description:
      "We are actively pursuing Confluent learning paths and certifications to power real-time analytics, CDC pipelines, and streaming integrations.",
    cta: { label: "Streaming Readiness", href: "/services/streaming" },
    logo: <div className="font-semibold text-xl tracking-tight">C</div>,
  },
];

function StatusPill({ status }) {
  const label =
    status === "official"
      ? "Official Partner"
      : status === "in_progress"
      ? "Partner Application in Progress"
      : status === "training"
      ? "Training & Certification Phase"
      : "Planned Integration";
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}>
      {label}
    </span>
  );
}

function PartnerCard({ partner }) {
  return (
    <article
      className="group relative flex flex-col rounded-2xl border border-zinc-200/60 bg-white p-6 shadow-sm ring-1 ring-transparent transition hover:shadow-md hover:ring-zinc-900/5 dark:border-zinc-800 dark:bg-zinc-900"
      aria-label={`${partner.name} partnership card`}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className="grid h-12 w-12 place-items-center rounded-xl bg-zinc-100 text-zinc-700 transition group-hover:grayscale-0 group-hover:opacity-100 dark:bg-zinc-800 dark:text-zinc-200 grayscale opacity-90"
          aria-hidden="true"
        >
          {partner.logo}
        </div>
        <StatusPill status={partner.status} />
      </div>

      <h3 className="mt-4 text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">{partner.name}</h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">{partner.category}</p>

      <p className="mt-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{partner.tagline}</p>
      <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{partner.description}</p>

      <div className="mt-5">
        <Link
          to={partner.cta.href}
          className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-900 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-800/80"
        >
          {partner.cta.label}
        </Link>
      </div>
    </article>
  );
}

export default function PartnershipsSection() {
  const categories = useMemo(() => Array.from(new Set(partners.map((p) => p.category))), []);

  return (
    <section
      id="partnerships"
      aria-labelledby="partnerships-heading"
      className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 scroll-mt-24"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 id="partnerships-heading" className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
          Strategic Partnerships
        </h2>
        <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-300">
          We collaborate with leading technology providers to deliver scalable, secure, and innovative solutions for our clients.
        </p>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          This page reflects our current enablement status. Official badges and partner IDs will be added as each partnership is confirmed.
        </p>
      </div>

      <nav aria-label="Partner categories" className="mt-8 flex flex-wrap items-center justify-center gap-2">
        <a
          href="#partnerships"
          className="rounded-full border border-zinc-200/70 px-3 py-1.5 text-sm text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          All
        </a>
        {categories.map((c) => (
          <span key={c} className="rounded-full border border-zinc-200/70 px-3 py-1.5 text-sm text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">
            {c}
          </span>
        ))}
      </nav>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {partners.map((p) => (
          <PartnerCard key={p.name} partner={p} />
        ))}
      </div>

      <p className="mt-10 text-center text-xs text-zinc-500 dark:text-zinc-400">
        Logos are placeholders. Official partner designations and artwork will be displayed once agreements are finalized.
      </p>
    </section>
  );
}
