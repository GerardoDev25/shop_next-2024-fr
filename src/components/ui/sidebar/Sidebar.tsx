'use client';
import Link from 'next/link';
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

export const Sidebar = () => {
  return (
    <div className=''>
      {/* black background */}

      <div className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30'></div>

      {/* blur */}

      <div className='face-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm'></div>

      {/* SideMenu */}

      <nav className='fixed p-5 right-0 top-0 w-[400px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300'>
        <IoCloseOutline
          size={50}
          className='absolute top-5 right-5 cursor-pointer'
          onClick={() => console.log('click')}
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
          href={'/'}
          className='flex items-center mt-10 p-2 hover:bg-gray-100 transition-all rounded'
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

        <Link
          href={'/'}
          className='flex items-center mt-10 p-2 hover:bg-gray-100 transition-all rounded'
        >
          <IoLogInOutline size={30} />
          <span className='ml-3 text-xl'>Enter</span>
        </Link>

        <Link
          href={'/'}
          className='flex items-center mt-10 p-2 hover:bg-gray-100 transition-all rounded'
        >
          <IoLogOutOutline size={30} />
          <span className='ml-3 text-xl'>Leave</span>
        </Link>
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
