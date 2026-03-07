import { Shield, Check } from 'lucide-react';

export function DocStandardSentinel() {
  return (
    <div className="space-y-8">
      {/* Standard Sentinel Card */}
      <div className="rounded-xl border border-primary/10 bg-card p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">Standard Sentinel</h3>
            <p className="text-xs text-muted-foreground font-medium">Community Tier — 19,000 Units</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="rounded-lg bg-secondary/30 border border-primary/10 p-3 text-center">
            <p className="text-2xl font-bold font-mono text-foreground">19,000</p>
            <p className="text-xs text-muted-foreground">Total Supply</p>
          </div>
          <div className="rounded-lg bg-secondary/30 border border-primary/10 p-3 text-center">
            <p className="text-2xl font-bold font-mono text-foreground">$500</p>
            <p className="text-xs text-muted-foreground">Fixed Mint Price (USD)</p>
          </div>
        </div>

        {/* Yield */}
        <div className="mb-5">
          <h4 className="text-sm font-semibold text-foreground mb-3">Dual-Yield Protocol</h4>
          <div className="flex items-start gap-2.5 rounded-lg bg-secondary/30 border border-primary/10 p-3">
            <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Monthly Cashback: 2.0%</p>
              <p className="text-xs text-muted-foreground">For all Sentinel NFT holders</p>
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
        <div className="rounded-lg bg-secondary/30 border border-primary/10 p-4">
          <h4 className="text-sm font-semibold text-foreground mb-2">Lifetime Ownership & Succession</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Mint once, benefit forever. No subscriptions. Asset is tradeable on OpenSea and Blur. 
            Includes priority "Express" shipment processing.
          </p>
        </div>
      </div>

      {/* Comparison Note */}
      <div className="rounded-xl border border-primary/10 bg-secondary/20 p-5">
        <h4 className="text-sm font-semibold text-foreground mb-3">Origin vs Standard Comparison</h4>
        <div className="rounded-lg border border-primary/10 bg-card overflow-hidden">
          <div className="grid grid-cols-3 gap-0 text-center">
            <div className="p-3 border-b border-r border-primary/10 bg-secondary/30">
              <span className="text-xs font-medium text-muted-foreground">Feature</span>
            </div>
            <div className="p-3 border-b border-r border-primary/10 bg-primary/5">
              <span className="text-xs font-medium text-primary">Origin</span>
            </div>
            <div className="p-3 border-b border-primary/10 bg-secondary/30">
              <span className="text-xs font-medium text-foreground">Standard</span>
            </div>

            {[
              { feature: 'Supply', origin: '2,000', standard: '19,000' },
              { feature: 'Monthly Cashback', origin: '2.0%', standard: '2.0%' },
              { feature: 'Loyalty Dividend', origin: '5.0% / 6mo', standard: '—' },
              { feature: 'VIP Status', origin: '✓', standard: '✓' },
              { feature: 'Governance Rights', origin: '✓', standard: '✓' },
            ].map((row, i) => (
              <div key={row.feature} className="contents">
                <div className={`p-2.5 border-r border-primary/10 ${i < 4 ? 'border-b border-primary/5' : ''}`}>
                  <span className="text-xs text-muted-foreground">{row.feature}</span>
                </div>
                <div className={`p-2.5 border-r border-primary/10 bg-primary/5 ${i < 4 ? 'border-b border-primary/5' : ''}`}>
                  <span className="text-xs font-mono font-medium text-foreground">{row.origin}</span>
                </div>
                <div className={`p-2.5 ${i < 4 ? 'border-b border-primary/5' : ''}`}>
                  <span className="text-xs font-mono font-medium text-foreground">{row.standard}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
