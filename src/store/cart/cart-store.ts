import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { CartProduct } from '@/interfaces';

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;

  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProductQuantity: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        const isProductInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        // ? if product not exist
        if (!isProductInCart) {
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

      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();

        const updatedCart = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity };
          }
          return item;
        });

        set({ cart: updatedCart });
      },

      removeProductQuantity: (product: CartProduct) => {
        const { cart } = get();

        const filteredCart = cart.filter(
          (item) => !(item.id === product.id && item.size === product.size)
        );

        set({ cart: filteredCart });
      },
    }),
    { name: 'shopping-cart' }
  )
);
