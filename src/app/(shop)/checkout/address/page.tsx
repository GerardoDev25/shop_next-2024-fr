import { Title } from '@/components/ui';
import { AddressForm } from './ui';
import { getCountries } from '@/actions/country';
import { auth } from '@/auth.config';
import { getUserAddress } from '@/actions/address';

export default async function AddressPage() {
  const countries = await getCountries();

  const session = await auth();

  if (!session?.user) {
    return <h3 className='text-3xl'>500 - no user session found</h3>;
  }

  const userAddress = (await getUserAddress(session.user.id)) ?? undefined;

  return (
    <div className='flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0'>
      <div className='w-full  xl:w-[1000px] flex flex-col justify-center text-left'>
        <Title title='Address' subTitle='Delivery Address' />
        <AddressForm countries={countries} userStoreAddress={userAddress} />
      </div>
    </div>
  );
}
