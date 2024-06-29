import { fetchProduct } from '@/services/firebaseService';
import { useQuery } from '@tanstack/react-query';

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id)
  });
};

