import { forwardRef } from 'react';
import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export const Footer = forwardRef<HTMLElement>((_, ref) => {
  return (
    <footer ref={ref} className="border-t border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-8 sm:py-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-5"
        >
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center rounded-lg bg-primary">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-base font-semibold">World of Underva</span>
          </div>
          
          {/* Copyright */}
          <p className="text-xs sm:text-sm text-muted-foreground order-last sm:order-none">
            © 2025 World of Underva. All rights reserved.
          </p>
          
          {/* Network Indicators */}
          <div className="flex items-center gap-4 text-xs sm:text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              Ethereum L1
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Base L2
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
