import { initialData } from './seed';
import prisma from '../lib/prisma';

async function main() {
  // * delete all data from the database

  await prisma.user.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const { categories, products, users } = initialData;

  // * insert users
  await prisma.user.createMany({ data: users });
  
  // * insert categories
  await prisma.category.createMany({
    data: categories.map((category) => ({ name: category })),
  });

  // * insert products
  const categoriesDB = await prisma.category.findMany();
  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);

  products.forEach(async (product) => {
    const { type, images, ...rest } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });

    // Images
    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }));

    await prisma.productImage.createMany({
      data: imagesData,
    });
  });

  console.log('executed successfully');
}

(() => {
  if (process.env.NODE_ENV === 'production') return;
  main();
})();
