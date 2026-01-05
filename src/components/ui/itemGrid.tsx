"use client"

import { useState } from "react";
import { Filtro } from "./Filtro";
import Image from "next/image";
import { MdWhatsapp } from "react-icons/md";
import { ItemProps } from "@/app/types/Item";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"


interface ItemGridProps {
    items: ItemProps[];
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
                        <Dialog key={item.id}>

                            <DialogTrigger asChild>
                                <li
                                    className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 cursor-pointer"
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

                                        <div className="flex flex-col items-start mt-auto pt-3">

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

                                    </div>
                                </li>
                            </DialogTrigger>

                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>{item.name}</DialogTitle>
                                    <DialogDescription>{item.description}</DialogDescription>
                                </DialogHeader>

                                {item.images && item.images.length > 0 && (
                                    <div className="relative w-full h-64 overflow-hidden bg-gray-100 rounded-md my-4">
                                        <Image
                                            src={item.images[0].imageUrl}
                                            alt={`Foto de ${item.name}`}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-contain"
                                        />
                                    </div>
                                )}

                                <div className="flex items-center justify-between mt-2 mb-4">
                                    <p className="text-2xl font-extrabold text-primary">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                                </div>

                                <DialogFooter>
                                    <a href="/" className="hover:bg-green-500 flex gap-4 items-center justify-center bg-green-400 px-4 py-2 rounded-lg">
                                        <MdWhatsapp color='white' size={24} />
                                        <span className='text-white font-bold'>{item.available ? 'Tenho interesse' : 'Item Indisponível'}</span>
                                    </a>
                                    <DialogClose className="ml-2 inline-flex items-center px-3 py-2 rounded-md text-sm text-gray-600 cursor-pointer">Fechar</DialogClose>
                                </DialogFooter>

                            </DialogContent>

                        </Dialog>


                    ))}
                </ul >

            ) : (
                <p className="text-center text-gray-500 my-10">Nenhum item encontrado nesta categoria.</p>
            )
            }
        </>
    );
}