export const revalidate = 60;

import { redirect } from 'next/navigation';

import { getPaginationWithProducts } from '@/actions/products/';
import { ProductGrid } from '@/components/products';
import { Pagination, Title } from '@/components/ui/';

interface Props {
  searchParams: { page?: string };
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages } = await getPaginationWithProducts({ page });

  if (!products.length) redirect('/');

  return (
    <>
      <Title title='Store' subTitle='Find the best products' className='mb-2' />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
