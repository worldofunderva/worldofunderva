import { AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccount, useSwitchChain } from 'wagmi';
import { base } from 'wagmi/chains';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * NetworkWarningBanner
 * 
 * Displays a prominent red banner when user is connected to wrong network.
 * Provides quick action to switch to Base network.
 * This is shown INSTEAD of allowing connection on wrong networks.
 */
export function NetworkWarningBanner() {
  const { isConnected, chainId } = useAccount();
  const { switchChain, isPending } = useSwitchChain();

  // Only show if connected AND chainId is known AND not on Base
  const isOnBase = chainId === base.id;
  const showBanner = isConnected && chainId !== undefined && !isOnBase;

  const handleSwitch = () => {
    if (switchChain) {
      switchChain({ chainId: base.id });
    }
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          className="fixed top-0 left-0 right-0 z-[100] overflow-hidden"
        >
          <div className={cn(
            "bg-destructive",
            "border-b-2 border-destructive-foreground/20",
            "px-4 py-3 sm:py-4"
          )}>
            <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              {/* Warning Icon & Message */}
              <div className="flex items-center gap-2 text-destructive-foreground">
                <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 animate-pulse" />
                <span className="text-sm sm:text-base font-semibold text-center sm:text-left">
                  Wrong Network — Switch to Base to continue
                </span>
              </div>

              {/* Switch Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleSwitch}
                disabled={isPending}
                className={cn(
                  "bg-white text-destructive border-white",
                  "hover:bg-white/90 hover:text-destructive",
                  "text-sm font-bold px-6",
                  "shrink-0",
                  isPending && "opacity-50 cursor-wait"
                )}
              >
                {isPending ? 'Switching...' : 'Switch to Base Network'}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Hook to check if wallet should be blocked due to wrong network
 */
export function useNetworkBlock() {
  const { isConnected, chainId } = useAccount();
  const isOnBase = chainId === base.id;
  
  // Block interactions if connected but not on Base
  const isBlocked = isConnected && chainId !== undefined && !isOnBase;
  
  return { isBlocked, isOnBase };
}
