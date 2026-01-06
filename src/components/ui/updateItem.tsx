"use client";

import React, { useState, useEffect } from "react";

export default function UpdateItem({ item, onSubmit }: { item: any, onSubmit: (data: any) => Promise<void> }) {
    const [form, setForm] = useState({ ...item, price: String(item.price) });

    useEffect(() => {
        if (item) setForm({ ...item, price: String(item.price) });
    }, [item]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-(--azulEscuro)">
            <div>
                <label className="text-sm font-bold">Nome</label>
                <input className="w-full border p-2 rounded" value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })} required />
            </div>

            <div>
                <label className="text-sm font-bold">Descrição</label>
                <textarea className="w-full border p-2 rounded h-24" value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })} required />
            </div>

            <div className="flex gap-4">
                <div className="flex-1">
                    <label className="text-sm font-bold">Preço</label>
                    <input className="w-full border p-2 rounded" type="number" step="0.01" value={form.price}
                        onChange={e => setForm({ ...form, price: e.target.value })} required />
                </div>
                <div className="flex-1">
                    <label className="text-sm font-bold">Categoria</label>
                    <select className="w-full border p-2 rounded" value={form.category}
                        onChange={e => setForm({ ...form, category: e.target.value })}>
                        <option value="ROUPAS">ROUPAS</option>
                        <option value="ELETRONICOS">ELETRÔNICOS</option>
                        <option value="MOVEL">MÓVEIS</option>
                        <option value="OUTROS">OUTROS</option>
                    </select>
                </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer py-2">
                <input type="checkbox" checked={form.available}
                    onChange={e => setForm({ ...form, available: e.target.checked })} />
                <span className="text-sm font-bold">Disponível para venda</span>
            </label>

            <button type="submit" className="w-full bg-(--azulEscuro) text-white p-3 rounded font-bold hover:opacity-90">
                Salvar Alterações
            </button>
        </form>
    );
}