import React from "react";
import OurStoryImg from "../assets/images/our-story.webp"; // Using the same image variable but we could use a burger image

// Constants for easy future customization
const SECTION_ID = "about";
const STATS = [
  { value: "100%", label: "Fresh Ingredients", delay: "800" },
  { value: "30m", label: "Fast Delivery", delay: "1000" },
  { value: "50K+", label: "Happy Cravings", delay: "1200" },
];

const About = () => {
  return (
    <section id={SECTION_ID} className="section-padding bg-background border-y border-border/50">
      <div className="container-width">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column: Story and statistics */}
          <div className="space-y-8" data-aos="fade-right">
            {/* Section Heading */}
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-4 uppercase tracking-tight">
                The <span className="text-primary dark:text-accent">FlameGrill</span> Difference
              </h2>
              <div className="w-24 h-2 bg-primary rounded-full mb-6" />
            </div>

            {/* Story Paragraphs */}
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p data-aos="fade-up" data-aos-delay="200" className="font-medium">
                Forget everything you know about fast food. At FlameGrill, we bring a premium dining experience straight to your cravings, combining fiery, smoky grilled flavors with unbeatable speed.
              </p>
              <p data-aos="fade-up" data-aos-delay="400">
                We believe that quick bites shouldn't mean compromising on quality. That's why we source only 100% fresh, locally-sourced ingredients. From our daily-baked brioche buns to our perfectly seasoned, smash-grilled beef patties, every detail is engineered for maximum flavor.
              </p>
              <p data-aos="fade-up" data-aos-delay="600">
                Whether you're grabbing a quick takeaway, dining in, or ordering our lightning-fast delivery, FlameGrill guarantees a mouth-watering experience that hits the spot every single time.
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50 mt-8">
              {STATS.map(({ value, label, delay }) => (
                <div
                  key={label}
                  className="text-center group"
                  data-aos="zoom-in"
                  data-aos-delay={delay}
                >
                  <div className="text-3xl md:text-4xl font-black text-primary dark:text-accent group-hover:scale-110 transition-transform duration-300">
                    {value}
                  </div>
                  <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground mt-2">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column: Story image and award card */}
          <div className="relative" data-aos="fade-left" data-aos-delay="400">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl group border-4 border-background">
              {/* Using a high-quality fast food image instead of the default fine dining interior */}
              <img
                src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=80"
                alt="FlameGrill Premium Burger"
                className="w-full h-[550px] object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay for visual depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            </div>

            {/* Floating Award Card */}
            <div
              className="absolute -bottom-8 -left-8 md:-left-12 bg-card p-6 rounded-2xl shadow-2xl border border-border/50 max-w-xs animate-bounce"
              style={{ animationDuration: '3s' }}
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <div className="flex items-center gap-4">
                <div className="bg-primary/20 text-primary p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-black uppercase tracking-wide text-lg text-foreground">
                    Best Burger
                  </h3>
                  <p className="text-muted-foreground text-sm font-medium mt-1">
                    Lahore Food Festival
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
