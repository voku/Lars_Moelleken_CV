import { describe, expect, it } from "vitest";
import { CV_2026 } from "./cv2026";

describe("CV_2026", () => {
  it("contains the verified 2026 employment timeline", () => {
    expect(CV_2026.experience).toHaveLength(5);
    expect(CV_2026.experience[0]).toMatchObject({
      period: "08/2023 - heute",
      company: "REMONDIS IT Services GmbH",
    });
    expect(CV_2026.experience[1]?.company).toBe("IONOS SE");
    expect(CV_2026.experience[2]?.company).toContain("MEERX.de");
  });

  it("contains the CV-backed quality and enterprise stack", () => {
    const technologies = CV_2026.technologyGroups.flatMap((group) => group.technologies);

    expect(technologies).toEqual(expect.arrayContaining([
      "PHP 8.x",
      "MariaDB/MySQL",
      "PHPStan (max)",
      "Codeception",
      "Docker Compose",
      "LDAP/AD",
      "M365/Exchange",
      "PowerShell",
    ]));
  });

  it("keeps public profile links while excluding the private phone number", () => {
    expect(CV_2026.person.x).toBe("https://x.com/suckup_de");
    expect(JSON.stringify(CV_2026)).not.toContain("0177");
  });
});
