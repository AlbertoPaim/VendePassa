import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

/* 🎨 Fontes */
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // pode ajustar conforme uso
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"], // ideal pro corpo
});

export const metadata: Metadata = {
  title: "Vende e Passa",
  description: "Bazar online - todo tipo de itens, perto de você.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${poppins.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
