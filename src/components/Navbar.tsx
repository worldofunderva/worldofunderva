import { useState } from 'react';
import { Wallet, Menu, X, Shield, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/contexts/WalletContext';

const navItems = [
  { label: 'Tokenomics', href: '#tokenomics' },
  { label: 'RWA Pillars', href: '#pillars' },
  { label: 'Sentinel', href: '#sentinel' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isConnected, address, connectWallet, disconnectWallet } = useWallet();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              World of Underva
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Wallet Button */}
          <div className="hidden md:block">
            {isConnected ? (
              <Button
                variant="wallet-connected"
                size="sm"
                onClick={disconnectWallet}
                className="gap-2"
              >
                <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                {address}
              </Button>
            ) : (
              <Button
                variant="wallet"
                size="sm"
                onClick={connectWallet}
                className="gap-2"
              >
                <Wallet className="h-4 w-4" />
                Connect Wallet
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="space-y-1 px-4 py-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4">
              {isConnected ? (
                <Button
                  variant="wallet-connected"
                  size="sm"
                  onClick={disconnectWallet}
                  className="w-full gap-2"
                >
                  <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  {address}
                </Button>
              ) : (
                <Button
                  variant="wallet"
                  size="sm"
                  onClick={connectWallet}
                  className="w-full gap-2"
                >
                  <Wallet className="h-4 w-4" />
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
