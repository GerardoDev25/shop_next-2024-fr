'use server';

import { Address } from '@/interfaces';
import { prisma } from '@/lib';

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    // console.log({ userId });

    const newAddress = await createORReplaceAddress(address, userId);

    return {
      ok: true,
      address: newAddress,
    };
  } catch (error) {
    return {
      ok: false,
      message: "couldn't record the data",
    };
  }
};

const createORReplaceAddress = async (address: Address, userId: string) => {
  try {
    const storedAddress = await prisma.userAddress.findUnique({
      where: { userId },
    });

    const { country, ...rest } = address;
    const addressToSave = { ...rest, userId, countryId: country };

    if (!storedAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addressToSave,
      });
      return newAddress;
    }

    const updatedAddress = await prisma.userAddress.update({
      where: { userId },
      data: addressToSave,
    });

    return updatedAddress;
  } catch (error) {
    console.log(error);
    throw new Error('Error creating or replacing address');
  }
};
