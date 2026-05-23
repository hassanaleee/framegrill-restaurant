import React, { useEffect } from "react";

// Section components
import Hero from "@/components/Hero";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";

// Define the main sections of the homepage for easy customization and reordering
const SECTIONS = [
  { id: "hero", Component: Hero },
  { id: "about", Component: About },
  { id: "testimonials", Component: Testimonials },
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
