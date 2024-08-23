'use server';

import { auth } from '@/auth.config';
import { Address, Size } from '@/interfaces';

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (props: ProductToOrder[], address: Address) => {
  console.log({ props, address });
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      ok: false,
      message: 'User not authenticated',
    };
  }

  // const { productId, quantity, size } = props;
  console.log({ props, address, userId });
};
