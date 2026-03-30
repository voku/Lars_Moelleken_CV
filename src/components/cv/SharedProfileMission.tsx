import { ExperienceTimeline } from "./ExperienceTimeline";
import { ImpactMetrics } from "./ImpactMetrics";
import { RolePositioningCards } from "./RolePositioningCards";
import { UI_TEXT } from "./copy";
import type { ComponentTheme } from "./types";

interface SharedProfileMissionProps {
  theme?: ComponentTheme;
  introText?: string;
  compact?: boolean;
}

export function SharedProfileMission({
  theme = "standard",
  introText = UI_TEXT.sharedProfileMission.defaultIntro,
  compact = false,
}: SharedProfileMissionProps) {
  const isMando = theme === "mandalorian";

  return (
    <div className={compact ? "space-y-4" : "space-y-6"}>
      <ImpactMetrics theme={theme} />
      <p className={isMando ? "text-sm text-[#4a3b1a]" : "text-gray-700 text-lg"}>{introText}</p>
      <RolePositioningCards theme={theme} />
      <ExperienceTimeline theme={theme} />
    </div>
  );
}
