import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { CartProduct } from '@/interfaces';

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;
  getSummaryInformation: () => {
    subTotal: number;
    total: number;
    tax: number;
    totalItems: number;
  };
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProductQuantity: (product: CartProduct) => void;
  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      getSummaryInformation: () => {
        const { cart, getTotalItems } = get();
        const subTotal = cart.reduce(
          (total, item) => total + item.quantity * item.price,
          0
        );

        const tax = subTotal * 0.15;
        const total = subTotal + tax;

        // const totalItems = cart.reduce(
        //   (total, item) => total + item.quantity,
        //   0
        // );
        // const totalItems = getTotalItems()

        return { subTotal, total, tax, totalItems: getTotalItems() };
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

      clearCart: () => {
        set({ cart: [] });
      },
    }),
    { name: 'shopping-cart' }
  )
);
