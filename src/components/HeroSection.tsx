import { Lock, Zap, Shield, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Subtle background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Network Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1.5">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            <span className="text-[10px] font-medium text-muted-foreground">ETH</span>
          </div>
          <span className="text-muted-foreground">/</span>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="text-[10px] font-medium text-muted-foreground">BASE</span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
          <span className="text-foreground">RWA-Backed Token</span>
          <br />
          <span className="gradient-text">Fashion · Sportswear · Logistics</span>
        </h1>

        {/* Value Prop */}
        <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
          Fixed <span className="font-mono text-foreground">21,000,000</span> supply. Zero transaction tax. 
          Real businesses. Real revenue.
        </p>

        {/* Key Metrics - Investor focused */}
        <div className="mb-8 inline-flex flex-wrap items-center justify-center gap-6 rounded-xl border border-border bg-card/50 px-6 py-4">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-primary" />
            <span className="text-sm"><span className="font-mono font-semibold">21M</span> Fixed</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-success" />
            <span className="text-sm"><span className="font-mono font-semibold">0%</span> Tax</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm"><span className="font-mono font-semibold">2%</span> Cashback</span>
          </div>
        </div>

        {/* Single CTA */}
        <div className="flex justify-center">
          <Button variant="sentinel" size="lg" asChild>
            <a href="#tokenomics">View Tokenomics</a>
          </Button>
        </div>

        {/* Scroll Hint */}
        <div className="mt-12">
          <a href="#tokenomics" className="inline-flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
