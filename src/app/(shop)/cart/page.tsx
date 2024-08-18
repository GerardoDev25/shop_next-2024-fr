import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Title } from '@/components/ui';
import { ProductInCart } from './ui';

export default function CartPage() {
  // if (productsInCart.length === 0) {
  //   redirect('/empty');
  // }

  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1000px]'>
        <Title title='Cart' />
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* cart */}

          <div className='flex flex-col mt-5 '>
            <span className='text-xl'>Add more items</span>
            <Link href='/' className='underline mb-5'>
              Keep Buying
            </Link>

            {/* items  */}

            <ProductInCart />
          </div>

          {/* checkout */}

          <div className='bg-white rounded-xl shadow-xl p-7 h-fit'>
            <h2 className='text-2xl mb-2'>Order Summary</h2>
            <div className='grid grid-cols-2'>
              <span>No. Products</span>
              <span className='text-right'>3 items</span>

              <span>Subtotal</span>
              <span className='text-right'>$100</span>

              <span>Tax(15%)</span>
              <span className='text-right'>100</span>

              <span className='mt-5 text-2xl'>Total</span>
              <span className='mt-5 text-2xl text-right'>$110</span>
            </div>
            <div className='mb-2 mt-5 w-full'>
              <Link
                className='flex btn-primary justify-center '
                href='/checkout/address'
              >
                CheckOut
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
