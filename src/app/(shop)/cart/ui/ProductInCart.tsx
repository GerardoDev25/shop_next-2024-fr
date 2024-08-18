'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { QuantitySelector } from '@/components/product';
import { useCartStore } from '@/store/cart';
import Link from 'next/link';

export const ProductInCart = () => {
  const productsInCart = useCartStore((s) => s.cart);

  const [loaded, setLoaded] = useState(false);

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
          <Image
            src={`/products/${product.image}`}
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
            <QuantitySelector quantity={3} onQuantityChanged={console.log} />
            <button className='underline mt-3'>Remove</button>
          </div>
        </div>
      ))}
    </>
  );
};
