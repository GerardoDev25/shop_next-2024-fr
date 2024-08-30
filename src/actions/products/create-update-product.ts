'use server';

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

import { prisma } from '@/lib';
import { Gender, Product, Size } from '@prisma/client';
import { revalidatePath } from 'next/cache';
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

  try {
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
        productTx = await tx.product.create({
          data: {
            ...rest,
            sizes: { set: rest.sizes as Size[] },
            tags: { set: tagArray },
          },
        });
      }

      // * add images to product

      if (formData.getAll('images')) {
        const images = await uploadImage(formData.getAll('images') as File[]);
        if (!images) {
          throw new Error('Error uploading images');
        }

        await tx.productImage.createMany({
          data: images.map((image) => ({
            url: image!,
            productId: productTx.id,
          })),
        });
      }

      return { product: productTx };
    });
    // todo revalidate path
    revalidatePath('/admin/products');
    revalidatePath(`/admin/product/${prismaTx.product.slug}`);
    revalidatePath(`/products/${prismaTx.product.slug}`);
    return { ok: true, product: prismaTx.product };
  } catch (error) {
    console.log(error);
    return { ok: false, error: 'Something went wrong' };
  }
};

const uploadImage = async (images: File[]) => {
  try {
    const uploadImages = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');

        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`)
          .then((r) => r.secure_url);
      } catch (error) {
        console.log(error);
        return null;
      }
    });

    const uploadedImages = await Promise.all(uploadImages);
    return uploadedImages;
  } catch (error) {
    console.log(error);
    return null;
  }
};
