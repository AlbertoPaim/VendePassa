import axios from 'axios';

axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

interface Image {
    id: string;
    imageUrl: string;
    cloudinaryId: string;
}

interface Item {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    available: boolean;
    images: Image[];
    createdAt: string;
    updatedAt: string;
}


export async function getItens(): Promise<Item[]> {
    try {
        const response = await axios.get('http://localhost:8080/itens');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar os itens:', error);
        return [];
    }
}

export async function getItemById(id: string): Promise<Item | null> {
    try {
        const response = await axios.get(`http://localhost:8080/itens/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar o item com ID ${id}:`, error);
        return null;
    }
}

export async function createItem(itemData: Partial<Item>): Promise<Item | null> {
    try {
        const response = await axios.post('http://localhost:8080/itens', itemData);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar o item:', error);
        return null;
    }
}

export async function updateItem(id: string, itemData: Partial<Item>): Promise<Item | null> {
    try {
        const response = await axios.put(`http://localhost:8080/itens/${id}`, itemData);
        return response.data;
    } catch (error) {
        console.error(`Erro ao atualizar o item com ID ${id}:`, error);
        return null;
    }
}

export async function deleteItem(id: string): Promise<boolean> {
    try {
        await axios.delete(`http://localhost:8080/itens/${id}`);
        return true;
    } catch (error) {
        console.error(`Erro ao deletar o item com ID ${id}:`, error);
        return false;
    }
}

