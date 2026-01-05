
export interface ItemProps {
    id: string;
    name: string;
    description: string;
    price: number;
    available: boolean;
    images: { imageUrl: string }[];
    category: string;
}