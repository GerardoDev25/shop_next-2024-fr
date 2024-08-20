'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import { authenticate } from '@/actions/auth';
import { IoInformationOutline } from 'react-icons/io5';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined);
  // const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  const singInClient = useAuthStore((s) => s.singInClient);

  useEffect(() => {
    if (state === 'success') {
      singInClient();
      // router.replace('/');
      window.location.replace('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  if (!loaded) {
    return <></>;
  }
  return (
    <form action={dispatch} className='flex flex-col'>
      <label htmlFor='email'>Email</label>
      <input
        className='px-5 py-2 border bg-gray-200 rounded mb-5'
        type='email'
        name='email'
      />

      <label htmlFor='email'>Password</label>
      <input
        className='px-5 py-2 border bg-gray-200 rounded mb-5'
        type='password'
        name='password'
      />

      {state !== undefined && state !== 'success' && (
        <div className='flex flex-row mb-2 justify-center'>
          <IoInformationOutline className='h-5 w-5 text-red-500' />
          <p className='text-sm text-red-500'>{state}</p>
        </div>
      )}

      <LoginButton />

      <div className='flex items-center my-5'>
        <div className='flex-1 border-t border-gray-500'></div>
        <div className='px-2 text-gray-800'>O</div>
        <div className='flex-1 border-t border-gray-500'></div>
      </div>

      <Link href='/auth/new-account' className='btn-secondary text-center'>
        Create new account
      </Link>
    </form>
  );
};

const LoginButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      className={clsx({ 'btn-primary': !pending, 'btn-disable': pending })}
      disabled={pending}
    >
      Log In
    </button>
  );
};
