"use client";

import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Itens à Venda", href: "/itens" },
    
];

export default function MenuDesktop() {
    const { isAuthenticated, user, logout } = useAuth();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // Debug: log user object to check roles structure
    // Backend uses: role enum with "ROLE_ADMIN" or "ROLE_CLIENT" strings
    const isAdmin = user?.roles?.includes('admin') || user?.roles?.includes('ROLE_ADMIN') || user?.roles?.includes(0);
    if (isAuthenticated && user) {
        console.log('Menu - User object:', user);
        console.log('Menu - User roles:', user.roles);
        console.log('Menu - Is admin?', isAdmin);
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button
                onClick={toggleMenu}
                className=" cursor-pointer fixed top-4 left-4 z-50 p-2 rounded-md bg-button hover:opacity-80 text-white lg:hidden"
                aria-label="Toggle menu"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside
                className={`fixed top-0 left-0 z-40 w-64 h-screen bg-card border-r border-input text-text flex flex-col transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0 lg:relative`}
            >
                <div className="p-6">
                    <h2 className="text-2xl font-semibold text-title mt-20">Vende e Passa</h2>
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
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`block px-4 py-2 my-1 rounded-md transition-colors ${
                                            isActive
                                                ? 'bg-button text-white'
                                                : 'hover:bg-button-hover'
                                        }`}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            );
                        })}

                        {!isAuthenticated && (
                            <>
                                <li className="px-4">
                                    <Link
                                        href="/login"
                                        onClick={() => setIsOpen(false)}
                                        className={`block px-4 py-2 my-1 rounded-md transition-colors ${
                                            pathname === '/login'
                                                ? 'bg-button text-white'
                                                : 'hover:bg-button-hover'
                                        }`}
                                    >
                                        Login
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>

                {isAuthenticated && (
                    <>
                        <div className="px-4">
                            {isAdmin && (
                                <Link
                                    href="/itens/gerenciar"
                                    onClick={() => setIsOpen(false)}
                                    className="block w-full px-4 py-2 my-2 rounded-md bg-button text-white text-center"
                                >
                                    Gerenciar Itens
                                </Link>
                            )}
                        </div>

                        <div className="p-4 border-t border-gray-700">
                            <button
                                onClick={() => {
                                    logout();
                                    setIsOpen(false);
                                }}
                                className="w-full text-left px-4 py-2 rounded-md bg-destaque hover:opacity-80 transition-colors"
                            >
                                Sair (Logout)
                            </button>
                        </div>

                        
                    </>
                )}
            </aside>
        </>
    );
}