import { auth } from '@/auth.config';
import { prisma } from '@/lib';

export const getOrderById = async (id: string) => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: 'not authenticated Please login',
    };
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        OrderAddress: true,
        OrderItems: {
          select: {
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                title: true,
                slug: true,
                ProductImage: { select: { url: true }, take: 1 },
              },
            },
          },
        },
      },
    });

    if (!order) throw new Error(`id ${id} not exist`);

    if (session.user.role === 'user') {
      if (order.userId !== session.user.id) throw 'not authorized';
    }

    return { ok: true, order };
  } catch (error) {
    console.log(error);
    return { ok: false, message: 'order not exist' };
  }
};
