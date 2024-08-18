'use client';

import { useCartStore } from '@/store/cart';
import { useEffect, useState } from 'react';

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false);

  const { subTotal, tax, total, totalItems } = useCartStore((s) =>
    s.getSummaryInformation()
  );

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <>Loading...</>;
  }

  return (
    <div className='grid grid-cols-2'>
      <span>No. Products</span>
      <span className='text-right'>
        {totalItems} {totalItems === 1 ? 'item' : 'items'}
      </span>

      <span>Subtotal</span>
      <span className='text-right'>${subTotal}</span>

      <span>Tax(15%)</span>
      <span className='text-right'>{tax}</span>

      <span className='mt-5 text-2xl'>Total</span>
      <span className='mt-5 text-2xl text-right'>${total}</span>
    </div>
  );
};
