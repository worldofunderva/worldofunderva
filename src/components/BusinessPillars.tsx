import { Shirt, Footprints, Truck, ArrowUpRight, CreditCard, Coins } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal';

const pillars = [
  {
    icon: Shirt,
    title: 'Underva',
    subtitle: 'Fashion Division',
    description: 'Luxury apparel and token-gated collections. Exclusive access to limited-edition fashion lines powered by blockchain authentication.',
    features: ['Token-Gated Access', 'Limited Collections', 'Digital Provenance'],
    gradient: 'from-violet-500/20 to-primary/20',
    url: 'https://underva.com/',
  },
  {
    icon: Footprints,
    title: 'Underva Stride',
    subtitle: 'Sportswear Division',
    description: 'High-velocity performance gear engineered for elite athletes. Every piece verified on-chain for authenticity and ownership.',
    features: ['Performance Tracking', 'Verified Authentic'],
    gradient: 'from-primary/20 to-cyan-500/20',
    url: 'https://undervastride.com/',
  },
  {
    icon: Truck,
    title: 'Underva Express',
    subtitle: 'Logistics Division',
    description: 'B2B supply chain solutions and secure warehousing. Enterprise-grade logistics with full on-chain transparency.',
    features: ['B2B Supply Chain', 'Secure Warehousing', 'Chain Transparency'],
    gradient: 'from-cyan-500/20 to-emerald-500/20',
    url: 'https://undervaexpress.com/',
  },
];

export function BusinessPillars() {
  return (
    <section id="pillars" className="relative py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="mx-auto max-w-2xl text-center mb-10 sm:mb-16">
          <p className="text-xs sm:text-sm font-medium text-primary mb-2 sm:mb-3">RWA ECOSYSTEM</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight mb-3 sm:mb-4">
            The Business Pillars
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground px-2">
            Three verticals. One unified token economy. Complete institutional coverage.
          </p>
        </ScrollReveal>

        {/* Pillars Grid */}
        <StaggerContainer className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.15}>
          {pillars.map((pillar) => (
            <StaggerItem key={pillar.title}>
              <div
                className={cn(
                  "group relative rounded-xl sm:rounded-2xl border border-border bg-card p-5 sm:p-6 lg:p-8 transition-all duration-300 h-full",
                  "hover:border-primary/50 hover:sentinel-glow active:scale-[0.98]"
                )}
              >
                {/* Gradient Background */}
                <div className={cn(
                  "absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                  `bg-gradient-to-br ${pillar.gradient}`
                )} />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-4 sm:mb-6 inline-flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-lg sm:rounded-xl bg-primary/10 text-primary">
                    <pillar.icon className="h-5 w-5 sm:h-7 sm:w-7" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-semibold mb-0.5 sm:mb-1">{pillar.title}</h3>
                  <p className="text-xs sm:text-sm text-primary mb-3 sm:mb-4">{pillar.subtitle}</p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                    {pillar.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                    {pillar.features.map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full bg-secondary px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-secondary-foreground"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Learn More Link */}
                  <a
                    href={pillar.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-primary transition-all group-hover:gap-2"
                  >
                    Explore Division
                    <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </a>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Hybrid Payment Integration */}
        <ScrollReveal delay={0.3} className="mt-10 sm:mt-16 rounded-xl sm:rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                <Coins className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                <span className="text-[10px] sm:text-xs font-medium text-primary uppercase tracking-wider">HYBRID PAYMENT INTEGRATION</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Pay Your Way</h3>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
                Purchase products across all pillars using <span className="text-foreground font-medium">local currency via Stripe</span> or 
                <span className="text-foreground font-medium"> $WOU crypto</span>. Full accessibility for all users while maintaining 
                $WOU as the premium Corporate Tender for reward eligibility.
              </p>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-end gap-2 sm:gap-3">
              <span className="rounded-full bg-card border border-border px-3 py-1.5 text-[10px] sm:text-xs font-medium">
                Stripe Integration
              </span>
              <span className="rounded-full bg-card border border-border px-3 py-1.5 text-[10px] sm:text-xs font-medium">
                $WOU Payments
              </span>
              <span className="rounded-full bg-primary/20 border border-primary/30 px-3 py-1.5 text-[10px] sm:text-xs font-medium text-primary">
                2.0% Cashback on $WOU
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Bridge Mention */}
        <ScrollReveal delay={0.4} className="mt-6 sm:mt-8 rounded-xl sm:rounded-2xl border border-border bg-card/50 p-5 sm:p-8 text-center">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-amber-500" />
            <span className="text-[10px] sm:text-xs font-medium text-muted-foreground">CROSS-CHAIN INFRASTRUCTURE</span>
            <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-primary" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">Burn-and-Mint Bridge</h3>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto">
            Seamlessly transfer between <span className="text-foreground font-medium">Ethereum L1</span> (Security) 
            and <span className="text-foreground font-medium">Base L2</span> (Velocity) with our institutional-grade bridge protocol.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
