
// src/pages/AzureServicesPage.jsx
import AzureServicesSection from "../components/AzureServicesSection.jsx";

export default function AzureServicesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10 px-6 py-4">
        <a href="/" className="text-yellow-400 font-semibold hover:text-yellow-300">← Back to Aitheron</a>
      </header>

      <AzureServicesSection />

      <footer className="border-t border-white/10 text-center text-xs text-white/60 py-8">
        © {new Date().getFullYear()} AITHERON. All rights reserved.
      </footer>
    </div>
  );
}
