import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Clear old caches on app load
if ('caches' in window) {
  caches.keys().then((names) => {
    names.forEach((name) => {
      // Only delete old/stale caches, keep current ones
      if (name.includes('workbox') || name.includes('precache')) {
        caches.delete(name);
      }
    });
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
