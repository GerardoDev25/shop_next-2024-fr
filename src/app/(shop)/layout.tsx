import { TopMenu } from '@/components/ui/';

interface Props {
  children: React.ReactNode;
}

export default function ShopLayout({ children }: Props) {
  return (
    <main className='min-h-screen'>
      <TopMenu />

      <div className='px-0 sm:px-10'>{children}</div>
    </main>
  );
}
