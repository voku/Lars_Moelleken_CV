import type { ReactNode } from "react";

type ViewMode = "standard_cv" | "prompt_injection_cv";

interface ViewContainerProps {
  viewMode: ViewMode;
  standardView: ReactNode;
  demoView: ReactNode;
}

export function ViewContainer({ viewMode, standardView, demoView }: ViewContainerProps) {
  return <>{viewMode === "standard_cv" ? standardView : demoView}</>;
}
