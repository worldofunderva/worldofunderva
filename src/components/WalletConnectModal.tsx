import { Wallet, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Connector } from 'wagmi';

interface WalletConnectModalProps {
  open: boolean;
  onClose: () => void;
  connectors: readonly Connector[];
  onSelectConnector: (index: number) => void;
}

export function WalletConnectModal({ open, onClose, connectors, onSelectConnector }: WalletConnectModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Connect Wallet</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Connector buttons */}
            <div className="space-y-2">
              {connectors.map((connector, index) => (
                <Button
                  key={connector.uid}
                  variant="outline"
                  className="w-full h-12 justify-start gap-3 text-sm font-medium"
                  onClick={() => onSelectConnector(index)}
                >
                  {connector.icon && (
                    <img src={connector.icon} alt="" className="h-6 w-6 rounded" />
                  )}
                  {connector.name}
                </Button>
              ))}
            </div>

            <p className="mt-4 text-center text-[10px] text-muted-foreground">
              Base Network Only
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
