import { ItemProps } from "@/app/types/Item"
import Image from "next/image"
import { MdWhatsapp } from "react-icons/md"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export const Item = (item: ItemProps) => {
    return <div>

        <div
            className="w-screen h-screen"
        >

            <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                <Carousel>
                    <CarouselContent>
                        <CarouselItem>{item.name}</CarouselItem>
                        <CarouselItem>...</CarouselItem>
                        <CarouselItem>...</CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>

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

        </div>
    </div>
}