"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.push('/itens');
        }
    }, [isAuthenticated, isLoading, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
        } catch (err: any) {
            setError(err.message || 'Erro ao fazer login.');
        }
    };

    if (isLoading || isAuthenticated) {
        return <div className="bg-gray-900 min-h-screen flex items-center justify-center text-white">Indo para o Vende Passa...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-background text-title">
            <div className="p-8 bg-card rounded-lg shadow-lg w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="text-white w-full px-3 py-2 bg-input rounded-md focus:outline-none focus:ring-1 focus:text-highlight"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Senha</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="text-white w-full px-3 py-2 bg-input rounded-md focus:outline-none focus:ring-1 focus:text-highlight"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <button
                        type="submit"
                        className=" cursor-pointer w-full py-2 bg-button hover:opacity-60 rounded-md font-bold transition-colors text-white"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}