"use client";

import React, { useState } from "react";
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
import { api } from "@/config/axios";

export default function Dashboard() {
    const [open, setOpen] = useState(false);

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

    return (
        <main className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow p-6">
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

                <div className="border-2 border-dashed border-gray-200 rounded-lg p-12 text-center">
                    <p className="text-gray-400">Nenhum item selecionado para visualização rápida.</p>
                </div>
            </div>
        </main>
    );
}