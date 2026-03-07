import { Users, Shield, AlertTriangle, Bot, Check } from 'lucide-react';

export function DocGovernance() {
  return (
    <div className="space-y-8">
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
        World of Underva operates under a "<span className="text-foreground font-medium">Controlled Decentralization</span>" framework. 
        Unlike pure DAOs that are susceptible to speculative manipulation, our governance is structured to protect the 
        industrial integrity of the ecosystem. Authority is bifurcated between the Organization (responsible for operational 
        execution, legal compliance, and industrial partnerships) and the Sentinel Assembly (the collective body of NFT holders).
      </p>

      {/* Sentinel Assembly */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="h-5 w-5 text-primary" />
          <h3 className="text-base font-semibold text-foreground">The Role of the Sentinel Assembly</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          The Sentinel Assembly is the primary mechanism for community-led strategic alignment. It functions not as a 
          traditional voting block for code changes, but as a consultative body that ensures the Organization's industrial 
          path remains aligned with the needs and values of the stakeholders.
        </p>
        <div className="space-y-3">
          {[
            {
              title: 'Consultative Stewardship',
              desc: 'The Assembly provides input on new product lines, seasonal initiatives across Fashion, Stride, and Express, and the direction of the AI-driven audit protocol.',
            },
            {
              title: 'Sentinel Rights',
              desc: 'Sentinel NFT holders possess "Voting Standing" for specific ecosystem parameters, such as the cadence of cashback distributions or the adjustment of reward tier thresholds, ensuring that those most invested in the ecosystem have a direct influence on its reward mechanics.',
            },
            {
              title: 'Transparent Coordination',
              desc: 'All discussions and community sentiment polling occur within the private Sentinel Assembly Discord, where the Announcer Agent provides real-time updates on status, ensuring all participants have access to the same information.',
            },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-2.5 text-sm">
              <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="font-medium text-foreground">{item.title}:</span>{' '}
                <span className="text-muted-foreground">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Protocol Stewardship */}
      <div className="rounded-xl border border-primary/10 bg-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-5 w-5 text-primary" />
          <h3 className="text-base font-semibold text-foreground">Protocol Stewardship & Operational Authority</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          To ensure the project remains sustainable and legally compliant, the Organization retains 
          "<span className="text-foreground font-medium">Non-Renounced Stewardship</span>" over the core infrastructure:
        </p>
        <div className="space-y-3">
          {[
            {
              title: 'Operational Execution',
              desc: 'The Organization maintains the authority to execute commercial partnerships, manage treasury logistics, and deploy infrastructure updates. This prevents the "paralysis by analysis" often seen in fully decentralized models.',
            },
            {
              title: 'Safety & Compliance',
              desc: 'The Organization reserves the right to blacklist wallets involved in malicious activity and enforce the Code of Conduct. This is not arbitrary; it is an essential safeguard to protect the treasury and the long-term value of the $WOU token.',
            },
            {
              title: 'AI-Verified Oversight',
              desc: 'All executive decisions, particularly those concerning treasury movements and reward allocations, are subjected to the UNDO AI audit protocol, providing an immutable, publicly verifiable record of the Organization\'s actions.',
            },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-2.5 text-sm">
              <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="font-medium text-foreground">{item.title}:</span>{' '}
                <span className="text-muted-foreground">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Important Notice */}
      <div className="rounded-xl border border-warning/30 bg-warning/5 p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-warning mb-1">Important Governance Notice</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The governance model is designed to protect the long-term industrial integrity of the ecosystem. 
              This "Controlled Decentralization" approach ensures that operational decisions are made efficiently 
              while maintaining full transparency through AI-verified audit trails.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
