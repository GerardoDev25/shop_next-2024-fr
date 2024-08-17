'use server';
import { prisma } from '@/lib';
// import { sleep } from '@/utils';

export const getProductStockBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      select: { inStock: true },
      where: { slug },
    });
    // await sleep(2)
    return product?.inStock || 0;
  } catch (error) {
    return 0;
  }
};
