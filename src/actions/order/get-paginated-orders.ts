'use server';

import { auth } from '@/auth.config';
import { prisma } from '@/lib';

export const getPaginatedOrders = async () => {
  const session = await auth();

  if (session?.user.role !== 'admin') {
    return {
      ok: false,
      message: 'There is no user admin',
    };
  }

  const orders = await prisma.order.findMany({
    orderBy: { createAt: 'desc' },
    include: {
      OrderAddress: {
        select: { firstName: true, lastName: true },
      },
    },
  });
  return {
    ok: true,
    orders,
  };
};
