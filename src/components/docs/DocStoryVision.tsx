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
          World of Underva was founded on the belief that today's crypto economic landscape lacks the industrial 
          discipline needed for long term sustainability. We saw a persistent failure in models that prioritize 
          speculative volatility over tangible value. Our solution was to build a system that bridges digital and 
          physical worlds through <span className="text-foreground font-medium">Fashion, Stride, and Express</span>, 
          anchored by verified, autonomous audit protocols.
        </p>
      </div>

      {/* Vision */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="h-5 w-5 text-primary" />
          <h3 className="text-base font-semibold text-foreground">Our Vision</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We envision a future where digital ownership unlocks exclusive, real world value. Our mission is to 
          build a self-sustaining ecosystem where industrial excellence and blockchain integrity form the foundation 
          of every transaction. We aim to prove that combining high end commerce with rigorous, AI verified governance 
          creates a standard of institutional stewardship that goes beyond traditional crypto models.
        </p>
      </div>
    </div>
  );
}
