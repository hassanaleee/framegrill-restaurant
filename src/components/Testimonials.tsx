import React from 'react';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Ahmed",
    role: "Local Foodie",
    content: "Absolutely phenomenal! The smokey flavors of the BBQ burger are unmatched in Lahore. FlameGrill has become our go-to weekend spot. The ambiance is just as premium as the food.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    name: "Ali Hassan",
    role: "Regular Customer",
    content: "The Arabic Shawarma Platter is incredibly authentic. You can taste the quality and freshness of the ingredients. Fast delivery, perfectly packaged, and always piping hot.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    name: "Fatima Noor",
    role: "Food Blogger",
    content: "A premium fast-food experience from start to finish. The Margherita pizza has the perfect wood-fired crust. The staff is courteous, and the interior is stunningly warm.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="section-padding bg-muted/30 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3"></div>

      <div className="container-width relative z-10">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-accent uppercase tracking-[0.2em] font-bold text-sm md:text-base border-b border-accent pb-1 inline-block mb-4">
            Customer Reviews
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6">
            Hear From Our <span className="text-primary italic font-playfair">Guests</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Don't just take our word for it. See what our community says about their FlameGrill experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              className="bg-card rounded-[2rem] p-8 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(109,7,26,0.12)] transition-all duration-500 border border-border/40 transform hover:-translate-y-2 relative group"
            >
              {/* Quote Icon Background */}
              <div className="absolute top-6 right-8 text-primary/10 font-serif text-8xl leading-none select-none group-hover:text-primary/20 transition-colors duration-500">
                "
              </div>
              
              <div className="flex gap-1 mb-6 relative z-10">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              
              <p className="text-muted-foreground italic mb-8 relative z-10 leading-relaxed text-lg">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-4 relative z-10 mt-auto pt-6 border-t border-border/50">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-accent shadow-sm"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-bold text-foreground text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-primary font-medium">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
