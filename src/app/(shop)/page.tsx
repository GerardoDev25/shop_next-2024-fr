import { getPaginationWithProducts } from '@/actions/products';
import { ProductGrid } from '@/components/products';
import { Title } from '@/components/ui/';
import { initialData } from '@/seed/seed';

const products = initialData.products;

export default async function Home() {

const productsTemp =   await getPaginationWithProducts()
  
  return (
    <>
      <Title title='Store' subTitle='Find the best products' className='mb-2' />
      <ProductGrid products={products} />
    </>
  );
}
