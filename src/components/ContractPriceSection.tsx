import { useState } from 'react';
import { Copy, Check, TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CONTRACT_ADDRESS = '0x1234...5678abcd'; // Placeholder - replace with actual

export function ContractPriceSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('0x1234567890abcdef1234567890abcdef12345678');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simulated price data
  const priceData = {
    price: '$0.0847',
    change24h: '+12.4%',
    isPositive: true,
    marketCap: '$1.78M',
    volume24h: '$245K',
    holders: '2,847',
  };

  return (
    <section className="py-20 lg:py-28 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-primary/10 text-primary rounded-full mb-4">
            Live Market Data
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            $WOU Token Metrics
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Track the World of Underva token performance across Ethereum L1 and Base L2 networks.
          </p>
        </div>

        {/* Contract Address Card */}
        <div className="glass-card p-6 mb-8 max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Official Contract Address
              </p>
              <div className="flex items-center gap-3">
                <code className="text-sm sm:text-base font-mono text-foreground bg-secondary/50 px-3 py-2 rounded-lg">
                  {CONTRACT_ADDRESS}
                </code>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopy}
                  className="h-9 w-9 shrink-0"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-success" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="sentinel-outline" size="sm" className="gap-2">
                <ExternalLink className="h-3 w-3" />
                Etherscan
              </Button>
              <Button variant="sentinel-outline" size="sm" className="gap-2">
                <ExternalLink className="h-3 w-3" />
                Basescan
              </Button>
            </div>
          </div>
        </div>

        {/* Price Action Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
          {/* Current Price */}
          <div className="glass-card p-6 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
              Current Price
            </p>
            <p className="text-3xl font-bold text-foreground mb-1">
              {priceData.price}
            </p>
            <div className={`flex items-center justify-center gap-1 text-sm ${
              priceData.isPositive ? 'text-success' : 'text-destructive'
            }`}>
              {priceData.isPositive ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span>{priceData.change24h}</span>
              <span className="text-muted-foreground">(24h)</span>
            </div>
          </div>

          {/* Market Cap */}
          <div className="glass-card p-6 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
              Market Cap
            </p>
            <p className="text-3xl font-bold text-foreground">
              {priceData.marketCap}
            </p>
            <p className="text-sm text-muted-foreground">Fully Diluted</p>
          </div>

          {/* 24h Volume */}
          <div className="glass-card p-6 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
              24h Volume
            </p>
            <p className="text-3xl font-bold text-foreground">
              {priceData.volume24h}
            </p>
            <p className="text-sm text-muted-foreground">Trading Activity</p>
          </div>

          {/* Holders */}
          <div className="glass-card p-6 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
              Total Holders
            </p>
            <p className="text-3xl font-bold text-foreground">
              {priceData.holders}
            </p>
            <p className="text-sm text-muted-foreground">Verified Wallets</p>
          </div>
        </div>

        {/* DEX Links */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <Button variant="sentinel" size="sm" className="gap-2">
            Trade on Uniswap
          </Button>
          <Button variant="secondary" size="sm" className="gap-2">
            Trade on Aerodrome
          </Button>
          <Button variant="secondary" size="sm" className="gap-2">
            View Chart
          </Button>
        </div>
      </div>
    </section>
  );
}
