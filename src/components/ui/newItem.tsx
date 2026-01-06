"use client";

import React, { useState } from "react";

type NewItemData = {
    name: string;
    description: string;
    price: string;
    category: string;
    available: boolean;
};

const INITIAL_STATE: NewItemData = {
    name: "",
    description: "",
    price: "",
    category: "OUTROS",
    available: true,
};

export default function NewItem({ onSubmit }: { onSubmit: (data: NewItemData, images: File[]) => Promise<void> }) {
    const [form, setForm] = useState<NewItemData>(INITIAL_STATE);
    const [files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        if (files.length + selectedFiles.length > 4) {
            return setError("Máximo de 4 imagens permitido.");
        }
        setFiles(prev => [...prev, ...selectedFiles]);
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit(form, files);
            setForm(INITIAL_STATE);
            setFiles([]);
        } catch (err) {
            setError("Erro ao salvar item. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 text-(--azulEscuro)">
            {error && <p className="text-red-500 text-sm font-bold">{error}</p>}

            <div className="grid grid-cols-1 gap-4">
                <input required name="name" placeholder="Nome do produto" value={form.name} onChange={handleChange} className="w-full border p-2 rounded" />

                <textarea required name="description" placeholder="Descrição detalhada" value={form.description} onChange={handleChange} className="w-full border p-2 rounded h-20" />

                <div className="flex gap-4">
                    <input required name="price" type="number" placeholder="Preço (Ex: 105.00)" value={form.price} onChange={handleChange} className="flex-1 border p-2 rounded" />

                    <select name="category" value={form.category} onChange={handleChange} className="flex-1 border p-2 rounded">
                        <option value="ROUPAS">ROUPAS</option>
                        <option value="ELETRONICOS">ELETRÔNICOS</option>
                        <option value="MOVEL">MÓVEIS</option>
                        <option value="OUTROS">OUTROS</option>
                    </select>
                </div>
            </div>

            <div className="flex items-center gap-4 border-y py-2">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="available" checked={form.available} onChange={handleChange} />
                    <span className="text-sm font-medium">Disponível para venda</span>
                </label>
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-bold">Imagens ({files.length}/4)</label>
                <input type="file" accept="image/*" multiple onChange={handleFileChange} className="text-sm block w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-(--azulEscuro) file:text-white hover:file:opacity-80" />

                <div className="flex gap-2 mt-2">
                    {files.map((file, i) => (
                        <div key={i} className="relative group">
                            <img src={URL.createObjectURL(file)} className="h-16 w-16 object-cover rounded border" alt="preview" />
                            <button
                                type="button"
                                onClick={() => setFiles(prev => prev.filter((_, idx) => idx !== i))}
                                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >✕</button>
                        </div>
                    ))}
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-(--azulEscuro) text-white font-bold rounded-md hover:opacity-90 disabled:bg-gray-400"
            >
                {loading ? "Processando..." : "Confirmar Cadastro"}
            </button>
        </form>
    );
}