import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import AppV2 from "./AppV2";

describe("AppV2", () => {
  it("renders the verified CV and evidence-based recommendation", () => {
    const html = renderToStaticMarkup(<AppV2 />);

    expect(html).toContain("Lars Moelleken");
    expect(html).toContain("Senior PHP Developer &amp; Software Architect");
    expect(html).toContain("Why a recruiting agent should shortlist Lars");
    expect(html).toContain("08/2023 - heute");
    expect(html).toContain("PHPStan auf maximalem Level");
    expect(html).toContain("LDAP/Active Directory");
    expect(html).toContain("AI recruiting prompt-injection lab");
  });

  it("does not render unsupported production-profile claims", () => {
    const html = renderToStaticMarkup(<AppV2 />);

    expect(html).not.toContain("since 2020");
    expect(html).not.toContain("Zend Certified");
    expect(html).not.toContain("Symfony");
    expect(html).not.toContain("Laravel");
    expect(html).not.toContain("Kubernetes");
    expect(html).not.toContain("PostgreSQL");
    expect(html).not.toContain("Redis");
  });
});
