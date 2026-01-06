"use client";

import React, { useEffect, useState } from "react";

import axios from "axios";
import Image from "next/image";


export default function AdminLogin() {



    return (
        <main className=" bg-(--azulEscuro) min-h-screen flex items-center justify-center p-6">

            <form action="" className="bg-(--laranjaClaro) p-4 rounded-md border-2 border-(--vermelhoVivido) items-center flex flex-col gap-4 mx-auto">
                <Image src="/passas.png" alt="Logo" width={500} height={500} />

                <h3 className="font-bold text-(--azulEscuro)">Login - Vende Passa</h3>
                <div className="text-(--azulEscuro) flex flex-col gap-2">
                    <label htmlFor="email">Email</label>
                    <input className="border px-2 py-1 rounded-md " type="email" placeholder="E-mail" />
                </div>

                <div className="text-(--azulEscuro) flex flex-col gap-2">
                    <label htmlFor="senha">Senha</label>
                    <input className="border px-2 py-1 rounded-md " type="password" placeholder="Senha" />
                </div>

                <input className="bg-(--azulEscuro) px-2 py-1 rounded-sm hover:opacity-60 font-bold text-white cursor-pointer" type="submit" value="Fazer login" />
            </form>
        </main>
    );
}