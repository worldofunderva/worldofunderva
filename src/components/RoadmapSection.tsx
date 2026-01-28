import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const phases = [
  {
    phase: 'Phase 1',
    title: 'The Enrollment Protocol',
    timeline: 'Immediate',
    status: 'active',
    milestones: [
      'Launch of $WOU on Ethereum L1 (Security) and Base L2 (Commerce)',
      'Deployment of The Sentinel NFT: The mandatory "Hard Gate" for all ecosystem benefits',
      'Establishment of the General Corporate Treasury and LP provisioning',
    ],
  },
  {
    phase: 'Phase 2',
    title: 'Luxury Vertical Integration',
    timeline: 'Years 2-3',
    status: 'upcoming',
    milestones: [
      'Launch of Underva (Fashion)',
      'Activation of the Automatic 2.0% Consumption Cashback engine for fashion retail',
      'Token-gated access for "Sentinel" holders to exclusive apparel collections',
    ],
  },
  {
    phase: 'Phase 3',
    title: 'Performance & Velocity Expansion',
    timeline: 'Years 5-6',
    status: 'upcoming',
    milestones: [
      'Launch of Undervastride (Sportswear)',
      'Expansion of the $WOU tender to high-volume performance gear',
      'Optimization of the Base L2 commerce layer for high-cadence transactions',
    ],
  },
  {
    phase: 'Phase 4',
    title: 'Global Infrastructure & Logistics',
    timeline: 'Years 8-9',
    status: 'upcoming',
    milestones: [
      'Launch of Underva Express (Logistics)',
      'Activation of Strong Holder Status for B2B service tiers and priority routing',
      'Completion of the vertically integrated RWA ecosystem',
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
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-sm font-medium text-primary mb-3">STRATEGIC TIMELINE</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4">
            The Long-Term Protocol
          </h2>
          <p className="text-lg text-muted-foreground">
            A disciplined, multi-year roadmap for complete vertical integration.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line - Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary to-primary/50" />

          <div className="space-y-12 lg:space-y-0">
            {phases.map((phase, index) => (
              <div
                key={phase.phase}
                className={cn(
                  "relative lg:grid lg:grid-cols-2 lg:gap-12",
                  index !== phases.length - 1 && "lg:pb-16"
                )}
              >
                {/* Timeline Node - Desktop */}
                <div className="hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2 z-10">
                  <div
                    className={cn(
                      "h-4 w-4 rounded-full border-2",
                      phase.status === 'active'
                        ? "bg-primary border-primary animate-pulse"
                        : "bg-background border-border"
                    )}
                  />
                </div>

                {/* Content - Alternating sides */}
                <div
                  className={cn(
                    "lg:text-right",
                    index % 2 === 1 && "lg:col-start-2 lg:text-left"
                  )}
                >
                  {index % 2 === 0 && (
                    <PhaseCard phase={phase} alignment="right" />
                  )}
                </div>

                <div
                  className={cn(
                    index % 2 === 0 && "lg:col-start-2"
                  )}
                >
                  {index % 2 === 1 && (
                    <PhaseCard phase={phase} alignment="left" />
                  )}
                </div>

                {/* Mobile Layout */}
                <div className="lg:hidden">
                  <PhaseCard phase={phase} alignment="left" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card/50 px-6 py-3">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">
              Currently executing <span className="text-foreground">Phase 1</span> milestones
            </span>
            <ArrowRight className="h-4 w-4 text-primary" />
          </div>
        </div>
      </div>
    </section>
  );
}

function PhaseCard({
  phase,
  alignment,
}: {
  phase: typeof phases[0];
  alignment: 'left' | 'right';
}) {
  return (
    <div
      className={cn(
        "group rounded-2xl border border-border bg-card p-6 sm:p-8 transition-all duration-300",
        "hover:border-primary/50 hover:sentinel-glow",
        phase.status === 'active' && "border-primary/30 sentinel-glow"
      )}
    >
      {/* Phase Header */}
      <div className={cn("flex items-center gap-3 mb-4", alignment === 'right' && "lg:justify-end")}>
        <span className="text-xs font-mono font-medium text-primary uppercase tracking-wider">
          {phase.phase}
        </span>
        <span className="h-1 w-1 rounded-full bg-border" />
        <span className="text-xs font-medium text-muted-foreground">
          {phase.timeline}
        </span>
        {phase.status === 'active' && (
          <>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span className="text-xs font-medium text-primary">Active</span>
          </>
        )}
      </div>

      {/* Title */}
      <h3 className={cn("text-xl font-semibold mb-4", alignment === 'right' && "lg:text-right")}>
        {phase.title}
      </h3>

      {/* Milestones */}
      <ul className="space-y-3">
        {phase.milestones.map((milestone, i) => (
          <li
            key={i}
            className={cn(
              "flex items-start gap-3 text-sm text-muted-foreground",
              alignment === 'right' && "lg:flex-row-reverse lg:text-right"
            )}
          >
            {phase.status === 'active' ? (
              <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary shrink-0" />
            ) : (
              <Circle className="h-4 w-4 mt-0.5 text-border shrink-0" />
            )}
            <span className="leading-relaxed">{milestone}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
