'use client';

import { SizeSelector, QuantitySelector } from '@/components/product';
import { useState } from 'react';
import type {
  CartProduct,
  Product,
  Size,
} from '@/interfaces/product.interface';
import { useCartStore } from '@/store/cart';

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [posted, setPosted] = useState(false);

  const addProductToCart = useCartStore((s) => s.addProductToCart);

  const addToCart = () => {
    setPosted(true);
    if (!size) return;

    const cartProduct: CartProduct = {
      id: product.id,
      quantity,
      size,
      slug: product.slug,
      title: product.title,
      price: product.price,
      image: product.images[0],
    };
    addProductToCart(cartProduct);

    // * reset values
    setSize(undefined);
    setQuantity(1);
    setPosted(false);
  };

  return (
    <>
      {/* todo size selector */}

      {posted && !size && (
        <span className='mt-2 text-red-500 fade-in'>Should select a Size</span>
      )}

      <SizeSelector
        availableSizes={product.sizes}
        onSizeChanged={setSize}
        selectedSize={size}
      />

      {/* todo quantity selector */}

      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />

      {/* button */}
      <button onClick={addToCart} className='btn-primary my-5'>
        Add to Cart
      </button>
    </>
  );
};
