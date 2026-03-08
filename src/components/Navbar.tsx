import { useState, useEffect } from 'react';
import { Wallet, Menu, X, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useWalletConnection } from '@/hooks/useWalletConnection';
import { Link } from 'react-router-dom';

const navItems = [
  { label: 'Documentation', href: '/docs', isRoute: true },
  { label: 'Sentinel Mint', href: '#sentinel', isRoute: false },
  { label: 'Roadmap', href: '#roadmap', isRoute: false },
  { label: 'Tokenomics', href: '#tokenomics', isRoute: false },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { 
    isConnected, 
    truncatedAddress, 
    handleConnect,
    disconnect,
    showConnectModal,
    closeConnectModal,
    connectWithConnector,
    connectors,
  } = useWalletConnection();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <WalletConnectModal
        open={showConnectModal}
        onClose={closeConnectModal}
        connectors={connectors}
        onSelectConnector={connectWithConnector}
      />
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "border-b border-primary/10 bg-background/90 backdrop-blur-xl shadow-lg shadow-background/20"
          : "bg-transparent"
      )}>
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="flex h-14 items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Link to="/" className="flex items-center gap-2 sm:gap-3">
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/20">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
                </div>
                <span className="text-base sm:text-lg font-semibold tracking-tight">
                  World of Underva
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:gap-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {item.isRoute ? (
                    <Link
                      to={item.href}
                      className="relative px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground group"
                    >
                      {item.label}
                      <span className="absolute inset-x-2 -bottom-px h-px bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className="relative px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground group"
                    >
                      {item.label}
                      <span className="absolute inset-x-2 -bottom-px h-px bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Wallet Button - Desktop */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden lg:flex lg:items-center lg:gap-2"
            >
              {isConnected ? (
                <Button
                  variant="wallet-connected"
                  size="sm"
                  onClick={() => disconnect()}
                  className="gap-2"
                >
                  <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  {truncatedAddress}
                </Button>
              ) : (
                <Button
                  variant="wallet"
                  size="sm"
                  onClick={handleConnect}
                  className="gap-2"
                >
                  <Wallet className="h-4 w-4" />
                  Connect Wallet
                </Button>
              )}
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="lg:hidden relative p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary/50 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 top-14 z-40"
            >
              <motion.div className="absolute inset-0 bg-background/95 backdrop-blur-xl" onClick={() => setIsOpen(false)} />
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                className="relative h-full flex flex-col px-6 py-8"
              >
                <div className="flex-1 flex flex-col">
                  <div className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {item.isRoute ? (
                        <Link
                          to={item.href}
                          className="flex items-center justify-between py-4 text-lg font-medium text-foreground border-b border-primary/10 hover:text-primary transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                          <span className="text-muted-foreground text-sm">→</span>
                        </Link>
                      ) : (
                        <a
                          href={item.href}
                          className="flex items-center justify-between py-4 text-lg font-medium text-foreground border-b border-primary/10 hover:text-primary transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                          <span className="text-muted-foreground text-sm">→</span>
                        </a>
                      )}
                    </motion.div>
                  ))}
                  </div>

                  {/* Wallet Button - directly below Tokenomics */}
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="pt-4">
                    {isConnected ? (
                      <Button variant="wallet-connected" size="lg" onClick={() => { disconnect(); setIsOpen(false); }} className="w-full gap-2 h-14 text-base">
                        <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                        {truncatedAddress}
                      </Button>
                    ) : (
                      <Button variant="wallet" size="lg" onClick={() => { handleConnect(); setIsOpen(false); }} className="w-full gap-2 h-14 text-base">
                        <Wallet className="h-5 w-5" />
                        Connect Wallet
                      </Button>
                    )}

                    {/* L1 & L2 badge directly under Connect Wallet */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex items-center justify-center gap-6 pt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-amber-500" />
                        Ethereum L1
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        Base L2
                      </span>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
