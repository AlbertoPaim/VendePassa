"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        setIsSubmitting(true);

        try {
            // Seu Controller espera o e-mail como uma string simples no corpo (Content-Type: text/plain).
            // Chamamos o endpoint de recuperação de senha.
            await axios.put('/auth/forgot-password', email, {
                headers: {
                    // É crucial especificar text/plain para que o Spring Boot receba o valor
                    'Content-Type': 'text/plain' 
                }
            });
            
            // Por segurança, a mensagem de sucesso é exibida mesmo que o e-mail não exista.
            setSuccess('Se o email estiver cadastrado, o link de redefinição foi enviado para sua caixa de entrada.');

        } catch (err: any) {
            // Em caso de erro de conexão ou servidor, ainda exibimos a mensagem de sucesso por segurança.
            setSuccess('Se o email estiver cadastrado, o link de redefinição foi enviado para sua caixa de entrada.'); 
            
            // Para debug, você pode descomentar o console.error:
            // console.error("Erro ao solicitar redefinição:", err);
            
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background text-title">
            <div className="p-8 bg-card rounded-lg shadow-lg w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-6 text-center">Esqueci a Senha</h1>
                <p className="text-center mb-6 text-text-secondary text-sm">
                    Digite seu email para receber o link de redefinição.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {success && <p className="text-green-500 text-sm text-center font-bold">{success}</p>}
                    
                    <div>
                        <label className="block mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isSubmitting || !!success}
                            className="text-text-secondary w-full px-3 py-2 bg-input rounded-md focus:outline-none focus:ring-1 focus:ring-highlight"
                        />
                    </div>
                    
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    
                    <button
                        type="submit"
                        disabled={isSubmitting || !!success}
                        className="w-full py-2 bg-button hover:opacity-80 rounded-md font-bold transition-colors text-white disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Enviando...' : 'Solicitar Redefinição'}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <button 
                        onClick={() => router.push('/login')}
                        className="text-sm text-highlight hover:underline"
                    >
                        Voltar para o Login
                    </button>
                </div>
            </div>
        </div>
    );
}