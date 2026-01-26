import { ArrowRightLeft, Shield, Zap, Clock, ChevronRight } from 'lucide-react';

const bridgeOptions = [
  {
    name: 'Base Bridge',
    description: 'Official native bridge',
    time: '~7 days',
    icon: Shield,
    url: '#',
  },
  {
    name: 'Across Protocol',
    description: 'Fast cross-chain transfers',
    time: '~2-10 min',
    icon: Zap,
    url: '#',
  },
  {
    name: 'Stargate Finance',
    description: 'Omnichain liquidity',
    time: '~1-5 min',
    icon: ArrowRightLeft,
    url: '#',
  },
];

export function BridgeSection() {
  return (
    <section id="bridge" className="py-16 lg:py-20 border-t border-border bg-card/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-2">
            Bridge
          </h2>
          <p className="text-sm text-muted-foreground">
            Transfer $WOU between Ethereum L1 and Base L2.
          </p>
        </div>

        {/* Network Indicator */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-amber-500" />
            <span className="text-sm text-muted-foreground">Ethereum L1</span>
          </div>
          <ArrowRightLeft className="h-4 w-4 text-primary" />
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Base L2</span>
          </div>
        </div>

        {/* Bridge Options */}
        <div className="grid gap-4 md:grid-cols-3 max-w-4xl mx-auto">
          {bridgeOptions.map((bridge) => (
            <a
              key={bridge.name}
              href={bridge.url}
              className="glass-card p-5 group hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <bridge.icon className="h-5 w-5 text-primary" />
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
              
              <h3 className="font-semibold text-foreground mb-1">{bridge.name}</h3>
              <p className="text-xs text-muted-foreground mb-3">{bridge.description}</p>
              
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{bridge.time}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
