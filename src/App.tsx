import { PrivyProvider } from '@privy-io/react-auth';
import { WagmiProvider } from '@privy-io/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SentinelProvider } from '@/contexts/SentinelContext';
import { config } from '@/config/wagmi';
import { NetworkWarningBanner } from '@/components/NetworkWarningBanner';
import { MaintenanceGate } from '@/components/MaintenanceGate';
import { SessionPolicyEnforcer } from '@/components/SessionPolicyEnforcer';
import { base } from 'wagmi/chains';
import Index from './pages/Index';
import DocsPage from './pages/Docs';
import SentryGuardPage from './pages/SentryGuard';
import SentryAuthPage from './pages/SentryAuth';
import NotFound from './pages/NotFound';
import { ProtectedRoute } from '@/components/ProtectedRoute';

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

const PRIVY_APP_ID = import.meta.env.VITE_PRIVY_APP_ID || 'cmmhpeqt600jb0dlbd3erefb4';

const App = () => (
  <PrivyProvider
    appId={PRIVY_APP_ID}
    config={{
      appearance: {
        theme: 'dark',
        accentColor: '#1E90FF',
      },
      defaultChain: base,
      supportedChains: [base],
    }}
  >
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <SentinelProvider>
          <TooltipProvider>
            {/* Enforce session policies (refresh disconnect + 1hr timeout) */}
            <SessionPolicyEnforcer />
            {/* Block UI when on wrong network */}
            <NetworkWarningBanner />
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/sentry-guard" element={
                  <ProtectedRoute fallback={<SentryAuthPage />}>
                    <SentryGuardPage />
                  </ProtectedRoute>
                } />
                <Route path="*" element={
                  <MaintenanceGate>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/docs" element={<DocsPage />} />
                      <Route path="/docs/:section" element={<DocsPage />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </MaintenanceGate>
                } />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </SentinelProvider>
      </WagmiProvider>
    </QueryClientProvider>
  </PrivyProvider>
);

export default App;
