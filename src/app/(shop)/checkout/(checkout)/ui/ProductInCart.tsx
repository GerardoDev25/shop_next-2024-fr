'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { useCartStore } from '@/store/cart';
import { currencyFormat } from '@/utils';
import { useRouter } from 'next/navigation';

export const ProductInCart = () => {
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((s) => s.cart);

  const router = useRouter();
  const cart = useCartStore((s) => s.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (cart.length === 0) {
      router.replace('/');
    }
  }, [cart, router]);

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
            <span>
              {product.size} - {product.title} ({product.quantity})
            </span>
            <p className='font-bold'>
              {currencyFormat(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
