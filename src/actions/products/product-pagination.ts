'use server';

import prisma from '../../lib/prisma';
import { Product } from '../../interfaces/product.interface';

export const getPaginationWithProducts = async () => {
  try {
    const products = await prisma.product.findMany({
      include: {
        ProductImage: { take: 2, select: { url: true } },
      },
    });
    console.log(products);
  } catch (error) {}
};
