"use client"
import Image from "next/image"

export const Header = () => {
    return (
        <header className=" bg-gradient-to-b  to-[var(--azulMedio)] bg-[var(--azulEscuro)]  z-50 fixed inset-x-0 top-0 flex items-center justify-between px-6 py-3 shadow-sm border-b border-gray-200/50">
            <div className="flex justify-between w-full max-w-[1200px] items-center mx-auto">

                <Image src="/logo.png" width={150} height={50} alt="Vende Passa Logo" />

                <nav>
                    <ul className=" flex gap-6 items-center">
                        <a className="text-lg font-medium text-[var(--amareloClaro)] hover:text-[var(--vermelhoVivido)] dark:text-gray-300" href="/"><li>Início</li></a>
                        <a className="text-lg font-medium text-[var(--amareloClaro)] hover:text-[var(--vermelhoVivido)] dark:text-gray-300" href="/sobre"><li>Sobre</li></a>
                    </ul>
                </nav>
            </div>



        </header>


    )
} 