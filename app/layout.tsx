import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/provaiders/theme-provaider';
import { ModalProvider } from '@/components/provaiders/modal-provaider';
import { SocketProvider } from '@/components/provaiders/socket-provaider';
import { QueryProvaider } from '@/components/provaiders/query-provaider';

const font = Open_Sans({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Discord',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
        <body className={cn(font.className, 'bg-white dark:bg-[#313338]')}>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem={false}
            storageKey='discord-theme'
          >
            <SocketProvider>
              <ModalProvider />
              <QueryProvaider>{children}</QueryProvaider>
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
