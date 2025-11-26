"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface User {
    id: string;
    email: string;
    roles: string[];
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
    register: (email: string, password: string) => Promise<void>;
    // --- NOVOS MÉTODOS DE REDEFINIÇÃO ---
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (token: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Verifica o estado da sessão do usuário
        const checkUserSession = async () => {
            try {
                // Checa a API Route /api/auth/me (que verifica o cookie)
                const response = await axios.get('/api/auth/me');
                if (response.data.user) {
                    // Se o token for válido, define os dados do usuário
                    setUser(response.data.user);
                }
            } catch (error) {
                console.log("Nenhuma sessão ativa encontrada.");
            } finally {
                setIsLoading(false);
            }
        };
        checkUserSession();
    }, []);

    const register = async (email: string, password: string) => {
        try {
            // Chama a API Route /api/auth/register
            await axios.post('/api/auth/register', { email, password });
            
            alert("Cadastro realizado com sucesso! Você será redirecionado para o Login.");
            router.push('/login');
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Ocorreu um erro ao tentar registrar.";
            throw new Error(errorMessage);
        }
    };

    // --- IMPLEMENTAÇÃO: ESQUECI SENHA (PUT /forgot-password) ---
    const forgotPassword = async (email: string) => {
        try {
            // Chama a API Route /api/auth/forgot-password (que usa o método PUT)
            // Envia o e-mail como corpo da requisição (tratado pelo route.ts como text/plain)
            await axios.put('/api/auth/forgot-password', email); 
            
            // O erro é descartado intencionalmente para não revelar se o e-mail existe no banco (segurança).
        } catch (error: any) {
            console.error("Falha no envio de email para recuperação, mantendo segurança.", error);
        }
    };
    
    // --- IMPLEMENTAÇÃO: RESETAR SENHA (PUT /reset) ---
    const resetPassword = async (token: string, password: string) => {
         try {
            // Chama a API Route /api/auth/reset (Endpoint que precisa ser mapeado no route.ts)
            // Envia o token e a nova senha no corpo
            await axios.put('/api/auth/reset', { token, password }); 
            
            // Se o backend retorna sucesso (204 No Content), o usuário é redirecionado para o login.
            router.push('/login');
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Ocorreu um erro ao redefinir a senha. Token inválido ou expirado.";
            throw new Error(errorMessage);
        }
    };
    // ---------------------------------

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post('/api/auth/login', { email, password });
            setUser(response.data);
            router.push('/itens'); // Alterado para a rota de itens
        } catch (error) {
            throw new Error("Credenciais inválidas.");
        }
    };


    const logout = async () => {
        try {
            await axios.post('/api/auth/logout');
            setUser(null);
            router.push('/login');
        } catch (error) {
            console.error("Falha no logout", error);
        }
    };

   return (
        <AuthContext.Provider value={{ 
            user, 
            isAuthenticated: !!user, 
            login, 
            logout, 
            isLoading, 
            register,
            forgotPassword, 
            resetPassword 
        }}> 
            {!isLoading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};