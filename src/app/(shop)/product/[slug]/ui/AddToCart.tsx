'use client';

import { SizeSelector, QuantitySelector } from '@/components/product';
import { useState } from 'react';
import { Product, Size } from '@/interfaces/product.interface';

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    if (!size) {
      return alert('Please select a size');
    }
    console.log({ size, quantity });
  };

  return (
    <>
      {/* todo size selector */}

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
