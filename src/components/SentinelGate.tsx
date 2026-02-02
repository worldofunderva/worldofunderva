import { Shield, Check, AlertTriangle, Sparkles, Loader2, Clock, Crown, Ticket, Truck, Vote, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useSentinel } from '@/contexts/SentinelContext';
import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { useEthPrice } from '@/hooks/useEthPrice';

// Fixed USD price for Sentinel NFT
const MINT_PRICE_USD = 500;

// Liquidity trigger threshold
const LIQUIDITY_TRIGGER_THRESHOLD = 2000;

export function SentinelGate() {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { hasSentinelNFT, isCheckingOwnership, isNFTContractReady } = useSentinel();
  const { ethPrice, getEthEquivalent, isLoading: isPriceLoading } = useEthPrice();

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
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8 items-stretch">
          {/* Technical Details / Lore Side */}
          <ScrollReveal variant="fade-right" className="h-full">
            <div className={cn(
              "h-full rounded-xl sm:rounded-2xl border border-border bg-card p-5 sm:p-6 lg:p-8 flex flex-col"
            )}>
              <div className="text-center lg:text-left mb-6">
                <p className="text-xs sm:text-sm font-medium text-primary mb-2 sm:mb-3">STRONG HOLDER VIP STATUS</p>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight mb-3 sm:mb-4">
                  The Sentinel NFT Gate
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Fixed at <span className="text-foreground font-mono font-semibold">$500 USD</span> to ensure ecosystem fairness.
                  The Sentinel NFT is your <span className="text-foreground font-medium">mandatory enrollment credential</span> required 
                  to participate in the 2.0% Automated Reward Engine.
                </p>
              </div>

              {/* The Reward Engine */}
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 sm:p-5 text-left mb-4 sm:mb-6">
                <h4 className="text-xs sm:text-sm font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  The Automated Reward Engine
                </h4>
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-success/20 text-success mt-0.5">
                      <Check className="h-2.5 w-2.5" />
                    </div>
                    <div>
                      <p className="text-[11px] sm:text-xs font-medium">The Sentinel Reward (Active Buyers)</p>
                      <p className="text-[10px] text-muted-foreground">
                        2.0% cashback on all $WOU purchases. Sentinel NFT required.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-success/20 text-success mt-0.5">
                      <Check className="h-2.5 w-2.5" />
                    </div>
                    <div>
                      <p className="text-[11px] sm:text-xs font-medium">The Loyalty Dividend (Strong Holders)</p>
                      <p className="text-[10px] text-muted-foreground">
                        2.0% bonus every 6 months for $WOU + Sentinel holders.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* VIP Perks Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 flex-1">
                {[
                  { icon: Ticket, title: 'Early Access', desc: 'Limited drops' },
                  { icon: Vote, title: 'Governance', desc: 'Voting rights' },
                  { icon: Users, title: 'Community', desc: 'Sentinels-Only' },
                  { icon: Crown, title: 'Events', desc: 'Private access' },
                  { icon: Sparkles, title: 'Airdrops', desc: 'Utility rewards' },
                  { icon: Truck, title: 'Express', desc: 'Priority shipping' },
                ].map((perk) => (
                  <div key={perk.title} className="rounded-lg border border-border bg-secondary/30 p-2.5 sm:p-3">
                    <perk.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary mb-1.5" />
                    <p className="text-[10px] sm:text-xs font-medium">{perk.title}</p>
                    <p className="text-[9px] sm:text-[10px] text-muted-foreground">{perk.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Mint / Action Box Side */}
          <ScrollReveal variant="fade-left" delay={0.2} className="h-full">
            <div className={cn(
              "h-full rounded-xl sm:rounded-2xl border p-5 sm:p-6 lg:p-8 transition-all duration-500 flex flex-col",
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
                      <p className="text-xs sm:text-sm text-muted-foreground">Fixed Entry Equity</p>
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
                          Your wallet lacks the Sentinel NFT. Mint now to unlock the 2.0% Automated Reward Engine.
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
                          You are enrolled in the Sentinel program. All rewards and VIP benefits are active.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mint Info */}
                <div className="space-y-0 mb-4 sm:mb-6">
                  {[
                    { 
                      label: 'Mint Price (Fixed)', 
                      value: isPriceLoading 
                        ? '$500 USD (...)' 
                        : `$500 USD (${getEthEquivalent(MINT_PRICE_USD)} ETH)`,
                      loading: isPriceLoading
                    },
                    { 
                      label: 'Remaining', 
                      value: isNFTContractReady ? '21,000 / 21,000' : '21,000 (Total)'
                    },
                    { label: 'Network', value: 'Base L2', highlight: true },
                  ].map((item, index) => (
                    <div 
                      key={item.label}
                      className={cn(
                        "flex items-center justify-between py-2 sm:py-2.5",
                        index !== 2 && "border-b border-border"
                      )}
                    >
                      <span className="text-[11px] sm:text-xs text-muted-foreground">{item.label}</span>
                      <span className={cn(
                        "font-mono text-[11px] sm:text-xs font-medium",
                        item.highlight && "text-primary"
                      )}>{item.value}</span>
                    </div>
                  ))}
                  <p className="text-[9px] sm:text-[10px] text-muted-foreground pt-1.5">
                    Fixed at $500 USD. ETH updates with market price{ethPrice ? ` ($${ethPrice.toLocaleString()}/ETH)` : ''}.
                  </p>
                </div>

                {/* Liquidity Trigger */}
                <div className="mb-4 sm:mb-6 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
                  <div className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                      <span className="text-amber-500 text-[10px] font-bold">$</span>
                    </div>
                    <div>
                      <p className="text-[11px] sm:text-xs font-medium text-amber-500">The Liquidity Trigger</p>
                      <p className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5">
                        $WOU deploys on Base DEX at <span className="text-foreground font-medium">{LIQUIDITY_TRIGGER_THRESHOLD.toLocaleString()} mints</span>. 
                        $1M raised provides deep liquidity.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Button - pushed to bottom */}
                <div className="mt-auto">
                {!isConnected ? (
                  <Button 
                    variant="sentinel" 
                    size="lg" 
                    className="w-full h-10 sm:h-12 text-xs sm:text-sm"
                    onClick={openConnectModal}
                  >
                    Connect Wallet to Mint
                  </Button>
                ) : isCheckingOwnership ? (
                  <Button 
                    variant="secondary" 
                    size="lg" 
                    className="w-full h-10 sm:h-12 text-xs sm:text-sm"
                    disabled
                  >
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Checking Ownership...
                  </Button>
                ) : hasSentinelNFT ? (
                  <Button 
                    variant="secondary" 
                    size="lg" 
                    className="w-full h-10 sm:h-12 text-xs sm:text-sm"
                    disabled
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Already Enrolled
                  </Button>
                ) : isNFTContractReady ? (
                  <Button 
                    variant="sentinel" 
                    size="lg" 
                    className="w-full h-10 sm:h-12 text-xs sm:text-sm animate-glow"
                    onClick={handleMint}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Mint Sentinel NFT
                  </Button>
                ) : (
                  <Button 
                    variant="secondary" 
                    size="lg" 
                    className="w-full h-10 sm:h-12 text-xs sm:text-sm"
                    disabled
                  >
                    <Clock className="h-4 w-4 mr-2" />
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
