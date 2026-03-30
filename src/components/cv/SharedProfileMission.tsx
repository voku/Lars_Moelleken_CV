import { ExperienceTimeline } from "./ExperienceTimeline";
import { ImpactMetrics } from "./ImpactMetrics";
import { RolePositioningCards } from "./RolePositioningCards";
import { useCvCopy } from "./copy";
import type { ComponentTheme } from "./types";

interface SharedProfileMissionProps {
  theme?: ComponentTheme;
  introText?: string;
  compact?: boolean;
}

export function SharedProfileMission({
  theme = "standard",
  introText,
  compact = false,
}: SharedProfileMissionProps) {
  const copy = useCvCopy();
  const isMando = theme === "mandalorian";
  const resolvedIntro = introText ?? copy.sharedProfileMission.defaultIntro;

  return (
    <div className={compact ? "space-y-4" : "space-y-6"}>
      <ImpactMetrics theme={theme} />
      <p className={isMando ? "text-sm text-mando-body" : "text-gray-700 text-lg"}>{resolvedIntro}</p>
      <RolePositioningCards theme={theme} />
      <ExperienceTimeline theme={theme} />
    </div>
  );
}
