import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { RecruiterProfileSection } from "./RecruiterProfileSection";

describe("RecruiterProfileSection", () => {
  it("renders recruiter profile details", () => {
    const html = renderToStaticMarkup(<RecruiterProfileSection />);
    expect(html).toContain("Profil für Recruiter und Agenten");
    expect(html).toContain("Senior PHP Developer");
    expect(html).toContain("Recruiter-Hinweis");
  });
});
