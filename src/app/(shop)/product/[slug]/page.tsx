export const revalidate = 604800; // 7 days

import { notFound } from 'next/navigation';

import { titleFont } from '@/config';
import {
  ProductMobileSliceShow,
  ProductSliceShow,
  QuantitySelector,
  SizeSelector,
} from '@/components/product';
import { getProductBySlug } from '@/actions/products';

interface Props {
  params: { slug: string };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;

  const product = await getProductBySlug(slug);

  console.log(product);

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
