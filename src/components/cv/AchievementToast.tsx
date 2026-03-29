import { Trophy } from "lucide-react";

interface AchievementToastProps {
  title: string;
  description: string;
}

export function AchievementToast({ title, description }: AchievementToastProps) {
  return (
    <div
      className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl border flex items-center gap-3 shadow-2xl"
      style={{
        background: "rgba(7,10,14,0.95)",
        borderColor: "var(--demo-glow)",
        boxShadow: "0 0 30px rgba(200,168,80,0.3)",
        animation: "achievement-pop 400ms cubic-bezier(0.2,0.8,0.2,1)",
      }}
      role="alert"
    >
      <Trophy className="w-5 h-5 shrink-0" style={{ color: "var(--demo-glow)" }} />
      <div>
        <div className="text-xs font-mono font-bold" style={{ color: "var(--demo-glow)" }}>
          ACHIEVEMENT UNLOCKED
        </div>
        <div className="text-sm font-bold" style={{ color: "#f0e0a0" }}>
          {title}
        </div>
        <div className="text-xs" style={{ color: "rgba(224,208,164,0.7)" }}>
          {description}
        </div>
      </div>
    </div>
  );
}
