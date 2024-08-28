import { redirect } from 'next/navigation';

import { Title } from '@/components/ui';
import { ProductForm } from './ui';

import { getProductBySlug } from '@/actions/products';
import { getCategories } from '@/actions/category';

interface Props {
  params: { slug: string };
}
export default async function ProductPage({ params }: Props) {
  const { slug } = params;

  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategories(),
  ]);

  // todo new
  if (!product) {
    redirect('/admin/products');
  }

  const title = slug === 'new' ? 'New Product' : 'Edit Product';

  return (
    <>
      <Title title={title} />
      <ProductForm product={product} categories={categories} />
    </>
  );
}
