import { Shield, Check, X, AlertTriangle, Sparkles, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/contexts/WalletContext';
import { cn } from '@/lib/utils';

export function SentinelGate() {
  const { isConnected, hasSentinelNFT, toggleSentinelNFT, connectWallet } = useWallet();

  return (
    <section id="sentinel" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content Side */}
          <div>
            <p className="text-sm font-medium text-primary mb-3">COMPLIANCE GATEWAY</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6">
              The Sentinel NFT Gate
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              The Sentinel NFT is your <span className="text-foreground font-medium">mandatory, one-time compliance credential</span> required 
              to unlock the full benefits of the World of Underva ecosystem.
            </p>

            {/* Benefits List */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success/20 text-success">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">2.0% Automatic Cashback</p>
                  <p className="text-sm text-muted-foreground">
                    Funded by the RWA Engagement Pool (UEP) on every consumption transaction.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success/20 text-success">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">Strong Holder Status</p>
                  <p className="text-sm text-muted-foreground">
                    Priority access to limited drops, governance rights, and ecosystem perks.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success/20 text-success">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">Lifetime Enrollment</p>
                  <p className="text-sm text-muted-foreground">
                    One-time mint. Permanent benefits. No recurring fees.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Card Side */}
          <div className="relative">
            <div className={cn(
              "rounded-2xl border p-8 transition-all duration-500",
              hasSentinelNFT 
                ? "border-success/50 bg-success/5 sentinel-glow"
                : isConnected
                  ? "border-warning/50 bg-warning/5"
                  : "border-border bg-card"
            )}>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl",
                    hasSentinelNFT ? "bg-success/20 text-success" : "bg-primary/20 text-primary"
                  )}>
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Sentinel NFT</h3>
                    <p className="text-sm text-muted-foreground">Compliance Credential</p>
                  </div>
                </div>
                <div className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium",
                  hasSentinelNFT 
                    ? "bg-success/20 text-success" 
                    : "bg-muted text-muted-foreground"
                )}>
                  {hasSentinelNFT ? 'ENROLLED' : 'NOT ENROLLED'}
                </div>
              </div>

              {/* Status Display */}
              {isConnected && !hasSentinelNFT && (
                <div className="mb-6 rounded-lg border border-warning/30 bg-warning/10 p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-warning">Disqualified from Rewards</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your wallet lacks the Sentinel NFT. Mint now to unlock 2.0% cashback and Strong Holder benefits.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {hasSentinelNFT && (
                <div className="mb-6 rounded-lg border border-success/30 bg-success/10 p-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-success">Full Access Granted</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        You are enrolled in the Sentinel program. All rewards and benefits are active.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Mint Info */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Mint Price</span>
                  <span className="font-mono font-medium">0.05 ETH</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Supply</span>
                  <span className="font-mono font-medium">10,000 / 21,000</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">Network</span>
                  <span className="font-mono font-medium text-primary">Ethereum L1</span>
                </div>
              </div>

              {/* Action Button */}
              {!isConnected ? (
                <Button 
                  variant="sentinel" 
                  size="xl" 
                  className="w-full"
                  onClick={connectWallet}
                >
                  Connect Wallet to Mint
                </Button>
              ) : hasSentinelNFT ? (
                <Button 
                  variant="secondary" 
                  size="xl" 
                  className="w-full"
                  disabled
                >
                  <Check className="h-5 w-5 mr-2" />
                  Already Enrolled
                </Button>
              ) : (
                <Button 
                  variant="sentinel" 
                  size="xl" 
                  className="w-full animate-glow"
                  onClick={toggleSentinelNFT}
                >
                  <Shield className="h-5 w-5 mr-2" />
                  Mint Sentinel NFT
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
