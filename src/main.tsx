import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { CvI18nProvider } from './components/cv/copy';
import './index.css';

const rootElement = document.getElementById('root');
const staticMirror = document.getElementById('prompt-injection-static-mirror');

if (!rootElement) {
  throw new Error('Root element #root is missing.');
}

const hideStaticMirrorAfterHydration = (): boolean => {
  if (!staticMirror) {
    return false;
  }

  if (rootElement.childNodes.length > 0) {
    document.documentElement.setAttribute('data-app-hydrated', 'true');
    staticMirror.setAttribute('hidden', '');
    return true;
  }

  return false;
};

let hydrationObserver: MutationObserver | null = null;

if (staticMirror) {
  hydrationObserver = new MutationObserver(() => {
    if (hideStaticMirrorAfterHydration()) {
      hydrationObserver?.disconnect();
    }
  });

  hydrationObserver.observe(rootElement, {childList: true});
}

createRoot(rootElement).render(
  <StrictMode>
    <CvI18nProvider>
      <App />
    </CvI18nProvider>
  </StrictMode>,
);

hideStaticMirrorAfterHydration();
