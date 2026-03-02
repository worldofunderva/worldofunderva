import { Lock, Zap, Database, Users, Wallet, Building, Clock, AlertCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal';
import { forwardRef } from 'react';

const distributions = [
  {
    label: 'WOU Engagement Pool (WEP)',
    percentage: 35,
    tokens: '7,350,000',
    description: 'Automated rewards and cashback. Inactive until Underva Fashion launch.',
    icon: Database,
    color: 'hsl(212, 100%, 48%)',
    tailwindColor: 'bg-primary',
    inactive: true,
  },
  {
    label: 'DEX Liquidity Pool',
    percentage: 30,
    tokens: '6,300,000',
    description: 'Deep liquidity for organic market demand and ecosystem stability.',
    icon: Wallet,
    color: 'hsl(190, 95%, 50%)',
    tailwindColor: 'bg-cyan-500',
  },
  {
    label: 'Ecosystem Growth',
    percentage: 15,
    tokens: '3,150,000',
    description: 'Pillar expansion and strategic partnerships.',
    icon: Building,
    color: 'hsl(160, 80%, 45%)',
    tailwindColor: 'bg-emerald-500',
  },
  {
    label: 'Core Team & Advisors',
    percentage: 15,
    tokens: '3,150,000',
    description: '4-year lock with 1-year cliff.',
    icon: Users,
    color: 'hsl(270, 80%, 60%)',
    tailwindColor: 'bg-violet-500',
    locked: true,
    lockDetails: '4Y Lock / 1Y Cliff',
  },
  {
    label: 'Treasury Reserve',
    percentage: 5,
    tokens: '1,050,000',
    description: 'Strategic operations and ecosystem security.',
    icon: Lock,
    color: 'hsl(38, 92%, 50%)',
    tailwindColor: 'bg-amber-500',
  },
];

const pieData = distributions.map((d) => ({
  name: d.label,
  value: d.percentage,
  color: d.color,
}));

const CustomTooltip = forwardRef<HTMLDivElement, any>(function CustomTooltip({ active, payload }, ref) {
  if (active && payload && payload.length) {
    return (
      <div ref={ref} className="bg-card border border-primary rounded-lg p-3 shadow-xl shadow-primary/10">
        <p className="text-primary font-semibold text-sm mb-1">{payload[0].name}</p>
        <p className="text-foreground font-mono text-lg">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
});

export function TokenomicsSection() {
  return (
    <section id="tokenomics" className="relative py-20 sm:py-28 lg:py-36 bg-card/30">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        {/* Section Header */}
        <ScrollReveal className="mx-auto max-w-2xl text-center mb-10 sm:mb-16">
          <p className="text-xs sm:text-sm font-medium text-primary mb-2 sm:mb-3">TOKEN ECONOMICS</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight mb-3 sm:mb-4">
            Tokenomics Dashboard
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground px-2">
            Disciplined allocation. Transparent distribution. Zero tax policy.
          </p>
        </ScrollReveal>

        {/* Key Metrics */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12" staggerDelay={0.1}>
          <StaggerItem>
            <div className="rounded-lg sm:rounded-xl border border-border bg-card p-4 sm:p-6 text-center">
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold font-mono text-primary mb-0.5 sm:mb-1">21M</p>
              <p className="text-[10px] sm:text-sm text-muted-foreground">Fixed Supply</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="rounded-lg sm:rounded-xl border border-border bg-card p-4 sm:p-6 text-center">
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                <Zap className="h-4 w-4 sm:h-6 sm:w-6 text-success" />
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold font-mono text-success">0%</p>
              </div>
              <p className="text-[10px] sm:text-sm text-muted-foreground">Transaction Tax</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="rounded-lg sm:rounded-xl border border-border bg-card p-4 sm:p-6 text-center">
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold font-mono text-primary mb-0.5 sm:mb-1">2.0%</p>
              <p className="text-[10px] sm:text-sm text-muted-foreground">Automated Rewards</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="rounded-lg sm:rounded-xl border border-border bg-card p-4 sm:p-6 text-center">
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                <Lock className="h-4 w-4 sm:h-6 sm:w-6 text-amber-500" />
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold font-mono">4Y/1Y</p>
              </div>
              <p className="text-[10px] sm:text-sm text-muted-foreground">Lock / Cliff</p>
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* Distribution Table - Hidden on mobile */}
        <ScrollReveal delay={0.2} className="hidden sm:block">
          <div className="rounded-xl sm:rounded-2xl border border-border bg-card overflow-hidden">
            <div className="grid grid-cols-12 gap-4 px-4 sm:px-6 py-3 sm:py-4 border-b border-border bg-secondary/30">
              <div className="col-span-4 sm:col-span-3 text-xs sm:text-sm font-medium text-muted-foreground">Allocation</div>
              <div className="col-span-2 text-xs sm:text-sm font-medium text-muted-foreground text-right">%</div>
              <div className="col-span-2 text-xs sm:text-sm font-medium text-muted-foreground text-right">Tokens</div>
              <div className="col-span-4 sm:col-span-5 text-xs sm:text-sm font-medium text-muted-foreground hidden sm:block">Description</div>
            </div>

            {distributions.map((item, index) => (
              <div
                key={item.label}
                className={cn(
                  "grid grid-cols-12 gap-4 px-4 sm:px-6 py-4 sm:py-5 items-center transition-colors hover:bg-secondary/20",
                  index !== distributions.length - 1 && "border-b border-border"
                )}
              >
                <div className="col-span-4 sm:col-span-3 flex items-center gap-2 sm:gap-3">
                  <div className={cn("flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg", item.tailwindColor, "bg-opacity-20")}>
                    <item.icon className={cn("h-4 w-4 sm:h-5 sm:w-5", item.tailwindColor.replace('bg-', 'text-'))} />
                  </div>
                  <div>
                    <p className="font-medium text-xs sm:text-sm lg:text-base">{item.label}</p>
                    {item.locked && (
                      <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-amber-500">
                        <Lock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                        {item.lockDetails}
                      </span>
                    )}
                    {item.inactive && (
                      <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">
                        <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                        Inactive
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-span-2 text-right">
                  <span className="font-mono font-semibold text-base sm:text-lg">{item.percentage}%</span>
                </div>
                <div className="col-span-2 text-right">
                  <span className="font-mono text-xs sm:text-sm text-muted-foreground">{item.tokens}</span>
                </div>
                <div className="col-span-4 sm:col-span-5 hidden sm:block">
                  <p className="text-xs sm:text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Mobile Distribution Cards */}
        <ScrollReveal delay={0.2} className="sm:hidden space-y-3">
          {distributions.map((item) => (
            <div key={item.label} className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", item.tailwindColor, "bg-opacity-20")}>
                    <item.icon className={cn("h-4 w-4", item.tailwindColor.replace('bg-', 'text-'))} />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{item.label}</p>
                    {item.locked && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-amber-500">
                        <Lock className="h-2.5 w-2.5" />
                        {item.lockDetails}
                      </span>
                    )}
                    {item.inactive && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Clock className="h-2.5 w-2.5" />
                        Inactive
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono font-semibold text-lg">{item.percentage}%</span>
                  <p className="font-mono text-xs text-muted-foreground">{item.tokens}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </ScrollReveal>

        {/* Pie Chart */}
        <ScrollReveal delay={0.3} className="mt-6 sm:mt-8 flex flex-col items-center">
          <div className="w-full max-w-xs sm:max-w-sm h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={2} dataKey="value" stroke="hsl(222, 47%, 4%)" strokeWidth={2}>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 sm:gap-4 mt-4 px-2">
            {distributions.map((item) => (
              <div key={item.label} className="flex items-center gap-1.5 sm:gap-2">
                <div className={cn("h-2 w-2 sm:h-3 sm:w-3 rounded-full", item.tailwindColor)} />
                <span className="text-[10px] sm:text-xs text-muted-foreground">{item.label.split(' (')[0]}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Treasury Note */}
        <ScrollReveal delay={0.35} className="mt-6 sm:mt-8 text-center">
          <p className="text-[10px] sm:text-xs text-muted-foreground/70 italic">
            The treasury reserve is controlled by the Ecosystem & Strategic OPS wallet.
          </p>
        </ScrollReveal>

        {/* Zero Tax Highlight */}
        <ScrollReveal delay={0.4} variant="scale" className="mt-8 sm:mt-12 rounded-xl sm:rounded-2xl border border-success/30 bg-success/5 p-5 sm:p-8 text-center">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-success" />
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">Zero Tax Policy</h3>
          </div>
          <p className="text-xs sm:text-sm lg:text-base text-muted-foreground max-w-2xl mx-auto">
            World of Underva implements a <span className="text-foreground font-medium">0% transaction tax</span> to 
            ensure frictionless commerce across all RWA verticals. Trade, transfer, and consume without hidden costs.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
