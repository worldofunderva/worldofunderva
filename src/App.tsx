import { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SentinelProvider } from '@/contexts/SentinelContext';

// Lazy load pages for code splitting
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Minimal loading fallback - no spinner
const PageLoader = () => (
  <div className="min-h-screen bg-background" />
);

// Prevent HMR from trying to preserve state
if (import.meta.hot) {
  import.meta.hot.accept();
}

// Configure QueryClient for API calls (ETH price, etc.)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 1, // 1 minute
      gcTime: 1000 * 60 * 30, // 30 minutes garbage collection
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
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
  </QueryClientProvider>
);

export default App;
