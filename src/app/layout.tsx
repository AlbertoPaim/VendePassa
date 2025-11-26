import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import MenuDesktop from "@/components/ui/MenuDesktop";
import '@/config/axios'; // Importar configuração global de axios

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meu Bazar",
  description: "Sistema de login completo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-background`}>
        <AuthProvider>
          <div className="flex">
            <MenuDesktop />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}