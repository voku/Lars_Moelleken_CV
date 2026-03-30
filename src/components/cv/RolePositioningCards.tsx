import type { ComponentTheme } from "./types";
import { UI_TEXT } from "./copy";

interface RolePositioningCardsProps {
  theme?: ComponentTheme;
}

export function RolePositioningCards({ theme = "standard" }: RolePositioningCardsProps) {
  const isMando = theme === "mandalorian";

  return (
    <div className="mb-8 grid md:grid-cols-2 gap-4">
      <article className={isMando ? "mando-panel p-5" : "rounded-xl border border-blue-100 bg-blue-50 p-5"}>
        <p className={isMando ? "text-xs font-mono uppercase tracking-wide text-[#7a6530]" : "text-xs font-mono uppercase tracking-wide text-blue-700"}>
          {isMando ? UI_TEXT.rolePositioning.primaryMando : UI_TEXT.rolePositioning.primaryStandard}
        </p>
        <p className={isMando ? "text-xl font-bold text-[#6b5020] mt-1" : "text-xl font-bold text-blue-900 mt-1"}>Senior PHP Developer / PHP Architect</p>
        <p className={isMando ? "text-sm text-[#4a3b1a] mt-2" : "text-sm text-blue-900/80 mt-2"}>
          {UI_TEXT.rolePositioning.focusDescription}
        </p>
      </article>
      <article className={isMando ? "mando-panel p-5" : "rounded-xl border border-gray-200 bg-gray-50 p-5"}>
        <p className={isMando ? "text-xs font-mono uppercase tracking-wide text-[#7a6530]" : "text-xs font-mono uppercase tracking-wide text-gray-500"}>
          {isMando ? UI_TEXT.rolePositioning.missionMando : UI_TEXT.rolePositioning.missionStandard}
        </p>
        <ul className={isMando ? "mt-2 text-sm text-[#4a3b1a] space-y-1" : "mt-2 text-sm text-gray-700 space-y-1"}>
          <li>{UI_TEXT.rolePositioning.bullet1}</li>
          <li>{UI_TEXT.rolePositioning.bullet2}</li>
          <li>{UI_TEXT.rolePositioning.bullet3}</li>
        </ul>
      </article>
    </div>
  );
}
