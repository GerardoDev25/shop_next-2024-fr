'use client';

import { useEffect, useState } from 'react';
import { useAddressStore } from '@/store/address';
import { useCartStore } from '@/store/cart';
import { currencyFormat } from '@/utils';
import clsx from 'clsx';

export const PlaceOrder = () => {
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const address = useAddressStore((s) => s.address);
  const cart = useCartStore((s) => s.cart);
  const { subTotal, tax, total, totalItems } = useCartStore((s) =>
    s.getSummaryInformation()
  );

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    console.log({ address, productsToOrder });

    // todo

    setIsPlacingOrder(false);
  };

  if (!loaded) {
    return <p>Loading</p>;
  }

  return (
    <div className='bg-white rounded-xl shadow-xl p-7'>
      <h2 className='text-2xl mb-2'>Delivery Address</h2>
      <div className='mb-10'>
        <p className='text-xl'>
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>
          {address.city} - {address.country}
        </p>
        <p>{address.phone}</p>
      </div>

      {/* divider */}
      <div className='w-full h-0.5 rounded bg-gray-200 mb-10'></div>

      <h2 className='text-2xl mb-2'>Order Summary</h2>
      <div className='grid grid-cols-2'>
        <span>No. Products</span>
        <span className='text-right'>
          {totalItems} {totalItems === 1 ? 'item' : 'items'}
        </span>

        <span>Subtotal</span>
        <span className='text-right'>{currencyFormat(subTotal)}</span>

        <span>Tax(15%)</span>
        <span className='text-right'>{currencyFormat(tax)}</span>

        <span className='mt-5 text-2xl'>Total</span>
        <span className='mt-5 text-2xl text-right'>
          {currencyFormat(total)}
        </span>
      </div>
      <div className='mb-2 mt-5 w-full'>
        {/* <p className='text-red-500'>creation order error</p> */}

        <button
          className={clsx({
            'btn-primary': !isPlacingOrder,
            'btn-disable': isPlacingOrder,
          })}
          disabled={isPlacingOrder}
          // href='/orders/123'
          onClick={onPlaceOrder}
        >
          Make Order
        </button>
      </div>
    </div>
  );
};
