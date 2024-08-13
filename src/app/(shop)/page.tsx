import { ProductGrid } from '@/components/products/product';
import { Title } from '@/components/ui/';
import { initialData } from '@/seed/seed';

const products = initialData.products;

export default function Home() {
  return (
    <>
      <Title title='Store' subTitle='Find the best products' className='mb-2' />
      <ProductGrid products={products} />
    </>
  );
}
