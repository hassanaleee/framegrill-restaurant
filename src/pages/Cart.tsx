import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { API_BASE_URL } from '../config';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    try {
      setIsSubmitting(true);
      const subtotal = cartTotal;
      const tax = Math.round(cartTotal * 0.16);
      const deliveryFee = 150;
      const totalAmount = subtotal + tax + deliveryFee;

      const orderData = {
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        customerDetails,
        subtotal,
        tax,
        deliveryFee,
        totalAmount
      };

      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      if (!res.ok) {
        throw new Error('Failed to place order. Server returned error.');
      }

      const data = await res.json();
      toast.success(`Order placed successfully! Reference ID: ${data._id}`);
      clearCart();
    } catch (err: unknown) {
      console.error('Checkout error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong while placing your order. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex flex-col items-center justify-center container-width text-center">
        <div className="bg-muted w-24 h-24 rounded-full flex items-center justify-center mb-6">
          <Trash2 className="w-10 h-10 text-muted-foreground" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8 max-w-md">Looks like you haven't added any premium meals to your cart yet.</p>
        <Link 
          to="/menu" 
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full font-medium transition-transform active:scale-95 inline-flex items-center gap-2"
        >
          Explore Menu <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-width">
        <h1 className="text-4xl font-bold mb-10 text-foreground" data-aos="fade-right">Your Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Cart Items List */}
          <div className="lg:w-2/3 space-y-4">
            {cart.map((item) => (
              <div 
                key={item.id} 
                className="flex flex-col sm:flex-row items-center gap-4 bg-background border border-border/50 rounded-2xl p-4 shadow-sm"
                data-aos="fade-up"
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-24 h-24 object-cover rounded-xl"
                />
                
                <div className="flex-grow text-center sm:text-left">
                  <h3 className="text-lg font-bold text-foreground">{item.name}</h3>
                  <p className="text-primary font-bold mt-1">Rs. {item.price.toLocaleString()}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-muted rounded-full p-1">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-background border border-border/50 rounded-2xl p-6 shadow-sm sticky top-28" data-aos="fade-left">
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>
              
              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>Rs. {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax (16%)</span>
                  <span>Rs. {Math.round(cartTotal * 0.16).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery</span>
                  <span>Rs. 150</span>
                </div>
              </div>
              
              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-extrabold text-primary">
                    Rs. {(cartTotal + Math.round(cartTotal * 0.16) + 150).toLocaleString()}
                  </span>
                </div>
              </div>
              
              {!showCheckoutForm ? (
                <button 
                  onClick={() => setShowCheckoutForm(true)}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 rounded-xl font-bold text-lg transition-transform active:scale-95 flex justify-center items-center gap-2 shadow-md"
                >
                  Checkout Now
                </button>
              ) : (
                <form onSubmit={handlePlaceOrder} className="space-y-4 mt-6 border-t border-border pt-6">
                  <h4 className="font-bold text-lg text-foreground mb-2">Delivery Details</h4>
                  <div>
                    <label htmlFor="checkout-name" className="block text-xs font-bold mb-1 text-muted-foreground uppercase">Full Name</label>
                    <input 
                      type="text" 
                      id="checkout-name" 
                      required
                      value={customerDetails.name}
                      onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                      className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="checkout-phone" className="block text-xs font-bold mb-1 text-muted-foreground uppercase">Phone Number</label>
                    <input 
                      type="tel" 
                      id="checkout-phone" 
                      required
                      value={customerDetails.phone}
                      onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                      className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm transition-all"
                      placeholder="+92 300 1234567"
                    />
                  </div>
                  <div>
                    <label htmlFor="checkout-email" className="block text-xs font-bold mb-1 text-muted-foreground uppercase">Email Address</label>
                    <input 
                      type="email" 
                      id="checkout-email" 
                      required
                      value={customerDetails.email}
                      onChange={(e) => setCustomerDetails({...customerDetails, email: e.target.value})}
                      className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="checkout-address" className="block text-xs font-bold mb-1 text-muted-foreground uppercase">Delivery Address</label>
                    <textarea 
                      id="checkout-address" 
                      required
                      rows={3}
                      value={customerDetails.address}
                      onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
                      className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm transition-all resize-none"
                      placeholder="House #, Street #, Sector/Area, Lahore"
                    ></textarea>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button 
                      type="button"
                      onClick={() => setShowCheckoutForm(false)}
                      className="w-1/3 border border-border hover:bg-muted text-foreground py-3 rounded-xl font-bold text-sm transition-transform active:scale-95"
                    >
                      Back
                    </button>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-2/3 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground py-3 rounded-xl font-bold text-sm transition-transform active:scale-95 flex justify-center items-center gap-2 shadow-md"
                    >
                      {isSubmitting ? (
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        "Place Order"
                      )}
                    </button>
                  </div>
                </form>
              )}
              
              <p className="text-xs text-center text-muted-foreground mt-4">
                Prices are inclusive of applicable taxes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

