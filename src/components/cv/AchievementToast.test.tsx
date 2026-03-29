import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AchievementToast } from "./AchievementToast";

describe("AchievementToast", () => {
  it("renders title and description", () => {
    const html = renderToStaticMarkup(<AchievementToast title="Threat Analyst" description="Explore 3 techniques" />);
    expect(html).toContain("ACHIEVEMENT UNLOCKED");
    expect(html).toContain("Threat Analyst");
  });
});
