"use client";

import { useAuth } from './context/AuthContext';
import Link from 'next/link';

export default function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="pt-12 pb-16 px-6 sm:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-title mb-6">
            Bem-vindo ao Vende e Passa
          </h1>
          <p className="text-xl text-text-secondary mb-8">
            A melhor plataforma para comprar e vender itens de qualidade.
          </p>

          {isAuthenticated ? (
            <div className="space-y-6">
              <div className="bg-card p-6 rounded-lg border border-input">
                <p className="text-lg text-text mb-4">
                  Olá, <span className="font-semibold text-title">{user?.email}</span>!
                </p>
                <p className="text-text-secondary mb-6">
                  Você está conectado e pronto para explorar nossos itens.
                </p>
                <Link
                  href="/itens"
                  className="inline-block px-6 py-3 bg-button hover:opacity-80 rounded-md font-bold text-white transition-opacity"
                >
                  Ver Itens à Venda
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-text-secondary mb-6">
                Faça login para acessar todos os recursos da plataforma.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/login"
                  className="px-8 py-3 bg-button hover:opacity-80 rounded-md font-bold text-white text-center transition-opacity"
                >
                  Fazer Login
                </Link>
                <Link
                  href="/cadastro"
                  className="px-8 py-3 bg-button-hover hover:opacity-80 rounded-md font-bold text-white text-center transition-opacity"
                >
                  Criar Conta
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-card py-16 px-6 sm:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-title mb-12 text-center">
            Por que escolher o Vende e Passa?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="bg-background p-6 rounded-lg border border-input">
              <div className="text-3xl text-highlight mb-4">🛒</div>
              <h3 className="text-xl font-semibold text-title mb-2">
                Variedade
              </h3>
              <p className="text-text-secondary">
                Encontre uma grande variedade de itens de qualidade.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-background p-6 rounded-lg border border-input">
              <div className="text-3xl text-highlight mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-title mb-2">
                Segurança
              </h3>
              <p className="text-text-secondary">
                Compre com confiança com nosso sistema seguro.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* CTA Section */}
      {!isAuthenticated && (
        <div className="py-16 px-6 sm:px-12">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-button to-button-hover rounded-lg p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Comece Agora!
            </h2>
            <p className="text-white mb-8 text-lg">
              Crie sua conta e comece a vender ou comprar hoje mesmo.
            </p>
            <Link
              href="/cadastro"
              className="inline-block px-8 py-3 bg-white text-button font-bold rounded-md hover:bg-gray-100 transition-colors"
            >
              Criar Minha Conta
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
