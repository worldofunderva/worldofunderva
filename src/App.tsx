import '@rainbow-me/rainbowkit/styles.css';
import { lazy, Suspense } from 'react';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SentinelProvider } from '@/contexts/SentinelContext';
import { config } from '@/config/wagmi';
import { useWalletSessionPolicy } from '@/hooks/useWalletSessionPolicy';
import { useStrictNetworkGatekeeper } from '@/hooks/useStrictNetworkGatekeeper';

// Lazy load pages for code splitting
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Minimal loading fallback - no spinner
const PageLoader = () => (
  <div className="min-h-screen bg-background" />
);

/**
 * Wallet Security Manager
 * Combines session policy (no auto-reconnect) with strict network enforcement
 */
function WalletSecurityManager() {
  useWalletSessionPolicy();
  useStrictNetworkGatekeeper();
  return null;
}

// Prevent HMR from trying to preserve state
if (import.meta.hot) {
  import.meta.hot.accept();
}

// Configure QueryClient optimized for high-traffic (500k users)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 1, // 1 minute
      gcTime: 1000 * 60 * 30, // 30 minutes garbage collection
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
      <RainbowKitProvider
        theme={darkTheme({
          accentColor: 'hsl(142, 76%, 36%)',
          accentColorForeground: 'white',
          borderRadius: 'medium',
          fontStack: 'system',
        })}
        modalSize="compact"
        showRecentTransactions={false}
      >
        <SentinelProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </SentinelProvider>
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

export default App;
