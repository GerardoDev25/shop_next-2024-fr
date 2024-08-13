import { TopMenu } from '@/components/ui/top-menu';

interface Props {
  children: React.ReactNode;
}

export default function ShopLayout({ children }: Props) {
  return (
    <main className='min-h-screen'>
      <TopMenu />
      {children}
    </main>
  );
}
