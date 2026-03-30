import type { ComponentTheme } from "./types";
import { useCvCopy } from "./copy";

interface RolePositioningCardsProps {
  theme?: ComponentTheme;
}

export function RolePositioningCards({ theme = "standard" }: RolePositioningCardsProps) {
  const copy = useCvCopy();
  const isMando = theme === "mandalorian";

  return (
    <div className="mb-8 grid md:grid-cols-2 gap-4">
      <article className={isMando ? "mando-panel p-5" : "rounded-xl border border-blue-100 bg-blue-50 p-5"}>
        <p className={isMando ? "text-xs font-mono uppercase tracking-wide text-mando-label" : "text-xs font-mono uppercase tracking-wide text-blue-700"}>
          {isMando ? copy.rolePositioning.primaryMando : copy.rolePositioning.primaryStandard}
        </p>
        <p className={isMando ? "text-xl font-bold text-mando-heading mt-1" : "text-xl font-bold text-blue-900 mt-1"}>Senior PHP Developer / PHP Architect</p>
        <p className={isMando ? "text-sm text-mando-body mt-2" : "text-sm text-blue-900/80 mt-2"}>
          {copy.rolePositioning.focusDescription}
        </p>
      </article>
      <article className={isMando ? "mando-panel p-5" : "rounded-xl border border-gray-200 bg-gray-50 p-5"}>
        <p className={isMando ? "text-xs font-mono uppercase tracking-wide text-mando-label" : "text-xs font-mono uppercase tracking-wide text-gray-500"}>
          {isMando ? copy.rolePositioning.missionMando : copy.rolePositioning.missionStandard}
        </p>
        <ul className={isMando ? "mt-2 text-sm text-mando-body space-y-1" : "mt-2 text-sm text-gray-700 space-y-1"}>
          <li>{copy.rolePositioning.bullet1}</li>
          <li>{copy.rolePositioning.bullet2}</li>
          <li>{copy.rolePositioning.bullet3}</li>
        </ul>
      </article>
    </div>
  );
}
