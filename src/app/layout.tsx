import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@/config/axios'; // Importar configuração global de axios

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vende e Passa",
  description: "A melhor plataforma para comprar e vender itens",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-background`}>
        <main className="">
          {children}
        </main>
      </body>
    </html>
  );
}