import { addProduct, fetchProduct, updateProduct } from '@/services/firebaseService';
import { Product } from '@/types/types';
import { UseQueryResult, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
      staleTime: 1000 * 60 * 5,
    });
  };

  return { prefetchProduct };
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productData }: { productData: Product }) => addProduct(productData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      { id, productData }: { id: string, productData: Product }
    ) => {
      await updateProduct(id, productData);
      return id;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', variables.id] });
    }
  });
};
