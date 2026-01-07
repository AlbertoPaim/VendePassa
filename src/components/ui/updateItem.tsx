"use client";

import React, { useState, useEffect } from "react";

export default function UpdateItem({ item, onSubmit }: { item: any, onSubmit: (data: any, images?: File[]) => Promise<void> }) {
    const [form, setForm] = useState({ ...item, price: String(item.price) });
    const [files, setFiles] = useState<File[]>([]);
    const [existingImages, setExistingImages] = useState<{ id: string; imageUrl: string }[]>(item?.images || []);
    const [removedImageIds, setRemovedImageIds] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (item) {
            setForm({ ...item, price: String(item.price) });
            setExistingImages(item.images || []);
            setRemovedImageIds([]);
            setFiles([]);
            setError(null);
        }
    }, [item]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        if (existingImages.length + files.length + selectedFiles.length > 4) {
            return setError("Máximo de 4 imagens permitido.");
        }
        setFiles(prev => [...prev, ...selectedFiles]);
        setError(null);
    };

    const handleRemoveExisting = (id: string) => {
        setExistingImages(prev => prev.filter(img => img.id !== id));
        setRemovedImageIds(prev => [...prev, id]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit({ ...form, removedImageIds }, files.length ? files : undefined);
        } catch (err) {
            setError("Erro ao atualizar item. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-(--azulEscuro)">
            {error && <p className="text-red-500 text-sm font-bold">{error}</p>}

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

            <div className="space-y-2">
                <label className="block text-sm font-bold">Imagens ({existingImages.length + files.length}/4)</label>

                {existingImages.length > 0 && (
                    <div className="flex gap-2 mb-2">
                        {existingImages.map(img => (
                            <div key={img.id} className="relative group">
                                <img src={img.imageUrl} className="h-16 w-16 object-cover rounded border" alt="existing" />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveExisting(img.id)}
                                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >✕</button>
                            </div>
                        ))}
                    </div>
                )}

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

                <p className="text-xs text-muted-foreground">Mantenha as imagens existentes ou remova/adicione novas.</p>
            </div>

            <button type="submit" disabled={loading} className="w-full py-2 bg-(--azulEscuro) text-white p-2 rounded font-bold hover:opacity-90 disabled:bg-gray-400">
                {loading ? "Processando..." : "Salvar Alterações"}
            </button>
        </form>
    );
}