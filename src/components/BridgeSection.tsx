import { ArrowRightLeft, Shield, Zap, Clock, ChevronRight } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal';
import { cn } from '@/lib/utils';

const bridgeOptions = [
  {
    name: 'Base Bridge',
    description: 'Official native bridge',
    time: '~7 days',
    icon: Shield,
    url: 'https://superbridge.app/base',
  },
  {
    name: 'Across Protocol',
    description: 'Fast cross-chain transfers',
    time: '~2-10 min',
    icon: Zap,
    url: 'https://app.across.to/bridge-and-swap',
  },
  {
    name: 'Stargate Finance',
    description: 'Omnichain liquidity',
    time: '~1-5 min',
    icon: ArrowRightLeft,
    url: 'https://stargate.finance/',
  },
];

export function BridgeSection() {
  return (
    <section id="bridge" className="py-16 sm:py-20 lg:py-24 border-t border-border bg-card/20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-3xl font-semibold tracking-tight mb-3">
            Bridge
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Transfer $WOU between Ethereum L1 and Base L2.
          </p>
        </ScrollReveal>

        {/* Network Indicator */}
        <ScrollReveal delay={0.1} className="flex items-center justify-center gap-4 mb-10 sm:mb-12">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-amber-500" />
            <span className="text-sm text-muted-foreground">Ethereum L1</span>
          </div>
          <ArrowRightLeft className="h-4 w-4 text-primary" />
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Base L2</span>
          </div>
        </ScrollReveal>

        {/* Bridge Options */}
        <StaggerContainer className="grid gap-4 sm:gap-5 sm:grid-cols-2 md:grid-cols-3 max-w-4xl mx-auto" staggerDelay={0.1}>
          {bridgeOptions.map((bridge) => (
            <StaggerItem key={bridge.name}>
              <a
                href={bridge.url}
                className={cn(
                  "glass-card p-5 sm:p-6 flex items-center sm:block gap-4 sm:gap-0",
                  "hover:border-primary/50 transition-all duration-300 group active:scale-[0.98]"
                )}
              >
                <div className="flex items-start justify-between sm:mb-4">
                  <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <bridge.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <ChevronRight className="hidden sm:block h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base text-foreground sm:mb-1.5">{bridge.name}</h3>
                  <p className="text-sm text-muted-foreground sm:mb-4">{bridge.description}</p>
                  
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground mt-1.5 sm:mt-0">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{bridge.time}</span>
                  </div>
                </div>

                <ChevronRight className="sm:hidden h-5 w-5 text-muted-foreground group-hover:text-primary shrink-0" />
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}