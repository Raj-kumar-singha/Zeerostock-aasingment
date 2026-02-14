'use client';

import { useState, useEffect, useMemo } from 'react';
import { FaSearch, FaFilter, FaMoneyBillWave, FaBoxOpen, FaSyncAlt } from 'react-icons/fa';
import { useDebounce } from '@/hooks/useDebounce';
import { inventoryService } from '@/services/inventoryService';
import { Product, SearchFilters } from '@/types';

const CATEGORIES = [
    'Energy', 'Storage', 'Lighting', 'Materials',
    'Electrical', 'Construction', 'Safety', 'Tools'
];

export default function SearchPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState<SearchFilters>({
        q: '',
        category: '',
        minPrice: '',
        maxPrice: ''
    });

    const debouncedSearch = useDebounce(filters.q, 400);

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const results = await inventoryService.search({
                    ...filters,
                    q: debouncedSearch
                });
                setProducts(results);
            } catch (error) {
                console.error('Failed to load inventory:', error);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [debouncedSearch, filters.category, filters.minPrice, filters.maxPrice]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const resetFilters = () => {
        setFilters({ q: '', category: '', minPrice: '', maxPrice: '' });
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-8 lg:p-12 font-sans selection:bg-blue-100">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header Section */}
                <header className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200">
                            <FaBoxOpen className="text-white text-xl" />
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                            Zeerostock <span className="text-blue-600">Inventory</span>
                        </h1>
                    </div>
                    <p className="text-slate-500 font-medium max-w-lg">
                        High-performance surplus stock search engine for industrial suppliers.
                    </p>
                </header>

                {/* Filter Bar */}
                <section className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200/60 transition-all hover:shadow-md">

                    <div className="md:col-span-4 space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Search Products</label>
                        <div className="relative group">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                type="text"
                                name="q"
                                value={filters.q}
                                onChange={handleInputChange}
                                placeholder="Solar panels, cables..."
                                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none placeholder:text-slate-400 font-medium"
                            />
                        </div>
                    </div>

                    <div className="md:col-span-3 space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Category</label>
                        <div className="relative">
                            <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            <select
                                name="category"
                                value={filters.category}
                                onChange={handleInputChange}
                                className="w-full pl-11 pr-10 py-3.5 bg-slate-50 border-none rounded-2xl appearance-none focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-700 cursor-pointer"
                            >
                                <option value="">All Categories</option>
                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Min Price</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                            <input
                                type="number"
                                name="minPrice"
                                value={filters.minPrice}
                                onChange={handleInputChange}
                                className="w-full pl-8 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                            />
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Max Price</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                            <input
                                type="number"
                                name="maxPrice"
                                value={filters.maxPrice}
                                onChange={handleInputChange}
                                className="w-full pl-8 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                            />
                        </div>
                    </div>

                    <div className="md:col-span-1">
                        <button
                            onClick={resetFilters}
                            className="w-full p-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl transition-all flex items-center justify-center group"
                            title="Reset Filters"
                        >
                            <FaSyncAlt className="group-hover:rotate-180 transition-transform duration-500" />
                        </button>
                    </div>
                </section>

                {/* Results Body */}
                <main className="min-h-[400px]">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-[400px] space-y-4">
                            <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
                            <p className="text-slate-500 font-medium tracking-wide">Fetching global inventory...</p>
                        </div>
                    ) : products.length > 0 ? (
                        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200/60 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-slate-50/50">
                                            <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-[0.15em]">Product Details</th>
                                            <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-[0.15em]">Category</th>
                                            <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-[0.15em]">Supplier</th>
                                            <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-[0.15em] text-right">Unit Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {products.map(item => (
                                            <tr key={item.id} className="group hover:bg-blue-50/40 transition-all duration-300">
                                                <td className="px-8 py-6">
                                                    <span className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors uppercase text-sm tracking-wide border-b-2 border-transparent group-hover:border-blue-200">
                                                        {item.name}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="px-3 py-1.5 bg-slate-100 text-slate-500 rounded-lg text-xs font-black uppercase tracking-widest group-hover:bg-white group-hover:text-slate-800 transition-colors">
                                                        {item.category}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-medium text-slate-600">{item.supplier}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <span className="text-lg font-black text-slate-900 tracking-tight">
                                                        ${item.price.toFixed(2)}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-[400px] bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-200">
                            <div className="p-6 bg-white rounded-3xl shadow-sm mb-4">
                                <FaSearch className="text-4xl text-slate-300" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-800">No matching stock found</h2>
                            <p className="text-slate-500 mt-2 text-center max-w-sm">
                                We couldn't find any products matching those criteria. Try widening your search range.
                            </p>
                            <button
                                onClick={resetFilters}
                                className="mt-6 px-8 py-3 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold hover:border-slate-300 transition-all active:scale-95"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </main>

                <footer className="pt-12 text-center">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                        © {new Date().getFullYear()} Zeerostock Industrial Surplus Solutions
                    </p>
                </footer>
            </div>
        </div>
    );
}
