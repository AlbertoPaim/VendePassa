"use client";

import Link from 'next/link';

export default function CadastrarItemPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Cadastrar Item</h1>
      <p className="mt-4 text-text-secondary">Esta rota foi substituída pela página de gerenciamento.</p>
      <div className="mt-6">
        <Link href="/itens/gerenciar" className="px-4 py-2 bg-button text-white rounded-md">Ir para Gerenciar Itens</Link>
      </div>
    </div>
  );
}
