import React, { useEffect } from "react";

// Section components
import Hero from "@/components/Hero";
import BestSellers from "@/components/BestSellers";
import About from "@/components/About";
import WhyChoose from "@/components/WhyChoose";
import Testimonials from "@/components/Testimonials";
import FoodGallery from "@/components/FoodGallery";

// Define the main sections of the homepage for easy customization and reordering
const SECTIONS = [
  { id: "hero", Component: Hero },
  { id: "best-sellers", Component: BestSellers },
  { id: "about", Component: About },
  { id: "why-choose", Component: WhyChoose },
  { id: "testimonials", Component: Testimonials },
  { id: "gallery", Component: FoodGallery },
];

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Render all page sections in defined order */}
      {SECTIONS.map(({ id, Component }) => (
        <section key={id} id={id}>
          <Component />
        </section>
      ))}
    </div>
  );
};

export default HomePage;
