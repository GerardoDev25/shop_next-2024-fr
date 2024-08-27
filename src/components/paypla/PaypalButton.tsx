'use client';

import React from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { setTransactionId } from '../../actions/payment/set-transaction-id';
import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveActions,
  OnApproveData,
} from '@paypal/paypal-js';
import { paypalCheckPayment } from '@/actions/payment';

interface Props {
  orderId: string;
  amount: number;
}

export const PaypalButton = ({ amount, orderId }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = Math.round(amount * 100) / 100;

  if (isPending) {
    return (
      <div className='animate-pulse'>
        <div className='h-11 bg-gray-300 rounded'></div>
        <div className='mt-3 h-11 bg-gray-300 rounded'></div>
      </div>
    );
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      purchase_units: [
        {
          amount: {
            value: `${roundedAmount}`,
            currency_code: 'USD',
          },
        },
      ],
      intent: 'CAPTURE',
    });

    const { ok, message } = await setTransactionId(orderId, transactionId);
    if (!ok) {
      throw new Error(message);
    }
    return transactionId;
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    // console.log('onApprove');
    const details = await actions.order?.capture();
    if (!details) {
      return;
    }

    await paypalCheckPayment(details.id!);
  };

  return <PayPalButtons createOrder={createOrder} onApprove={onApprove} />;
};
