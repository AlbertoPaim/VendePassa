"use client";

import React, { useEffect, useState } from "react";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {

            await axios.post('http://localhost:8080/auth/login', {
                email: email,
                password: password
            }, {
                withCredentials: true
            });

            router.push('/adm/');


        } catch (error) {
            console.log("Erro ao fazer login:", error);
        } finally {
            setLoading(false);

        }
    }

    return (
        <main className=" bg-(--azulEscuro) min-h-screen flex items-center justify-center p-6">

            <form onSubmit={handleLogin} className="bg-(--laranjaClaro) p-4 rounded-md border-2 border-(--vermelhoVivido) items-center flex flex-col gap-4 mx-auto">
                <Image src="/passas.png" alt="Logo" width={500} height={500} />

                <h3 className="font-bold text-(--azulEscuro)">Login - Vende Passa</h3>
                <div className="text-(--azulEscuro) flex flex-col gap-2">
                    <label htmlFor="email">Email</label>

                    <input value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border px-2 py-1 rounded-md "
                        type="email"
                        placeholder="E-mail"
                        required
                    />

                </div>

                <div className="text-(--azulEscuro) flex flex-col gap-2">
                    <label htmlFor="senha">Senha</label>

                    <input value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border px-2 py-1 rounded-md "
                        type="password"
                        placeholder="Senha"
                        required
                    />
                </div>

                <button
                    className="bg-(--azulEscuro) px-2 py-1 rounded-sm hover:opacity-60 font-bold text-white cursor-pointer"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Entrando..." : "Entrar"}
                </button>

            </form>
        </main>
    );
}