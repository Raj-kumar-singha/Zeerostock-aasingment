export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    supplier: string;
}

export interface SearchFilters {
    q: string;
    category: string;
    minPrice: string;
    maxPrice: string;
}
