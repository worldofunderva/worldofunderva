import { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CONTRACT_ADDRESS = '0x1234...5678abcd';

export function ContractPriceSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('0x1234567890abcdef1234567890abcdef12345678');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 lg:py-20 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-3">
            Contract
          </h2>
        </div>

        <div className="glass-card p-6 max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                $WOU Token Address
              </p>
              <div className="flex items-center gap-3">
                <code className="text-sm font-mono text-foreground">
                  {CONTRACT_ADDRESS}
                </code>
                <button
                  onClick={handleCopy}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-success" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                <ExternalLink className="h-3 w-3" />
                Etherscan
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                <ExternalLink className="h-3 w-3" />
                Basescan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
