'use client';

// import React from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

interface Props {
  children: React.ReactNode;
}
export const PaypalProvider = ({ children }: Props) => {

  // console.log(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID);
  
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
        currency: 'USD',
        intent: 'capture',
      }}
    >
      {children}
    </PayPalScriptProvider>
  );
};
