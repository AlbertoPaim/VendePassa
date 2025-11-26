"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import '@/config/axios';

interface User {
    id: string;
    email: string;
    roles: (string | number)[];
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
    register: (email: string, password: string) => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (token: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkUserSession = async () => {
            try {
                const response = await axios.get('/api/auth/me');
                const rawUser = response.data.user || response.data;
                if (rawUser) {
                    // normalize roles to an array (backend can send numbers: 0=admin, 1=client)
                    let roles: (string | number)[] = [];
                    if (Array.isArray(rawUser.roles)) {
                        roles = rawUser.roles;
                    } else if (rawUser.role) {
                        roles = Array.isArray(rawUser.role) ? rawUser.role : [rawUser.role];
                    }
                    const normalized = {
                        id: rawUser.id,
                        email: rawUser.email,
                        roles: roles,
                    };
                    console.log('AuthContext - Normalized user:', normalized);
                    setUser(normalized);
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
            await axios.post('/api/auth/register', { email, password });
            
            alert("Cadastro realizado com sucesso! Você será redirecionado para o Login.");
            router.push('/login');
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Ocorreu um erro ao tentar registrar.";
            throw new Error(errorMessage);
        }
    };

    const forgotPassword = async (email: string) => {
        try {
            await axios.put('/api/auth/forgot-password', email); 
            
        } catch (error: any) {
            console.error("Falha no envio de email para recuperação, mantendo segurança.", error);
        }
    };
    
    const resetPassword = async (token: string, password: string) => {
         try {
            await axios.put('/api/auth/reset', { token, password }); 
            
            router.push('/login');
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Ocorreu um erro ao redefinir a senha. Token inválido ou expirado.";
            throw new Error(errorMessage);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post('/api/auth/login', { email, password });
            const rawUser = response.data.user || response.data;
            if (rawUser) {
                // normalize roles to an array (backend can send: enum strings "admin"/"client" or roles array)
                let roles: (string | number)[] = [];
                if (Array.isArray(rawUser.roles)) {
                    roles = rawUser.roles;
                } else if (rawUser.role) {
                    roles = Array.isArray(rawUser.role) ? rawUser.role : [rawUser.role];
                }
                const normalized = {
                    id: rawUser.id,
                    email: rawUser.email,
                    roles: roles,
                };
                const isAdmin = roles.includes('admin') || roles.includes('ROLE_ADMIN') || roles.includes(0);
                console.log('===== USUÁRIO LOGADO =====');
               
                console.log('Email:', normalized.email);
                console.log('Roles:', normalized.roles);
    
                setUser(normalized);
            }
            router.push('/itens'); 
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