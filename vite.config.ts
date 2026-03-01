import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

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
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'wallet-vendor': ['wagmi', 'viem'],
          'ui-vendor': ['framer-motion', 'lucide-react'],
          'query-vendor': ['@tanstack/react-query'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild',
    sourcemap: mode === 'development',
    target: 'esnext',
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'wagmi', 'viem'],
  },
}));
