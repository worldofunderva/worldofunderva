import { MessageCircle, Youtube, BookOpen, Users, ArrowUpRight, Facebook, Linkedin } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal';
import { cn } from '@/lib/utils';

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 sm:h-5 sm:w-5 fill-current" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socialLinks = [
  { name: 'Telegram', icon: MessageCircle, url: 'https://t.me/worldofunderva', color: 'hover:bg-[#0088cc]/10 hover:border-[#0088cc]/50' },
  { name: 'X', icon: XIcon, url: 'https://x.com/worldofunderva?s=21', color: 'hover:bg-foreground/5 hover:border-foreground/20' },
  { name: 'YouTube', icon: Youtube, url: 'https://youtube.com/@worldofunderva', color: 'hover:bg-red-500/10 hover:border-red-500/50' },
  { name: 'Medium', icon: BookOpen, url: 'https://medium.com/@worldofunderva', color: 'hover:bg-foreground/5 hover:border-foreground/20' },
  { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/worldofunderva', color: 'hover:bg-[#1877F2]/10 hover:border-[#1877F2]/50' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/company/worldofunderva/', color: 'hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/50' },
  { name: 'Audit Report', icon: Users, url: '#', color: 'hover:bg-primary/10 hover:border-primary/50' },
];

export function CommunitySection() {
  return (
    <section id="community" className="py-12 sm:py-16 lg:py-20 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-2">
            Community
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Connect with World of Underva.
          </p>
        </ScrollReveal>

        <StaggerContainer className="flex flex-wrap justify-center gap-2 sm:gap-3" staggerDelay={0.05}>
          {socialLinks.map((social) => (
            <StaggerItem key={social.name}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "glass-card px-4 sm:px-5 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-3",
                  "transition-all duration-300 group active:scale-95",
                  social.color
                )}
              >
                <social.icon />
                <span className="text-xs sm:text-sm font-medium text-foreground">{social.name}</span>
                <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}