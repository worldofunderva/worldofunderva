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
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <ScrollReveal className="text-center mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-2">
            Bridge
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Transfer $WOU between Ethereum L1 and Base L2.
          </p>
        </ScrollReveal>

        {/* Network Indicator */}
        <ScrollReveal delay={0.1} className="flex items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-amber-500" />
            <span className="text-xs sm:text-sm text-muted-foreground">Ethereum L1</span>
          </div>
          <ArrowRightLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-primary" />
            <span className="text-xs sm:text-sm text-muted-foreground">Base L2</span>
          </div>
        </ScrollReveal>

        {/* Bridge Options */}
        <StaggerContainer className="grid gap-3 sm:gap-4 sm:grid-cols-2 md:grid-cols-3 max-w-4xl mx-auto" staggerDelay={0.1}>
          {bridgeOptions.map((bridge) => (
            <StaggerItem key={bridge.name}>
              <a
                href={bridge.url}
                className={cn(
                  "glass-card p-4 sm:p-5 flex items-center sm:block gap-3 sm:gap-0",
                  "hover:border-primary/50 transition-all duration-300 group active:scale-[0.98]"
                )}
              >
                <div className="flex items-start justify-between sm:mb-3">
                  <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <bridge.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <ChevronRight className="hidden sm:block h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base text-foreground sm:mb-1">{bridge.name}</h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground sm:mb-3">{bridge.description}</p>
                  
                  <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-muted-foreground mt-1 sm:mt-0">
                    <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
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