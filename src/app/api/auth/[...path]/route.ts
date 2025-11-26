"use client";

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// URL base do seu backend Spring Boot
const backendUrl = 'http://localhost:8080';

// Handler para o cadastro de novos usuários
async function handleRegister(req: NextRequest) {
    const body = await req.json(); 
    try {
        await axios.post(`${backendUrl}/auth/register`, { email: body.email, password: body.password });
        
        // Retorna sucesso 201 Created
        return NextResponse.json({ message: 'Cadastro realizado com sucesso! Você será redirecionado para o Login.' }, { status: 201 }); 
    } catch (error: any) {
        // Captura o erro do backend (ex: email já em uso)
        const errorMessage = error.response?.data?.message || 'Falha no cadastro.';
        const status = error.response?.status || 500;
        return NextResponse.json({ message: errorMessage }, { status });
    }
}

// Handler para o login de usuários
async function handleLogin(req: NextRequest) {
    const body = await req.json();

    try {
        const response = await axios.post(`${backendUrl}/auth/login`, {
            email: body.email,
            password: body.password,
        });

        // O backend Spring Boot envia o cookie, nós o repassamos para o Next.js
        const cookieHeader = response.headers['set-cookie']?.[0];
        if (!cookieHeader) throw new Error("Cabeçalho Set-Cookie não encontrado na resposta do backend.");

        const nextResponse = NextResponse.json(response.data);
        nextResponse.headers.set('Set-Cookie', cookieHeader); // Define o cookie no navegador
        return nextResponse;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'Credenciais inválidas.';
        return NextResponse.json({ message: errorMessage }, { status: 401 });
    }
}

// Handler para o logout de usuários
async function handleLogout() {
    try {
        const response = await axios.post(`${backendUrl}/auth/logout`, {});
        const cookieHeader = response.headers['set-cookie']?.[0]; // Cookie de expiração
        const nextResponse = NextResponse.json({ message: 'Logged out' });
        if (cookieHeader) nextResponse.headers.set('Set-Cookie', cookieHeader);
        return nextResponse;
    } catch (error) {
        return NextResponse.json({ message: 'Logout failed' }, { status: 500 });
    }
}

// Handler para solicitar o token de redefinição de senha
async function handleForgotPassword(req: NextRequest) {
    // O backend Spring espera a string pura do email
    const email = await req.text(); 
    
    try {
        // Enviamos o email como corpo (tratado como text/plain)
        await axios.put(`${backendUrl}/auth/forgot-password`, email, {
            headers: {
                'Content-Type': 'text/plain' 
            }
        });

        // Retorna 204 No Content (sucesso, mas sem body, por segurança)
        return new NextResponse(null, { status: 204 }); 
    } catch (error: any) {
        // Mesmo em caso de falha, retornamos sucesso silencioso para não revelar e-mails cadastrados
        return new NextResponse(null, { status: 204 }); 
    }
}

// Handler para redefinir a senha usando o token
async function handleResetPassword(req: NextRequest) {
    const body = await req.json(); // Espera { token: string, password: string }

    try {
        await axios.put(`${backendUrl}/auth/reset`, {
            token: body.token,
            password: body.password,
        });

        // Retorna sucesso 204 No Content
        return new NextResponse(null, { status: 204 }); 
    } catch (error: any) {
        // Captura o erro específico (ex: Token inválido) e repassa
        const errorMessage = error.response?.data?.message || 'Falha na redefinição. Token inválido.';
        const status = error.response?.status || 400;
        return NextResponse.json({ message: errorMessage }, { status: status });
    }
}


// Handler para verificar a sessão (quem sou eu)
async function handleMe(req: NextRequest) {
    const token = req.cookies.get('jwt-token');
    if (!token) return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });

    try {
        const response = await axios.get(`${backendUrl}/users/me`, {
            headers: { 'Cookie': `jwt-token=${token.value}` }
        });
        return NextResponse.json({ user: response.data });
    } catch (error) {
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
}

// Mapeamento de rotas POST
export async function POST(req: NextRequest, context: { params: { path: Promise<string[]> } }) {

    //@ts-ignore
    const resolveParams = await context.params;
    //@ts-ignore
    const path = resolveParams.path.join('/')
    
    if (path === 'register') return handleRegister(req);
    if (path === 'login') return handleLogin(req);
    if (path === 'logout') return handleLogout();
    
    return NextResponse.json({ message: 'Not Found' }, { status: 404 });
}

// Mapeamento de rotas GET
export async function GET(req: NextRequest, context: { params: { path: Promise<string[]> } }) {
    //@ts-ignore
    const resolveParams = await context.params;
    //@ts-ignore
    const path = resolveParams.path.join('/')
    
    if (path === 'me') return handleMe(req);
    
    return NextResponse.json({ message: 'Not Found' }, { status: 404 });
}

// Mapeamento de rotas PUT (Usado para forgot e reset)
export async function PUT(req: NextRequest, context: { params: { path: Promise<string[]> } }) {
    //@ts-ignore
    const resolveParams = await context.params;
    //@ts-ignore
    const path = resolveParams.path.join('/')

    if (path === 'forgot-password') return handleForgotPassword(req);
    if (path === 'reset') return handleResetPassword(req);

    return NextResponse.json({ message: 'Not Found' }, { status: 404 });
}