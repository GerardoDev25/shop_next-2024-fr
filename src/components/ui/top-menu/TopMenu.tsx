'use client';

import { useEffect, useState } from 'react';

import { titleFont } from '@/config';
import { useCartStore } from '@/store/cart';
import { useIuStore } from '@/store/ui';
import Link from 'next/link';
import { IoSearchOutline, IoCartOutline } from 'react-icons/io5';

export const TopMenu = () => {
  const openSideMenu = useIuStore((s) => s.openSideMenu);
  const totalItemsInCart = useCartStore((s) => s.getTotalItems());

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <nav className='flex px-5 justify-between items-center w-full'>
      {/* ? logo */}

      <div className=''>
        <Link href='/'>
          <span className={`${titleFont.className} antialiased font-bold`}>
            Teslo
          </span>
          <span>| Shop</span>
        </Link>
      </div>

      {/* Center Menu */}

      <div className='hidden sm:block'>
        <Link
          className='m-2 p-2 rounded-md transition-all'
          href={'/gender/men'}
        >
          Men
        </Link>
        <Link
          className='m-2 p-2 rounded-md transition-all'
          href={'/gender/women'}
        >
          Women
        </Link>
        <Link
          className='m-2 p-2 rounded-md transition-all'
          href={'/gender/kid'}
        >
          Kids
        </Link>
      </div>

      {/* search and cart */}

      <div className='flex items-center'>
        <Link href='/search' className='px-2'>
          <IoSearchOutline className='w-5 h-5' />
        </Link>
        <Link
          href={totalItemsInCart === 0 && loaded ? '/empty' : '/cart'}
          className='px-2'
        >
          <div className='relative'>
            {loaded && totalItemsInCart > 0 && (
              <span className='absolute  text-xs rounded-full font-bold px-1 -top-2 -right-2 bg-blue-700 text-white'>
                {totalItemsInCart}
              </span>
            )}
            <IoCartOutline className='w-5 h-5' />
          </div>
        </Link>

        <button
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
          onClick={openSideMenu}
        >
          Menu
        </button>
      </div>
    </nav>
  );
};
