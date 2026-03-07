import { Sparkles, Target } from 'lucide-react';

export function DocStoryVision() {
  return (
    <div className="space-y-8">
      {/* Origin Story */}
      <div className="rounded-xl border border-primary/10 bg-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="text-base font-semibold text-foreground">The Origin Story</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          World of Underva was founded on the belief that the current crypto-economic landscape lacks the industrial 
          discipline necessary for long-term sustainability. We observed a persistent failure in models that prioritize 
          speculative volatility over tangible value. Our solution was to build a system that bridges the digital and 
          physical worlds — <span className="text-foreground font-medium">Fashion, Stride, and Express</span> — anchored 
          by verified, autonomous audit protocols.
        </p>
      </div>

      {/* Vision */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="h-5 w-5 text-primary" />
          <h3 className="text-base font-semibold text-foreground">Our Vision</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We envision a future where digital ownership is a gateway to exclusive, real-world value. Our mission is to 
          facilitate a self-sustaining ecosystem where industrial excellence and blockchain integrity are not just goals, 
          but the foundation of every transaction. We aim to prove that when you combine high-end commerce with rigorous, 
          AI-verified governance, you create a standard of institutional stewardship that transcends traditional crypto models.
        </p>
      </div>
    </div>
  );
}
