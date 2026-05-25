import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Sun, Moon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

// Navigation link configuration
const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Contact", href: "/contact" },
  { name: "Cart", href: "/cart" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();

  // Theme state initialization
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  // Handle scroll event to toggle background blur and shadow
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Synchronize theme with class list and localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gradient-to-r from-[#4A0411] to-[#6D071A] shadow-xl shadow-black/20 border-b border-accent/15"
    >
      <nav className="container-width">
        <div className={`flex items-center justify-between transition-all duration-300 ${hasScrolled ? "h-14 md:h-16" : "h-16 md:h-20"}`}>
          {/* Brand Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2 group select-none">
              <span className="text-2xl md:text-3xl font-black text-white tracking-wider uppercase font-playfair transition-all duration-300 flex items-center gap-1.5">
                <span className="text-accent animate-pulse">🔥</span>
                <span>Frame<span className="text-accent">Grill</span></span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex ml-10 space-x-6 items-center">
            {NAV_ITEMS.filter(item => item.name !== "Cart").map(({ name, href }) => {
              const isActive = location.pathname === href;
              return (
                <Link
                  key={name}
                  to={href}
                  className={`px-3 py-2 text-sm font-bold transition-colors duration-200 relative group uppercase tracking-widest ${
                    isActive ? "text-accent" : "text-white/80 hover:text-accent"
                  }`}
                >
                  {name}
                  <span 
                    className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              );
            })}
            
            {/* Theme Toggle Button Desktop */}
            <button
              onClick={toggleTheme}
              className="p-2 text-white/80 hover:text-accent transition-colors transform hover:rotate-12 duration-300 focus:outline-none"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 fill-white/10" />
              ) : (
                <Sun className="w-5 h-5 text-accent fill-accent/10" />
              )}
            </button>
            
            {/* Cart Icon Desktop */}
            <Link to="/cart" className="relative p-2 text-white/80 hover:text-accent transition-colors transform hover:scale-110 duration-200">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-accent-foreground text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-in zoom-in shadow-md border-2 border-[#6D071A]">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Toggle & Cart */}
          <div className="md:hidden flex items-center gap-2">
            {/* Theme Toggle Button Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 text-white/80 hover:text-accent transition-colors transform hover:rotate-12 duration-300 focus:outline-none"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 fill-white/10" />
              ) : (
                <Sun className="w-5 h-5 text-accent fill-accent/10" />
              )}
            </button>
            
            {/* Cart Icon Mobile */}
            <Link to="/cart" className="relative p-2 text-white/80 hover:text-accent transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-accent-foreground text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#6D071A] shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-accent focus:outline-none transition-colors duration-200 p-1"
              aria-label="Toggle navigation menu"
            >
              <div className="relative w-7 h-7 flex items-center justify-center">
                <Menu className={`absolute w-7 h-7 transition-all duration-300 transform ${isMenuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`} />
                <X className={`absolute w-7 h-7 transition-all duration-300 transform ${isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          className={`md:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-2xl shadow-2xl border-t border-border transition-all duration-400 ease-in-out overflow-hidden origin-top ${
            isMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 py-6 space-y-3">
            {NAV_ITEMS.map(({ name, href }) => {
              const isActive = location.pathname === href;
              return (
                <Link
                  key={name}
                  to={href}
                  className={`block px-5 py-4 text-lg font-black uppercase tracking-wider rounded-2xl transition-all duration-300 transform ${
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-md translate-x-2" 
                      : "text-foreground hover:bg-muted hover:translate-x-1"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    {name}
                    {name === "Cart" && cartCount > 0 && (
                      <span className="bg-accent text-charcoal text-sm px-3 py-1 rounded-full shadow-sm">
                        {cartCount} items
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
