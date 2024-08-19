'use server';

import { AuthError } from 'next-auth';
import { signIn } from '@/auth.config';
import { sleep } from '@/utils';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    // await sleep(2);

    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return 'success';
  } catch (error) {
    console.log({ error });
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    return 'unknown error';
  }
}
