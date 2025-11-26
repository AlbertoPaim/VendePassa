"use client";

import { useState, useEffect } from 'react';

import { useAuth } from '../context/AuthContext'; 
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const { register, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.push('/itens');
        }
    }, [isAuthenticated, isLoading, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        setIsSubmitting(true);

        try {
            await register(email, password);
            alert('Cadastro realizado com sucesso! Você será redirecionado para a tela de login.');
        } catch (err: any) {
            const errorMessage = err.message || 'Erro desconhecido ao cadastrar.';
            setError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading || isAuthenticated) {
        return <div className="bg-gray-900 min-h-screen flex items-center justify-center text-white">Carregando...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-background text-title">
            <div className="p-8 bg-card rounded-lg shadow-lg w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-6 text-center">Cadastre-se no Bazar</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="text-text-secondary w-full px-3 py-2 bg-input rounded-md focus:outline-none focus:ring-1 focus:ring-highlight"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Senha</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="text-text-secondary w-full px-3 py-2 bg-input rounded-md focus:outline-none focus:ring-1 focus:ring-highlight"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Confirmar Senha</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="text-text-secondary w-full px-3 py-2 bg-input rounded-md focus:outline-none focus:ring-1 focus:ring-highlight"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2 bg-button hover:opacity-80 rounded-md font-bold transition-colors text-white disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Registrando...' : 'Criar Conta'}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <button 
                        onClick={() => router.push('/login')}
                        className="text-sm text-highlight hover:underline"
                    >
                        Já tem conta? Faça Login
                    </button>
                </div>
            </div>
        </div>
    );
}