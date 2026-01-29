import { Shield, Check, AlertTriangle, Sparkles, Loader2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useSentinel } from '@/contexts/SentinelContext';
import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

// Sentinel NFT mint price in ETH (on Base network)
// $500 USD equivalent - update this value based on ETH price at launch
const MINT_PRICE_ETH = '0.20';

export function SentinelGate() {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { hasSentinelNFT, isCheckingOwnership, isNFTContractReady } = useSentinel();

  // Mint function - will be implemented when NFT contract is deployed
  const handleMint = () => {
    // TODO: Implement actual mint transaction when contract is ready
    // Will use wagmi useWriteContract hook
    console.log('Mint functionality pending - NFT contract not yet deployed');
  };

  return (
    <section id="sentinel" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
          {/* Content Side */}
          <ScrollReveal variant="fade-right">
            <div className="text-center lg:text-left">
              <p className="text-xs sm:text-sm font-medium text-primary mb-2 sm:mb-3">COMPLIANCE GATEWAY</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
                The Sentinel NFT Gate
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                The Sentinel NFT is your <span className="text-foreground font-medium">mandatory, one-time compliance credential</span> required 
                to unlock the full benefits of the World of Underva ecosystem.
              </p>

              {/* Benefits List */}
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
                {[
                  {
                    title: '2.0% Automatic Cashback',
                    desc: 'Funded by the RWA Engagement Pool (UEP) on every consumption transaction.',
                  },
                  {
                    title: 'Strong Holder Status',
                    desc: 'Priority access to limited drops, governance rights, and ecosystem perks.',
                  },
                  {
                    title: 'Lifetime Enrollment',
                    desc: 'One-time mint. Permanent benefits. No recurring fees.',
                  },
                ].map((benefit) => (
                  <div key={benefit.title} className="flex items-start gap-3 text-left">
                    <div className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full bg-success/20 text-success mt-0.5">
                      <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-medium">{benefit.title}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {benefit.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Interactive Card Side */}
          <ScrollReveal variant="fade-left" delay={0.2}>
            <div className="relative">
              <div className={cn(
                "rounded-xl sm:rounded-2xl border p-5 sm:p-6 lg:p-8 transition-all duration-500",
                hasSentinelNFT 
                  ? "border-success/50 bg-success/5 sentinel-glow"
                  : isConnected
                    ? "border-warning/50 bg-warning/5"
                    : "border-border bg-card"
              )}>
                {/* Card Header */}
                <div className="flex items-center justify-between mb-5 sm:mb-8">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className={cn(
                      "flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl",
                      hasSentinelNFT ? "bg-success/20 text-success" : "bg-primary/20 text-primary"
                    )}>
                      <Shield className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold">Sentinel NFT</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">Compliance Credential</p>
                    </div>
                  </div>
                  <div className={cn(
                    "rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium",
                    isCheckingOwnership
                      ? "bg-muted text-muted-foreground"
                      : hasSentinelNFT 
                        ? "bg-success/20 text-success" 
                        : "bg-muted text-muted-foreground"
                  )}>
                    {isCheckingOwnership ? (
                      <span className="flex items-center gap-1">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        CHECKING
                      </span>
                    ) : hasSentinelNFT ? 'ENROLLED' : 'NOT ENROLLED'}
                  </div>
                </div>

                {/* Status Display */}
                {isConnected && !hasSentinelNFT && !isCheckingOwnership && (
                  <div className="mb-4 sm:mb-6 rounded-lg border border-warning/30 bg-warning/10 p-3 sm:p-4">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-warning shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-warning">Disqualified from Rewards</p>
                        <p className="text-[10px] sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">
                          Your wallet lacks the Sentinel NFT. Mint now to unlock 2.0% cashback and Strong Holder benefits.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {hasSentinelNFT && (
                  <div className="mb-4 sm:mb-6 rounded-lg border border-success/30 bg-success/10 p-3 sm:p-4">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-success shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-success">Full Access Granted</p>
                        <p className="text-[10px] sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">
                          You are enrolled in the Sentinel program. All rewards and benefits are active.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mint Info */}
                <div className="space-y-0 mb-5 sm:mb-8">
                  {[
                    { label: 'Mint Price', value: '$500 USD (paid in ETH)' },
                    { label: 'Supply', value: '5,000 Sentinels' },
                    { label: 'Network', value: 'Base L2', highlight: true },
                  ].map((item, index) => (
                    <div 
                      key={item.label}
                      className={cn(
                        "flex items-center justify-between py-2.5 sm:py-3",
                        index !== 2 && "border-b border-border"
                      )}
                    >
                      <span className="text-xs sm:text-sm text-muted-foreground">{item.label}</span>
                      <span className={cn(
                        "font-mono text-xs sm:text-sm font-medium",
                        item.highlight && "text-primary"
                      )}>{item.value}</span>
                    </div>
                  ))}
                  <p className="text-[10px] sm:text-xs text-muted-foreground pt-2">
                    Price is fixed at $500 USD equivalent, regardless of ETH price fluctuations.
                  </p>
                </div>

                {/* Action Button */}
                {!isConnected ? (
                  <Button 
                    variant="sentinel" 
                    size="lg" 
                    className="w-full h-11 sm:h-14 text-sm sm:text-base"
                    onClick={openConnectModal}
                  >
                    Connect Wallet to Mint
                  </Button>
                ) : isCheckingOwnership ? (
                  <Button 
                    variant="secondary" 
                    size="lg" 
                    className="w-full h-11 sm:h-14 text-sm sm:text-base"
                    disabled
                  >
                    <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2 animate-spin" />
                    Checking Ownership...
                  </Button>
                ) : hasSentinelNFT ? (
                  <Button 
                    variant="secondary" 
                    size="lg" 
                    className="w-full h-11 sm:h-14 text-sm sm:text-base"
                    disabled
                  >
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Already Enrolled
                  </Button>
                ) : isNFTContractReady ? (
                  <Button 
                    variant="sentinel" 
                    size="lg" 
                    className="w-full h-11 sm:h-14 text-sm sm:text-base animate-glow"
                    onClick={handleMint}
                  >
                    <Shield className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Mint Sentinel NFT
                  </Button>
                ) : (
                  <Button 
                    variant="secondary" 
                    size="lg" 
                    className="w-full h-11 sm:h-14 text-sm sm:text-base"
                    disabled
                  >
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Minting Opens Soon
                  </Button>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
