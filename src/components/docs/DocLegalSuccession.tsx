import { Scale, AlertTriangle, Check, Bot } from 'lucide-react';

export function DocLegalSuccession() {
  return (
    <div className="space-y-8">
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
        The legal framework governing the World of Underva ecosystem ensures that all utility, rights, and perks 
        associated with Sentinel NFT ownership are legally binding and fully transferable upon sale or transfer of the asset.
      </p>

      {/* Legal Notice Callout */}
      <div className="rounded-xl border-2 border-warning/30 bg-warning/5 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Scale className="h-5 w-5 text-warning" />
          <h3 className="text-base font-semibold text-warning">Legal Succession & Transferability</h3>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg bg-card/80 border border-warning/20 p-4">
            <div className="flex items-start gap-2.5">
              <Check className="h-4 w-4 text-warning shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">Asset Integrity</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The Sentinel NFT functions as a legally recognized bearer instrument. All rights, perks, and 
                  ecosystem benefits are linked to the NFT holder of record.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-card/80 border border-warning/20 p-4">
            <div className="flex items-start gap-2.5">
              <Check className="h-4 w-4 text-warning shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">Full Rights Transfer</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  If the NFT is sold or transferred, all associated rights, perks, and ecosystem benefits transfer 
                  in full to the new owner. <strong className="text-foreground">No utility, perk, or right shall be 
                  shortened, diminished, or modified during this transfer;</strong> the new owner inherits the full, 
                  uncompromised utility of the Sentinel credential.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-card/80 border border-warning/20 p-4">
            <div className="flex items-start gap-2.5">
              <Check className="h-4 w-4 text-warning shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">Enforcement</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The smart contract architecture serves as the definitive record of ownership. Legal succession is 
                  triggered automatically upon valid on-chain transfer of the asset, ensuring seamless continuity 
                  for the new owner within the ecosystem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Operational Oversight */}
      <div className="rounded-xl border border-primary/10 bg-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bot className="h-5 w-5 text-primary" />
          <h3 className="text-base font-semibold text-foreground">Operational Oversight</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-start gap-2.5 text-sm">
            <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-foreground">Payment Logging:</span>{' '}
              <span className="text-muted-foreground">
                The UNDO AI protocol is responsible for scanning and logging all payments across the ecosystem.
              </span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 text-sm">
            <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-foreground">Monthly & Semi-Annual Audit:</span>{' '}
              <span className="text-muted-foreground">
                The AI handles payment logging on monthly and semi-annual cycles. The team reviews and approves the final transactions.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Important Legal Disclaimer */}
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-destructive mb-1">Legal Disclaimer</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The information presented in this documentation is for informational purposes and does not constitute 
              legal, financial, or investment advice. All rights and obligations described herein are subject to the 
              terms encoded in the relevant smart contracts and any applicable legal agreements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
