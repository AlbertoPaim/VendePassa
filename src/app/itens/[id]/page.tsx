
import React from 'react';

interface PageProps {
	params: {
		id: string;
	};
}

export default function ItemPage({ params }: PageProps) {
	const { id } = params;

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold">Detalhes do Item</h1>
			<p className="mt-4">ID do item: {id}</p>
			<p className="mt-2 text-sm text-text-secondary">Conteúdo de detalhe placeholder — implemente busca do backend quando precisar.</p>
		</div>
	);
}
