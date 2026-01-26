import { MessageCircle, Youtube, BookOpen, Users, ArrowUpRight } from 'lucide-react';

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
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

export function CommunitySection() {
  return (
    <section id="community" className="py-16 lg:py-20 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-2">
            Community
          </h2>
          <p className="text-sm text-muted-foreground">
            Connect with the Underva network.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card px-5 py-3 flex items-center gap-3 hover:border-primary/50 transition-colors group"
            >
              <social.icon />
              <span className="text-sm font-medium text-foreground">{social.name}</span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
