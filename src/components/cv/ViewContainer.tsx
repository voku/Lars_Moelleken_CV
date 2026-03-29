import type { ReactNode } from "react";
import type { ViewMode } from "./types";

interface ViewContainerProps {
  viewMode: ViewMode;
  standardView: ReactNode;
  demoView: ReactNode;
}

export function ViewContainer({ viewMode, standardView, demoView }: ViewContainerProps) {
  return <>{viewMode === "standard_cv" ? standardView : demoView}</>;
}
