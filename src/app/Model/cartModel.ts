export interface Cart {
    items: Array<CartItem>;
}

export interface CartItem {
    product: number;
    title: string;
    style: string;
    price: number;
    quantity: number;
    size: string
    id: number;
}