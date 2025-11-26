"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Image {
  id: string;
  imageUrl: string;
  cloudinaryId: string;
}

interface Item {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
  images?: Image[];
}

interface Props {
  open: boolean;
  onClose: () => void;
  mode?: 'create' | 'edit';
  initialItem?: Item;
  onSaved?: () => void;
}

const CATEGORIES = ['ROUPAS', 'CALCADOS', 'ELETRONICOS', 'LIVROS', 'DECORACAO', 'OUTROS'];

export default function ItemModal({ open, onClose, mode = 'create', initialItem, onSaved }: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('ROUPAS');
  const [available, setAvailable] = useState(true);
  const [files, setFiles] = useState<FileList | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && initialItem) {
      setName(initialItem.name || '');
      setDescription(initialItem.description || '');
      setPrice(initialItem.price?.toString() || '');
      setCategory(initialItem.category || 'ROUPAS');
      setAvailable(Boolean(initialItem.available));
      setFiles(null);
      setError('');
    }
    if (!open && mode === 'create') {
      setName('');
      setDescription('');
      setPrice('');
      setCategory('ROUPAS');
      setAvailable(true);
      setFiles(null);
      setError('');
    }
  }, [open, initialItem, mode]);

  if (!open) return null;

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const f = e.target.files;
    if (!f) return setFiles(null);
    if (f.length > 2) {
      setError('Somente até 2 imagens são permitidas.');
      return;
    }
    for (let i = 0; i < f.length; i++) {
      const t = f[i].type;
      if (!t.startsWith('image/')) {
        setError('Apenas arquivos de imagem são permitidos.');
        return;
      }
    }
    setFiles(f);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !description.trim() || !price || !category.trim()) {
      setError('Preencha todos os campos obrigatórios.');
      return;
    }

    const item: Item = {
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
      category: category.trim(),
      available: available,
    };

    const form = new FormData();
    form.append('item', new Blob([JSON.stringify(item)], { type: 'application/json' }));

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        form.append('images', files[i]);
      }
    }

    try {
      setLoading(true);
      console.log('💾 Salvando item...', { mode, itemId: initialItem?.id, item });
      console.log('📦 FormData enviado:', { name, description, price, category, available });
      
      if (mode === 'edit' && initialItem?.id) {
        console.log(`🔄 Atualizando item ${initialItem.id}`);
        await axios.put(`http://localhost:8080/itens/${initialItem.id}`, form, { withCredentials: true });
      } else {
        console.log('✨ Criando novo item');
        await axios.post('http://localhost:8080/itens', form, { withCredentials: true });
      }

      if (mode === 'create') alert('Item cadastrado com sucesso.');
      else alert('Item atualizado com sucesso.');

      onSaved && onSaved();
      onClose();
    } catch (err: any) {
      console.error('❌ Erro ao salvar item:', err?.response?.data || err.message || err);
      console.error('Status HTTP:', err?.response?.status);
      console.error('Headers resposta:', err?.response?.headers);
      console.error('Erro completo:', err);
      const errorMsg = err?.response?.data?.message || err?.response?.data || err.message;
      console.error('Mensagem de erro:', errorMsg);
      setError(err?.response?.data?.message || (mode === 'create' ? 'Falha ao cadastrar item (403 Forbidden - verifique permissões).' : 'Falha ao atualizar item.'));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!initialItem?.id) return;
    if (!confirm('Tem certeza que deseja excluir este item? Esta ação é irreversível.')) return;
    try {
      setLoading(true);
      console.log('Deletando item:', initialItem.id);
      await axios.delete(`http://localhost:8080/itens/${initialItem.id}`, { withCredentials: true });
      alert('Item excluído com sucesso.');
      onSaved && onSaved();
      onClose();
    } catch (err: any) {
      console.error('Erro ao excluir item:', err?.response?.data || err.message || err);
      console.error('Status:', err?.response?.status);
      setError(err?.response?.data?.message || 'Falha ao excluir item.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />

      <div className="relative bg-card rounded-lg p-6 w-full max-w-2xl mx-4 z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-title">{mode === 'create' ? 'Cadastrar Item' : 'Editar Item'}</h3>
          <button onClick={onClose} className="text-sm text-highlight">Fechar</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Nome</label>
            <input className="w-full px-3 py-2 bg-input rounded-md" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div>
            <label className="block mb-1">Descrição</label>
            <textarea className="w-full px-3 py-2 bg-input rounded-md" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Preço</label>
              <input className="w-full px-3 py-2 bg-input rounded-md" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>

            <div>
              <label className="block mb-1">Categoria</label>
              <select 
                className="w-full px-3 py-2 bg-input rounded-md"
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)} />
              <span>Disponível</span>
            </label>
          </div>

          <div>
            <label className="block mb-1">Imagens (até 2)</label>
            <input type="file" accept="image/*" multiple onChange={handleFilesChange} />
            <p className="text-sm text-text-secondary mt-1">Aceita até 2 imagens. Tipos suportados: imagens</p>
            {initialItem?.images && initialItem.images.length > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                {initialItem.images.map((img) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={img.id} src={img.imageUrl} alt={img.cloudinaryId} className="w-full h-24 object-cover rounded" />
                ))}
              </div>
            )}
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div className="flex justify-between items-center gap-3">
            <div>
              {mode === 'edit' && (
                <button type="button" onClick={handleDelete} disabled={loading} className="px-4 py-2 rounded-md bg-red-600 text-white">
                  Excluir
                </button>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded-md bg-input">Cancelar</button>
              <button type="submit" disabled={loading} className="px-4 py-2 rounded-md bg-button text-white">
                {loading ? 'Enviando...' : mode === 'create' ? 'Salvar Item' : 'Salvar Alterações'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
