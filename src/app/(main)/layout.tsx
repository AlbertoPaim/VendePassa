import { Footer } from '@/components/Footer';
import { Header } from '@/components/ui/Header';
import React from 'react';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="pt-20 ">
        {children}
      </main>
    </>
  );
}