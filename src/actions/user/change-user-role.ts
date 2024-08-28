'use server'

import { auth } from '@/auth.config';
import { prisma } from '@/lib';
import { revalidatePath } from 'next/cache';

export const changeUserRole = async (userId: string, role: string) => {
  const session = await auth();

  if (session?.user.role !== 'admin') {
    return {
      ok: false,
      error: 'You are not authorized to perform this action',
    };
  }

  try {
    const newRole = role === 'admin' ? 'admin' : 'user';

    const user = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    revalidatePath('/admin/users');

    return {
      ok: true,
      user,
    };
  } catch (error) {
    return {
      ok: false,
      error: 'failed to update role',
    };
  }
};
