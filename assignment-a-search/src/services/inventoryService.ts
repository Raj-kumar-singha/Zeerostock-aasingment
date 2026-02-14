import axios from 'axios';
import { Product, SearchFilters } from '../types';

export const inventoryService = {
    search: async (filters: SearchFilters): Promise<Product[]> => {
        const { data } = await axios.get('/api/search', { params: filters });
        return data;
    }
};
