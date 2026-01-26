import { Shirt, Footprints, Truck } from 'lucide-react';

const pillars = [
  {
    icon: Shirt,
    title: 'Underva',
    subtitle: 'Fashion',
    description: 'Luxury apparel with token-gated collections and on-chain provenance.',
  },
  {
    icon: Footprints,
    title: 'Undervastride',
    subtitle: 'Sportswear',
    description: 'Performance gear with verified authenticity and athletic NFTs.',
  },
  {
    icon: Truck,
    title: 'Underva Express',
    subtitle: 'Logistics',
    description: 'B2B supply chain and secure warehousing with full transparency.',
  },
];

export function BusinessPillars() {
  return (
    <section id="pillars" className="py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-2">
            Real-World Assets
          </h2>
          <p className="text-sm text-muted-foreground">
            Three revenue-generating verticals backing the token.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid gap-4 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition-colors"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <pillar.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold mb-0.5">{pillar.title}</h3>
              <p className="text-xs text-primary mb-3">{pillar.subtitle}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
