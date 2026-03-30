import type { ComponentTheme } from "./types";
import { UI_TEXT, useCvCopy } from "./copy";

export type InjectionPerspective = "defender" | "attacker";

export interface TechniqueItem {
  category: string;
  example: string;
  whyItWorks: string;
}

export const ATTACKER_TECHNIQUES: ReadonlyArray<TechniqueItem> = UI_TEXT.injectionPerspective.attackerTechniques;
const DEFENDER_TECHNIQUES: ReadonlyArray<TechniqueItem> = UI_TEXT.injectionPerspective.defenderTechniques;

interface InjectionPerspectivePanelProps {
  perspective: InjectionPerspective;
  theme?: ComponentTheme;
}

export function InjectionPerspectivePanel({ perspective, theme = "standard" }: InjectionPerspectivePanelProps) {
  const copy = useCvCopy();
  const isMando = theme === "mandalorian";
  const techniques = perspective === "attacker" ? copy.injectionPerspective.attackerTechniques : copy.injectionPerspective.defenderTechniques;

  return (
    <section className={isMando ? "mando-panel p-5 sm:p-6" : "bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"}>
      <h3 className={isMando ? "text-lg font-bold text-mando-heading" : "text-xl font-bold text-gray-900"}>
        ✅ {perspective === "attacker"
          ? copy.injectionPerspective.attackerSummary
          : copy.injectionPerspective.defenderSummary}
      </h3>
      <p className={isMando ? "mt-2 text-sm text-mando-body" : "mt-2 text-sm text-gray-700"}>
        {perspective === "attacker"
          ? copy.injectionPerspective.attackerDescription
          : copy.injectionPerspective.defenderDescription}
      </p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {techniques.map((item) => (
          <article key={item.category} className={isMando ? "rounded-lg border p-4 border-[var(--demo-border)] bg-black/20" : "rounded-lg border border-gray-200 bg-gray-50 p-4"}>
            <h4 className={isMando ? "font-semibold text-mando-heading" : "font-semibold text-gray-900"}>{item.category}</h4>
            <p className={isMando ? "text-xs mt-2 text-mando-label font-mono" : "text-xs mt-2 text-blue-700 font-mono"}>{item.example}</p>
            <p className={isMando ? "text-xs mt-2 text-mando-body" : "text-xs mt-2 text-gray-600"}>{item.whyItWorks}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
