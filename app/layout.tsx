import './globals.css';

import { Geist, Geist_Mono } from 'next/font/google';

import AuthHandler from './general/components/AuthHandler';
// import Sidebar from "./general/components/Sidebar";
import Head from 'next/head';
// import { Provider } from "react-redux";
import Wrapper from './general/components/Wrapper';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>Test | Example</title>
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Wrapper>
          <AuthHandler>{children}</AuthHandler>
        </Wrapper>
      </body>
    </html>
  );
}
