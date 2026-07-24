import { CV_2026, localizeCv } from "../../cv2026";
import { useCvLocale } from "./copy";
import type { ComponentTheme } from "./types";

interface CvEvidenceSectionProps {
  readonly theme?: ComponentTheme;
}

export function CvEvidenceSection({ theme = "standard" }: CvEvidenceSectionProps) {
  const { locale } = useCvLocale();
  const isMando = theme === "mandalorian";
  const panelClass = isMando ? "mando-panel p-5" : "rounded-xl border border-gray-200 bg-white p-5 shadow-sm";
  const headingClass = isMando ? "text-lg font-bold text-mando-heading" : "text-lg font-bold text-gray-900";
  const bodyClass = isMando ? "text-sm text-mando-body" : "text-sm text-gray-700";
  const labelClass = isMando ? "text-xs font-mono uppercase tracking-wide text-mando-label" : "text-xs font-mono uppercase tracking-wide text-blue-700";

  return (
    <section aria-label={locale === "de" ? "Weitere CV-Evidenz" : "Additional CV evidence"} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <article className={panelClass}>
          <p className={labelClass}>{locale === "de" ? "Technologien & Methoden" : "Technologies & Methods"}</p>
          <div className="mt-3 space-y-3">
            {CV_2026.technologyGroups.map((group) => (
              <div key={group.label.en}>
                <h3 className={headingClass}>{localizeCv(group.label, locale)}</h3>
                <p className={bodyClass}>{group.technologies.join(" · ")}</p>
              </div>
            ))}
          </div>
        </article>

        <article className={panelClass}>
          <p className={labelClass}>{locale === "de" ? "Ausbildung" : "Education"}</p>
          <dl className="mt-3 space-y-3">
            {CV_2026.education.map((entry) => (
              <div key={`${entry.period}-${entry.qualification.en}`}>
                <dt className={isMando ? "font-mono text-sm text-mando-label" : "font-mono text-sm font-semibold text-blue-700"}>
                  {entry.period}
                </dt>
                <dd className={bodyClass}>{localizeCv(entry.qualification, locale)}</dd>
              </div>
            ))}
          </dl>
        </article>
      </div>

      <article className={panelClass}>
        <p className={labelClass}>{locale === "de" ? "Open Source & ausgewählte Projekte" : "Open Source & Selected Projects"}</p>
        <div className="mt-3 grid gap-4 md:grid-cols-3">
          {CV_2026.projects.map((project) => (
            <div key={project.label.en}>
              <h3 className={headingClass}>{localizeCv(project.label, locale)}</h3>
              <p className={`${bodyClass} mt-1`}>{localizeCv(project.description, locale)}</p>
              {project.links?.length ? (
                <ul className="mt-2 space-y-1 text-xs font-mono">
                  {project.links.map((link) => (
                    <li key={link}>
                      <a className={isMando ? "text-mando-label hover:underline" : "text-blue-700 hover:underline"} href={link} target="_blank" rel="noopener noreferrer">
                        {link.replace("https://github.com/", "github.com/")}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </article>

      <article className={panelClass}>
        <p className={labelClass}>{locale === "de" ? "Sprachen & persönliche Angaben" : "Languages & Personal Details"}</p>
        <p className={`${bodyClass} mt-3`}>
          {CV_2026.languages
            .map((language) => `${localizeCv(language.label, locale)}: ${localizeCv(language.level, locale)}`)
            .join(" · ")}
          {` · ${locale === "de" ? "Geboren" : "Born"}: ${CV_2026.personal.born}`}
          {` · ${locale === "de" ? "Führerschein" : "Driving licence"}: ${CV_2026.personal.drivingLicense}`}
        </p>
      </article>
    </section>
  );
}
