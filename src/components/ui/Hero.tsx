'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ItemProps } from '@/app/types/Item'

interface HeroProps {
    items: ItemProps[]
}

export default function Hero({ items }: HeroProps) {
    const slides = items
        .flatMap((i) => i.images ?? [])
        .map((img) => img.imageUrl)
        .filter(Boolean)

    const [index, setIndex] = useState(0)

    useEffect(() => {
        if (slides.length <= 1) return
        const id = setInterval(() => {
            setIndex((i) => (i + 1) % slides.length)
        }, 5000)
        return () => clearInterval(id)
    }, [slides.length])

    const heading = 'Aqui você acha sua peça preferida'
    const description = 'Dicas rápidas e inspirações para escolher a roupa certa pra você — novidades sempre chegando.'

    return (
        <section className="w-full rounded-xl overflow-hidden mb-6 relative">
            <div className="relative w-full h-56 sm:h-72 md:h-80 lg:h-96">
                {slides.length > 0 ? (
                    slides.map((src, i) => (
                        <div
                            key={src + i}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === index ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <Image
                                src={src}
                                alt={`Destaque ${i + 1}`}
                                fill
                                sizes="100vw"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/10" />
                        </div>
                    ))
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-secondary/30" />
                )}

                {/* Global dark overlay to improve text contrast */}
                <div className="absolute inset-0 bg-black/50 pointer-events-none" />

                <div className="absolute inset-0 flex items-center justify-center px-6 md:justify-start md:pl-16">
                    <div className="max-w-3xl text-center md:text-left text-white">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold drop-shadow-2xl mb-2">{heading}</h2>
                        <p className="text-sm sm:text-base md:text-lg opacity-95 drop-shadow-md">{description}</p>
                    </div>
                </div>

            </div>
        </section>
    )
}
