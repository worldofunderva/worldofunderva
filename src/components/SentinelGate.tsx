import { Shield, Check, AlertTriangle, Sparkles, Loader2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAccount } from 'wagmi';
import { base } from 'wagmi/chains';
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
  const { isConnected, chainId } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { hasSentinelNFT, isCheckingOwnership, isNFTContractReady } = useSentinel();
  const { ethPrice, getEthEquivalent, isLoading: isPriceLoading } = useEthPrice();
  
  // Network check - only Base is supported
  const isOnBase = chainId === base.id;
  const isWrongNetwork = isConnected && chainId !== undefined && !isOnBase;

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
        <div className="grid gap-8 lg:grid-cols-[1fr,400px] lg:gap-12 xl:gap-16 items-start">
          {/* Content Side */}
          <ScrollReveal variant="fade-right">
            <div className="text-center lg:text-left">
              <p className="text-[10px] sm:text-xs font-medium text-primary tracking-widest mb-2 sm:mb-3">COMPLIANCE GATEWAY</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
                The Sentinel NFT Gate
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                The Sentinel NFT is your <span className="text-foreground font-semibold">mandatory, one-time compliance credential</span> required 
                to unlock the full benefits of the World of Underva ecosystem.
              </p>

              {/* Three Main Perks - Horizontal Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 text-left">
                {/* 2.0% Automated Reward Engine */}
                <div className="glass-card p-4 sm:p-5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/20 text-success mb-3">
                    <Check className="h-4 w-4" />
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-foreground mb-2">2.0% Automated Reward Engine</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mb-3">
                    Powered by the RWA Engagement Pool (UEP).
                  </p>
                  <ul className="space-y-1.5">
                    <li className="flex items-start gap-2 text-[10px] sm:text-xs text-muted-foreground">
                      <Check className="h-3 w-3 text-primary shrink-0 mt-0.5" />
                      <span>2.0% instant cashback</span>
                    </li>
                    <li className="flex items-start gap-2 text-[10px] sm:text-xs text-muted-foreground">
                      <Check className="h-3 w-3 text-primary shrink-0 mt-0.5" />
                      <span>Semi-annual dividends</span>
                    </li>
                  </ul>
                </div>

                {/* Strong Holder VIP Status */}
                <div className="glass-card p-4 sm:p-5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/20 text-success mb-3">
                    <Check className="h-4 w-4" />
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-foreground mb-2">Strong Holder VIP Status</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mb-3">
                    Exclusive access and governance rights.
                  </p>
                  <ul className="space-y-1.5">
                    <li className="flex items-start gap-2 text-[10px] sm:text-xs text-muted-foreground">
                      <Check className="h-3 w-3 text-primary shrink-0 mt-0.5" />
                      <span>7-day early access</span>
                    </li>
                    <li className="flex items-start gap-2 text-[10px] sm:text-xs text-muted-foreground">
                      <Check className="h-3 w-3 text-primary shrink-0 mt-0.5" />
                      <span>Governance voting</span>
                    </li>
                    <li className="flex items-start gap-2 text-[10px] sm:text-xs text-muted-foreground">
                      <Check className="h-3 w-3 text-primary shrink-0 mt-0.5" />
                      <span>Private events</span>
                    </li>
                  </ul>
                </div>

                {/* Lifetime Ownership */}
                <div className="glass-card p-4 sm:p-5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/20 text-success mb-3">
                    <Check className="h-4 w-4" />
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-foreground mb-2">Lifetime Ownership</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mb-3">
                    Mint once, benefit forever.
                  </p>
                  <ul className="space-y-1.5">
                    <li className="flex items-start gap-2 text-[10px] sm:text-xs text-muted-foreground">
                      <Check className="h-3 w-3 text-primary shrink-0 mt-0.5" />
                      <span>Priority processing</span>
                    </li>
                    <li className="flex items-start gap-2 text-[10px] sm:text-xs text-muted-foreground">
                      <Check className="h-3 w-3 text-primary shrink-0 mt-0.5" />
                      <span>Tradeable on OpenSea</span>
                    </li>
                    <li className="flex items-start gap-2 text-[10px] sm:text-xs text-muted-foreground">
                      <Check className="h-3 w-3 text-primary shrink-0 mt-0.5" />
                      <span>Exclusive airdrops</span>
                    </li>
                  </ul>
                </div>
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

                {/* Wrong Network Warning */}
                {isWrongNetwork && (
                  <div className="mb-4 sm:mb-6 rounded-lg border border-destructive/50 bg-destructive/10 p-3 sm:p-4">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-destructive shrink-0 mt-0.5 animate-pulse" />
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-destructive">Wrong Network</p>
                        <p className="text-[10px] sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">
                          Please switch to Base Network to mint your Sentinel NFT.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Status Display */}
                {isConnected && !isWrongNetwork && !hasSentinelNFT && !isCheckingOwnership && (
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

                {/* Action Button */}
                {!isConnected ? (
                  <Button 
                    variant="sentinel" 
                    size="lg" 
                    className="w-full h-10 sm:h-12 text-xs sm:text-sm"
                    onClick={openConnectModal}
                  >
                    Connect Wallet to Mint
                  </Button>
                ) : isWrongNetwork ? (
                  <Button 
                    variant="destructive" 
                    size="lg" 
                    className="w-full h-10 sm:h-12 text-xs sm:text-sm"
                    disabled
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Switch to Base Network
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
