import { Title } from '@/components/ui';
import { initialData } from '@/seed/seed';
import Image from 'next/image';
import Link from 'next/link';

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function CheckoutPage() {
  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1000px]'>
        <Title title='Verify order' />
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* cart */}

          <div className='flex flex-col mt-5 '>
            <span className='text-xl'>Adjust Elements</span>
            <Link href='/cart' className='underline mb-5'>
              Edit Cart
            </Link>

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
                  <button className='underline mt-3'>Remove</button>
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
              <Link
                className='flex btn-primary justify-center'
                href='/orders/123'
              >
                Make Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
