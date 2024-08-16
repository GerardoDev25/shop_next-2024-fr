export const revalidate = 60;

import { notFound, redirect } from 'next/navigation';

import { getPaginationWithProducts } from '@/actions/products';
import { ProductGrid } from '@/components/products';
import { Pagination, Title } from '@/components/ui';
import { Gender } from '@/interfaces';

interface Props {
  searchParams: { page?: string };
  params: { gender: Gender };
}

const labels: Record<Gender, string> = {
  men: 'Men',
  women: 'Women',
  kid: 'Kids',
  unisex: 'All',
};

export default async function CategoryPage({ params, searchParams }: Props) {
  const { gender } = params;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, currentPage, totalPages } = await getPaginationWithProducts(
    { page, gender }
  );

  if (gender == 'unisex') {
    notFound();
  }
  if (!products.length) redirect(`/gender/${gender}`);

  return (
    <>
      <Title title={`Articles for ${labels[gender]}`} subTitle='all Products' />
      <ProductGrid products={products} />
      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </>
  );
}
