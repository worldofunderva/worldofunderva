import { MessageCircle, Bot, Users } from 'lucide-react';

const channels = [
  {
    icon: MessageCircle,
    title: 'Primary Interface',
    description: 'The private Sentinel Assembly Discord serves as the central hub for all ecosystem communication, automated notifications, and protocol updates.',
    highlight: true,
  },
  {
    icon: Bot,
    title: 'Automated Support',
    description: 'The Scanner and Calculator agents provide real-time, 24/7 automated support for all account-related queries and distribution verification.',
    highlight: false,
  },
  {
    icon: Users,
    title: 'Human-in-the-Loop Coordination',
    description: 'While the system operates autonomously, the human team remains available to review and approve transaction reports, addressing escalations that require oversight beyond protocol capabilities.',
    highlight: false,
  },
];

export function DocSupportChannels() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4">
        {channels.map((ch) => (
          <div
            key={ch.title}
            className={`rounded-xl border p-5 ${
              ch.highlight ? 'border-primary/20 bg-primary/5' : 'border-primary/10 bg-card'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                ch.highlight ? 'bg-primary/15 text-primary' : 'bg-secondary text-muted-foreground'
              }`}>
                <ch.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">{ch.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{ch.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
