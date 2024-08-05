import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import { Inter } from 'next/font/google';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { ApolloClientProvider } from '@/components/ApolloClientProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Stauch | Invoice Generator',
  description: 'SSE Frontend Assignment',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloClientProvider>{children}</ApolloClientProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
