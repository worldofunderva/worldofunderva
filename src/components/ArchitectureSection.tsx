import { Bot, Shield, Vault, Wallet, Building, Users, Briefcase, Truck, Footprints, Shirt, Database, Lock } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal';
import { cn } from '@/lib/utils';

const vault1Items = [
  { label: 'Sentinel NFT Fees', icon: Shield },
  { label: 'Engagement Pool', icon: Database },
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

export function ArchitectureSection() {
  return (
    <section className="relative py-20 sm:py-28 lg:py-36 overflow-hidden border-t border-border">
      <div className="absolute inset-0 grid-pattern opacity-15" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        {/* Section Header */}
        <ScrollReveal className="mx-auto max-w-3xl text-center mb-14 sm:mb-20">
          <p className="text-xs sm:text-sm font-medium text-primary mb-2 sm:mb-3 tracking-widest">SYSTEM INFRASTRUCTURE</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
            The Architecture
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
            A vertically integrated engine combining AI-driven financial oversight with institutional-grade multi-party computation vaults.
          </p>
        </ScrollReveal>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Part A: UNDO AI Protocol */}
          <ScrollReveal variant="fade-right">
            <div className="rounded-xl sm:rounded-2xl border border-primary/30 bg-card p-6 sm:p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold">UNDO AI Protocol</h3>
                  <p className="text-xs sm:text-sm text-primary font-medium">The Ecosystem Brain</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                The UNDO (Underva Digital Overseer) is the autonomous intelligence layer of the World of Underva. 
                It operates as the ecosystem's central financial processor, ensuring complete transparency and accuracy 
                across all monetary operations.
              </p>

              <div className="space-y-4">
                <div className="rounded-lg border border-border bg-secondary/30 p-4">
                  <p className="text-xs font-semibold text-foreground mb-1.5">Monthly Operations</p>
                  <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">
                    UNDO autonomously logs all payments, transaction data, and financial records at the close of each calendar month. 
                    Every entry is timestamped and immutably recorded.
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-secondary/30 p-4">
                  <p className="text-xs font-semibold text-foreground mb-1.5">Semi-Annual Audit Cycle</p>
                  <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">
                    Every 6 months, UNDO compiles a comprehensive financial log covering all ecosystem transactions, 
                    reward distributions, and treasury movements.
                  </p>
                </div>
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                  <p className="text-xs font-semibold text-primary mb-1.5">Governance Layer</p>
                  <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">
                    Teams act solely as a governance layer to review and approve the AI-generated logs. 
                    UNDO handles all calculations, data aggregation, and audit trail generation autonomously.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Part B: MPC Vault Hierarchy */}
          <ScrollReveal variant="fade-left" delay={0.2}>
            <div className="space-y-6 h-full flex flex-col">
              {/* Vault 1 */}
              <div className="rounded-xl sm:rounded-2xl border border-border bg-card p-6 sm:p-8 flex-1">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold">Vault 1: WOU | Operations</h3>
                    <p className="text-[11px] sm:text-xs text-muted-foreground">Revenue & Liquidity Engine</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {vault1Items.map((item) => (
                    <div key={item.label} className="flex items-center gap-2 rounded-lg border border-border bg-secondary/30 px-3 py-2.5">
                      <item.icon className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span className="text-[10px] sm:text-xs text-muted-foreground font-medium truncate">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vault 2 */}
              <div className="rounded-xl sm:rounded-2xl border border-amber-500/30 bg-card p-6 sm:p-8 flex-1">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/15 text-amber-500">
                    <Lock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold">Vault 2: WOU | Treasury</h3>
                    <p className="text-[11px] sm:text-xs text-muted-foreground">Strategic & Governance Reserve</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {vault2Items.map((item) => (
                    <div key={item.label} className="flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2.5">
                      <item.icon className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                      <span className="text-[10px] sm:text-xs text-muted-foreground font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
