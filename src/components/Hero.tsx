import { Link } from "react-router-dom";

// Using a premium cinematic burger image from Unsplash
const HeroBG = "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1920&q=80";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: `url(${HeroBG})`,
      }}
    >
      {/* Luxurious Cinematic Overlay: Dark Wine to Maroon */}
      <div className="absolute inset-0 hero-gradient opacity-95"></div>

      {/* Content Container */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div data-aos="fade-down" data-aos-delay="50" className="mb-6 inline-block hover:scale-105 transition-transform duration-500">
          <span className="text-accent uppercase tracking-[0.3em] font-bold text-sm md:text-base border-b border-accent pb-1 drop-shadow-md">Premium Grill House</span>
        </div>
        
        <h1
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[1.1] tracking-tight drop-shadow-2xl"
        >
          Welcome to <span className="text-accent italic font-playfair drop-shadow-[0_0_20px_rgba(244,185,66,0.4)]">FlameGrill</span>
        </h1>

        <p
          data-aos="fade-up"
          data-aos-delay="300"
          className="text-lg sm:text-xl md:text-2xl text-gray-100 mb-10 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-md"
        >
          Where culinary artistry meets the fire. Experience perfectly seared, smoky flavors crafted with absolute passion and premium ingredients.
        </p>

        {/* Call-to-action buttons */}
        <div
          data-aos="fade-up"
          data-aos-delay="500"
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Link
            to="/menu"
            className="bg-accent hover:bg-white text-charcoal px-10 py-4 rounded-full text-lg font-black uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-[0_15px_30px_rgba(244,185,66,0.4)] shadow-xl"
          >
            Explore Menu
          </Link>

          <Link
            to="/menu"
            className="bg-transparent border-2 border-white/50 text-white hover:bg-white hover:text-primary hover:border-white px-10 py-4 rounded-full text-lg font-bold uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 shadow-xl backdrop-blur-sm"
          >
            Order Now
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        data-aos="fade-up"
        data-aos-delay="800"
      >
        <div className="w-8 h-12 border-2 border-accent/50 rounded-full flex justify-center backdrop-blur-md hover:border-accent transition-colors">
          <div className="w-1.5 h-3 bg-accent rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
