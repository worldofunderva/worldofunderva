import { forwardRef } from 'react';
import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export const Footer = forwardRef<HTMLElement>((_, ref) => {
  return (
    <footer ref={ref} className="border-t border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center rounded-lg bg-primary">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm sm:text-base font-semibold">World of Underva</span>
          </div>
          
          {/* Copyright */}
          <p className="text-[10px] sm:text-sm text-muted-foreground order-last sm:order-none">
            © 2025 World of Underva. All rights reserved.
          </p>
          
          {/* Network Indicators */}
          <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-amber-500" />
              Ethereum L1
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-primary" />
              Base L2
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
