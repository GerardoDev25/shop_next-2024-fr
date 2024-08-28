export const revalidate = 0;

// https://tailwindcomponents.com/component/hoverable-table

import { getPaginatedOrders } from '@/actions/order';
import { getPaginationWithProducts } from '@/actions/products';
import { Pagination, Title } from '@/components/ui';
import { currencyFormat } from '@/utils';
import clsx from 'clsx';
import Image from 'next/image';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { IoCardOutline } from 'react-icons/io5';

interface Props {
  searchParams: { page?: string };
}

export default async function OrdersPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages } = await getPaginationWithProducts({ page });

  return (
    <>
      <Title title='Product Maintenance' />

      <div className='flex justify-end mb-5'>
        <Link href={'/admin/product/new'} className='btn-primary'>
          New Product
        </Link>
      </div>
      <div className='mb-10'>
        <table className='min-w-full'>
          <thead className='bg-gray-200 border-b'>
            <tr>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Image
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Title
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Price
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Gender
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Stock
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Sizes
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'
              >
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                  <Link href={`/product/${product.slug}`}>
                    <span className='sr-only'>Edit</span>
                    <Image
                      src={`/products/${product.ProductImage[0].url}`}
                      width={80}
                      height={80}
                      alt={product.title}
                      className='w-20 h-20 object-cover rounded'
                    />
                  </Link>
                </td>

                <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                  <Link
                    href={`/admin/product/${product.slug}`}
                    className='hover:underline'
                  >
                    {product.title}
                  </Link>
                </td>

                <td className='text-sm text-gray-900 px-6 py-4 whitespace-nowrap font-bold'>
                  {currencyFormat(product.price)}
                </td>

                <td className='text-sm text-gray-900 px-6 py-4 whitespace-nowrap font-light'>
                  {product.gender}
                </td>

                <td className='text-sm text-gray-900 px-6 py-4 whitespace-nowrap font-bold'>
                  {product.inStock}
                </td>

                <td className='text-sm text-gray-900 px-6 py-4 whitespace-nowrap font-light'>
                  {product.sizes.join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
