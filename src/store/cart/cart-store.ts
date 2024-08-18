import { CartProduct } from '@/interfaces';
import { create } from 'zustand';

interface State {
  cart: CartProduct[];

  addProductToCart: (product: CartProduct) => void;
}

export const useCartStore = create<State>()((set, get) => ({
  cart: [],

  addProductToCart: (product: CartProduct) => {
    const { cart } = get();

    const productInCart = cart.some(
      (item) => item.id === product.id && item.size === product.size
    );

    // ? if product not exist
    if (!product) {
      set({ cart: [...cart, product] });
      return;
    }

    // ? if product exist
    const updatedCart = cart.map((item) => {
      if (item.id === product.id && item.size === product.size) {
        return { ...item, quantity: item.quantity + product.quantity };
      }
      return item;
    });
    
    set({ cart: updatedCart });
  },
}));
