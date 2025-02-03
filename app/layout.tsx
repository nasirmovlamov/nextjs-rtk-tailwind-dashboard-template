import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import { Provider } from "react-redux";
import Wrapper from "./general/components/Wrapper";
// import Sidebar from "./general/components/Sidebar";
import Sidebar from "./general/components/Sidebar";
import Head from "next/head";
import Header from "./general/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MN | Rabitə Təminatı Vasitələrinin İdarə Olunması Proqram Təminatı",
  description:
    "MN | Rabitə Təminatı Vasitələrinin İdarə Olunması Proqram Təminatı",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>
          MN | Rabitə Təminatı Vasitələrinin İdarə Olunması Proqram Təminatı
        </title>
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Wrapper>
          <Sidebar />
          <Header />
          {children}
        </Wrapper>
      </body>
    </html>
  );
}
