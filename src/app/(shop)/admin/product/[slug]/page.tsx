import { getProductBySlug } from '@/actions/products';
import { Title } from '@/components/ui';
import { redirect } from 'next/navigation';
import { ProductForm } from './ui';

interface Props {
  params: { slug: string };
}
export default async function ProductPage({ params }: Props) {
  const { slug } = params;

  const product = await getProductBySlug(slug);

  // todo new
  if (!product) {
    redirect('/admin/products');
  }

  const title = slug === 'new' ? 'New Product' : 'Edit Product';

  return (
    <>
      <Title title={title} />
      <ProductForm product={product} />
    </>
  );
}
