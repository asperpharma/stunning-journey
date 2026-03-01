import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(219,166,166,0.15),transparent_50%)]" />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 text-accent-foreground text-sm mb-6">
            <Sparkles className="h-4 w-4" />
            Premium Skincare Collection
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-semibold text-foreground leading-tight mb-6">
            Discover Your
            <br />
            <span className="text-primary">Natural Glow</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl">
            Curated selection of luxury skincare products from the world's most
            trusted beauty brands. Reveal your skin's true radiance.
          </p>
          <Button size="lg" asChild>
            <a href="#products">
              Shop Now
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
