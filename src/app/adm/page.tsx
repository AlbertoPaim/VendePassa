"use client";

import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog";
import NewItem from "@/components/ui/newItem";
import UpdateItem from "@/components/ui/updateItem";
import { api, getItens } from "@/config/axios";

export default function Dashboard() {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const [editOpen, setEditOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any | null>(null);

    const fetchItems = async () => {
        setLoading(true);
        try {
            const data = await getItens();
            setItems(data || []);
        } catch (err) {
            console.error("Erro ao buscar itens:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleCreate = async (data: any, images: File[]) => {
        try {
            const formData = new FormData();

            images.forEach((file) => {
                formData.append("images", file);
            });

            const itemBlob = new Blob(
                [JSON.stringify({
                    name: data.name,
                    description: data.description,
                    price: parseFloat(data.price),
                    category: data.category,
                    available: data.available,
                })],
                { type: "application/json" }
            );

            formData.append("item", itemBlob);

            await api.post("/itens", formData, {
                withCredentials: true,
            });

            alert("Item criado com sucesso!");
            setOpen(false);
            fetchItems();

        } catch (err: any) {
            console.error("Erro na criação:", err);
            const status = err.response?.status;

            if (status === 403) {
                alert("Sessão expirada ou sem permissão. Tente fazer login novamente.");
            } else {
                alert("Erro ao criar item. Verifique os campos ou sua conexão.");
            }
        }
    };

    const handleUpdate = async (data: any) => {
        console.log("update");

    }

    const handleDelete = async (id: string) => {
        if (!confirm("Tem certeza que deseja deletar este item?")) return;

        try {
            console.log(id);

            await api.delete(`/itens/${id}`, {
                withCredentials: true,
            });

            alert("Item deletado com sucesso!");
            fetchItems();
        } catch (err: any) {
            console.error("Erro ao deletar item:", err);
        }
    }


    return (
        <main className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-(--azulEscuro) text-2xl font-bold">Painel Administrativo</h1>

                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <button className="inline-flex items-center gap-2 px-4 py-2 bg-(--azulEscuro) text-white rounded-md shadow-sm hover:opacity-90 transition-opacity font-medium">
                                <span>+</span> Adicionar Item
                            </button>
                        </DialogTrigger>

                        <DialogContent className="max-w-xl">
                            <DialogHeader>
                                <DialogTitle className="text-(--azulEscuro)">Cadastrar Produto</DialogTitle>
                                <DialogDescription>
                                    As imagens e informações ficarão visíveis imediatamente após o salvamento.
                                </DialogDescription>
                            </DialogHeader>

                            <NewItem onSubmit={handleCreate} />

                            <DialogFooter className="border-t pt-4">
                                <DialogClose asChild>
                                    <button className="text-sm font-semibold text-gray-500 hover:text-red-500 transition-colors">
                                        Cancelar
                                    </button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                <p className="text-sm text-muted-foreground mb-4">Itens cadastrados:</p>

                {loading ? (
                    <div>Carregando itens...</div>
                ) : items.length === 0 ? (
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-12 text-center">
                        <p className="text-gray-400">Nenhum item cadastrado ainda.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {items.map((it) => (
                            <div key={it.id} className="flex items-center gap-4 p-4 border rounded">
                                <img src={it.images?.[0]?.imageUrl || '/placeholder.png'} alt={it.name} className="h-20 w-20 object-cover rounded" />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-medium">{it.name}</div>
                                            <div className="text-sm text-muted-foreground">R$ {it.price}</div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => { setEditingItem(it); setEditOpen(true); }} className="px-2 py-1 text-sm bg-yellow-100 rounded">Editar</button>
                                            <button onClick={() => handleDelete(it.id)} className="px-2 py-1 text-sm bg-red-100 rounded hover:bg-red-200">Excluir</button>
                                        </div>
                                    </div>
                                    <div className="text-sm mt-1">{it.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <Dialog open={editOpen} onOpenChange={setEditOpen}>
                    <DialogContent className="max-w-xl">
                        <DialogHeader>
                            <DialogTitle className="text-(--azulEscuro)">Editar Item</DialogTitle>
                            <DialogDescription>Altere os dados do item e envie as alterações.</DialogDescription>
                        </DialogHeader>

                        {editingItem && <UpdateItem item={editingItem} onSubmit={handleUpdate} />}

                        <DialogFooter className="border-t pt-4">
                            <DialogClose asChild>
                                <button className="text-sm font-semibold text-gray-500 hover:text-red-500 transition-colors">
                                    Fechar
                                </button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </div>
        </main>
    );
}