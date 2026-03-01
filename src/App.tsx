import { lazy, Suspense } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SentinelProvider } from '@/contexts/SentinelContext';
import { config } from '@/config/wagmi';
import { useWalletSessionPolicy } from '@/hooks/useWalletSessionPolicy';
import { NetworkWarningBanner } from '@/components/NetworkWarningBanner';

// Lazy load pages for code splitting
const Index = lazy(() => import("./pages/Index"));
const DocsPage = lazy(() => import("./pages/Docs"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Minimal loading fallback
const PageLoader = () => (
  <div className="min-h-screen bg-background" />
);

function WalletSecurityManager() {
  useWalletSessionPolicy();
  return null;
}

// Prevent HMR from trying to preserve state
if (import.meta.hot) {
  import.meta.hot.accept();
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 1,
      gcTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
      networkMode: 'offlineFirst',
    },
  },
});

const App = () => (
  <WagmiProvider config={config} reconnectOnMount={false}>
    <QueryClientProvider client={queryClient}>
      <WalletSecurityManager />
      <SentinelProvider>
        <TooltipProvider>
          <NetworkWarningBanner />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/docs" element={<DocsPage />} />
                <Route path="/docs/:section" element={<DocsPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </SentinelProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

export default App;
