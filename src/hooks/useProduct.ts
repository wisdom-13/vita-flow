import { fetchProduct } from '@/services/firebaseService';
import { Product } from '@/types/types';
import { UseQueryResult, useQuery, useQueryClient } from '@tanstack/react-query';

export const useProduct = (id?: string): UseQueryResult<Product, Error> => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
    staleTime: 1000 * 60,
  });
};

export const usePrefetchProduct = (id?: string) => {
  const queryClient = useQueryClient();

  const prefetchProduct = async () => {
    await queryClient.prefetchQuery({
      queryKey: ['product', id],
      queryFn: () => fetchProduct(id!),
      staleTime: 1000 * 60,
    });
  };

  return { prefetchProduct };
};