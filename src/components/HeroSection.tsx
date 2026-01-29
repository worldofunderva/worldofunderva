import { ArrowDown, Zap, Lock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20 pb-12 sm:pt-16 sm:pb-0">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Gradient Orbs - Adjusted for mobile */}
      <div className="absolute top-1/4 left-0 sm:left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-0 sm:right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow delay-1000" />
      
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 sm:mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] sm:text-xs font-medium text-muted-foreground">
            ETHEREUM L1 & BASE L2 SECURED
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1]"
        >
          <span className="text-foreground">The Corporate Tender</span>
          <br />
          <span className="text-foreground">For </span>
          <span className="gradient-text">Disciplined RWA Consumption</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mx-auto mb-6 sm:mb-8 max-w-2xl text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground px-2"
        >
          A fixed supply of <span className="font-mono text-foreground">21,000,000</span> tokens 
          powering institutional-grade Real-World Asset tokenization across Fashion, Sportswear, and Logistics.
        </motion.p>

        {/* Stats Row - Redesigned for mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-8 sm:mb-10 grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-8 max-w-md sm:max-w-none mx-auto"
        >
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-3 sm:p-0 rounded-xl bg-card/50 sm:bg-transparent border border-border/50 sm:border-0">
            <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <div className="text-center sm:text-left">
              <p className="text-xs sm:text-sm font-medium text-foreground">21M Fixed</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">Total Supply</p>
            </div>
          </div>
          <div className="hidden sm:block h-8 w-px bg-border" />
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-3 sm:p-0 rounded-xl bg-card/50 sm:bg-transparent border border-border/50 sm:border-0">
            <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <div className="text-center sm:text-left">
              <p className="text-xs sm:text-sm font-medium text-foreground">Zero Tax</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">Frictionless Commerce</p>
            </div>
          </div>
          <div className="hidden sm:block h-8 w-px bg-border" />
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-3 sm:p-0 rounded-xl bg-card/50 sm:bg-transparent border border-border/50 sm:border-0">
            <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <div className="text-center sm:text-left">
              <p className="text-xs sm:text-sm font-medium text-foreground">2.0% Cashback</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">Sentinel Holders</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <Button variant="sentinel" size="lg" className="w-full sm:w-auto text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-8" asChild>
            <a href="#sentinel">
              Mint Sentinel NFT
            </a>
          </Button>
          <Button variant="sentinel-outline" size="lg" className="w-full sm:w-auto text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-8" asChild>
            <a href="#tokenomics">
              View Tokenomics
            </a>
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-12 sm:mt-16 animate-bounce"
        >
          <a href="#pillars" className="inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <span className="text-[10px] sm:text-xs font-medium">Explore The Pillars</span>
            <ArrowDown className="h-4 w-4 sm:h-5 sm:w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}