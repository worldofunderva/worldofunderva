import { AlertTriangle, X } from 'lucide-react';
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
 */
export function NetworkWarningBanner() {
  const { isConnected, chainId } = useAccount();
  const { switchChain, isPending } = useSwitchChain();

  const isOnBase = chainId === base.id;
  const showBanner = isConnected && !isOnBase;

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
            "bg-destructive/95 backdrop-blur-sm",
            "border-b border-destructive",
            "px-4 py-3"
          )}>
            <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              {/* Warning Icon & Message */}
              <div className="flex items-center gap-2 text-destructive-foreground">
                <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-center sm:text-left">
                  Wrong Network Detected — Please switch to <strong>Base Network</strong> to access World of Underva
                </span>
              </div>

              {/* Switch Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleSwitch}
                disabled={isPending}
                className={cn(
                  "bg-white/10 border-white/30 text-white",
                  "hover:bg-white/20 hover:border-white/50",
                  "text-xs sm:text-sm font-semibold",
                  "shrink-0",
                  isPending && "opacity-50 cursor-wait"
                )}
              >
                {isPending ? 'Switching...' : 'Switch to Base'}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
