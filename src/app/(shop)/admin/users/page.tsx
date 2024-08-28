export const revalidate = 0;

// https://tailwindcomponents.com/component/hoverable-table


import { Title } from '@/components/ui';
import { redirect } from 'next/navigation';

import { UserTable } from './ui/UserTable';
import { getPaginatedUsers } from '@/actions/user';

export default async function UsersPage() {
  const { ok, users = [] } = await getPaginatedUsers();

  if (!ok) {
    redirect('/auth/login');
  }

  if (users.length === 0) {
    return <p>no users</p>;
  }
 
  return (
    <>
      <Title title='Users Maintaining' />

      <div className='mb-10'>
        <UserTable users={users}/>
      </div>
    </>
  );
}
