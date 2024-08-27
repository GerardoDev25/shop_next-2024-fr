export const revalidate = 0;

// https://tailwindcomponents.com/component/hoverable-table

import { getPaginatedOrders } from '@/actions/order';
import { Title } from '@/components/ui';
import clsx from 'clsx';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { IoCardOutline } from 'react-icons/io5';

export default async function OrdersPage() {
  const { ok, orders = [] } = await getPaginatedOrders();

  if (!ok) {
    redirect('/auth/login');
  }

  if (orders.length === 0) {
    return <p>no orders</p>;
  }

  return (
    <>
      <Title title='All Orders' />

      <div className='mb-10'>
        <table className='min-w-full'>
          <thead className='bg-gray-200 border-b'>
            <tr>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                #ID
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Full Name
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                State
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item) => (
              <tr
                key={item.id}
                className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'
              >
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                  {item.id.split('-').at(-1)}
                </td>
                <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                  {item.OrderAddress?.firstName} {item.OrderAddress?.lastName}
                </td>
                <td className='flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                  <IoCardOutline
                    className={clsx({
                      'text-green-800': item.isPaid,
                      'text-red-800': !item.isPaid,
                    })}
                  />
                  <span
                    className={clsx('mx-2 ', {
                      'text-green-800': item.isPaid,
                      'text-red-800': !item.isPaid,
                    })}
                  >
                    {item.isPaid ? 'Paid' : 'No Paid'}
                  </span>
                </td>
                <td className='text-sm text-gray-900 font-light px-6 '>
                  <Link href={`/orders/${item.id}`} className='hover:underline'>
                    See order
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
