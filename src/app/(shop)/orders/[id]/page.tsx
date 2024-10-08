import Image from 'next/image';
import { redirect } from 'next/navigation';

import { getOrderById } from '@/actions/order';
import { currencyFormat } from '@/utils';
import { Title } from '@/components/ui';
 import { PaypalButton } from '../../../../components/paypla/PaypalButton';
import { OrderStatus } from '@/components/order';
import { ProductImage } from '@/components/product/product-image';

interface Props {
  params: { id: string };
}

export default async function OrderPage({ params }: Props) {
  const { id } = params;

  const { ok, order } = await getOrderById(id);
  if (!ok) {
    redirect('/');
  }

  const address = order!.OrderAddress;
  const products = order!.OrderItems;

  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1000px]'>
        <Title title={`Order #${id.split('-').at(-1)}`} />
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* cart */}

          <div className='flex flex-col mt-5 '>
            <OrderStatus isPaid={order?.isPaid ?? false} />

            {/* items  */}

            {products.map((item, index) => (
              <div
                key={item.product.slug + ' - ' + item.size}
                className='flex mb-5'
              >
                <ProductImage
                  src={item.product.ProductImage[0]?.url}
                  width={100}
                  height={100}
                  alt={item.product.title}
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'contain',
                    maxWidth: '100%',
                    // height: 'auto',
                  }}
                  className='mr-5 rounded'
                />
                <div>
                  <p>
                    {item.size} - {item.product.title}
                  </p>
                  <p>
                    ${item.price} X {item.quantity}
                  </p>
                  <p className='font-bold'>
                    SubTotal {currencyFormat(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* checkout */}

          <div className='bg-white rounded-xl shadow-xl p-7'>
            <h2 className='text-2xl mb-2'>Delivery Address</h2>
            <div className='mb-10'>
              <p className='text-xl'>
                {address?.firstName} {address?.lastName}{' '}
              </p>
              <p>{address?.address}</p>
              <p>{address?.address2}</p>
              <p>{address?.postalCode}</p>
              <p>
                {address?.city}, {address?.countryId}
              </p>
              <p>{address?.phone}</p>
            </div>

            {/* divider */}
            <div className='w-full h-0.5 rounded bg-gray-200 mb-10'></div>

            <h2 className='text-2xl mb-2'>Order Summary</h2>
            <div className='grid grid-cols-2'>
              <span>No. Products</span>
              <span className='text-right'>
                {order?.itemsInOrder}{' '}
                {order?.itemsInOrder === 1 ? 'item' : 'items'}
              </span>

              <span>Subtotal</span>
              <span className='text-right'>
                {currencyFormat(order!.subTotal)}
              </span>

              <span>Tax(15%)</span>
              <span className='text-right'>{currencyFormat(order!.tax)}</span>

              <span className='mt-5 text-2xl'>Total</span>
              <span className='mt-5 text-2xl text-right'>
                {currencyFormat(order!.total)}
              </span>
            </div>
            <div className='mb-2 mt-5 w-full'>
              {order?.isPaid ? (
                <OrderStatus isPaid={order?.isPaid ?? false} />
              ) : (
                <PaypalButton orderId={order!.id} amount={order!.total} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
