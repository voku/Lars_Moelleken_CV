import { ExperienceTimeline } from "./ExperienceTimeline";
import { ImpactMetrics } from "./ImpactMetrics";
import { RolePositioningCards } from "./RolePositioningCards";
import type { ComponentTheme } from "./types";

interface SharedProfileMissionProps {
  theme?: ComponentTheme;
  introText?: string;
  compact?: boolean;
}

export function SharedProfileMission({
  theme = "standard",
  introText = "Entwicklung geschäftskritischer Systeme mit PHP 8.x, Symfony, Laravel, Docker, CI/CD, PHPUnit und PHPStan. Verantwortung für Architektur, Wartbarkeit und Teamführung.",
  compact = false,
}: SharedProfileMissionProps) {
  const isMando = theme === "mandalorian";

  return (
    <div className={compact ? "space-y-4" : "space-y-6"}>
      <ImpactMetrics theme={theme} />
      <p className={isMando ? "text-sm text-[#d2c39a]" : "text-gray-700 text-lg"}>{introText}</p>
      <RolePositioningCards theme={theme} />
      <ExperienceTimeline theme={theme} />
    </div>
  );
}
