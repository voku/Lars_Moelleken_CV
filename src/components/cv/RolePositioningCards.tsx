import { useCvLocale } from "./copy";
import type { ComponentTheme } from "./types";

interface RolePositioningCardsProps {
  readonly theme?: ComponentTheme;
}

export function RolePositioningCards({ theme = "standard" }: RolePositioningCardsProps) {
  const { locale } = useCvLocale();
  const isMando = theme === "mandalorian";

  const primaryLabel = locale === "de" ? "Primäre Positionierung" : "Primary Positioning";
  const missionLabel = locale === "de" ? "Typischer Einsatz" : "Typical Assignment";
  const description = locale === "de"
    ? "Modernisierung und Stabilisierung geschäftskritischer PHP-Systeme mit klaren Typverträgen, belastbarer Verifikation und sicheren Enterprise-Integrationen."
    : "Modernizing and stabilizing business-critical PHP systems with explicit type contracts, robust verification, and secure enterprise integrations.";
  const bullets = locale === "de"
    ? [
        "Gewachsene PHP-Codebases schrittweise entkoppeln",
        "PHPStan, Tests, CI/CD und Release-Sicherheit ausbauen",
        "LDAP/AD, M365/Exchange, PowerShell und AS/400 integrieren",
      ]
    : [
        "Incrementally decouple mature PHP codebases",
        "Strengthen PHPStan, tests, CI/CD, and release safety",
        "Integrate LDAP/AD, M365/Exchange, PowerShell, and AS/400",
      ];

  return (
    <div className="mb-8 grid md:grid-cols-2 gap-4">
      <article className={isMando ? "mando-panel p-5" : "rounded-xl border border-blue-100 bg-blue-50 p-5"}>
        <p className={isMando ? "text-xs font-mono uppercase tracking-wide text-mando-label" : "text-xs font-mono uppercase tracking-wide text-blue-700"}>
          {primaryLabel}
        </p>
        <p className={isMando ? "text-xl font-bold text-mando-heading mt-1" : "text-xl font-bold text-blue-900 mt-1"}>
          Senior PHP Developer / Software Architect
        </p>
        <p className={isMando ? "text-sm text-mando-body mt-2" : "text-sm text-blue-900/80 mt-2"}>
          {description}
        </p>
      </article>
      <article className={isMando ? "mando-panel p-5" : "rounded-xl border border-gray-200 bg-gray-50 p-5"}>
        <p className={isMando ? "text-xs font-mono uppercase tracking-wide text-mando-label" : "text-xs font-mono uppercase tracking-wide text-gray-500"}>
          {missionLabel}
        </p>
        <ul className={isMando ? "mt-2 text-sm text-mando-body space-y-1" : "mt-2 text-sm text-gray-700 space-y-1"}>
          {bullets.map((bullet) => <li key={bullet}>• {bullet}</li>)}
        </ul>
      </article>
    </div>
  );
}
