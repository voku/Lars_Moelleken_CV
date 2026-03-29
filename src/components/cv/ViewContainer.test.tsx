import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ViewContainer } from "./ViewContainer";

describe("ViewContainer", () => {
  it("renders standard view", () => {
    const html = renderToStaticMarkup(
      <ViewContainer viewMode="standard_cv" standardView={<div>std</div>} demoView={<div>demo</div>} />,
    );
    expect(html).toContain("std");
    expect(html).not.toContain("demo");
  });

  it("renders demo view", () => {
    const html = renderToStaticMarkup(
      <ViewContainer viewMode="prompt_injection_cv" standardView={<div>std</div>} demoView={<div>demo</div>} />,
    );
    expect(html).toContain("demo");
    expect(html).not.toContain("std");
  });
});
