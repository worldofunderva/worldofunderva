import { Shield, Lock, Zap, Bot } from 'lucide-react';

export function DocExecutiveSummary() {
  return (
    <div className="space-y-8">
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
        World of Underva Global is an institutional grade Real World Asset (RWA) tokenization ecosystem 
        built to connect high velocity physical commerce with blockchain transparency. 
        Through the <span className="text-foreground font-semibold font-mono">$WOU</span> utility token and the 
        Sentinel NFT compliance credential, the Organization provides a secure, non-inflationary framework for 
        participants to engage in a symbiotic economy spanning retail, sport, and logistics.
      </p>

      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
        By bypassing traditional venture capital, we ensure fiduciary alignment remains solely with our community 
        of Sentinel holders. An autonomous, on-demand UNDO AI auditing protocol maintains the 
        "<span className="text-foreground font-medium">Golden Record</span>" of all ecosystem activity.
      </p>

      {/* Key Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { icon: Shield, label: 'Sentinel NFT Gate', desc: 'One time compliance credential' },
          { icon: Lock, label: '21M Fixed Supply', desc: 'Non-inflationary token model' },
          { icon: Zap, label: 'Zero Tax Policy', desc: 'Frictionless commerce' },
          { icon: Bot, label: 'UNDO AI Protocol', desc: 'Autonomous audit intelligence' },
        ].map((item) => (
          <div key={item.label} className="flex items-start gap-3 rounded-xl border border-primary/10 bg-card p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <item.icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
