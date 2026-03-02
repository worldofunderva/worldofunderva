import { ArrowDown, Zap, Lock, Shield, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20 pb-12 sm:pt-16 sm:pb-0">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Gradient Orbs */}
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
          <span className="text-foreground">The Institutional Standard</span>
          <br />
          <span className="text-foreground">For </span>
          <span className="gradient-text">Disciplined RWA Consumption</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mx-auto mb-8 sm:mb-10 max-w-2xl text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground px-2"
        >
          An immutable ecosystem with a fixed <span className="font-mono text-foreground">21,000,000</span> supply 
          engineered for multi-layer RWA security across{' '}
          <span className="text-foreground font-semibold">Fashion</span>,{' '}
          <span className="text-foreground font-semibold">Sportswear</span>, and{' '}
          <span className="text-foreground font-semibold">Logistics</span>.
        </motion.p>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-8 sm:mb-10 flex flex-row items-center justify-center gap-4 sm:gap-8 lg:gap-10"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <Lock className="h-5 w-5 sm:h-6 sm:w-6 text-primary shrink-0" />
            <div className="text-left">
              <p className="text-xs sm:text-sm font-medium text-foreground whitespace-nowrap">21M Fixed</p>
              <p className="text-[9px] sm:text-xs text-muted-foreground whitespace-nowrap">Total Supply</p>
            </div>
          </div>
          <div className="h-10 w-px bg-border shrink-0" />
          <div className="flex items-center gap-2 sm:gap-3">
            <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-primary shrink-0" />
            <div className="text-left">
              <p className="text-xs sm:text-sm font-medium text-foreground whitespace-nowrap">Zero Tax</p>
              <p className="text-[9px] sm:text-xs text-muted-foreground whitespace-nowrap">No Fees</p>
            </div>
          </div>
          <div className="h-10 w-px bg-border shrink-0" />
          <div className="flex items-center gap-2 sm:gap-3">
            <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary shrink-0" />
            <div className="text-left">
              <p className="text-xs sm:text-sm font-medium text-foreground whitespace-nowrap">Dual-Yield</p>
              <p className="text-[9px] sm:text-xs text-muted-foreground whitespace-nowrap">Automated</p>
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
          <Button variant="sentinel" size="lg" className="w-full sm:w-auto text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-8 rounded-full" asChild>
            <a href="#sentinel">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
              Mint Sentinel NFT
            </a>
          </Button>
          <Button variant="sentinel-outline" size="lg" className="w-full sm:w-auto text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-8 rounded-full" asChild>
            <Link to="/docs">
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
              Explore Documentation
            </Link>
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
