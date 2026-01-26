import { Shield, Check, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/contexts/WalletContext';
import { cn } from '@/lib/utils';

export function SentinelGate() {
  const { isConnected, hasSentinelNFT, toggleSentinelNFT, connectWallet } = useWallet();

  return (
    <section id="sentinel" className="py-20 lg:py-24 bg-card/20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          {/* Content */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-3">
              Sentinel NFT
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              One-time compliance credential for ecosystem benefits.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-success" />
                <span>2.0% automatic cashback on transactions</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-success" />
                <span>Strong Holder Status & governance rights</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-success" />
                <span>Lifetime enrollment, no recurring fees</span>
              </div>
            </div>
          </div>

          {/* Card */}
          <div className={cn(
            "rounded-xl border p-6",
            hasSentinelNFT 
              ? "border-success/50 bg-success/5"
              : isConnected
                ? "border-warning/50 bg-warning/5"
                : "border-border bg-card"
          )}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Shield className={cn(
                  "h-6 w-6",
                  hasSentinelNFT ? "text-success" : "text-primary"
                )} />
                <span className="font-semibold">Sentinel NFT</span>
              </div>
              <span className={cn(
                "text-xs font-medium px-2 py-1 rounded-full",
                hasSentinelNFT 
                  ? "bg-success/20 text-success" 
                  : "bg-muted text-muted-foreground"
              )}>
                {hasSentinelNFT ? 'ENROLLED' : 'NOT ENROLLED'}
              </span>
            </div>

            {isConnected && !hasSentinelNFT && (
              <div className="mb-4 flex items-center gap-2 text-sm text-warning">
                <AlertTriangle className="h-4 w-4" />
                <span>Wallet connected but not enrolled</span>
              </div>
            )}

            <div className="grid grid-cols-3 gap-4 mb-6 text-center">
              <div>
                <p className="font-mono font-semibold">0.05 ETH</p>
                <p className="text-[10px] text-muted-foreground">MINT PRICE</p>
              </div>
              <div>
                <p className="font-mono font-semibold">10K</p>
                <p className="text-[10px] text-muted-foreground">MINTED</p>
              </div>
              <div>
                <p className="font-mono font-semibold text-primary">ETH L1</p>
                <p className="text-[10px] text-muted-foreground">NETWORK</p>
              </div>
            </div>

            {!isConnected ? (
              <Button variant="sentinel" className="w-full" onClick={connectWallet}>
                Connect Wallet
              </Button>
            ) : hasSentinelNFT ? (
              <Button variant="secondary" className="w-full" disabled>
                <Check className="h-4 w-4 mr-2" />
                Enrolled
              </Button>
            ) : (
              <Button variant="sentinel" className="w-full" onClick={toggleSentinelNFT}>
                Mint Now
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
