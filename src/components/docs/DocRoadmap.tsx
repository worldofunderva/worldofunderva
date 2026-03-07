import { Shield, Shirt, Footprints, Truck, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
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
      'Underva Fashion launch',
      'Hybrid Payment integration (Stripe + $WOU)',
      'Dual-Yield engine activation via UNDO AI agents',
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
      'Underva Stride sportswear launch',
      'Base L2 velocity optimization',
      'Extended ecosystem rewards',
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

function getStatus(phase: Phase, year: number) {
  if (year < phase.startYear) return 'upcoming';
  if (phase.endYear === null || (year >= phase.startYear && year <= phase.endYear)) return 'active';
  if (year > (phase.endYear ?? 0)) return 'completed';
  return 'upcoming';
}

export function DocRoadmap() {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="space-y-8">
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
        A disciplined, multi-year roadmap for complete vertical integration — 
        <span className="text-foreground font-medium"> The Decade of Discipline</span>.
      </p>

      <div className="space-y-4">
        {phases.map((phase) => {
          const status = getStatus(phase, currentYear);
          return (
            <div
              key={phase.phase}
              className={cn(
                "rounded-xl border p-5 transition-colors",
                status === 'active' ? "border-primary/30 bg-primary/5" :
                status === 'completed' ? "border-success/30 bg-success/5" :
                "border-primary/10 bg-card"
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full",
                    status === 'active' ? "bg-primary text-primary-foreground" :
                    status === 'completed' ? "bg-success text-primary-foreground" :
                    "bg-secondary text-muted-foreground"
                  )}>
                    <phase.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-primary uppercase tracking-wider">{phase.phase}</p>
                    <h3 className="text-sm font-semibold text-foreground">{phase.title}</h3>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-muted-foreground">{phase.timeline}</span>
                  {status === 'active' && (
                    <div className="flex items-center gap-1 text-xs text-primary mt-0.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                      Active
                    </div>
                  )}
                </div>
              </div>
              <ul className="space-y-1.5 ml-12">
                {phase.milestones.map((m, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                    {status === 'completed' ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0 mt-0.5" />
                    ) : status === 'active' ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="h-3.5 w-3.5 text-primary/20 shrink-0 mt-0.5" />
                    )}
                    <span className="leading-relaxed">{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
