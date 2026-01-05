"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminEmptyPage() {
    const router = useRouter();

    useEffect(() => {
        const stored = localStorage.getItem("admin_user");
        if (!stored) {
            router.replace("/adm");
        }
    }, []);

    return (
        <main className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-lg shadow p-8">
                <h1 className="text-2xl font-bold">Página administrativa vazia</h1>
                <p className="mt-4 text-sm text-gray-600">Área protegida — adicione sua interface administrativa aqui.</p>
            </div>
        </main>
    );
}
