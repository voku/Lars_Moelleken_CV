import { useMemo } from "react";
import { Lightbulb } from "lucide-react";
import { useCvCopy } from "./copy";

export function GeoFaqSection() {
  const copy = useCvCopy();

  const faqItems = useMemo(() => [
    { id: "faq-1", q: copy.geoFaq.q1, a: copy.geoFaq.a1 },
    { id: "faq-2", q: copy.geoFaq.q2, a: copy.geoFaq.a2 },
    { id: "faq-3", q: copy.geoFaq.q3, a: copy.geoFaq.a3, withLinks: true },
  ], [copy]);

  return (
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-2xl font-bold mb-6 flex items-center gap-3">
        <Lightbulb className="w-7 h-7 text-blue-600" />
        {copy.geoFaq.title}
      </h2>
      <dl className="space-y-4">
        {faqItems.map(({ id, q, a, withLinks }) => (
          <div key={id} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
            <dt id={id} className="text-lg font-semibold text-gray-900 mb-2">{q}</dt>
            <dd aria-labelledby={id} className="text-gray-700 leading-relaxed">
              {withLinks ? (
                <>
                  {copy.geoFaq.contactPrefix} <a className="underline" href="mailto:lars@moelleken.org">lars@moelleken.org</a>. {copy.geoFaq.linkConnector1}{" "}
                  <a className="underline" href="https://www.linkedin.com/in/larsmoelleken/" target="_blank" rel="noopener noreferrer">LinkedIn</a> {copy.geoFaq.linkConnector2}{" "}
                  <a className="underline" href="https://github.com/voku" target="_blank" rel="noopener noreferrer">GitHub</a>. {copy.geoFaq.linkConnector3}{" "}
                  <a className="underline" href="https://suckup.de" target="_blank" rel="noopener noreferrer">suckup.de</a> {copy.geoFaq.linkConnector4}{" "}
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
