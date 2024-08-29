'use server';

import { prisma } from '@/lib';
import { Gender, Product, Size } from '@prisma/client';
import { z } from 'zod';

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val)),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(',')),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
});

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);

  const parsedData = productSchema.safeParse(data);

  if (!parsedData.success) {
    console.log(parsedData.error.format());
    return { ok: false, error: parsedData.error.format() };
  }

  const product = parsedData.data;
  product.slug = product.slug.toLowerCase().replaceAll(/ /g, '_');

  const { id, ...rest } = product;

  const prismaTx = await prisma.$transaction(async (tx) => {
    let productTx: Product;
    const tagArray = rest.tags
      .split(',')
      .map((tag) => tag.trim().toLowerCase());

    if (id) {
      productTx = await tx.product.update({
        where: { id },
        data: {
          ...rest,
          sizes: { set: rest.sizes as Size[] },
          tags: { set: tagArray },
        },
      });
      console.log({ updateProduct: productTx });
    } else {
    }

    // return { product: productTx };
  });

  // todo revalidate path
  
  return { ok: true };
};
