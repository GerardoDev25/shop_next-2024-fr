import { titleFont } from '@/config';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const PageNotFound = () => {
  return (
    <div className='flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center align-middle'>
      <div className='text-center px-5 mx-5'>
        <h2 className={`${titleFont.className} antialiased text-9xl`}>404</h2>
        <p className='font-semibold text-xl '>Woops! we sorry a lot</p>
        <p className='font-light'>
          <span>you can return to </span>
          <Link className='font-normal hover:underline transition-all' href='/'>
            Home
          </Link>
        </p>
      </div>

      <div className='px-5 mx-5'>
        <Image
          className='p-5 sm:p-0'
          src='/imgs/starman_750x750.png'
          alt='404 not found image'
          width={750}
          height={750}
        />
      </div>
    </div>
  );
};
