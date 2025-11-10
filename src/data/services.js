// src/data/services.js
export const services = [
  {
    slug: "azure",
    name: "Microsoft Azure & Fabric",
    title: "Microsoft Azure & Fabric Services",
    description:
      "Modern data estates, Fabric lakehouse, governance with Purview, and Power BI analytics.",
    bullets: [
      "Landing zone, security baseline (CAF)",
      "Migration: SQL/DB2/Oracle → Azure SQL/MI",
      "Fabric Lakehouse, Notebooks, Power BI",
      "Purview governance, FinOps cost control",
    ],
  },
  {
    slug: "aws",
    name: "Amazon Web Services",
    title: "AWS Data & Analytics Services",
    description:
      "Data lakes, warehousing, migration, and multi-cloud analytics built on AWS.",
    bullets: [
      "S3/Lake Formation data lakes",
      "Glue/EMR ingestion & transformation",
      "Redshift warehousing & BI",
      "Security, cost governance, DR",
    ],
  },
  {
    slug: "streaming",
    name: "Streaming / Confluent (Kafka)",
    title: "Real-Time Streaming with Confluent & Kafka",
    description:
      "Event-driven architectures, CDC pipelines, and realtime analytics.",
    bullets: [
      "Kafka clusters on Confluent Cloud",
      "Connectors & Schema Registry",
      "ksqlDB/Streams processing",
      "CDC into lakehouse & warehouse",
    ],
  },
];
