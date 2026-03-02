import { useState } from 'react';
import { Copy, Check, ExternalLink, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

// Contract address - set to null until token launch, then replace with actual address
// Example: '0x1234567890abcdef1234567890abcdef12345678'
const CONTRACT_ADDRESS: string | null = null;

// Set to true when token is launched and price data is available
const IS_TOKEN_LAUNCHED = false;

export function ContractSection() {
  const [copied, setCopied] = useState(false);

  // Price data - will be fetched from CoinMarketCap/DEX API after launch
  const priceData = IS_TOKEN_LAUNCHED ? {
    price: 0.0847,
    change24h: 3.42,
    isPositive: true,
  } : null;

  const handleCopy = () => {
    if (!CONTRACT_ADDRESS) return;
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate explorer URLs only when contract address exists
  const etherscanUrl = CONTRACT_ADDRESS 
    ? `https://etherscan.io/address/${CONTRACT_ADDRESS}` 
    : null;
  const basescanUrl = CONTRACT_ADDRESS 
    ? `https://basescan.org/address/${CONTRACT_ADDRESS}` 
    : null;

  return (
    <section className="py-16 sm:py-20 lg:py-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <ScrollReveal className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight">
            Contract
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="glass-card p-4 sm:p-6 max-w-2xl mx-auto">
            {/* Price Display - Shows TBA if not launched */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 pb-4 sm:pb-5 mb-4 sm:mb-5 border-b border-border">
              {priceData ? (
                <>
                  <span className="text-xl sm:text-2xl font-mono font-semibold text-foreground">
                    ${priceData.price.toFixed(4)}
                  </span>
                  <span className={`flex items-center gap-1 text-xs sm:text-sm font-medium ${
                    priceData.isPositive ? 'text-success' : 'text-destructive'
                  }`}>
                    {priceData.isPositive ? (
                      <TrendingUp className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    ) : (
                      <TrendingDown className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    )}
                    {priceData.isPositive ? '+' : ''}{priceData.change24h}%
                  </span>
                </>
              ) : (
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-medium">Price available after launch</span>
                </span>
              )}
            </div>

            {/* Contract Address */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left w-full sm:w-auto">
                <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-1.5 sm:mb-2">
                  $WOU Token Address
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
                  {CONTRACT_ADDRESS ? (
                    <>
                      <code className="text-xs sm:text-sm font-mono text-foreground">
                        {`${CONTRACT_ADDRESS.slice(0, 6)}...${CONTRACT_ADDRESS.slice(-4)}`}
                      </code>
                      <button
                        onClick={handleCopy}
                        className="p-1.5 sm:p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50"
                        aria-label="Copy contract address"
                      >
                        {copied ? (
                          <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-success" />
                        ) : (
                          <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        )}
                      </button>
                    </>
                  ) : (
                    <span className="text-xs sm:text-sm font-mono text-muted-foreground">
                      TBA — Available at launch
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-4 sm:gap-3">
                {etherscanUrl ? (
                  <a 
                    href={etherscanUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    Etherscan
                  </a>
                ) : (
                  <span className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-muted-foreground/50 cursor-not-allowed">
                    <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    Etherscan
                  </span>
                )}
                {basescanUrl ? (
                  <a 
                    href={basescanUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    Basescan
                  </a>
                ) : (
                  <span className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-muted-foreground/50 cursor-not-allowed">
                    <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    Basescan
                  </span>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}