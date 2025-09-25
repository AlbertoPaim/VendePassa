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

    // Efeito para redirecionar se o usuário já estiver logado
    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.push('/dashboard'); // Leva para a página protegida
        }
    }, [isAuthenticated, isLoading, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            // O redirecionamento para /dashboard já acontece dentro da função 'login'
        } catch (err: any) {
            setError(err.message || 'Erro ao fazer login.');
        }
    };

    // Não renderiza nada enquanto verifica a sessão ou se já está autenticado
    if (isLoading || isAuthenticated) {
        return <div className="bg-gray-900 min-h-screen flex items-center justify-center text-white">Carregando...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="p-8 bg-gray-800 rounded-lg shadow-lg w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Senha</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <button
                        type="submit"
                        className="w-full py-2 bg-cyan-600 hover:bg-cyan-700 rounded-md font-bold transition-colors"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}