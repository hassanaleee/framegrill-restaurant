import React from "react";
import { Flame, Zap, Award, Heart } from "lucide-react";

const FEATURES = [
  {
    icon: Flame,
    title: "Flame-Grilled Fresh",
    description: "Every patty smash-grilled to order over high heat to lock in fiery, smoky flavors.",
    delay: "100",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "Hot, freshly-prepared bites delivered straight to your doorstep in 30 minutes or less.",
    delay: "250",
  },
  {
    icon: Award,
    title: "Premium Ingredients",
    description: "We use only 100% fresh, locally-sourced meats and handpicked crisp produce daily.",
    delay: "400",
  },
  {
    icon: Heart,
    title: "Loved By Foodies",
    description: "Our passion for flavor makes us the top-rated grill-house with 50K+ satisfied cravings.",
    delay: "555",
  },
];

const WhyChoose = () => {
  return (
    <section className="section-padding bg-muted/30 border-y border-border/30 relative overflow-hidden">
      {/* Subtle decorative glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-width relative z-10">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-accent uppercase tracking-[0.2em] font-bold text-sm md:text-base border-b border-accent pb-1 inline-block mb-4">
            The Grillhouse Standard
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 uppercase tracking-tight">
            Why Choose <span className="text-primary dark:text-accent font-playfair italic">FrameGrill</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We don't do compromises. From the flame to the box, we design every bite to satisfy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map(({ icon: Icon, title, description, delay }) => (
            <div
              key={title}
              data-aos="fade-up"
              data-aos-delay={delay}
              className="bg-card border border-border/40 p-8 rounded-[2rem] shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(109,7,26,0.1)] hover:-translate-y-2 transition-all duration-300 group flex flex-col items-center text-center md:items-start md:text-left"
            >
              <div className="w-14 h-14 bg-primary/10 dark:bg-accent/10 rounded-2xl flex items-center justify-center text-primary dark:text-accent mb-6 group-hover:scale-115 transition-transform duration-300 shadow-inner">
                <Icon className="w-6 h-6 stroke-[2.5px]" />
              </div>
              <h3 className="text-xl font-black text-foreground mb-3 tracking-tight group-hover:text-primary dark:group-hover:text-accent transition-colors">
                {title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
