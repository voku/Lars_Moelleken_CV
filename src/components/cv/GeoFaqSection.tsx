import { Lightbulb } from "lucide-react";

const FAQ_ITEMS = [
  {
    id: "faq-1",
    q: "Was sind Lars Moellekens Schwerpunkte als PHP Entwickler?",
    a: "Senior PHP Developer und PHP Architect mit 20+ Jahren Erfahrung. Fokus auf Symfony, Laravel, Legacy-Modernisierung, PHPStan Level 9, PHPUnit, Docker, CI/CD und wartbare Softwarearchitektur.",
  },
  {
    id: "faq-2",
    q: "Für welche PHP-Projekte ist Lars Moelleken geeignet?",
    a: "Großskalige Legacy-Modernisierung, Backend-Architektur, statische Analyse, Performance-Optimierung, CI/CD-Aufbau und Mentoring für Entwicklungsteams in Deutschland.",
  },
  {
    id: "faq-3",
    q: "Wie kontaktiere ich Lars Moelleken für ein Projekt?",
    a: "Per E-Mail, LinkedIn, GitHub oder über Blog/Packagist.",
    withLinks: true,
  },
];

export function GeoFaqSection() {
  return (
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-2xl font-bold mb-6 flex items-center gap-3">
        <Lightbulb className="w-7 h-7 text-blue-600" />
        Häufige Fragen — GEO-Ready FAQ
      </h2>
      <dl className="space-y-4">
        {FAQ_ITEMS.map(({ id, q, a, withLinks }) => (
          <div key={id} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
            <dt id={id} className="text-lg font-semibold text-gray-900 mb-2">{q}</dt>
            <dd aria-labelledby={id} className="text-gray-700 leading-relaxed">
              {withLinks ? (
                <>
                  Per E-Mail: <a className="underline" href="mailto:lars@moelleken.org">lars@moelleken.org</a>. Über{" "}
                  <a className="underline" href="https://www.linkedin.com/in/larsmoelleken/" target="_blank" rel="noopener noreferrer">LinkedIn</a> oder{" "}
                  <a className="underline" href="https://github.com/voku" target="_blank" rel="noopener noreferrer">GitHub</a>. Blog und Open-Source-Beiträge unter{" "}
                  <a className="underline" href="https://suckup.de" target="_blank" rel="noopener noreferrer">suckup.de</a> und{" "}
                  <a className="underline" href="https://packagist.org/packages/voku/" target="_blank" rel="noopener noreferrer">packagist.org/packages/voku</a>.
                </>
              ) : a}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
