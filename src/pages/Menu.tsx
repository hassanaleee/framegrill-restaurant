import React, { useEffect, useState } from 'react';
import FoodCard from '../components/FoodCard';
import { API_BASE_URL } from '../config';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
}

interface Category {
  id: string;
  name: string;
  items: MenuItem[];
}

const Menu = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchMenu = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_BASE_URL}/products/categories`);
        if (!res.ok) {
          throw new Error('Failed to fetch menu data');
        }
        const data = await res.json();
        setCategories(data.categories || []);
      } catch (err: unknown) {
        console.error('Error fetching menu:', err);
        const errorMessage = err instanceof Error ? err.message : 'Something went wrong while loading the menu. Please make sure the server is running.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-background">
        <div className="container-width">
          <div className="text-center mb-12 animate-pulse">
            <div className="h-10 w-48 bg-muted rounded mx-auto mb-4"></div>
            <div className="h-6 w-96 bg-muted rounded mx-auto"></div>
          </div>
          <div className="space-y-16">
            {[1, 2].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-8 w-40 bg-muted rounded mb-8"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="border border-border/50 rounded-3xl p-4 bg-card h-[380px] flex flex-col justify-between">
                      <div className="h-48 bg-muted rounded-2xl w-full mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-6 bg-muted rounded w-2/3"></div>
                        <div className="h-4 bg-muted rounded w-full"></div>
                        <div className="h-4 bg-muted rounded w-5/6"></div>
                      </div>
                      <div className="flex justify-between items-center mt-6">
                        <div className="h-6 bg-muted rounded w-1/4"></div>
                        <div className="h-10 bg-muted rounded-full w-1/3"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex flex-col items-center justify-center container-width text-center">
        <div className="bg-primary/10 dark:bg-accent/10 w-24 h-24 rounded-full flex items-center justify-center mb-6 text-primary dark:text-accent">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold mb-4">Could not load the menu</h2>
        <p className="text-muted-foreground mb-8 max-w-md">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-primary dark:bg-accent hover:bg-primary/90 dark:hover:bg-accent/90 text-primary-foreground dark:text-accent-foreground px-8 py-3 rounded-full font-medium transition-transform active:scale-95 shadow-md"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-width">
        <div className="text-center mb-12" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Menu</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our premium fast food selection. Crafted with high-quality ingredients and bursting with flavor.
          </p>
        </div>

        <div className="space-y-16">
          {categories.map((category) => (
            <div key={category.id} id={category.id} className="scroll-mt-24">
              <h2 
                className="text-3xl font-bold border-b-2 border-primary dark:border-accent inline-block pb-2 mb-8 text-foreground"
                data-aos="fade-right"
              >
                {category.name}
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map((item) => (
                  <FoodCard key={item.id} {...item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;

