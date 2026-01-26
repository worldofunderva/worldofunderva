import { Lock, Database, Users, Wallet, Building } from 'lucide-react';
import { cn } from '@/lib/utils';

const distributions = [
  { label: 'RWA Engagement Pool', percentage: 35, icon: Database, color: 'bg-primary' },
  { label: 'DEX Liquidity', percentage: 30, icon: Wallet, color: 'bg-cyan-500' },
  { label: 'Core Team', percentage: 15, icon: Users, color: 'bg-violet-500', locked: true },
  { label: 'Ecosystem', percentage: 15, icon: Building, color: 'bg-emerald-500' },
  { label: 'Treasury', percentage: 5, icon: Lock, color: 'bg-amber-500' },
];

export function TokenomicsSection() {
  return (
    <section id="tokenomics" className="py-20 lg:py-24 bg-card/30">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-2">
            Token Distribution
          </h2>
          <p className="text-sm text-muted-foreground">
            21,000,000 fixed supply · Zero inflation · Zero tax
          </p>
        </div>

        {/* Visual Bar */}
        <div className="mb-8">
          <div className="h-3 rounded-full overflow-hidden flex">
            {distributions.map((item) => (
              <div
                key={item.label}
                className={cn("h-full", item.color)}
                style={{ width: `${item.percentage}%` }}
              />
            ))}
          </div>
        </div>

        {/* Distribution Grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {distributions.map((item) => (
            <div key={item.label} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={cn("h-2 w-2 rounded-full", item.color)} />
                <span className="font-mono text-xl font-bold">{item.percentage}%</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {item.label}
                {item.locked && <span className="text-amber-500 ml-1">(2Y Lock)</span>}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
