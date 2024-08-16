'use server';

import prisma from '../../lib/prisma';

export const getPaginationWithProducts = async () => {
  try {
    const products = await prisma.product.findMany({
      include: {
        ProductImage: { take: 2, select: { url: true } },
      },
    });

    return {
      currentPage: 1,
      totalPage: 1,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    };
  } catch (error) {
    throw new Error('Cannot load the products');
  }
};
