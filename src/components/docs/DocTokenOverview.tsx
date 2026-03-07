export function DocTokenOverview() {
  return (
    <div className="space-y-8">
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
        The <span className="font-mono text-foreground font-semibold">$WOU</span> token is the foundational 
        "Corporate Tender" of the World of Underva ecosystem. It is engineered as a non-inflationary instrument 
        to facilitate industrial-scale commerce, utilizing a multichain architecture that balances security with performance.
      </p>

      {/* Specification Table */}
      <div className="rounded-xl border border-primary/10 bg-card overflow-hidden">
        <div className="px-5 py-3 border-b border-primary/10 bg-secondary/30">
          <h3 className="text-sm font-semibold text-foreground">Token Specification</h3>
        </div>
        <div className="divide-y divide-primary/5">
          {[
            { param: 'Token Name', value: 'World of Underva' },
            { param: 'Token Symbol', value: '$WOU', mono: true },
            { param: 'Total Supply', value: '21,000,000', mono: true },
            { param: 'Canonical Chain', value: 'Ethereum (L1)' },
            { param: 'Velocity Chain', value: 'Base (L2)' },
            { param: 'Token Standard', value: 'ERC-20' },
          ].map((row) => (
            <div key={row.param} className="flex items-center justify-between px-5 py-3.5">
              <span className="text-sm text-muted-foreground">{row.param}</span>
              <span className={`text-sm font-medium text-foreground ${row.mono ? 'font-mono' : ''}`}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">
        The fixed maximum supply of <span className="font-mono text-foreground">21,000,000</span> ensures scarcity, 
        preventing inflationary pressure. By anchoring the ecosystem across both L1 and L2, we ensure that the system 
        maintains the decentralization and robust security of the Ethereum Canonical Chain while leveraging the 
        high-speed, low-cost throughput of the Base Velocity Chain for daily operations.
      </p>
    </div>
  );
}
