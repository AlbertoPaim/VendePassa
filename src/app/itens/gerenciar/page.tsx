import { Button } from '@/components/ui/button';
import { getItens } from '@/config/axios';
import NextImage from 'next/image';
import { MdDelete, MdEdit } from 'react-icons/md';

export default async function ItensPage() {
    const itens = await getItens();

    return (
        <main className="bg-background text-foreground min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-6 pb-2 text-title font-heading text-center">
                    Vende e Passa
                </h1>

<Button > Adicionar item</Button>


                {itens.length > 0 ? (
                    <ul className="space-y-4">
                        {itens.filter(item => item.images.length > 0).map((item) => (
                            <li
                                key={item.id}
                                className="flex items-center gap-6 bg-card p-4 rounded-lg shadow-md border border-[var(--color-button-hover)]"
                            >
                                {item.images && item.images.length > 0 && (
                                    <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-md">
                                        <NextImage
                                            src={item.images[0].imageUrl}
                                            alt={`Foto de ${item.name}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}

                                <div className="flex-grow">
                                    <div className="flex justify-between items-start">
                                        <h2 className="text-xl font-semibold text-title">{item.name}</h2>
                                        
                                        <div className='gap-4 flex flex-col items-end'>
                                          <span
                                            className={`px-2 py-1 text-xs font-bold rounded-full ${item.available
                                                ? 'bg-green-400 text-green-900'
                                                : 'bg-red-400 text-red-900'
                                                }`}
                                        >
                                            {item.available ? 'Disponível' : 'Indisponível'}
                                          
                                        </span>
                                        <MdEdit className='text-button hover:text-[var(--color-button-hover)] cursor-pointer' size={40} />
                                        <MdDelete className='text-red-900 cursor-pointer' size={40} />

                                        </div>
                                        
                                    </div>

                                    <p className="text-secondary mt-1">{item.description}</p>

                                    <p className="text-lg font-bold text-[var(--color-highlight)] mt-2">
                                        R$ {item.price.toFixed(2).replace('.', ',')}
                                    </p>
                                </div>

                                
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="bg-yellow-200 border border-yellow-400 text-yellow-900 p-4 rounded-lg">
                        <p className="font-bold">Nenhum item encontrado!</p>
                        <p>
                            Verifique se a sua API Spring Boot está rodando na porta 8080 e se o endpoint
                            <code>/itens</code> está retornando dados.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}
