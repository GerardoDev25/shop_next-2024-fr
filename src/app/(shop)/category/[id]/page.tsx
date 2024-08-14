import { ProductGrid } from '@/components/products/product';
import { Title } from '@/components/ui';
import { Category } from '@/interfaces';
import { initialData } from '@/seed/seed';
import { notFound } from 'next/navigation';

const seedProducts = initialData.products;

interface Props {
  params: {
    id: Category;
  };
}

export default function CategoryPage({ params }: Props) {
  const { id } = params;

  // if (id == 'unisex') {
  //   notFound();
  // }

  const labels: Record<Category, string> = {
    men: 'Men',
    women: 'Women',
    kid: 'Kids',
    unisex: 'All',
  };
  const products = seedProducts.filter((product) => product.gender === id);

  return (
    <>
      <Title title={`Articles for ${labels[id]}`} subTitle='all Products' />
      <ProductGrid products={products} />
    </>
  );
}
