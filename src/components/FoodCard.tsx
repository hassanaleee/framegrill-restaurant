import React from 'react';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

type FoodCardProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
};

const FoodCard: React.FC<FoodCardProps> = ({ id, name, description, price, image, badge }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, name, price, image });
  };

  return (
    <div className="group relative bg-card rounded-[2rem] shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(109,7,26,0.15)] transition-all duration-500 overflow-hidden border border-border/50 flex flex-col h-full transform hover:-translate-y-2" data-aos="fade-up">
      {badge && (
        <div className="absolute top-4 right-4 z-10 bg-accent text-accent-foreground text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
          {badge}
        </div>
      )}
      
      <div className="relative h-56 sm:h-64 overflow-hidden rounded-t-[2rem]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity z-10" />
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
          loading="lazy"
        />
      </div>

      <div className="p-6 md:p-8 flex flex-col flex-grow bg-card relative z-20">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl md:text-2xl font-black text-foreground line-clamp-1 group-hover:text-primary transition-colors tracking-tight">{name}</h3>
        </div>
        <p className="text-muted-foreground text-base leading-relaxed line-clamp-2 mb-6 flex-grow">{description}</p>
        
        <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/50">
          <span className="text-2xl font-black text-primary">
            Rs. {price.toLocaleString()}
          </span>
          <button 
            onClick={handleAddToCart}
            className="flex items-center justify-center bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground h-12 w-12 rounded-full transition-all duration-300 active:scale-95 shadow-md hover:shadow-[0_0_15px_rgba(244,185,66,0.4)]"
            aria-label={`Add ${name} to cart`}
          >
            <Plus size={24} className="stroke-[3px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
