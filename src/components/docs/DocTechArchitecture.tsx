import { Bot, Shield, Lock, Wallet, Database, Shirt, Footprints, Truck, Briefcase, Users, Scan, Calculator, Megaphone } from 'lucide-react';
import { cn } from '@/lib/utils';

const vault1Items = [
  { label: 'Sentinel NFT Fees', icon: Shield },
  { label: 'WOU Engagement Pool', icon: Database },
  { label: 'DEX Liquidity', icon: Wallet },
  { label: 'Underva Fashion', icon: Shirt },
  { label: 'Underva Stride', icon: Footprints },
  { label: 'Underva Express', icon: Truck },
];

const vault2Items = [
  { label: 'Governance & Ownership', icon: Lock },
  { label: 'Strategic OPS', icon: Briefcase },
  { label: 'Core Team & Advisors', icon: Users },
];

const undoAgents = [
  {
    icon: Scan,
    title: 'Scanner Agent',
    description: 'Performs real-time ingestion of blockchain activity for $WOU transactions across every pillar wallet. Before logging a transaction to the "Golden Record," the Scanner verifies that the transacting wallet holds a Sentinel NFT — only verified holders are recorded, ensuring the Calculator Agent exclusively processes cashback and semi-annual yield for eligible participants.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
  },
  {
    icon: Calculator,
    title: 'Calculator Agent',
    description: 'Executes the computational logic for the ecosystem. It autonomously calculates cashback rewards, loyalty dividends, and treasury status at the end of each monthly and semi-annual cycle.',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    icon: Megaphone,
    title: 'Announcer Agent',
    description: 'Acts as the communication bridge. It autonomously broadcasts verified logs, audit summaries, and distribution status directly to the Sentinel Assembly on Discord, ensuring radical transparency. It also sends calculated distribution data to the team for review and approval before payments are executed.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
  },
];

export function DocTechArchitecture() {
  return (
    <div className="space-y-8">
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
        A vertically integrated engine combining AI-driven financial oversight with institutional-grade 
        multi-party computation vaults.
      </p>

      {/* Multichain Infrastructure */}
      <div className="rounded-xl border border-primary/10 bg-card p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">Multichain Infrastructure</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-lg bg-secondary/30 border border-primary/10 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
              <span className="text-sm font-semibold text-foreground">Canonical Chain</span>
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-foreground font-medium">Ethereum (L1)</span> — Acts as the security layer for the ecosystem.
            </p>
          </div>
          <div className="rounded-lg bg-primary/5 border border-primary/10 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2.5 w-2.5 rounded-full bg-primary" />
              <span className="text-sm font-semibold text-foreground">Velocity Chain</span>
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-foreground font-medium">Base (L2)</span> — Serves as the primary network for daily operations and industrial throughput.
            </p>
          </div>
        </div>
      </div>

      {/* UNDO AI Protocol */}
      <div className="rounded-xl border border-primary/20 bg-card p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">UNDO AI Protocol</h3>
            <p className="text-xs text-primary font-medium">The Ecosystem Brain</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          The UNDO AI protocol is the autonomous intelligence layer responsible for financial integrity and 
          community reporting. It is composed of three specialized agents:
        </p>
        <div className="grid gap-3">
          {undoAgents.map((agent) => (
            <div key={agent.title} className="flex items-start gap-3 rounded-lg border border-primary/10 bg-secondary/20 p-4">
              <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", agent.bg)}>
                <agent.icon className={cn("h-4 w-4", agent.color)} />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">{agent.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{agent.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vault Structure */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Vault 1 */}
        <div className="rounded-xl border border-primary/10 bg-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Shield className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground">Vault 1: WOU | Operations</h4>
              <p className="text-[11px] text-muted-foreground">Revenue & Liquidity Engine</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {vault1Items.map((item) => (
              <div key={item.label} className="flex items-center gap-2 rounded-lg border border-primary/10 bg-secondary/30 px-2.5 py-2">
                <item.icon className="h-3 w-3 text-primary shrink-0" />
                <span className="text-[10px] sm:text-xs text-muted-foreground font-medium truncate">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Vault 2 */}
        <div className="rounded-xl border border-amber-500/20 bg-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
              <Lock className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground">Vault 2: WOU | Treasury</h4>
              <p className="text-[11px] text-muted-foreground">Strategic & Governance Reserve</p>
            </div>
          </div>
          <div className="grid gap-2">
            {vault2Items.map((item) => (
              <div key={item.label} className="flex items-center gap-2 rounded-lg border border-amber-500/15 bg-amber-500/5 px-2.5 py-2">
                <item.icon className="h-3 w-3 text-amber-500 shrink-0" />
                <span className="text-[10px] sm:text-xs text-muted-foreground font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
