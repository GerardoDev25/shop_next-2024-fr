'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from 'react-icons/io5';

import { logout } from '@/actions/auth';
import { useIuStore } from '@/store/ui';
import { useState } from 'react';

export const Sidebar = () => {
  const isSideMenuOpen = useIuStore((s) => s.isSideMenuOpen);
  const closeSideMenu = useIuStore((s) => s.closeSideMenu);

  const { data: session } = useSession();

  const [isAuthenticated, setIsAuthenticated] = useState(!!session?.user);

  const onLogIn = () => {
    setIsAuthenticated(true);
    closeSideMenu();
  };

  const onLogOut = () => {
    setIsAuthenticated(false);
    closeSideMenu();
    logout();
  };

  return (
    <div className=''>
      {/* // background black */}

      {isSideMenuOpen && (
        <div className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30'></div>
      )}

      {/* // blur */}

      {isSideMenuOpen && (
        <div
          onClick={closeSideMenu}
          className='face-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm'
        ></div>
      )}

      {/* SideMenu */}

      <nav
        className={clsx(
          'fixed p-5 right-0 top-0 w-[400px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
          { 'translate-x-full': !isSideMenuOpen }
        )}
      >
        <IoCloseOutline
          size={50}
          className='absolute top-5 right-5 cursor-pointer'
          onClick={closeSideMenu}
        />

        <div className='relative mt-14'>
          <IoSearchOutline size={20} className='absolute top-2 left-2' />
          <input
            type='text'
            placeholder='Search'
            className='w-full bg-gray-50 rounded pl-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500'
          />
        </div>

        {/* Menu */}

        <Link
          href={'/profile'}
          className='flex items-center mt-10 p-2 hover:bg-gray-100 transition-all rounded'
          onClick={closeSideMenu}
        >
          <IoPersonOutline size={30} />
          <span className='ml-3 text-xl'>Profile</span>
        </Link>

        <Link
          href={'/'}
          className='flex items-center mt-10 p-2 hover:bg-gray-100 transition-all rounded'
        >
          <IoTicketOutline size={30} />
          <span className='ml-3 text-xl'>Orders</span>
        </Link>

        {!isAuthenticated ? (
          <Link
            href={'/auth/login'}
            className='flex items-center mt-10 p-2 hover:bg-gray-100 transition-all rounded'
            onClick={onLogIn}
          >
            <IoLogInOutline size={30} />
            <span className='ml-3 text-xl'>Log In</span>
          </Link>
        ) : (
          <button
            className='flex w-full items-center mt-10 p-2 hover:bg-gray-100 transition-all rounded'
            onClick={onLogOut}
          >
            <IoLogOutOutline size={30} />
            <span className='ml-3 text-xl'>Log Out</span>
          </button>
        )}
        <div className='w-full h-px bg-gray-200 my-10' />

        <Link
          href={'/'}
          className='flex items-center mt-10 p-2 hover:bg-gray-100 transition-all rounded'
        >
          <IoShirtOutline size={30} />
          <span className='ml-3 text-xl'>Products</span>
        </Link>

        <Link
          href={'/'}
          className='flex items-center mt-10 p-2 hover:bg-gray-100 transition-all rounded'
        >
          <IoTicketOutline size={30} />
          <span className='ml-3 text-xl'>Orders</span>
        </Link>

        <Link
          href={'/'}
          className='flex items-center mt-10 p-2 hover:bg-gray-100 transition-all rounded'
        >
          <IoPeopleOutline size={30} />
          <span className='ml-3 text-xl'>Users</span>
        </Link>
      </nav>
    </div>
  );
};
