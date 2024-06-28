import { Product } from '@/types/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/services/firebaseService';

interface FetchProductsResponse {
  products: Product[];
  nextCursor: any;
}

export const useProducts = () => {
  return useInfiniteQuery<FetchProductsResponse>({
    queryKey: ['products'],
    queryFn: ({ pageParam }) => fetchProducts(pageParam),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
  }
  );
};

