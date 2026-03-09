import { AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccount, useSwitchChain } from 'wagmi';
import { base } from 'wagmi/chains';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useWalletConnection } from '@/hooks/useWalletConnection';

export function NetworkWarningBanner() {
  const { isConnected, chainId } = useAccount();
  const { switchChain, isPending } = useSwitchChain();
  const { logout } = useWalletConnection();

  const isOnBase = chainId === base.id;
  const showBanner = isConnected && chainId !== undefined && !isOnBase;

  return (
    <AnimatePresence>
      {showBanner && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] bg-background/80 backdrop-blur-sm"
          />
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
              "px-4 py-4"
            )}>
              <div className="mx-auto max-w-7xl flex flex-col items-center justify-center gap-3">
                <div className="flex items-center gap-2 text-destructive-foreground">
                  <AlertTriangle className="h-5 w-5 shrink-0" />
                  <span className="text-sm font-semibold text-center">
                    Wrong Network — Switch to <strong>Base Network</strong> to use World of Underva
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => switchChain?.({ chainId: base.id })}
                    disabled={isPending}
                    className={cn(
                      "bg-white/10 border-white/30 text-white",
                      "hover:bg-white/20 hover:border-white/50",
                      "text-sm font-semibold",
                      isPending && "opacity-50 cursor-wait"
                    )}
                  >
                    {isPending ? 'Switching...' : 'Switch to Base'}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => logout()}
                    className="text-white/70 hover:text-white hover:bg-white/10 text-sm"
                  >
                    Disconnect
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
