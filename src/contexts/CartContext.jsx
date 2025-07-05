import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      { const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      }; }
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0)
      };
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };
    
    case 'SET_RESTAURANT':
      return {
        ...state,
        restaurant: action.payload,
        items: state.restaurant && state.restaurant.id !== action.payload.id ? [] : state.items
      };
    
    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const { currentUser } = useAuth();
  const [cart, dispatch] = useReducer(cartReducer, {
    items: [],
    restaurant: null
  });

  useEffect(() => {
    if (currentUser) {
      const savedCart = localStorage.getItem(`cart_${currentUser.uid}`);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (parsedCart.restaurant) {
          dispatch({ type: 'SET_RESTAURANT', payload: parsedCart.restaurant });
        }
        parsedCart.items.forEach(item => {
          for (let i = 0; i < item.quantity; i++) {
            dispatch({ type: 'ADD_ITEM', payload: item });
          }
        });
      }
    } else {
      dispatch({ type: 'CLEAR_CART' });
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`cart_${currentUser.uid}`, JSON.stringify(cart));
    }
  }, [cart, currentUser]);

  const addItem = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };

  const updateQuantity = (itemId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const setRestaurant = (restaurant) => {
    dispatch({ type: 'SET_RESTAURANT', payload: restaurant });
  };

  const getTotalPrice = () => {
    return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    setRestaurant,
    getTotalPrice,
    getTotalItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}