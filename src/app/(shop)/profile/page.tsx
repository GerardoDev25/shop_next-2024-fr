import { auth } from '@/auth.config';
import { Title } from '@/components/ui';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    // redirect('/auth/login?returnTo=profile');
    redirect('/');
  }

  return (
    <div>
      <Title title={'Profile'} />
      <pre>{JSON.stringify(session.user, null, 2)}</pre>
      <h1>{session.user.role}</h1>
    </div>
  );
}
