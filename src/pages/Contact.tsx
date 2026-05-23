import React, { useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Navigation, Bike } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully! We'll get back to you soon.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container-width">
        <div className="text-center mb-16" data-aos="fade-up">
          <h1 className="text-4xl md:text-6xl font-black text-foreground mb-4 uppercase tracking-tight">Contact <span className="text-primary">FlameGrill</span></h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Craving that smoky goodness? Reach out to us for orders, reservations, or just to say hi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          {/* Contact Information (Left Col) */}
          <div className="lg:col-span-5 space-y-10" data-aos="fade-right">
            
            <div className="bg-card border border-border/50 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold mb-8 uppercase tracking-wide border-b border-border/50 pb-4">Our Location</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-5 group">
                  <div className="bg-primary/10 p-3 rounded-2xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Address</h3>
                    <p className="text-muted-foreground mt-1">Gulberg Street 12<br/>Lahore, Pakistan</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="bg-primary/10 p-3 rounded-2xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Phone</h3>
                    <p className="text-muted-foreground mt-1">+92 300 1234567</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="bg-primary/10 p-3 rounded-2xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Email</h3>
                    <p className="text-muted-foreground mt-1"><a href="mailto:orders@flamegrill.pk" className="hover:text-primary transition-colors">orders@flamegrill.pk</a></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border/50 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold mb-6 uppercase tracking-wide border-b border-border/50 pb-4">Hours & Delivery</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-5 group">
                  <div className="bg-primary/10 p-3 rounded-2xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Opening Hours</h3>
                    <p className="text-muted-foreground mt-1">Mon - Thu: 12:00 PM - 11:00 PM</p>
                    <p className="text-muted-foreground">Fri - Sun: 12:00 PM - 1:00 AM</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="bg-primary/10 p-3 rounded-2xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Bike className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Delivery & Takeaway</h3>
                    <p className="text-muted-foreground mt-1">Available across Lahore via our website or Foodpanda. Self-pickup is 10% off!</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Map and Contact Form (Right Col) */}
          <div className="lg:col-span-7 space-y-8" data-aos="fade-left">
            
            {/* Map Placeholder */}
            <div className="w-full h-64 bg-muted border border-border/50 rounded-3xl overflow-hidden relative group">
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm group-hover:bg-background/30 transition-all z-10">
                <Navigation className="w-10 h-10 text-primary mb-3" />
                <span className="font-bold text-lg">Map View</span>
                <span className="text-sm text-muted-foreground">Gulberg Street 12, Lahore</span>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80" 
                alt="Map Placeholder" 
                className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 transition-opacity duration-500"
              />
            </div>

            {/* Form */}
            <div className="bg-card border border-border/50 p-8 md:p-10 rounded-3xl shadow-sm">
              <h2 className="text-3xl font-black mb-8 uppercase">Drop a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold mb-2 text-muted-foreground uppercase tracking-wider">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      className="w-full px-5 py-4 rounded-2xl border border-border/50 bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all shadow-inner"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold mb-2 text-muted-foreground uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      required
                      className="w-full px-5 py-4 rounded-2xl border border-border/50 bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all shadow-inner"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-bold mb-2 text-muted-foreground uppercase tracking-wider">Message</label>
                  <textarea 
                    id="message" 
                    rows={5}
                    required
                    className="w-full px-5 py-4 rounded-2xl border border-border/50 bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all shadow-inner resize-none"
                    placeholder="Tell us what's on your mind..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 rounded-2xl font-black text-lg transition-transform active:scale-95 shadow-lg uppercase tracking-wider"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
