import { MessageCircle, Youtube, BookOpen, Users, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Using Lucide icons as Twitter/X icon isn't available, using a custom approach
const XIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socialLinks = [
  {
    name: 'Telegram',
    description: 'Join our global community for real-time updates and discussions',
    icon: MessageCircle,
    members: '15,000+ members',
    url: '#',
    color: 'bg-[#0088cc]/10 text-[#0088cc]',
  },
  {
    name: 'X (Twitter)',
    description: 'Follow us for announcements, partnerships, and ecosystem news',
    icon: XIcon,
    members: '25,000+ followers',
    url: '#',
    color: 'bg-foreground/10 text-foreground',
  },
  {
    name: 'YouTube',
    description: 'Watch tutorials, AMAs, and deep dives into RWA tokenization',
    icon: Youtube,
    members: '5,000+ subscribers',
    url: '#',
    color: 'bg-[#ff0000]/10 text-[#ff0000]',
  },
  {
    name: 'Medium',
    description: 'Read in-depth articles on our technology and vision',
    icon: BookOpen,
    members: '100+ articles',
    url: '#',
    color: 'bg-foreground/10 text-foreground',
  },
  {
    name: 'Discord',
    description: 'Connect with developers and power users in our tech hub',
    icon: Users,
    members: '8,000+ members',
    url: '#',
    color: 'bg-[#5865F2]/10 text-[#5865F2]',
  },
];

export function CommunitySection() {
  return (
    <section id="community" className="py-20 lg:py-28 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-primary/10 text-primary rounded-full mb-4">
            Global Network
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Join the Underva Community
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with fellow Sentinels, stay updated on ecosystem developments, 
            and participate in shaping the future of RWA tokenization.
          </p>
        </div>

        {/* Social Links Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-6 group hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${social.color}`}>
                  <social.icon />
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
              </div>
              
              <h3 className="font-semibold text-foreground text-lg mb-2">
                {social.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {social.description}
              </p>
              
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs text-muted-foreground">{social.members}</span>
              </div>
            </a>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 glass-card p-8 max-w-3xl mx-auto text-center">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Stay Ahead of the Curve
          </h3>
          <p className="text-muted-foreground mb-6">
            Subscribe to our newsletter for exclusive insights, early access announcements, 
            and institutional-grade market analysis.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-11 px-4 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Button variant="sentinel" className="h-11">
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
