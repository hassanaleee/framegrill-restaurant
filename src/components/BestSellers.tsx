import React from "react";
import FoodCard from "./FoodCard";

const BEST_SELLERS = [
  {
    id: "b1",
    name: "Classic Smash Burger",
    description: "Double beef patty, American cheese, caramelized onions, house sauce on a brioche bun.",
    price: 850,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
  },
  {
    id: "b2",
    name: "Spicy Jalapeno Crunch",
    description: "Crispy chicken fillet, jalapenos, spicy mayo, fresh lettuce on a sesame bun.",
    price: 750,
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=80",
    badge: "Spicy",
  },
  {
    id: "b3",
    name: "The Smokey BBQ Burger",
    description: "Grilled beef, smoked gouda, onion rings, BBQ sauce, turkey bacon.",
    price: 1050,
    image: "https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&w=800&q=80",
    badge: "Chef's Pick",
  },
  {
    id: "p2",
    name: "Pepperoni Feast Pizza",
    description: "Loaded with premium beef pepperoni, mozzarella, and a dash of oregano.",
    price: 1500,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
  },
];

const BestSellers = () => {
  return (
    <section className="section-padding bg-background border-t border-border/30">
      <div className="container-width">
        <div className="text-center mb-12" data-aos="fade-up">
          <span className="text-accent uppercase tracking-[0.2em] font-bold text-sm md:text-base border-b border-accent pb-1 inline-block mb-4">
            Customer Favorites
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 uppercase tracking-tight">
            Our <span className="text-primary dark:text-accent font-playfair italic">Best Sellers</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Savor the flavor. These are the grill-house specialties that keep our community coming back for more.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {BEST_SELLERS.map((item) => (
            <FoodCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
