import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppV2 from "./AppV2";
import "./index.css";

const rootElement = document.getElementById("root");
const staticMirror = document.getElementById("cv-static-mirror");

if (!rootElement) {
  throw new Error("Root element #root is missing.");
}

const hideStaticMirrorAfterRender = (): boolean => {
  if (!staticMirror || rootElement.childNodes.length === 0) {
    return false;
  }

  document.documentElement.setAttribute("data-app-hydrated", "true");
  staticMirror.setAttribute("hidden", "");

  return true;
};

let renderObserver: MutationObserver | null = null;

if (staticMirror) {
  renderObserver = new MutationObserver(() => {
    if (hideStaticMirrorAfterRender()) {
      renderObserver?.disconnect();
    }
  });

  renderObserver.observe(rootElement, { childList: true });
}

createRoot(rootElement).render(
  <StrictMode>
    <AppV2 />
  </StrictMode>,
);

hideStaticMirrorAfterRender();
