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
        }, {
            withCredentials: true
        });

        const nextResponse = NextResponse.json(response.data);
        
        const setCookieHeaders = response.headers['set-cookie'];
        if (setCookieHeaders) {
            const cookies = Array.isArray(setCookieHeaders) ? setCookieHeaders : [setCookieHeaders];
            cookies.forEach(cookie => {
                nextResponse.headers.append('Set-Cookie', cookie);
            });
        }
        
        return nextResponse;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'Credenciais inválidas.';
        console.error('Login error:', error.message);
        return NextResponse.json({ message: errorMessage }, { status: 401 });
    }
}

async function handleLogout(req: NextRequest) {
    try {
        const response = await axios.post(`${backendUrl}/auth/logout`, {}, {
            withCredentials: true,
            headers: {
                'Cookie': req.headers.get('cookie') || ''
            }
        });
        const nextResponse = NextResponse.json({ message: 'Logged out' });
        
        const setCookieHeaders = response.headers['set-cookie'];
        if (setCookieHeaders) {
            const cookies = Array.isArray(setCookieHeaders) ? setCookieHeaders : [setCookieHeaders];
            cookies.forEach(cookie => {
                nextResponse.headers.append('Set-Cookie', cookie);
            });
        }
        return nextResponse;
    } catch (error) {
        console.error('Logout error:', error);
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
    try {
        const response = await axios.get(`${backendUrl}/users/me`, {
            withCredentials: true,
            headers: {
                'Cookie': req.headers.get('cookie') || ''
            }
        });
        return NextResponse.json({ user: response.data });
    } catch (error: any) {
        console.error('Get me error:', error.message);
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
    if (path === 'logout') return handleLogout(req);
    
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