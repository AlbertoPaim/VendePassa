import axios from 'axios';

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

