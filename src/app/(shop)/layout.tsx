import { Footer, Sidebar, TopMenu } from '@/components/ui/';

interface Props {
  children: React.ReactNode;
}

export default function ShopLayout({ children }: Props) {
  return (
    <main className='min-h-screen'>
      <TopMenu />
      <Sidebar />

      <div className='px-0 sm:px-10'>{children}</div>
      <Footer />
    </main>
  );
}
