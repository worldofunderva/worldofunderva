import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Code splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion', 'lucide-react'],
          'query-vendor': ['@tanstack/react-query'],
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Minification
    minify: 'esbuild',
    // Source maps only in development
    sourcemap: mode === 'development',
    // Target modern browsers for smaller bundle
    target: 'esnext',
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
}));
