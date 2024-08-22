import { Title } from '@/components/ui';
import Link from 'next/link';
import { ProductInCart } from './ui';
import { PlaceOrder } from './ui/PlaceOrder';

export default function CheckoutPage() {
  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1000px]'>
        <Title title='Verify order' />
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          <div className='flex flex-col mt-5 '>
            <span className='text-xl'>Adjust Elements</span>
            <Link href='/cart' className='underline mb-5'>
              Edit Cart
            </Link>

            <ProductInCart />
          </div>

          <PlaceOrder />
        </div>
      </div>
    </div>
  );
}
