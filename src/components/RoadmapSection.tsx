import { CheckCircle2, Circle, Rocket, Shirt, Footprints, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal';

const phases = [
  {
    phase: 'Phase 1',
    title: 'The Enrollment Era',
    timeline: '2026–2028',
    status: 'active',
    icon: Rocket,
    milestones: [
      '$WOU Launch on ETH L1 & Base L2',
      'Sentinel NFT Minting',
      'Treasury & LP Establishment',
    ],
  },
  {
    phase: 'Phase 2',
    title: 'The Luxury Expansion',
    timeline: '2029–2031',
    status: 'upcoming',
    icon: Shirt,
    milestones: [
      'Underva Launch',
      'Cashback Engine Activation',
      'Token-gated Collections',
    ],
  },
  {
    phase: 'Phase 3',
    title: 'The Performance Era',
    timeline: '2032–2034',
    status: 'upcoming',
    icon: Footprints,
    milestones: [
      'Underva Stride Launch',
      'Mass Velocity Expansion',
      'Base L2 Optimization',
    ],
  },
  {
    phase: 'Phase 4',
    title: 'The Global Infrastructure Era',
    timeline: '2035+',
    status: 'upcoming',
    icon: Truck,
    milestones: [
      'Underva Express Launch',
      'B2B Logistics & Strong Holder Tiers',
      'Complete RWA Ecosystem',
    ],
  },
];

export function RoadmapSection() {
  return (
    <section id="roadmap" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-sm font-medium text-primary mb-3">STRATEGIC TIMELINE</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4">
            The Decade of Discipline
          </h2>
          <p className="text-lg text-muted-foreground">
            A disciplined, multi-year roadmap for complete vertical integration.
          </p>
        </ScrollReveal>

        {/* Horizontal Timeline Chart */}
        <div className="relative">
          {/* Horizontal Progress Line - Desktop only */}
          <ScrollReveal delay={0.2} className="hidden md:block absolute top-[60px] left-0 right-0 h-1 bg-border rounded-full">
            <div 
              className="h-full bg-gradient-to-r from-primary via-primary to-primary/30 rounded-full"
              style={{ width: '25%' }}
            />
          </ScrollReveal>

          {/* Phase Cards */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6" staggerDelay={0.15}>
            {phases.map((phase) => (
              <StaggerItem key={phase.phase} className="relative">
                {/* Node on timeline - Desktop only */}
                <div className="hidden md:flex justify-center mb-8">
                  <div
                    className={cn(
                      "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 transition-all",
                      phase.status === 'active'
                        ? "bg-primary border-primary/50 shadow-[0_0_20px_hsl(212_100%_48%/0.4)]"
                        : "bg-card border-border"
                    )}
                  >
                    <phase.icon className={cn(
                      "h-4 w-4",
                      phase.status === 'active' ? "text-primary-foreground" : "text-muted-foreground"
                    )} />
                  </div>
                </div>

                {/* Card */}
                <div
                  className={cn(
                    "group h-full rounded-xl border bg-card p-4 sm:p-5 transition-all duration-300",
                    phase.status === 'active'
                      ? "border-primary/50 sentinel-glow"
                      : "border-border hover:border-primary/30"
                  )}
                >
                  {/* Mobile/Tablet Icon & Header */}
                  <div className="md:hidden flex items-center gap-3 mb-4">
                    <div
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                        phase.status === 'active'
                          ? "bg-primary"
                          : "bg-secondary"
                      )}
                    >
                      <phase.icon className={cn(
                        "h-4 w-4",
                        phase.status === 'active' ? "text-primary-foreground" : "text-muted-foreground"
                      )} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-mono text-primary">{phase.phase}</span>
                        {phase.status === 'active' && (
                          <span className="flex items-center gap-1 text-xs text-primary">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{phase.timeline}</p>
                    </div>
                  </div>

                  {/* Desktop Header */}
                  <div className="hidden md:block mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono font-medium text-primary uppercase tracking-wider">
                        {phase.phase}
                      </span>
                      {phase.status === 'active' && (
                        <span className="flex items-center gap-1 text-xs text-primary">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{phase.timeline}</p>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-semibold mb-3 md:mb-4">{phase.title}</h3>

                  {/* Milestones */}
                  <ul className="space-y-2">
                    {phase.milestones.map((milestone, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs text-muted-foreground"
                      >
                        {phase.status === 'active' ? (
                          <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 text-primary shrink-0" />
                        ) : (
                          <Circle className="h-3.5 w-3.5 mt-0.5 text-border shrink-0" />
                        )}
                        <span className="leading-relaxed">{milestone}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Legend */}
        <ScrollReveal delay={0.5} className="mt-12 flex flex-wrap justify-center gap-4 sm:gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary" />
            <span>In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full border border-border bg-card" />
            <span>Upcoming</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
