import { createContext, useState, useContext } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const Addtocart = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add to Cart
  const addToCart = async (itemId, quantity) => {
    const { data } = await axios.post('http://localhost:5000/cart', { itemId, quantity });
    setCartItems(data);
  };

  // Fetch Cart
  const fetchCart = async () => {
    const { data } = await axios.get('http://localhost:5000/cart');
    setCartItems(data);
  };

  // Remove from Cart
  const removeFromCart = async (itemId) => {
    const { data } = await axios.delete(`http://localhost:5000/cart/${itemId}`);
    setCartItems(data);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default Addtocart