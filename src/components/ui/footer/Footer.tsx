import { titleFont } from '@/config';
import Link from 'next/link';
import React from 'react';

export const Footer = () => {
  return (
    <div className='flex w-full justify-center text-xs mb-10'>
      <Link href='/'>
        <span className={`${titleFont.className} antialiased font-bold`}>
          Teslo
        </span>
        <span> | Shop</span>
        <span>© {new Date().getFullYear()}</span>
      </Link>
      <Link className='mx-5' href={'/'}>Legal and Privacy</Link>
      <Link className='mx-5' href={'/'}>Locations</Link>
    </div>
  );
};
