import { useState } from 'react';
import { Shield, Copy, Check, ExternalLink, ArrowRightLeft, MessageCircle, Youtube, BookOpen, Users } from 'lucide-react';

const CONTRACT_ADDRESS = '0x1234...5678abcd';

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socialLinks = [
  { name: 'Telegram', icon: MessageCircle, url: '#' },
  { name: 'X', icon: XIcon, url: '#' },
  { name: 'YouTube', icon: Youtube, url: '#' },
  { name: 'Medium', icon: BookOpen, url: '#' },
  { name: 'Discord', icon: Users, url: '#' },
];

const bridgeLinks = [
  { name: 'Base Bridge', url: '#' },
  { name: 'Across', url: '#' },
  { name: 'Stargate', url: '#' },
];

export function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('0x1234567890abcdef1234567890abcdef12345678');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="border-t border-border bg-card/30">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Grid */}
        <div className="grid gap-8 md:grid-cols-3 mb-10">
          {/* Brand + Contract */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-semibold">World of Underva</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <code className="text-xs font-mono text-muted-foreground">{CONTRACT_ADDRESS}</code>
              <button onClick={handleCopy} className="text-muted-foreground hover:text-foreground">
                {copied ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
              </button>
            </div>
            <div className="flex gap-2">
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                <ExternalLink className="h-3 w-3" />Etherscan
              </a>
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                <ExternalLink className="h-3 w-3" />Basescan
              </a>
            </div>
          </div>

          {/* Bridge */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ArrowRightLeft className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Bridge</span>
            </div>
            <div className="space-y-2">
              {bridgeLinks.map((link) => (
                <a key={link.name} href={link.url} className="block text-sm text-muted-foreground hover:text-foreground">
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Community */}
          <div>
            <span className="text-sm font-medium mb-4 block">Community</span>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                  title={social.name}
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2025 World of Underva</p>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              ETH L1
            </span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Base L2
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
