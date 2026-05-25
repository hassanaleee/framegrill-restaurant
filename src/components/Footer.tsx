import React from 'react';
import Logo from "../assets/images/logo.png"; // We can keep using this logo or let it be for now
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const SOCIAL_LINKS = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
];

const QUICK_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Menu', href: '/menu' },
  { name: 'Contact', href: '/contact' },
  { name: 'Cart', href: '/cart' },
];

const CONTACT_INFO = {
  address: ['Gulberg Street 12', 'Lahore, Pakistan'],
  phone: '+92 300 1234567',
  email: 'orders@flamegrill.pk',
};

const HOURS = [
  { days: 'Mon - Thu', time: '12:00 PM - 11:00 PM' },
  { days: 'Fri - Sun', time: '12:00 PM - 1:00 AM' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-[#4A0411] to-[#6D071A] text-white border-t-4 border-accent mt-6 md:mt-10 shadow-2xl relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="container-width py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Description */}
          <div className="space-y-6">
            <div className="flex-shrink-0 bg-white/10 px-6 py-4 rounded-2xl inline-flex items-center gap-2 backdrop-blur-md border border-white/10 hover:border-accent/30 transition-all duration-300">
              <span className="text-accent text-2xl animate-pulse">🔥</span>
              <span className="text-2xl font-black text-white tracking-wider uppercase font-playfair">
                Frame<span className="text-accent">Grill</span>
              </span>
            </div>
            <p className="text-white/80 leading-relaxed font-light text-lg">
              Experience the finest smoky flavors crafted with premium ingredients and unparalleled passion.
            </p>
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map(({ name, icon: Icon, href }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-accent hover:bg-accent hover:text-[#4A0411] transition-all duration-300 transform hover:scale-110 shadow-lg"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-black text-white uppercase tracking-widest border-b border-white/20 pb-4 inline-block">Quick Links</h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map(({ name, href }) => (
                <li key={name}>
                  <Link
                    to={href}
                    className="text-white/80 hover:text-accent font-medium transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-accent mr-0 transition-all duration-300 group-hover:w-3 group-hover:mr-2"></span>
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h4 className="text-xl font-black text-white uppercase tracking-widest border-b border-white/20 pb-4 inline-block">Contact</h4>
            <div className="space-y-4 text-white/80 font-light">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  {CONTACT_INFO.address.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <p>{CONTACT_INFO.phone}</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <p><a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-accent transition-colors">{CONTACT_INFO.email}</a></p>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="space-y-6">
            <h4 className="text-xl font-black text-white uppercase tracking-widest border-b border-white/20 pb-4 inline-block">Hours</h4>
            <div className="space-y-4 text-white/80 font-light">
              {HOURS.map(({ days, time }) => (
                <div key={days} className="flex justify-between border-b border-white/10 pb-2">
                  <span className="font-bold">{days}</span>
                  <span className="text-accent font-medium">{time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-12 pt-8 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 font-light text-sm">
            © {currentYear} FlameGrill Premium Fast Food. All rights reserved.
          </p>
          <p className="text-white/60 font-light text-sm">
            Made with <span className="text-accent">♥</span> for great food.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
