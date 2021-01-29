export interface Product {
    id: string;
    name: string;
    description: string;
    iva: boolean,
    cost: number;
    price: number,
    state: boolean,
    stock?: number,
    image: string
}