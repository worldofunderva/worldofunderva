import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'General Participation',
    answer: 'Participants can query the Announcer Agent for status updates on rewards, distribution cycles, or general ecosystem information.',
  },
  {
    question: 'Reward Verification',
    answer: 'Users can request verification of individual wallet calculations directly through the AI managed interface to confirm specific cashback or dividend distributions.',
  },
  {
    question: 'Technical Support',
    answer: 'For issues related to Sentinel NFT transfers or smart contract interactions, users should refer to the official technical support documentation maintained by the protocol.',
  },
  {
    question: 'Operational Inquiries',
    answer: 'For questions about payment logging or audit status, participants can review the automated logs broadcast in the private Sentinel Assembly Discord.',
  },
];

export function DocFAQ() {
  return (
    <div className="space-y-8">
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
        World of Underva uses an automated support framework to ensure rapid, transparent, and accurate 
        resolution of participant queries.
      </p>

      <div className="space-y-3">
        {faqs.map((faq) => (
          <div key={faq.question} className="rounded-xl border border-primary/10 bg-card p-5">
            <div className="flex items-start gap-3">
              <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1.5">{faq.question}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
