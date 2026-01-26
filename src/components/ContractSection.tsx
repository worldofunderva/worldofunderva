import { useState } from 'react';
import { Copy, Check, ExternalLink, TrendingUp, TrendingDown } from 'lucide-react';

const CONTRACT_ADDRESS = '0x1234...5678abcd';

export function ContractSection() {
  const [copied, setCopied] = useState(false);

  // Placeholder data - would be fetched from API
  const priceData = {
    price: 0.0847,
    change24h: 3.42,
    isPositive: true,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('0x1234567890abcdef1234567890abcdef12345678');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 lg:py-20 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Contract
          </h2>
        </div>

        <div className="glass-card p-6 max-w-2xl mx-auto">
          {/* Price Display - Minimal */}
          <div className="flex items-center justify-center gap-4 pb-5 mb-5 border-b border-border">
            <span className="text-2xl font-mono font-semibold text-foreground">
              ${priceData.price.toFixed(4)}
            </span>
            <span className={`flex items-center gap-1 text-sm font-medium ${
              priceData.isPositive ? 'text-success' : 'text-destructive'
            }`}>
              {priceData.isPositive ? (
                <TrendingUp className="h-3.5 w-3.5" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" />
              )}
              {priceData.isPositive ? '+' : ''}{priceData.change24h}%
            </span>
          </div>

          {/* Contract Address */}
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
            <div className="flex gap-3">
              <a 
                href="#" 
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Etherscan
              </a>
              <a 
                href="#" 
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Basescan
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
