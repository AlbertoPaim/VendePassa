"use client";

import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { usePathname } from 'next/navigation';

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Itens à Venda", href: "/itens" },
];

export default function MenuDesktop() {
    const { isAuthenticated, user, logout } = useAuth();
    const pathname = usePathname();

    return (
        <aside className="fixed top-0 left-0 z-40 w-64 h-screen bg-card border-r border-input text-text flex flex-col -translate-100">
            <div className="p-6 ">
                <h2 className="text-2xl font-semibold text-title">Vende e Passa</h2>
                {isAuthenticated && (
                    <p className="text-sm text-title mt-2">Bem-vindo(a), {user?.email}</p>
                )}
            </div>

            <nav className="flex-grow mt-4">
                <ul>
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <li key={link.name} className="px-4">
                                <Link href={link.href} className={`block px-4 py-2 my-1 rounded-md transition-colors ${isActive ? 'bg-button text-white' : 'hover:bg-button-hover'
                                    }`}>
                                    {link.name}
                                </Link>
                            </li>
                        );
                    })}

                    {!isAuthenticated && (
                        <>
                            <li className="px-4">
                                <Link href="/login" className={`block px-4 py-2 my-1 rounded-md transition-colors ${pathname === '/login' ? 'bg-button text-white' : 'hover:bg-button-hover'
                                    }`}>
                                    Login
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>

            {isAuthenticated && (
                <div className="p-4 border-t border-gray-700">
                    <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 rounded-md bg-destaque transition-colors"
                    >
                        Sair (Logout)
                    </button>
                </div>
            )}
        </aside>
    );
}