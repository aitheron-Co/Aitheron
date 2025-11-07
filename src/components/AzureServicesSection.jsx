// src/components/AzureServicesSection.jsx
export default function AzureServicesSection() {
  return (
    <section
      id="azure"
      aria-labelledby="azure-heading"
      className="border-t border-white/10 bg-neutral-950/30 scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Header */}
        <div className="max-w-3xl">
          <h2 id="azure-heading" className="text-2xl md:text-3xl font-bold text-yellow-400">
            Microsoft Azure & Fabric Services
          </h2>
          <p className="mt-3 text-white/80">
            We design and operate secure, scalable data platforms on Azure —
            from ingestion and governance to analytics and BI with Microsoft Fabric & Power BI.
          </p>
        </div>

        {/* 3-column offerings */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Offer
            title="Data Estate Modernization"
            points={[
              "Landing zone & security baseline (CAF)",
              "Migration: SQL/DB2/Oracle → Azure SQL/MI",
              "Performance, HA/DR, backup & monitoring",
            ]}
          />
          <Offer
            title="Fabric Analytics Lakehouse"
            points={[
              "Medallion design (Bronze/Silver/Gold)",
              "Ingestion with Data Factory/Dataflows",
              "OneLake, Notebooks, DWH & Power BI",
            ]}
          />
          <Offer
            title="Governance & Cost Control"
            points={[
              "Purview data catalog & lineage",
              "RBAC, Key Vault, Private Link",
              "FinOps dashboards & budgets",
            ]}
          />
        </div>

        {/* Architecture highlight */}
        <div className="mt-12 rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
          <h3 className="text-lg font-semibold text-yellow-300">Reference Architecture</h3>
          <p className="mt-2 text-white/80">
            Source systems → ADF pipelines → OneLake/Fabric Lakehouse (Delta) → Transformation (Spark/SQL) →
            Gold models → Power BI semantic layer & reports. Secured via AAD, Private Endpoints, Key Vault,
            and governed by Purview.
          </p>
          <ul className="mt-3 grid gap-2 md:grid-cols-2 text-sm text-white/70">
            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-yellow-400" /> Data Factory, Event Hub (optional streaming)</li>
            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-yellow-400" /> Fabric Lakehouse, Warehouse, Notebooks</li>
            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-yellow-400" /> Purview catalog, lineage, access policies</li>
            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-yellow-400" /> Power BI models, governance & deployment</li>
          </ul>
        </div>

        {/* Packages */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Package
            name="Azure Readiness"
            duration="2 weeks"
            bullets={[
              "Current state assessment",
              "Security & cost baseline",
              "Roadmap with quick wins",
            ]}
          />
          <Package
            name="Fabric Pilot"
            duration="4–6 weeks"
            bullets={[
              "Ingest 1–2 sources",
              "Build medallion lakehouse",
              "Power BI dashboards",
            ]}
          />
          <Package
            name="Production Rollout"
            duration="8–12 weeks"
            bullets={[
              "Automation & CI/CD",
              "Observability & FinOps",
              "Change mgmt & handover",
            ]}
          />
        </div>

        {/* CTA */}
    <div className="mt-10 flex flex-wrap gap-3">
  {/* Jump to the contact section on the homepage */}
  <a
    href="/#contact"
    className="rounded-xl bg-yellow-500/20 px-5 py-3 ring-1 ring-yellow-500/40 text-yellow-200 hover:bg-yellow-500/30"
  >
    Request an Azure Assessment
  </a>

  {/* Jump to the CTA block on the homepage */}
  <a
    href="/#cta"
    className="rounded-xl bg-white/5 px-5 py-3 ring-1 ring-white/10 hover:bg-white/10"
  >
    See How We Engage
  </a>
</div>

    </section>
  );
}

function Offer({ title, points }) {
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

function Package({ name, duration, bullets }) {
  return (
    <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
      <div className="flex items-baseline justify-between">
        <h4 className="text-base font-semibold text-yellow-300">{name}</h4>
        <span className="text-xs text-white/60">{duration}</span>
      </div>
      <ul className="mt-3 space-y-2 text-white/80 text-sm">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-yellow-400" />{b}</li>
        ))}
      </ul>
    </div>
  );
}

