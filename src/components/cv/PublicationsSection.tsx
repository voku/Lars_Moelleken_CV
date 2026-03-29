import { FileText } from "lucide-react";

export function PublicationsSection() {
  return (
    <section aria-labelledby="publications-heading">
      <h2 id="publications-heading" className="text-3xl font-bold mb-8 flex items-center gap-3">
        <FileText className="w-8 h-8 text-blue-600" />
        Veröffentlichungen
      </h2>
      <div className="space-y-4">
        {[
          { title: "Guideline für Open Source Projekte", event: "Webworker NRW 2015", year: "2015" },
          { title: "Open Source Workflow für Webdeveloper", event: "OpenRheinRuhr 2014", year: "2014" },
        ].map(({ title, event, year }) => (
          <div key={title} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
            <div className="shrink-0 w-12 h-12 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
              {year}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{title}</h3>
              <p className="text-sm text-blue-600 mt-0.5">{event}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
