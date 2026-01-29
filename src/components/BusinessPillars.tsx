import { Shirt, Footprints, Truck, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const pillars = [
  {
    icon: Shirt,
    title: 'Underva',
    subtitle: 'Fashion Division',
    description: 'Luxury apparel and token-gated collections. Exclusive access to limited-edition fashion lines powered by blockchain authentication.',
    features: ['Token-Gated Access', 'Limited Collections', 'Digital Provenance'],
    gradient: 'from-violet-500/20 to-primary/20',
  },
  {
    icon: Footprints,
    title: 'Underva Stride',
    subtitle: 'Sportswear Division',
    description: 'High-velocity performance gear engineered for elite athletes. Every piece verified on-chain for authenticity and ownership.',
    features: ['Performance Tracking', 'Athletic NFTs', 'Verified Authentic'],
    gradient: 'from-primary/20 to-cyan-500/20',
  },
  {
    icon: Truck,
    title: 'Underva Express',
    subtitle: 'Logistics Division',
    description: 'B2B supply chain solutions and secure warehousing. Enterprise-grade logistics with full on-chain transparency.',
    features: ['B2B Supply Chain', 'Secure Warehousing', 'Chain Transparency'],
    gradient: 'from-cyan-500/20 to-emerald-500/20',
  },
];

export function BusinessPillars() {
  return (
    <section id="pillars" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-sm font-medium text-primary mb-3">RWA ECOSYSTEM</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4">
            The Business Pillars
          </h2>
          <p className="text-lg text-muted-foreground">
            Three verticals. One unified token economy. Complete institutional coverage.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className={cn(
                "group relative rounded-2xl border border-border bg-card p-8 transition-all duration-300",
                "hover:border-primary/50 hover:sentinel-glow"
              )}
            >
              {/* Gradient Background */}
              <div className={cn(
                "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                `bg-gradient-to-br ${pillar.gradient}`
              )} />

              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <pillar.icon className="h-7 w-7" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-1">{pillar.title}</h3>
                <p className="text-sm text-primary mb-4">{pillar.subtitle}</p>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  {pillar.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {pillar.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Learn More Link */}
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-all group-hover:gap-2"
                >
                  Explore Division
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bridge Mention */}
        <div className="mt-16 rounded-2xl border border-border bg-card/50 p-8 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-3 w-3 rounded-full bg-amber-500" />
            <span className="text-xs font-medium text-muted-foreground">CROSS-CHAIN INFRASTRUCTURE</span>
            <div className="h-3 w-3 rounded-full bg-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Burn-and-Mint Bridge</h3>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Seamlessly transfer between <span className="text-foreground font-medium">Ethereum L1</span> (Security) 
            and <span className="text-foreground font-medium">Base L2</span> (Velocity) with our institutional-grade bridge protocol.
          </p>
        </div>
      </div>
    </section>
  );
}
