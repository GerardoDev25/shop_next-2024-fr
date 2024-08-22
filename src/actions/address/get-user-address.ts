'use server';

import { prisma } from '@/lib';

export const getUserAddress = async (userId: string) => {
  try {
    const userAddress = await prisma.userAddress.findUnique({
      where: { userId: userId },
    });

    if (!userAddress) return null;

    const { countryId, address2, ...reset } = userAddress;
    return { ...reset, country: countryId, address2: address2 || '' };
  } catch (error) {
    console.log(error);
    return null;
  }
};
