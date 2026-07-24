import { Eye, ShieldCheck, TriangleAlert } from "lucide-react";
import { CV_2026 } from "../../cv2026";
import { INJECTION_GAME_PAYLOADS, INJECTION_GAME_VERSION } from "../../injectionGame/payloads";

const SEVERITY_STYLE = {
  medium: {
    color: "var(--mando-label)",
    background: "rgba(200,168,80,0.06)",
    border: "rgba(200,168,80,0.25)",
  },
  high: {
    color: "var(--mando-caution)",
    background: "rgba(208,128,48,0.08)",
    border: "rgba(208,128,48,0.3)",
  },
  critical: {
    color: "var(--mando-alert)",
    background: "rgba(200,64,64,0.08)",
    border: "rgba(200,64,64,0.3)",
  },
} as const;

export function DemoAnnotatedSection() {
  return (
    <section aria-labelledby="mando-annotated-heading">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="mando-section-label" style={{ color: "var(--mando-label)" }}>
          ANNOTATED CV // VERIFIED EVIDENCE · UNTRUSTED ATTACKS
        </span>
      </div>

      <div className="mando-panel relative p-5 sm:p-6">
        <div className="mando-scan-overlay" aria-hidden="true" />
        <h2 id="mando-annotated-heading" className="mb-2 flex items-center gap-2 text-lg font-bold" style={{ color: "var(--mando-heading)" }}>
          <Eye className="h-5 w-5" style={{ color: "var(--demo-glow)" }} />
          CV Content — Annotated View
        </h2>
        <p className="mb-5 text-xs" style={{ color: "var(--demo-glow)" }}>
          GAME VERSION {INJECTION_GAME_VERSION} — THE SAME DOCUMENT CONTAINS VERIFIED CV FACTS AND CANDIDATE-CONTROLLED ATTACK FIXTURES
        </p>

        <article className="mb-4 rounded-xl border p-4" style={{ borderColor: "rgba(64,168,112,0.3)", background: "rgba(64,168,112,0.08)" }}>
          <div className="flex items-start gap-3">
            <span className="mando-threat shrink-0" style={{ color: "var(--mando-verified)", borderColor: "rgba(64,168,112,0.3)" }}>
              ✓ VERIFIED
            </span>
            <div>
              <div className="flex items-center gap-2 text-sm font-bold" style={{ color: "var(--mando-heading)" }}>
                <ShieldCheck className="h-4 w-4" /> Real CV evidence
              </div>
              <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--mando-subtitle)" }}>
                Dates, employers, responsibilities, education, technologies, and public projects are taken from the 2026 CV. They remain useful after all ranking instructions are removed.
              </p>
              <pre className="mando-terminal mt-2 overflow-x-auto text-[0.65rem] leading-relaxed" style={{ color: "var(--mando-verified)" }}>
                {`${CV_2026.person.headline}\n${CV_2026.experience[0].company} · ${CV_2026.experience[0].period}\nPHP 8.x · MariaDB/MySQL · PHPStan max · PHPUnit/Codeception · Linux · LDAP/AD · M365/Exchange`}
              </pre>
            </div>
          </div>
        </article>

        <div className="space-y-3">
          {INJECTION_GAME_PAYLOADS.map((attack) => {
            const style = SEVERITY_STYLE[attack.severity];
            return (
              <article key={attack.id} className="rounded-xl border p-4" style={{ borderColor: style.border, background: style.background }}>
                <div className="flex items-start gap-3">
                  <span className="mando-threat shrink-0" style={{ color: style.color, borderColor: style.border }}>
                    <TriangleAlert className="mr-1 inline h-3 w-3" /> {attack.severity.toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold" style={{ color: "var(--mando-heading)" }}>
                      {attack.title} · {attack.surface}
                    </div>
                    <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--mando-subtitle)" }}>
                      {attack.attackGoal}
                    </p>
                    <pre className="mando-terminal mt-2 overflow-x-auto whitespace-pre-wrap text-[0.6rem] leading-relaxed" style={{ color: style.color }}>
                      {`${attack.marker}\n${attack.payload}`}
                    </pre>
                    <p className="mt-2 text-xs leading-relaxed" style={{ color: "var(--mando-body)" }}>
                      <strong>Defense:</strong> {attack.defense}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-5 text-xs font-mono" style={{ color: "var(--demo-glow)" }}>
          {"// Win condition: retain the verified CV evidence, quarantine every candidate-authored directive, and explain the provenance boundary."}
        </p>
      </div>
    </section>
  );
}
