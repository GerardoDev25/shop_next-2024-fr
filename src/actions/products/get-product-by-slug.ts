'use server';

import { prisma } from '@/lib';

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      include: {
        ProductImage: {
          select: { url: true },
        },
      },
      where: { slug },
    });

    if (!product) {
      return null;
    }

    const { ProductImage, ...rest } = product;

    return {
      ...rest,
      images: product.ProductImage.map((image) => image.url),
    };
  } catch (error) {
    console.log(error);
    throw new Error('Error to get product by slug');
  }
};
