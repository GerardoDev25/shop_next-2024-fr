'use server';

import { prisma } from '@/lib';

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      where: { slug },
      include: {
        ProductImage: { select: { url: true, id: true } },
      },
    });

    if (!product) {
      return null;
    }

    const { ProductImage, ...rest } = product;

    return {
      ...rest,
      images: product.ProductImage.map((image) => image.url),
      ProductImage,
    };
  } catch (error) {
    console.log(error);
    throw new Error('Error to get product by slug');
  }
};
