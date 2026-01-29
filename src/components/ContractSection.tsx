import { ArrowRightLeft, Shield, Zap, Clock, ChevronRight } from 'lucide-react';

const CONTRACT_ADDRESS = '0x1234...5678abcd';

import { useState } from 'react';
import { Copy, Check, ExternalLink, TrendingUp, TrendingDown } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

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
    <section className="py-12 sm:py-16 lg:py-20 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight">
            Contract
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="glass-card p-4 sm:p-6 max-w-2xl mx-auto">
            {/* Price Display - Minimal */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 pb-4 sm:pb-5 mb-4 sm:mb-5 border-b border-border">
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
            </div>

            {/* Contract Address */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left w-full sm:w-auto">
                <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-1.5 sm:mb-2">
                  $WOU Token Address
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
                  <code className="text-xs sm:text-sm font-mono text-foreground">
                    {CONTRACT_ADDRESS}
                  </code>
                  <button
                    onClick={handleCopy}
                    className="p-1.5 sm:p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50"
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-success" />
                    ) : (
                      <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex gap-4 sm:gap-3">
                <a 
                  href="#" 
                  className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  Etherscan
                </a>
                <a 
                  href="#" 
                  className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  Basescan
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}