import { create } from 'zustand';
import { products } from '@/data/products';

type SortKey = 'popularity' | 'price-asc' | 'price-desc' | 'rating';

type CatalogState = {
  categories: string[];
  selectedCategory?: string;
  inStockOnly: boolean;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  sort: SortKey;
  setCategory: (c?: string) => void;
  setInStockOnly: (v: boolean) => void;
  setPriceRange: (min: number, max: number) => void;
  setMinRating: (r: number) => void;
  setSort: (s: SortKey) => void;
};

export const useCatalogStore = create<CatalogState>((set) => ({
  categories: Array.from(new Set(products.map((p) => p.category))).sort(),
  selectedCategory: undefined,
  inStockOnly: false,
  minPrice: 0,
  maxPrice: 1000,
  minRating: 0,
  sort: 'popularity',
  setCategory: (c) => set({ selectedCategory: c }),
  setInStockOnly: (v) => set({ inStockOnly: v }),
  setPriceRange: (min, max) => set({ minPrice: Math.max(0, min), maxPrice: Math.max(min, max) }),
  setMinRating: (r) => set({ minRating: Math.max(0, Math.min(5, r)) }),
  setSort: (s) => set({ sort: s }),
}));
