import React from "react";

const GALLERY_ITEMS = [
  {
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    title: "Double Smash Burger",
    tag: "Premium Burgers",
    delay: "100",
  },
  {
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80",
    title: "Spicy Beef Wrap",
    tag: "Arabic Shawarma",
    delay: "200",
  },
  {
    image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=800&q=80",
    title: "Loaded Animal Fries",
    tag: "Sides & Fries",
    delay: "300",
  },
  {
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    title: "Pepperoni Pizza",
    tag: "Wood-Fired Pizza",
    delay: "400",
  },
  {
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    title: "Mint Margarita",
    tag: "Beverages",
    delay: "500",
  },
  {
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
    title: "Arabic Grill Platter",
    tag: "Arabic Shawarma",
    delay: "600",
  },
];

const FoodGallery = () => {
  return (
    <section className="section-padding bg-background border-t border-border/30">
      <div className="container-width">
        <div className="text-center mb-12" data-aos="fade-up">
          <span className="text-accent uppercase tracking-[0.2em] font-bold text-sm md:text-base border-b border-accent pb-1 inline-block mb-4">
            Visual Feast
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 uppercase tracking-tight">
            Our <span className="text-primary dark:text-accent font-playfair italic">Food Gallery</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get a preview of our fire-grilled creations. Each item is styled and crafted to look as good as it tastes.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {GALLERY_ITEMS.map(({ image, title, tag, delay }) => (
            <div
              key={title}
              data-aos="zoom-in"
              data-aos-delay={delay}
              className="relative overflow-hidden rounded-3xl group aspect-[4/5] md:aspect-square shadow-sm border border-border/30"
            >
              {/* Image */}
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A0411]/90 via-[#6D071A]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-4">
                <span className="text-white font-black uppercase tracking-wider text-xs md:text-sm line-clamp-2">
                  {title}
                </span>
                <span className="text-accent text-[10px] font-bold mt-0.5 uppercase tracking-widest">
                  {tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoodGallery;
