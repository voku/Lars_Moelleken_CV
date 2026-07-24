import { describe, expect, it } from "vitest";
import {
  buildContactOptions,
  buildHiringFit,
  buildProfileSummary,
  buildProjectList,
  buildSkillMatrix,
  getPublicProfileExport,
} from "./profileTools";

describe("profileTools", () => {
  it("builds a recruiter summary from safe public data", () => {
    const summary = buildProfileSummary({ audience: "recruiter", language: "en", maxItems: 4 });

    expect(summary.name).toBe("Lars Moelleken");
    expect(summary.highlights).toHaveLength(4);
    expect(summary.strongestOpenSourceProjects.map((project) => project.name)).toContain("portable-utf8");
  });

  it("filters open-source projects by topic", () => {
    const projects = buildProjectList({ topic: "security", language: "en", limit: 10 });

    expect(projects).toHaveLength(1);
    expect(projects[0]?.name).toBe("anti-xss");
  });

  it("groups skills by domain", () => {
    const skillGroups = buildSkillMatrix({ groupBy: "domain", language: "en" });
    const backendGroup = skillGroups.find((group) => "domain" in group && group.domain === "Backend");

    expect(backendGroup).toBeDefined();
    expect(backendGroup && "skills" in backendGroup ? backendGroup.skills.length : 0).toBeGreaterThan(0);
  });

  it("returns intent-specific contact guidance", () => {
    const options = buildContactOptions({ intent: "consulting", language: "en" });

    expect(options.preferredChannels[0]?.label).toBe("Email");
    expect(options.includeInOutreach.join(" ")).toContain("technical debt");
  });

  it("scores a strong PHP role as a good fit", () => {
    const fit = buildHiringFit({
      roleTitle: "Senior PHP Architect",
      mustHaveSkills: ["PHP", "Symfony", "Legacy Modernization", "PHPStan"],
      niceToHaveSkills: ["Docker", "Mentoring"],
      language: "en",
    });

    expect(["high", "good"]).toContain(fit.fit.label);
    expect(fit.fit.proceed).toBe(true);
    expect(fit.matchingStrengths).toContain("Symfony");
  });

  it("exports only the safe public profile dataset", () => {
    const publicProfile = getPublicProfileExport();

    expect(JSON.stringify(publicProfile)).not.toContain("EDUCATIONAL_MARKER");
    expect(publicProfile.projects).toHaveLength(4);
  });
});
