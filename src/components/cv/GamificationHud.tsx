import type { ReactNode } from "react";
import { Trophy } from "lucide-react";

interface GamificationHudProps {
  clearanceIcon: ReactNode;
  clearanceName: string;
  clearanceColor: string;
  xp: number;
  progressPercent: number;
  nextClearanceText: string | null;
  unlockedAchievements: number;
  totalAchievements: number;
}

export function GamificationHud({
  clearanceIcon,
  clearanceName,
  clearanceColor,
  xp,
  progressPercent,
  nextClearanceText,
  unlockedAchievements,
  totalAchievements,
}: GamificationHudProps) {
  const hasAchievements = unlockedAchievements > 0;

  return (
    <div
      className="sticky top-0 z-40 border-b backdrop-blur-md"
      style={{
        background: "rgba(7,10,14,0.92)",
        borderColor: "var(--demo-border)",
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <div className="flex items-center gap-1.5 shrink-0">
            {clearanceIcon}
            <span className="text-xs font-mono font-bold tracking-wider" style={{ color: clearanceColor }}>
              {clearanceName}
            </span>
          </div>

          <span className="text-xs font-mono font-bold shrink-0" style={{ color: "var(--demo-glow)" }}>
            {xp} XP
          </span>

          <div className="flex-1 min-w-[80px] max-w-[200px]">
            <div
              className="h-1.5 rounded-full overflow-hidden"
              style={{ background: "rgba(200,168,80,0.15)" }}
              aria-label={`Mission progress: ${progressPercent}%`}
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progressPercent}%`,
                  background: `linear-gradient(90deg, ${clearanceColor}, var(--demo-glow))`,
                  boxShadow: `0 0 8px ${clearanceColor}`,
                }}
              />
            </div>
            <div className="text-right">
              <span className="text-[0.55rem] font-mono" style={{ color: "rgba(200,168,80,0.8)" }}>
                {progressPercent}%
              </span>
            </div>
          </div>

          {nextClearanceText ? (
            <span className="hidden sm:inline text-[0.6rem] font-mono" style={{ color: "rgba(200,168,80,0.75)" }}>
              {nextClearanceText}
            </span>
          ) : (
            <span className="hidden sm:inline text-[0.6rem] font-mono" style={{ color: "var(--mando-verified)" }}>
              ✓ MAX CLEARANCE
            </span>
          )}

          <div className="flex items-center gap-1 shrink-0 ml-auto">
            <Trophy className="w-3 h-3" style={{ color: hasAchievements ? "var(--demo-glow)" : "rgba(200,168,80,0.55)" }} />
            <span className="text-[0.6rem] font-mono font-bold" style={{ color: hasAchievements ? "var(--demo-glow)" : "rgba(200,168,80,0.55)" }}>
              {unlockedAchievements}/{totalAchievements}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
