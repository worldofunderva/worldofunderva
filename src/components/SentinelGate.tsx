import { Shield, Check, Sparkles, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Wallet } from 'lucide-react';

const MINT_PRICE_USD = 500;
const LIQUIDITY_TRIGGER_THRESHOLD = 2000;

export function SentinelGate() {
  return (
    <section id="sentinel" className="relative py-20 sm:py-28 lg:py-36 overflow-hidden bg-card/40">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <ScrollReveal className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <p className="text-[10px] sm:text-xs font-medium text-primary tracking-widest mb-2 sm:mb-3">COMPLIANCE GATEWAY</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
            The Sentinel NFT Gate
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            The Sentinel NFT is your <span className="text-foreground font-semibold">mandatory, one-time compliance credential</span> required 
            to unlock the full benefits of the World of Underva ecosystem.
          </p>
        </ScrollReveal>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-18 items-stretch">
          {/* Content Side */}
          <ScrollReveal variant="fade-right">
            <div className="h-full flex flex-col">
              <div className="space-y-6 flex-1">
                <div className="flex items-start gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/20 text-success mt-0.5">
                    <Check className="h-3 w-3" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-foreground">Dual-Yield Protocol</p>
                    <p className="text-[11px] sm:text-xs text-muted-foreground mt-1.5 leading-relaxed">
                      The Dual-Yield Protocol is an automated RWA reward engine designed for the 21,000 total supply of the World of Underva. This protocol is divided into two distinct liquidity phases:
                    </p>
                    <ul className="mt-2.5 space-y-1.5">
                      <li className="flex items-center gap-2 text-[11px] sm:text-xs text-muted-foreground">
                        <Check className="h-3 w-3 text-primary shrink-0" />
                        <span><span className="text-foreground font-medium">Monthly Cashback:</span> 2.0% for all Sentinel NFT holders (Origin and Standard)</span>
                      </li>
                      <li className="flex items-center gap-2 text-[11px] sm:text-xs text-muted-foreground">
                        <Check className="h-3 w-3 text-primary shrink-0" />
                        <span><span className="text-foreground font-medium">Loyalty Dividend:</span> 5.0% every 6 months, exclusive to Origin Sentinel holders only, based on $WOU token holdings</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/20 text-success mt-0.5">
                    <Check className="h-3 w-3" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-foreground">Strong Holder VIP Status</p>
                    <p className="text-[11px] sm:text-xs text-muted-foreground mt-1.5 leading-relaxed">
                      7-day early access to limited drops, governance voting rights, Sentinels-Only community access, and exclusive utility airdrops.
                    </p>
                    <ul className="mt-2.5 space-y-1.5">
                      <li className="flex items-center gap-2 text-[11px] sm:text-xs text-muted-foreground">
                        <Check className="h-3 w-3 text-primary shrink-0" />
                        <span>Early access to limited drops and private auctions</span>
                      </li>
                      <li className="flex items-center gap-2 text-[11px] sm:text-xs text-muted-foreground">
                        <Check className="h-3 w-3 text-primary shrink-0" />
                        <span>Governance voting rights on key ecosystem decisions</span>
                      </li>
                      <li className="flex items-center gap-2 text-[11px] sm:text-xs text-muted-foreground">
                        <Check className="h-3 w-3 text-primary shrink-0" />
                        <span>Private events hosted by Underva and Stride</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/20 text-success mt-0.5">
                    <Check className="h-3 w-3" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-foreground">Lifetime Ownership & Succession</p>
                    <p className="text-[11px] sm:text-xs text-muted-foreground mt-1.5 leading-relaxed">
                      Mint once, benefit forever. No subscriptions. Your Sentinel is a tradeable asset with secondary market value on OpenSea and Blur.
                    </p>
                    <ul className="mt-2.5 space-y-1.5">
                      <li className="flex items-center gap-2 text-[11px] sm:text-xs text-muted-foreground">
                        <Check className="h-3 w-3 text-primary shrink-0" />
                        <span>Priority "Express" shipment processing</span>
                      </li>
                      <li className="flex items-center gap-2 text-[11px] sm:text-xs text-muted-foreground">
                        <Check className="h-3 w-3 text-primary shrink-0" />
                        <span>Exclusive utility airdrops and ecosystem rewards</span>
                      </li>
                      <li className="flex items-center gap-2 text-[11px] sm:text-xs text-muted-foreground">
                        <Check className="h-3 w-3 text-amber-500 shrink-0" />
                        <span className="text-foreground/80 font-medium">Succession Policy: If the NFT is sold, all rights, perks, and ecosystem benefits transfer in full to the new owner</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Interactive Card Side */}
          <ScrollReveal variant="fade-left" delay={0.2}>
            <div className="relative">
              <div className="rounded-xl sm:rounded-2xl border border-primary/10 bg-card p-6 sm:p-8 transition-all duration-500">
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
                      <Shield className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold">Sentinel NFT</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">Fixed Entry Equity</p>
                    </div>
                  </div>
                  <div className="rounded-full px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-medium bg-muted text-muted-foreground">
                    NOT ENROLLED
                  </div>
                </div>

                <div className="space-y-0 mb-5 sm:mb-6">
                  {[
                    { label: 'Mint Price (Fixed)', value: '$500 USD' },
                    { label: 'Remaining', value: '21,000 (Total)' },
                    { label: 'Network', value: 'Base L2', highlight: true },
                  ].map((item, index) => (
                    <div 
                      key={item.label}
                      className={cn(
                        "flex items-center justify-between py-2.5",
                        index !== 2 && "border-b border-border/50"
                      )}
                    >
                      <span className="text-[11px] sm:text-xs text-muted-foreground">{item.label}</span>
                      <span className={cn(
                        "font-mono text-[11px] sm:text-xs font-medium",
                        item.highlight && "text-primary"
                      )}>{item.value}</span>
                    </div>
                  ))}
                  <p className="text-[9px] sm:text-[10px] text-muted-foreground pt-2">
                    Fixed at $500 USD. ETH equivalent calculated at time of mint.
                  </p>
                </div>

                <div className="mb-5 sm:mb-6 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3.5">
                  <div className="flex items-start gap-2.5">
                    <div className="h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                      <span className="text-amber-500 text-[10px] font-bold">$</span>
                    </div>
                    <div>
                      <p className="text-[11px] sm:text-xs font-medium text-amber-500">The Liquidity Trigger</p>
                      <p className="text-[10px] sm:text-[11px] text-muted-foreground mt-0.5">
                        $WOU deploys on Base DEX at <span className="text-foreground font-medium">{LIQUIDITY_TRIGGER_THRESHOLD.toLocaleString()} mints</span>. 
                        $1M raised provides deep liquidity.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  variant="sentinel" 
                  size="lg" 
                  className="w-full h-12 sm:h-14 text-sm sm:text-base"
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Connect Wallet to Mint
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
