import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { GamificationHud } from "./GamificationHud";

describe("GamificationHud", () => {
  it("renders xp and progress", () => {
    const html = renderToStaticMarkup(
      <GamificationHud
        clearanceIcon={<span>ICON</span>}
        clearanceName="AGENT"
        clearanceColor="#c8a850"
        xp={80}
        progressPercent={42}
        nextClearanceText="→ COMMANDER at 150 XP"
        unlockedAchievements={2}
        totalAchievements={9}
      />, 
    );

    expect(html).toContain("80 XP");
    expect(html).toContain("42%");
    expect(html).toContain("COMMANDER");
  });
});
