import { Product } from '@/types/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/services/firebaseService';

interface FetchProductsResponse {
  products: Product[];
  nextCursor: any;
}

export const useProducts = (filters: { sortBy?: string, productsState?: boolean, categories?: string[], pageSize?: number }) => {
  return useInfiniteQuery<FetchProductsResponse>({
    queryKey: ['products', filters],
    queryFn: ({ pageParam }) => fetchProducts(pageParam, filters),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
  }
  );
};
