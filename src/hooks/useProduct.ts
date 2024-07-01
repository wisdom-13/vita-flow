import { fetchProduct } from '@/services/firebaseService';
import { Product } from '@/types/types';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

export const useProduct = (id?: string): UseQueryResult<Product, Error> => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });
};

