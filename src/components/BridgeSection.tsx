import { ArrowRightLeft, Shield, Zap, Clock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const bridgeOptions = [
  {
    name: 'Official Base Bridge',
    description: 'Native Ethereum to Base bridge with maximum security',
    time: '~7 days withdrawal',
    icon: Shield,
    recommended: true,
    url: '#',
  },
  {
    name: 'Across Protocol',
    description: 'Fast cross-chain bridge with competitive fees',
    time: '~2-10 minutes',
    icon: Zap,
    recommended: false,
    url: '#',
  },
  {
    name: 'Stargate Finance',
    description: 'Omnichain liquidity transport protocol',
    time: '~1-5 minutes',
    icon: ArrowRightLeft,
    recommended: false,
    url: '#',
  },
];

export function BridgeSection() {
  return (
    <section id="bridge" className="py-20 lg:py-28 border-t border-border bg-card/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-primary/10 text-primary rounded-full mb-4">
            Cross-Chain Infrastructure
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Burn-and-Mint Bridge
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Seamlessly transfer $WOU between Ethereum L1 (Security) and Base L2 (Velocity). 
            Choose your preferred bridge based on speed and security requirements.
          </p>
        </div>

        {/* Network Visualization */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="glass-card px-6 py-4 text-center">
            <div className="h-3 w-3 rounded-full bg-amber-500 mx-auto mb-2" />
            <p className="font-semibold text-foreground">Ethereum L1</p>
            <p className="text-xs text-muted-foreground">Security Layer</p>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="h-px w-8 bg-border" />
            <ArrowRightLeft className="h-5 w-5 text-primary" />
            <div className="h-px w-8 bg-border" />
          </div>
          
          <div className="glass-card px-6 py-4 text-center">
            <div className="h-3 w-3 rounded-full bg-primary mx-auto mb-2" />
            <p className="font-semibold text-foreground">Base L2</p>
            <p className="text-xs text-muted-foreground">Velocity Layer</p>
          </div>
        </div>

        {/* Bridge Options */}
        <div className="grid gap-4 md:grid-cols-3 max-w-4xl mx-auto">
          {bridgeOptions.map((bridge) => (
            <a
              key={bridge.name}
              href={bridge.url}
              className="glass-card p-6 group hover:border-primary/50 transition-all duration-300 relative"
            >
              {bridge.recommended && (
                <span className="absolute -top-2 -right-2 px-2 py-0.5 text-[10px] font-semibold uppercase bg-primary text-primary-foreground rounded-full">
                  Recommended
                </span>
              )}
              
              <div className="flex items-start justify-between mb-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <bridge.icon className="h-5 w-5 text-primary" />
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
              
              <h3 className="font-semibold text-foreground mb-2">{bridge.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{bridge.description}</p>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{bridge.time}</span>
              </div>
            </a>
          ))}
        </div>

        {/* Bridge CTA */}
        <div className="text-center mt-10">
          <p className="text-sm text-muted-foreground mb-4">
            Need help bridging? Check our step-by-step guide.
          </p>
          <Button variant="sentinel-outline" className="gap-2">
            View Bridge Tutorial
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
