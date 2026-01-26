import { ArrowRightLeft, Shield, Zap, Clock, ChevronRight } from 'lucide-react';

const bridgeOptions = [
  {
    name: 'Base Bridge',
    time: '~7 days',
    icon: Shield,
    url: '#',
  },
  {
    name: 'Across',
    time: '~2-10 min',
    icon: Zap,
    url: '#',
  },
  {
    name: 'Stargate',
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
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-3">
            Bridge
          </h2>
          <p className="text-muted-foreground text-sm">
            Transfer $WOU between Ethereum L1 and Base L2.
          </p>
        </div>

        {/* Network Indicator */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-amber-500" />
            <span className="text-sm text-muted-foreground">ETH L1</span>
          </div>
          <ArrowRightLeft className="h-4 w-4 text-primary" />
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Base L2</span>
          </div>
        </div>

        {/* Bridge Options */}
        <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
          {bridgeOptions.map((bridge) => (
            <a
              key={bridge.name}
              href={bridge.url}
              className="glass-card px-5 py-4 flex items-center gap-4 hover:border-primary/50 transition-colors group"
            >
              <bridge.icon className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-foreground text-sm">{bridge.name}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{bridge.time}</span>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
