"use client"

import { useState, useEffect, useRef } from "react";
import { Filtro } from "./Filtro";
import Image from "next/image";
import { MdContentCopy, MdCopyAll, MdFileCopy, MdOutlineContentCopy, MdWhatsapp } from "react-icons/md";
import { ItemProps } from "@/app/types/Item";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

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

    const buildWhatsappUrl = (item: ItemProps) => {
        const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';
        const price = `R$ ${item.price.toFixed(2).replace('.', ',')}`;
        const message = `Oi, tenho interesse no item "${item.name}" - ${price}. Podemos conversar?`;
        const encoded = encodeURIComponent(message);

        if (number && number.length > 0) {
            const sanitized = number.replace(/[^+\d]/g, '');
            return `https://api.whatsapp.com/send?phone=${sanitized}&text=${encoded}`;
        }

        return `https://wa.me/?text=${encoded}`;
    }

    const [openDialogId, setOpenDialogId] = useState<string | null>(null);
    const previousPathRef = useRef<string | null>(null);

    const handleDialogOpenChange = (itemId: string, open: boolean) => {
        if (typeof window === 'undefined') return;

        if (open) {
            if (!previousPathRef.current) {
                previousPathRef.current = window.location.pathname + window.location.search;
            }

            if (window.location.pathname !== `/itens/${itemId}`) {
                window.history.pushState({}, '', `/itens/${itemId}`);
            }

            setOpenDialogId(itemId);
        } else {
            const prev = previousPathRef.current ?? '/';
            if (window.location.pathname === `/itens/${itemId}`) {
                window.history.replaceState({}, '', prev);
            }
            previousPathRef.current = null;
            setOpenDialogId(null);
        }
    }

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const matchOnLoad = window.location.pathname.match(/^\/itens\/([^/]+)/);
        if (matchOnLoad) {
            const id = matchOnLoad[1];
            if (items.find(i => i.id === id)) {
                setOpenDialogId(id);
            }
        }

        const onPop = () => {
            const m = window.location.pathname.match(/^\/itens\/([^/]+)/);
            if (m) {
                const id = m[1];
                if (items.find(i => i.id === id)) {
                    setOpenDialogId(id);
                } else {
                    setOpenDialogId(null);
                }
            } else {
                setOpenDialogId(null);
            }
        };

        window.addEventListener('popstate', onPop);
        return () => window.removeEventListener('popstate', onPop);
    }, [items]);

    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleCopyLink = (item: ItemProps) => {
        if (typeof window === 'undefined') return;
        const url = `${window.location.origin}/itens/${item.id}`;
        navigator.clipboard.writeText(url).then(() => {
            setCopiedId(item.id);
            setTimeout(() => setCopiedId(null), 2000);
        }).catch(() => {
            setCopiedId(item.id);
            setTimeout(() => setCopiedId(null), 2000);
        });
    }

    const handleShareWhatsappLink = (item: ItemProps) => {
        if (typeof window === 'undefined') return;
        const url = `${window.location.origin}/itens/${item.id}`;
        const message = `Confira este item: ${item.name} - ${url}`;
        const encoded = encodeURIComponent(message);
        const shareUrl = `https://wa.me/?text=${encoded}`;
        window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }

    return (
        <>
            <div className='w-full flex justify-end my-6'>
                <Filtro onCategoryChange={handleCategory} />
            </div>


            {filteredItems.length > 0 ? (

                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full mb-16">
                    {filteredItems.filter(item => item.images.length > 0).map((item) => (
                        <Dialog key={item.id} open={openDialogId === item.id} onOpenChange={(open) => handleDialogOpenChange(item.id, open)}>

                            <DialogTrigger asChild>
                                <li
                                    className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-transform duration-300 transform hover:-translate-y-2 cursor-pointer border border-transparent hover:border-gray-100"
                                >
                                    {item.images && item.images.length > 0 && (
                                        <div className="relative w-full aspect-video overflow-hidden bg-gradient-to-tr from-gray-50 to-gray-100">
                                            <Image
                                                src={item.images[0].imageUrl}
                                                alt={`Foto de ${item.name}`}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
                                        </div>
                                    )}

                                    <div className="flex-grow p-5 flex flex-col">

                                        <h2 className="text-lg font-semibold text-gray-900 mb-1 truncate">{item.name}</h2>

                                        <div className="flex flex-col items-start mt-auto pt-3">

                                            <div className="flex justify-between items-center w-full mb-2">
                                                <span
                                                    className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap
                        ${item.available
                                                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                                            : 'bg-rose-100 text-rose-800 border border-rose-200'
                                                        }`}
                                                >
                                                    {item.available ? 'Disponível' : 'Vendido'}
                                                </span>

                                                <p className="text-xl font-extrabold bg-gradient-to-r from-yellow-400 to-pink-500 text-white px-3 py-1 rounded-full shadow-sm">
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
                                    item.images.length > 1 ? (
                                        <div className="relative w-full h-72 sm:h-96 rounded-lg my-4 overflow-hidden">
                                            <Carousel>
                                                <CarouselContent>
                                                    {item.images.map((img, index) => (
                                                        <CarouselItem key={index}>
                                                            <div className="relative w-full h-72 sm:h-96 overflow-hidden bg-gray-50">
                                                                <Image
                                                                    src={img.imageUrl}
                                                                    alt={`Foto ${index + 1} de ${item.name}`}
                                                                    fill
                                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                                    className="object-contain"
                                                                />
                                                            </div>
                                                        </CarouselItem>
                                                    ))}
                                                </CarouselContent>

                                                <CarouselPrevious />
                                                <CarouselNext />
                                            </Carousel>
                                        </div>
                                    ) : (
                                        <div className="relative w-full h-72 sm:h-96 overflow-hidden bg-gray-50 rounded-lg my-4">
                                            <Image
                                                src={item.images[0].imageUrl}
                                                alt={`Foto de ${item.name}`}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                className="object-contain"
                                            />
                                        </div>
                                    )
                                )}

                                <div className="flex items-center justify-between mt-2 mb-4">
                                    <p className="text-2xl font-extrabold text-primary">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                                </div>

                                <DialogFooter>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <a
                                                href={buildWhatsappUrl(item)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`Enviar WhatsApp sobre ${item.name}`}
                                                title={`Enviar WhatsApp sobre ${item.name}`}
                                                className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-lg shadow-md hover:from-green-600 hover:to-green-700"
                                            >
                                                <MdWhatsapp color='white' size={22} />
                                                <span className='text-white font-semibold'>{item.available ? 'Tenho interesse' : 'Tenho interesse'}</span>
                                            </a>

                                            <button
                                                onClick={() => handleShareWhatsappLink(item)}
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 rounded-md text-sm bg-white border border-gray-200 text-gray-700 shadow-sm hover:bg-gray-50"
                                                aria-label={`Compartilhar link do item ${item.name} por WhatsApp`}
                                            >
                                                Compartilhar
                                            </button>
                                        </div>
                                    </div>

                                    <DialogClose className="ml-3 inline-flex items-center px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-100">Fechar</DialogClose>
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