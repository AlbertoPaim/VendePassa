import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const backendUrl = 'http://localhost:8080';

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
        const errorMessage = error.response?.data?.message || error.message || 'Authentication failed';
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