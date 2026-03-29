import type { ComponentTheme } from "./ImpactMetrics";

interface RolePositioningCardsProps {
  theme?: ComponentTheme;
}

export function RolePositioningCards({ theme = "standard" }: RolePositioningCardsProps) {
  const isMando = theme === "mandalorian";

  return (
    <div className="mb-8 grid md:grid-cols-2 gap-4">
      <article className={isMando ? "mando-panel p-5" : "rounded-xl border border-blue-100 bg-blue-50 p-5"}>
        <p className={isMando ? "text-xs font-mono uppercase tracking-wide text-[#d3bd80]" : "text-xs font-mono uppercase tracking-wide text-blue-700"}>
          {isMando ? "Primäre Zielrolle" : "Primäre Positionierung"}
        </p>
        <p className={isMando ? "text-xl font-bold text-[#f0e0a0] mt-1" : "text-xl font-bold text-blue-900 mt-1"}>Senior PHP Developer / PHP Architect</p>
        <p className={isMando ? "text-sm text-[#d2c39a] mt-2" : "text-sm text-blue-900/80 mt-2"}>
          Fokus auf Legacy-Modernisierung, Architektur-Entscheidungen und nachhaltige Codequalität in produktiven Systemen.
        </p>
      </article>
      <article className={isMando ? "mando-panel p-5" : "rounded-xl border border-gray-200 bg-gray-50 p-5"}>
        <p className={isMando ? "text-xs font-mono uppercase tracking-wide text-[#d3bd80]" : "text-xs font-mono uppercase tracking-wide text-gray-500"}>
          {isMando ? "Missionsprofil" : "Typischer Einsatz"}
        </p>
        <ul className={isMando ? "mt-2 text-sm text-[#d2c39a] space-y-1" : "mt-2 text-sm text-gray-700 space-y-1"}>
          <li>• Stabilisierung gewachsener PHP-Landschaften</li>
          <li>• Einführung von Static Analysis, Testautomatisierung und CI/CD</li>
          <li>• Mentoring für Teams bei Architektur und Refactoring</li>
        </ul>
      </article>
    </div>
  );
}
