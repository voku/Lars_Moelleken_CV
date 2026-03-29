import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element #root is missing.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

const staticMirror = document.getElementById('prompt-injection-static-mirror');

const hideStaticMirrorIfAppRendered = () => {
  if (!staticMirror) {
    return;
  }

  if (rootElement.childNodes.length > 0) {
    document.documentElement.dataset.appHydrated = 'true';
    staticMirror.setAttribute('hidden', '');
  }
};

window.requestAnimationFrame(() => {
  window.requestAnimationFrame(hideStaticMirrorIfAppRendered);
});
