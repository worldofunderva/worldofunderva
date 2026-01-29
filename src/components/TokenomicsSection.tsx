import { Lock, Zap, Database, Users, Wallet, Building } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal';

const distributions = [
  {
    label: 'RWA Engagement Pool',
    percentage: 35,
    description: 'Powers 2.0% cashback rewards for Sentinel holders',
    icon: Database,
    color: 'hsl(212, 100%, 48%)',
    tailwindColor: 'bg-primary',
  },
  {
    label: 'DEX Liquidity',
    percentage: 30,
    description: 'Ensures deep liquidity across exchanges',
    icon: Wallet,
    color: 'hsl(190, 95%, 50%)',
    tailwindColor: 'bg-cyan-500',
  },
  {
    label: 'Core Team & Advisors',
    percentage: 15,
    description: '2-year hard lock (MPC Vault) + 3-year linear release',
    icon: Users,
    color: 'hsl(270, 80%, 60%)',
    tailwindColor: 'bg-violet-500',
    locked: true,
  },
  {
    label: 'Ecosystem Growth',
    percentage: 15,
    description: '2-year hard lock (MPC Vault) + 3-year linear release',
    icon: Building,
    color: 'hsl(160, 80%, 45%)',
    tailwindColor: 'bg-emerald-500',
    locked: true,
  },
  {
    label: 'Treasury Reserve',
    percentage: 5,
    description: 'Strategic reserve for operations',
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

export function TokenomicsSection() {
  return (
    <section id="tokenomics" className="relative py-24 sm:py-32 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-sm font-medium text-primary mb-3">TOKEN ECONOMICS</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4">
            Tokenomics Dashboard
          </h2>
          <p className="text-lg text-muted-foreground">
            Disciplined allocation. Transparent distribution. Zero tax policy.
          </p>
        </ScrollReveal>

        {/* Key Metrics */}
        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-12" staggerDelay={0.1}>
          <StaggerItem>
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <p className="text-3xl font-bold font-mono text-primary mb-1">21M</p>
              <p className="text-sm text-muted-foreground">Fixed Supply</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Zap className="h-6 w-6 text-success" />
                <p className="text-3xl font-bold font-mono text-success">0%</p>
              </div>
              <p className="text-sm text-muted-foreground">Transaction Tax</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <p className="text-3xl font-bold font-mono text-primary mb-1">2.0%</p>
              <p className="text-sm text-muted-foreground">Sentinel Cashback</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Lock className="h-6 w-6 text-amber-500" />
                <p className="text-3xl font-bold font-mono">2Y+3Y</p>
              </div>
              <p className="text-sm text-muted-foreground">Lock + Linear Release</p>
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* Distribution Table */}
        <ScrollReveal delay={0.2}>
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-border bg-secondary/30">
              <div className="col-span-5 sm:col-span-4 text-sm font-medium text-muted-foreground">Allocation</div>
              <div className="col-span-3 sm:col-span-2 text-sm font-medium text-muted-foreground text-right">Percentage</div>
              <div className="col-span-4 sm:col-span-6 text-sm font-medium text-muted-foreground hidden sm:block">Description</div>
            </div>

            {/* Table Body */}
            {distributions.map((item, index) => (
              <div
                key={item.label}
                className={cn(
                  "grid grid-cols-12 gap-4 px-6 py-5 items-center transition-colors hover:bg-secondary/20",
                  index !== distributions.length - 1 && "border-b border-border"
                )}
              >
                <div className="col-span-5 sm:col-span-4 flex items-center gap-3">
                  <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg", item.tailwindColor, "bg-opacity-20")}>
                    <item.icon className={cn("h-5 w-5", item.tailwindColor.replace('bg-', 'text-'))} />
                  </div>
                  <div>
                    <p className="font-medium text-sm sm:text-base">{item.label}</p>
                    {item.locked && (
                      <span className="inline-flex items-center gap-1 text-xs text-amber-500">
                        <Lock className="h-3 w-3" />
                        Locked
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-span-3 sm:col-span-2 text-right">
                  <span className="font-mono font-semibold text-lg">{item.percentage}%</span>
                </div>
                <div className="col-span-4 sm:col-span-6 hidden sm:block">
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Pie Chart Distribution */}
        <ScrollReveal delay={0.3} className="mt-8 flex flex-col items-center">
          <div className="w-full max-w-sm h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="hsl(222, 47%, 4%)"
                  strokeWidth={2}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(222, 47%, 11%)',
                    border: '1px solid hsl(212, 100%, 48%)',
                    borderRadius: '8px',
                    color: 'hsl(210, 20%, 98%)',
                    padding: '12px 16px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                    zIndex: 50,
                  }}
                  itemStyle={{
                    color: 'hsl(210, 20%, 98%)',
                    fontWeight: 500,
                  }}
                  labelStyle={{
                    color: 'hsl(212, 100%, 60%)',
                    fontWeight: 600,
                    marginBottom: '4px',
                  }}
                  formatter={(value: number, name: string) => [`${value}%`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {distributions.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div className={cn("h-3 w-3 rounded-full", item.tailwindColor)} />
                <span className="text-xs text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Zero Tax Highlight */}
        <ScrollReveal delay={0.4} variant="scale" className="mt-12 rounded-2xl border border-success/30 bg-success/5 p-8 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <Zap className="h-8 w-8 text-success" />
            <h3 className="text-2xl font-bold">Zero Tax Policy</h3>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            World of Underva implements a <span className="text-foreground font-medium">0% transaction tax</span> to 
            ensure frictionless commerce across all RWA verticals. Trade, transfer, and consume without hidden costs.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
