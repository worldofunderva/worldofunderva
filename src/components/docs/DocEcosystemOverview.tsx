import { Shield, Vault, Bot, CreditCard, Coins } from 'lucide-react';

export function DocEcosystemOverview() {
  return (
    <div className="space-y-8">
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
        The World of Underva ecosystem is engineered to harmonize institutional-grade financial security with 
        high-velocity commercial activity. It operates as a <span className="text-foreground font-medium">closed-loop system</span> where 
        utility is generated through physical commerce and captured through digital tokens.
      </p>

      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
        Central to this is the "<span className="text-foreground font-medium">Institutional Stewardship</span>" model, which mandates 
        that the Organization maintains a separation of powers between operational execution and automated audit verification. 
        The ecosystem is designed to be resilient, transparent, and scalable, utilizing Multi-Party Computation (MPC) vaults 
        to protect treasury and operational assets while leveraging an AI-driven auditing architecture to ensure that every 
        participant reward and transaction flow remains verified and verifiable.
      </p>

      {/* Architecture Diagram */}
      <div className="rounded-xl border border-primary/10 bg-card p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">Core Architecture</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: Shield, label: 'MPC Vaults', desc: 'Multi-party computation securing treasury and operations' },
            { icon: Bot, label: 'UNDO AI Protocol', desc: 'Autonomous audit verification and reporting' },
            { icon: CreditCard, label: 'Hybrid Payments', desc: 'Fiat via Stripe + $WOU token rails' },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center text-center rounded-lg border border-primary/10 bg-secondary/30 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
                <item.icon className="h-5 w-5" />
              </div>
              <p className="text-sm font-semibold text-foreground mb-1">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hybrid Payment Model */}
      <div className="rounded-xl border border-primary/10 bg-card p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">The Hybrid Payment Model</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          To ensure mainstream accessibility and industrial scalability, each pillar utilizes a Hybrid Payment System:
        </p>
        <div className="space-y-3">
          <div className="flex items-start gap-3 rounded-lg bg-secondary/30 p-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-muted text-muted-foreground">
              <CreditCard className="h-3.5 w-3.5" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Local Fiat Currency</p>
              <p className="text-xs text-muted-foreground mt-0.5">Accepted via Stripe integration for participants not yet utilizing cryptocurrency.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg bg-primary/5 border border-primary/10 p-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
              <Coins className="h-3.5 w-3.5" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">$WOU Token</p>
              <p className="text-xs text-muted-foreground mt-0.5">Utilized by ecosystem participants to unlock automated rewards and "Corporate Tender" benefits.</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3 italic">
          While fiat is utilized for initial access, the $WOU token is the exclusive vehicle for generating and receiving rewards.
        </p>
      </div>
    </div>
  );
}
