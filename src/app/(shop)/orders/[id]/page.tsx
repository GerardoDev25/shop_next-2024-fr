import Image from 'next/image';
import Link from 'next/link';

import { Title } from '@/components/ui';
import { initialData } from '@/seed/seed';
import clsx from 'clsx';
import { IoCartOutline } from 'react-icons/io5';

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  params: { id: string };
}

export default function OrderPage({ params }: Props) {
  const { id } = params;

  // todo verify id

  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1000px]'>
        <Title title={`Order #${id}`} />
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* cart */}

          <div className='flex flex-col mt-5 '>
            <div
              className={clsx(
                'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
                { 'bg-red-500': false, 'bg-green-700': true }
              )}
            >
              <IoCartOutline size={30} />
              {/* <span className='mx-2'>Payment Pending</span> */}
              <span className='mx-2'>Order Paid</span>
            </div>

            {/* items  */}

            {productsInCart.map((product) => (
              <div key={product.slug} className='flex mb-5'>
                <Image
                  src={`/products/${product.images[0]}`}
                  width={100}
                  height={100}
                  alt={product.title}
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
                  <p>{product.title}</p>
                  <p>${product.price} X 3</p>
                  <p className='font-bold'>SubTotal ${product.price * 3}</p>
                  {/* <button className='underline mt-3'>Remove</button> */}
                </div>
              </div>
            ))}
          </div>

          {/* checkout */}

          <div className='bg-white rounded-xl shadow-xl p-7'>
            <h2 className='text-2xl mb-2'>Delivery Address</h2>
            <div className='mb-10'>
              <p className='text-xl'>Gerardo Miranda </p>
              <p>Av. Siempre Viva 123</p>
              <p>Colombia</p>
              <p>XXXXXXXXXXXXXXXXX</p>
              <p>XXXXXXXXXXXXXXXXX</p>
              <p>XXXXXXXXXXXXXXXXX</p>
              <p>+57 300 000 000</p>
            </div>

            {/* divider */}
            <div className='w-full h-0.5 rounded bg-gray-200 mb-10'></div>

            <h2 className='text-2xl mb-2'>Order Summary</h2>
            <div className='grid grid-cols-2'>
              <span>No. Products</span>
              <span className='text-right'>3 items</span>

              <span>Subtotal</span>
              <span className='text-right'>$100</span>

              <span>Tax(15%)</span>
              <span className='text-right'>$100</span>

              <span className='mt-5 text-2xl'>Total</span>
              <span className='mt-5 text-2xl text-right'>$110</span>
            </div>
            <div className='mb-2 mt-5 w-full'>
              <div
                className={clsx(
                  'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
                  { 'bg-red-500': false, 'bg-green-700': true }
                )}
              >
                <IoCartOutline size={30} />
                {/* <span className='mx-2'>Payment Pending</span> */}
                <span className='mx-2'>Order Paid</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
