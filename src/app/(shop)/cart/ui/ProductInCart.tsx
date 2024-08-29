'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { QuantitySelector } from '@/components/product';
import { useCartStore } from '@/store/cart';
import Link from 'next/link';
import { ProductImage } from '@/components/product/product-image';

export const ProductInCart = () => {
  const [loaded, setLoaded] = useState(false);

  const productsInCart = useCartStore((s) => s.cart);
  const updateProductQuantity = useCartStore((s) => s.updateProductQuantity);
  const removeProductQuantity = useCartStore((s) => s.removeProductQuantity);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading</p>;
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug} - ${product.size}`} className='flex mb-5'>
          <ProductImage
            src={product.image}
            width={100}
            height={100}
            alt={product.title}
            style={{
              width: '100px',
              height: '100px',
            }}
            className='mr-5 rounded'
          />
          <div>
            <Link href={`/product/${product.slug}`} className='hover:underline'>
              {product.size} - {product.title}
            </Link>
            <p>${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(quantity) =>
                updateProductQuantity(product, quantity)
              }
            />
            <button
              className='underline mt-3'
              onClick={() => removeProductQuantity(product)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
