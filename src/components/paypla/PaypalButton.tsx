'use client';

import React from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

export const PaypalButton = () => {
  const [{ isPending }] = usePayPalScriptReducer();

  if (isPending) {
    return (
      <div className='animate-pulse'>
        <div className='h-11 bg-gray-300 rounded'></div>
        <div className='mt-3 h-11 bg-gray-300 rounded'></div>
      </div>
    );
  }

  return <PayPalButtons />;
};
