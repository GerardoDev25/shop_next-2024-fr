export const revalidate = 604800; // 7 days

import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

import { titleFont } from '@/config';
import {
  ProductMobileSliceShow,
  ProductSliceShow,
  QuantitySelector,
  SizeSelector,
  StockLabel,
} from '@/components/product';
import { getProductBySlug } from '@/actions/products';

interface Props {
  params: { slug: string };
}
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  const product = await getProductBySlug(slug);

  // const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product?.title ?? 'product not found',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'product not found',
      description: product?.description ?? '',
      // images: ['/some-specific-page-image.jpg', ...previousImages],
      images: [`products/${product?.images[1]}`],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className='mt-5 mb-20 grid md:grid-cols-3 gap-3'>
      {/* SlideShow */}
      <div className='col-span-1 md:col-span-2 '>
        {/* desktop slideshow */}
        <ProductSliceShow
          images={product.images}
          title={product.title}
          className='hidden md:block'
        />
        {/* movil slideshow */}
        <ProductMobileSliceShow
          images={product.images}
          title={product.title}
          className='block md:hidden'
        />
      </div>

      {/* Details */}
      <div className='col-span-1 px-5 '>
        <StockLabel slug={product.slug} />
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className='text-lg mb-5'>${product.price}</p>
        {/* todo size selector */}

        <SizeSelector
          availableSizes={product.sizes}
          selectedSize={product.sizes[0]}
        />

        {/* todo quantity selector */}

        <QuantitySelector quantity={2} />

        {/* button */}
        <button className='btn-primary my-5'>Add to Cart</button>

        {/* Description */}
        <h3 className='font-bold text-sm'>Description</h3>
        <p className='font-light'>{product.description}</p>
      </div>
    </div>
  );
}
