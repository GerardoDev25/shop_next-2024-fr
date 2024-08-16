import { getPaginationWithProducts } from '@/actions/products';
import { ProductGrid } from '@/components/products';
import { Title } from '@/components/ui/';
import { redirect } from 'next/navigation';

interface Props {
  searchParams: { page?: string };
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products } = await getPaginationWithProducts({ page });

  if (!products.length) redirect('/');

  return (
    <>
      <Title title='Store' subTitle='Find the best products' className='mb-2' />
      <ProductGrid products={products} />
    </>
  );
}
