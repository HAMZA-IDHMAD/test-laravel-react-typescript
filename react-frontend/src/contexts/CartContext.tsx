import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product; quantity?: number }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  getTotalItems: () => number;
  getTotalPrice: () => { ht: number; vat: number; ttc: number };
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.productId === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.productId === action.payload.id
              ? { ...item, qty: item.qty + (action.quantity || 1) }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            productId: action.payload.id,
            name: action.payload.name,
            unitPrice: action.payload.price,
            qty: action.quantity || 1,
          },
        ],
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.productId !== action.payload),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.productId === action.payload.productId
            ? { ...item, qty: action.payload.quantity }
            : item
        ).filter(item => item.qty > 0),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.qty, 0);
  };

  const getTotalPrice = () => {
    const ht = state.items.reduce((total, item) => total + (item.unitPrice * item.qty), 0);
    const vat = ht * 0.2; // 20% VAT
    const ttc = ht + vat;
    return {
      ht: Math.round(ht * 100) / 100,
      vat: Math.round(vat * 100) / 100,
      ttc: Math.round(ttc * 100) / 100,
    };
  };

  return (
    <CartContext.Provider value={{ state, dispatch, getTotalItems, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
