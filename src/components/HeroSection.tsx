import { ArrowDown, Zap, Lock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow delay-1000" />
      
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-medium text-muted-foreground">
            ETHEREUM L1 & BASE L2 SECURED
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="text-foreground">The Corporate Tender</span>
          <br />
          <span className="text-foreground">For </span>
          <span className="gradient-text">Disciplined RWA Consumption</span>
        </h1>

        {/* Sub-headline */}
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          A fixed supply of <span className="font-mono text-foreground">21,000,000</span> tokens 
          powering institutional-grade Real-World Asset tokenization across Fashion, Sportswear, and Logistics.
        </p>

        {/* Stats Row */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-8">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            <div className="text-left">
              <p className="text-sm font-medium text-foreground">21M Fixed</p>
              <p className="text-xs text-muted-foreground">Total Supply</p>
            </div>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <div className="text-left">
              <p className="text-sm font-medium text-foreground">Zero Tax</p>
              <p className="text-xs text-muted-foreground">Frictionless Commerce</p>
            </div>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <div className="text-left">
              <p className="text-sm font-medium text-foreground">2.0% Cashback</p>
              <p className="text-xs text-muted-foreground">Sentinel Holders</p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="sentinel" size="xl" asChild>
            <a href="#sentinel">
              Mint Sentinel NFT
            </a>
          </Button>
          <Button variant="sentinel-outline" size="xl" asChild>
            <a href="#tokenomics">
              View Tokenomics
            </a>
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 animate-bounce">
          <a href="#pillars" className="inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <span className="text-xs font-medium">Explore The Pillars</span>
            <ArrowDown className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
