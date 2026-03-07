import { Shield, Check, Crown } from 'lucide-react';

export function DocOriginSentinel() {
  return (
    <div className="space-y-8">
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
        The Sentinel NFT serves as the mandatory, one-time compliance credential required to participate in the 
        ecosystem and access rewards. It acts as the "<span className="text-foreground font-medium">Bearer Instrument</span>" for 
        all rights, perks, and yield-earning capabilities within the World of Underva.
      </p>

      {/* Origin Sentinel Card */}
      <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Crown className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">Origin Sentinel</h3>
            <p className="text-xs text-primary font-medium">Founding Tier — Limited to 2,000 Units</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="rounded-lg bg-card border border-primary/10 p-3 text-center">
            <p className="text-2xl font-bold font-mono text-primary">2,000</p>
            <p className="text-xs text-muted-foreground">Total Supply</p>
          </div>
          <div className="rounded-lg bg-card border border-primary/10 p-3 text-center">
            <p className="text-2xl font-bold font-mono text-foreground">$500</p>
            <p className="text-xs text-muted-foreground">Fixed Mint Price (USD)</p>
          </div>
        </div>

        {/* Dual-Yield */}
        <div className="mb-5">
          <h4 className="text-sm font-semibold text-foreground mb-3">Dual-Yield Protocol</h4>
          <div className="space-y-2">
            <div className="flex items-start gap-2.5 rounded-lg bg-card/80 border border-primary/10 p-3">
              <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Monthly Cashback: 2.0%</p>
                <p className="text-xs text-muted-foreground">For all Sentinel NFT holders (Origin and Standard)</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 rounded-lg bg-primary/10 border border-primary/20 p-3">
              <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Loyalty Dividend: 5.0% Every 6 Months</p>
                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground">Exclusive to Origin Sentinel holders only</strong>, based on $WOU token holdings
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* VIP Status */}
        <div className="mb-5">
          <h4 className="text-sm font-semibold text-foreground mb-3">Strong Holder VIP Status</h4>
          <div className="space-y-1.5">
            {[
              '7-day early access to limited drops',
              'Governance voting rights',
              'Sentinels-Only community access',
              'Exclusive utility airdrops',
              'Early access to private auctions',
              'Private events hosted by Underva and Stride',
            ].map((perk) => (
              <div key={perk} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>{perk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lifetime Ownership */}
        <div className="rounded-lg bg-card/80 border border-primary/10 p-4">
          <h4 className="text-sm font-semibold text-foreground mb-2">Lifetime Ownership & Succession</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Mint once, benefit forever. No subscriptions. Asset is tradeable on OpenSea and Blur. 
            Includes priority "Express" shipment processing.
          </p>
        </div>
      </div>
    </div>
  );
}
