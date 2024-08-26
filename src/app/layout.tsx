import type { Metadata } from 'next';

import './globals.css';
import { inter } from '@/config/fonts';
import { AuthProvider, PaypalProvider } from '@/components/providers';

export const metadata: Metadata = {
  title: {
    template: '%s - Shop | Store',
    default: 'Home - Shop | Store',
  },
  description: 'e-commerce store next',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <PaypalProvider>
          <AuthProvider>{children}</AuthProvider>
        </PaypalProvider>
      </body>
    </html>
  );
}
