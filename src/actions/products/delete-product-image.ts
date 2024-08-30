'use server';

import { revalidatePath } from 'next/cache';

import { v2 as cloudinary } from 'cloudinary';
import { prisma } from '@/lib';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export const deleteProductImage = async (imageId: string, imageUrl: string) => {
  if (!imageUrl.startsWith('http')) {
    return {
      ok: false,
      message: 'Cannot delete file system images',
    };
  }
  const imageName = imageUrl.split('/').pop()?.split('.')[0] ?? '';

  try {
    await cloudinary.uploader.destroy(imageName);
    const deleteImage = await prisma.productImage.delete({
      where: { id: imageId },
      select: {
        product: { select: { slug: true } },
      },
    });

    revalidatePath('/admin/products');
    revalidatePath(`/admin/product/${deleteImage.product.slug}`);
    revalidatePath(`/product/${deleteImage.product.slug}`);
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Error deleting image',
    };
  }
};
