'use server';

import { auth } from '@/auth.config';
import { Address, Size } from '@/interfaces';
import { prisma } from '@/lib';

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      ok: false,
      message: 'User not authenticated',
    };
  }

  // * get product info
  const products = await prisma.product.findMany({
    where: { id: { in: productIds.map((p) => p.productId) } },
  });

  // * calculate amounts and headers
  const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);

  const { subTotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((product) => product.id === item.productId);

      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }

      const subTotal = product.price * productQuantity;
      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );

  // * create database transaction
  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // * 1 update product stock
      const updatedProductsPromises = products.map((product) => {
        // ? accumulate values
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0) {
          throw new Error(`${product.id} not have enough quantity`);
        }

        return tx.product.update({
          where: { id: product.id },
          data: { inStock: { decrement: productQuantity } },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);

      // ? verify is there negative values
      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`${product.title} is out of stock`);
        }
      });

      // * 2 create order and detail
      const order = await tx.order.create({
        data: {
          userId,
          itemsInOrder,
          subTotal,
          tax,
          total,
          isPaid: false,

          OrderItems: {
            createMany: {
              data: productIds.map((p) => ({
                productId: p.productId,
                quantity: p.quantity,
                size: p.size,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      });

      // * 3 create order address
      const { country, ...restAddress } = address;
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          orderId: order.id,
          countryId: country,
        },
      });

      return {
        order,
        orderAddress,
        updatedProducts,
      };
    });

    return {
      ok: true,
      message: 'Order placed successfully',
      order: prismaTx.order,
      prismaTx,
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message,
    };
  }
};
