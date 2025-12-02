"use client"

import { useState } from "react";
import { Filtro } from "./Filtro";
import Image from "next/image";
import { MdWhatsapp } from "react-icons/md";

interface Item {
    id: string;
    name: string;
    description: string;
    price: number;
    available: boolean;
    images: { imageUrl: string }[];
    category: string;
}

interface ItemGridProps {
    items: Item[];
}

export function ItemGrid({ items }: ItemGridProps) {
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleCategory = (category: string) => {
        setSelectedCategory(category);
    }

    const filteredItems = items.filter(item => {
        if (!selectedCategory) return true;
        return item.category === selectedCategory;
    });

    return (
        <>
            <div className='w-full flex justify-end my-6'>
                <Filtro onCategoryChange={handleCategory} />
            </div>

            {filteredItems.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full mb-16">
                    {filteredItems.filter(item => item.images.length > 0).map((item) => (
                        <li
                            key={item.id}
                            className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"
                        >
                            {item.images && item.images.length > 0 && (
                                <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                                    <Image
                                        src={item.images[0].imageUrl}
                                        alt={`Foto de ${item.name}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover transition duration-500 group-hover:scale-105"
                                    />
                                </div>
                            )}

                            <div className="flex-grow p-5 flex flex-col">

                                <h2 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h2>
                                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{item.description}</p>

                                <div className="flex flex-col items-start mt-auto pt-3 border-t border-gray-100">

                                    <div className="flex justify-between items-center w-full mb-2">
                                        <span
                                            className={`px-3 py-1 text-xs font-bold rounded-full whitespace-nowrap
                        ${item.available
                                                    ? 'bg-green-100 text-green-700 border border-green-300'
                                                    : 'bg-red-100 text-red-700 border border-red-300'
                                                }`}
                                        >
                                            {item.available ? 'Disponível' : 'Vendido'}
                                        </span>

                                        <p className="text-2xl font-extrabold text-primary">
                                            R$ {item.price.toFixed(2).replace('.', ',')}
                                        </p>
                                    </div>

                                </div>
                                <a

                                    href="/"

                                    className="hover:bg-green-500 flex gap-4 items-center justify-center mx-auto bg-green-400 px-4 py-2 rounded-lg w-full"



                                >

                                    <MdWhatsapp color='white' size={30} />

                                    <span className='text-white font-bold'>{item.available ? 'Tenho interesse' : 'Item Indisponível'}</span>

                                </a>
                            </div>

                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500 my-10">Nenhum item encontrado nesta categoria.</p>
            )}
        </>
    );
}