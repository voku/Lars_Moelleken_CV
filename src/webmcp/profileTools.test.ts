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
  it("builds a recruiter summary from verified public data", () => {
    const summary = buildProfileSummary({ audience: "recruiter", language: "en", maxItems: 4 });

    expect(summary.name).toBe("Lars Moelleken");
    expect(summary.currentRole).toContain("since August 2023");
    expect(summary.highlights).toHaveLength(4);
    expect(summary.strongestOpenSourceProjects.map((project) => project.name)).toEqual(
      expect.arrayContaining(["portable-utf8", "portable-ascii", "anti-xss", "Arrayy"]),
    );
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

  it("scores a verified senior PHP architecture role as a strong fit", () => {
    const fit = buildHiringFit({
      roleTitle: "Senior PHP Architect for Enterprise Integration",
      mustHaveSkills: ["PHP", "Legacy Modernization", "PHPStan", "MariaDB", "Active Directory"],
      niceToHaveSkills: ["Docker Compose", "Linux", "Microsoft 365", "PowerShell"],
      language: "en",
    });

    expect(fit.fit.label).toBe("high");
    expect(fit.fit.proceed).toBe(true);
    expect(fit.matchingStrengths).toEqual(
      expect.arrayContaining(["PHP 8.x", "Legacy Modernization", "PHPStan", "MariaDB", "LDAP / Active Directory"]),
    );
    expect(fit.likelyGaps).toEqual([]);
  });

  it("does not treat unsupported framework keywords as verified matches", () => {
    const fit = buildHiringFit({
      roleTitle: "Framework migration",
      mustHaveSkills: ["Symfony", "Laravel", "GraphQL", "PostgreSQL", "Redis"],
      language: "en",
    });

    expect(fit.fit.proceed).toBe(false);
    expect(fit.likelyGaps).toEqual(["Symfony", "Laravel", "GraphQL", "PostgreSQL", "Redis"]);
  });

  it("exports only the verified public profile dataset", () => {
    const publicProfile = getPublicProfileExport();
    const serialized = JSON.stringify(publicProfile);

    expect(serialized).not.toContain("EDUCATIONAL_MARKER");
    expect(serialized).not.toContain("since 2020");
    expect(serialized).not.toContain("Symfony");
    expect(serialized).not.toContain("Laravel");
    expect(publicProfile.projects).toHaveLength(4);
  });
});
