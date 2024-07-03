import { addProduct, deleteProduct, deleteProductImage, fetchProduct, updateProduct, updateProductStatus } from '@/services/firebaseService';
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
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', data] });
    }
  });
};


export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productData }: { productData: Product }) => {
      await deleteProduct(productData.id);
      return productData.productImage;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      deleteProductImage(data)
    }
  });
};

export const useBatchUpdateProducts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productIds, state }: { productIds: string[], state: boolean }) => {
      const promises = productIds.map((id) => updateProductStatus(id, state));
      await Promise.all(promises);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      variables.productIds.forEach((id) => {
        queryClient.invalidateQueries({ queryKey: ['product', id] });
      });
    }
  });
};

export const useBatchDeleteProducts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productIds }: { productIds: string[] }) => {
      const promises = productIds.map((id) => deleteProduct(id));
      await Promise.all(promises);
    },
    onSuccess: (data, variables) => {
      console.log('[data]', data)
      console.log('[variables]', variables)
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });
};