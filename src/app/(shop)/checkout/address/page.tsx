import { Title } from '@/components/ui';
import { AddressForm } from './ui';
import { getCountries } from '@/actions/country';

export default async function AddressPage() {
  const countries = await getCountries();

  return (
    <div className='flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0'>
      <div className='w-full  xl:w-[1000px] flex flex-col justify-center text-left'>
        <Title title='Address' subTitle='Delivery Address' />
        <AddressForm countries={countries} />
      </div>
    </div>
  );
}
