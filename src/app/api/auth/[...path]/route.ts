"use client";

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const backendUrl = 'http://localhost:8080';

async function handleRegister(req: NextRequest) {
    const body = await req.json(); 
    try {
        await axios.post(`${backendUrl}/auth/register`, { email: body.email, password: body.password });
        
        return NextResponse.json({ message: 'Cadastro realizado com sucesso! Você será redirecionado para o Login.' }, { status: 201 }); 
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Falha no cadastro.';
        const status = error.response?.status || 500;
        return NextResponse.json({ message: errorMessage }, { status });
    }
}

async function handleLogin(req: NextRequest) {
    const body = await req.json();

    try {
        const response = await axios.post(`${backendUrl}/auth/login`, {
            email: body.email,
            password: body.password,
        });

        const cookieHeader = response.headers['set-cookie']?.[0];
        if (!cookieHeader) throw new Error("Cabeçalho Set-Cookie não encontrado na resposta do backend.");

        const nextResponse = NextResponse.json(response.data);
        nextResponse.headers.set('Set-Cookie', cookieHeader); 
        return nextResponse;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'Credenciais inválidas.';
        return NextResponse.json({ message: errorMessage }, { status: 401 });
    }
}

async function handleLogout() {
    try {
        const response = await axios.post(`${backendUrl}/auth/logout`, {});
        const cookieHeader = response.headers['set-cookie']?.[0];
        const nextResponse = NextResponse.json({ message: 'Logged out' });
        if (cookieHeader) nextResponse.headers.set('Set-Cookie', cookieHeader);
        return nextResponse;
    } catch (error) {
        return NextResponse.json({ message: 'Logout failed' }, { status: 500 });
    }
}

async function handleForgotPassword(req: NextRequest) {
    const email = await req.text(); 
    
    try {
        await axios.put(`${backendUrl}/auth/forgot-password`, email, {
            headers: {
                'Content-Type': 'text/plain' 
            }
        });

        return new NextResponse(null, { status: 204 }); 
    } catch (error: any) {
        return new NextResponse(null, { status: 204 }); 
    }
}

async function handleResetPassword(req: NextRequest) {
    const body = await req.json(); 
    try {
        await axios.put(`${backendUrl}/auth/reset`, {
            token: body.token,
            password: body.password,
        });

        return new NextResponse(null, { status: 204 }); 
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Falha na redefinição. Token inválido.';
        const status = error.response?.status || 400;
        return NextResponse.json({ message: errorMessage }, { status: status });
    }
}


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

export async function GET(req: NextRequest, context: { params: { path: Promise<string[]> } }) {
    //@ts-ignore
    const resolveParams = await context.params;
    //@ts-ignore
    const path = resolveParams.path.join('/')
    
    if (path === 'me') return handleMe(req);
    
    return NextResponse.json({ message: 'Not Found' }, { status: 404 });
}

export async function PUT(req: NextRequest, context: { params: { path: Promise<string[]> } }) {
    //@ts-ignore
    const resolveParams = await context.params;
    //@ts-ignore
    const path = resolveParams.path.join('/')

    if (path === 'forgot-password') return handleForgotPassword(req);
    if (path === 'reset') return handleResetPassword(req);

    return NextResponse.json({ message: 'Not Found' }, { status: 404 });
}