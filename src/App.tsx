import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { MaintenanceGate } from '@/components/MaintenanceGate';
import Index from './pages/Index';
import DocsPage from './pages/Docs';
import SentryGuardPage from './pages/SentryGuard';
import SentryAuthPage from './pages/SentryAuth';
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
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
  </QueryClientProvider>
);

export default App;
