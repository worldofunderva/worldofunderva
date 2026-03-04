import { CheckCircle2, Circle, Shield, Shirt, Footprints, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal';
import { useMemo } from 'react';

interface Phase {
  phase: string;
  title: string;
  timeline: string;
  startYear: number;
  endYear: number | null;
  icon: typeof Shield;
  milestones: string[];
}

const phases: Phase[] = [
  {
    phase: 'Phase 1',
    title: 'The Enrollment Era',
    timeline: '2026–2028',
    startYear: 2026,
    endYear: 2028,
    icon: Shield,
    milestones: [
      'Launch of $500 Sentinel NFT on Base',
      '$WOU token deploys upon 2,000th mint',
      'Locked liquidity from $1M initial raise',
      'Community building & technical enrollment',
    ],
  },
  {
    phase: 'Phase 2',
    title: 'The Expansion Era',
    timeline: '2029–2031',
    startYear: 2029,
    endYear: 2031,
    icon: Shirt,
    milestones: [
      'Underva Fashion Launch',
      'Hybrid Payment Integration (Stripe + $WOU)',
      'Dual-Yield engine activation',
      'Token-gated collections',
    ],
  },
  {
    phase: 'Phase 3',
    title: 'The Performance Era',
    timeline: '2032–2034',
    startYear: 2032,
    endYear: 2034,
    icon: Footprints,
    milestones: [
      'Underva Stride Sportswear Launch',
      'Base L2 velocity optimization',
      'Extended ecosystem rewards',
      'Global athlete partnerships',
    ],
  },
  {
    phase: 'Phase 4',
    title: 'The Infrastructure Era',
    timeline: '2035+',
    startYear: 2035,
    endYear: null,
    icon: Truck,
    milestones: [
      'Underva Express logistics launch',
      '$WOU as "Corporate Tender" for B2B',
      'Global supply chain integration',
      'Complete RWA ecosystem maturity',
    ],
  },
];

function getPhaseStatus(phase: Phase, currentYear: number): 'completed' | 'active' | 'upcoming' {
  if (currentYear < phase.startYear) return 'upcoming';
  if (phase.endYear === null) return 'active';
  if (currentYear >= phase.startYear && currentYear <= phase.endYear) return 'active';
  if (currentYear > phase.endYear) return 'completed';
  return 'upcoming';
}

function getProgressWidth(currentYear: number): string {
  const phaseIndex = phases.findIndex(phase => {
    if (phase.endYear === null) return currentYear >= phase.startYear;
    return currentYear >= phase.startYear && currentYear <= phase.endYear;
  });
  if (phaseIndex === -1) return '0%';
  const phase = phases[phaseIndex];
  const baseProgress = (phaseIndex / phases.length) * 100;
  if (phase.endYear === null) return '100%';
  const yearsInPhase = phase.endYear - phase.startYear + 1;
  const yearsCompleted = currentYear - phase.startYear + 1;
  const phaseProgress = (yearsCompleted / yearsInPhase) * (100 / phases.length);
  return `${Math.min(baseProgress + phaseProgress, 100)}%`;
}

export function RoadmapSection() {
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const progressWidth = useMemo(() => getProgressWidth(currentYear), [currentYear]);
  
  const phasesWithStatus = useMemo(() => 
    phases.map(phase => ({
      ...phase,
      status: getPhaseStatus(phase, currentYear),
    })),
    [currentYear]
  );

  return (
    <section id="roadmap" className="relative py-20 sm:py-28 lg:py-36 overflow-hidden bg-secondary/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        {/* Section Header */}
        <ScrollReveal className="mx-auto max-w-3xl text-center mb-10 sm:mb-16">
          <p className="text-xs sm:text-sm font-medium text-primary mb-2 sm:mb-3 tracking-widest">STRATEGIC TIMELINE</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight mb-3 sm:mb-4">
            The Decade of Discipline
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
            A disciplined, multi-year roadmap for complete vertical integration.
          </p>
        </ScrollReveal>

        {/* Horizontal Timeline Chart */}
        <div className="relative">
          {/* Horizontal Progress Line - Desktop only */}
          <ScrollReveal delay={0.2} className="hidden lg:block absolute top-[60px] left-0 right-0 h-1 bg-primary/10 rounded-full">
            <div 
              className="h-full bg-gradient-to-r from-primary via-primary to-primary/30 rounded-full transition-all duration-500"
              style={{ width: progressWidth }}
            />
          </ScrollReveal>

          {/* Phase Cards */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6" staggerDelay={0.15}>
            {phasesWithStatus.map((phase) => (
              <StaggerItem key={phase.phase} className="relative">
                {/* Node on timeline - Desktop only */}
                <div className="hidden lg:flex justify-center mb-8">
                  <div
                    className={cn(
                      "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 transition-all",
                      phase.status === 'completed'
                        ? "bg-success border-success/50 shadow-[0_0_15px_hsl(142_72%_45%/0.3)]"
                        : phase.status === 'active'
                          ? "bg-primary border-primary/50 shadow-[0_0_20px_hsl(212_100%_48%/0.4)]"
                          : "bg-card border-primary/10"
                    )}
                  >
                    <phase.icon className={cn(
                      "h-4 w-4",
                      phase.status === 'completed' || phase.status === 'active' 
                        ? "text-primary-foreground" 
                        : "text-muted-foreground"
                    )} />
                  </div>
                </div>

                {/* Card */}
                <div
                  className={cn(
                    "group h-full rounded-lg sm:rounded-xl border bg-card p-4 sm:p-5 transition-all duration-300",
                    phase.status === 'completed'
                      ? "border-success/30 bg-success/5"
                      : phase.status === 'active'
                        ? "border-primary/30 sentinel-glow"
                        : "border-primary/10 hover:border-primary/20"
                  )}
                >
                  {/* Mobile/Tablet Icon & Header */}
                  <div className="lg:hidden flex items-center gap-3 mb-3 sm:mb-4">
                    <div
                      className={cn(
                        "flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full",
                        phase.status === 'completed'
                          ? "bg-success"
                          : phase.status === 'active'
                            ? "bg-primary"
                            : "bg-secondary"
                      )}
                    >
                      <phase.icon className={cn(
                        "h-4 w-4",
                        phase.status === 'completed' || phase.status === 'active' 
                          ? "text-primary-foreground" 
                          : "text-muted-foreground"
                      )} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] sm:text-xs font-mono text-primary">{phase.phase}</span>
                        {phase.status === 'completed' && (
                          <span className="flex items-center gap-1 text-[10px] sm:text-xs text-success">
                            <CheckCircle2 className="h-3 w-3" />
                            Complete
                          </span>
                        )}
                        {phase.status === 'active' && (
                          <span className="flex items-center gap-1 text-[10px] sm:text-xs text-primary">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">{phase.timeline}</p>
                    </div>
                  </div>

                  {/* Desktop Header */}
                  <div className="hidden lg:block mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono font-medium text-primary uppercase tracking-wider">
                        {phase.phase}
                      </span>
                      {phase.status === 'completed' && (
                        <span className="flex items-center gap-1 text-xs text-success">
                          <CheckCircle2 className="h-3 w-3" />
                          Complete
                        </span>
                      )}
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
                  <h3 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 lg:mb-4">{phase.title}</h3>

                  {/* Milestones */}
                  <ul className="space-y-1.5 sm:space-y-2">
                    {phase.milestones.map((milestone, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-[10px] sm:text-xs text-muted-foreground"
                      >
                        {phase.status === 'completed' ? (
                          <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 mt-0.5 text-success shrink-0" />
                        ) : phase.status === 'active' ? (
                          <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 mt-0.5 text-primary shrink-0" />
                        ) : (
                          <Circle className="h-3 w-3 sm:h-3.5 sm:w-3.5 mt-0.5 text-primary/20 shrink-0" />
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
        <div className="relative z-20 mt-16 sm:mt-20 lg:mt-32 flex flex-wrap justify-center gap-4 sm:gap-6 text-[10px] sm:text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-success" />
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-primary" />
            <span>In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full border border-primary/20 bg-card" />
            <span>Upcoming</span>
          </div>
        </div>
      </div>
    </section>
  );
}
