import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode, command }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  // lovable-tagger is a dev-server helper; avoid running it during builds.
  plugins: [react(), command === "serve" && mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress Privy annotation warnings that flood the build log
        if (warning.message?.includes('contains an annotation that Rollup cannot interpret')) return;
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
        warn(warning);
      },
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion', 'lucide-react'],
          'query-vendor': ['@tanstack/react-query'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild',
    esbuildOptions: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },
    sourcemap: true,
    target: 'esnext',
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'wagmi', 'viem', '@privy-io/react-auth', '@privy-io/wagmi'],
  },
}));
