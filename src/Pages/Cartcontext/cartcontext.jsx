import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem('cart')) || { items: [], totalPrice: 0 }
  );
  const userId = 'user123'; // Temporary user ID (Replace with Auth User ID)

  // Fetch Cart Data
  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/cart/${userId}`);
      setCart(res.data);
      localStorage.setItem('cart', JSON.stringify(res.data)); // Store in localStorage
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  // Add to Cart
  const addToCart = async product => {
    try {
      const res = await axios.post('http://localhost:5000/api/cart/add', {
        userId,
        productId: product._id,
        quantity: 1,
      });
      setCart(res.data);
      localStorage.setItem('cart', JSON.stringify(res.data));
      toast.success(`${product.name} added to cart`);
    } catch (error) {
      toast.error('Failed to add item');
    }
  };

  // Remove from Cart
  const removeFromCart = async productId => {
    try {
      const res = await axios.post('http://localhost:5000/api/cart/remove', {
        userId,
        productId,
      });
      setCart(res.data);
      localStorage.setItem('cart', JSON.stringify(res.data));
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  // Clear Cart
  const clearCart = async () => {
    try {
      await axios.post('http://localhost:5000/api/cart/clear', { userId });
      setCart({ items: [], totalPrice: 0 });
      localStorage.removeItem('cart');
      toast.success('Cart cleared');
    } catch (error) {
      toast.error('Failed to clear cart');
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
