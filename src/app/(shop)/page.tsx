import { getPaginationWithProducts } from '@/actions/products';
import { ProductGrid } from '@/components/products';
import { Title } from '@/components/ui/';

export default async function Home() {
  const { products } = await getPaginationWithProducts();

  console.log(products);

  return (
    <>
      <Title title='Store' subTitle='Find the best products' className='mb-2' />
      <ProductGrid products={products} />
    </>
  );
}
