import { Cart, Product } from '@/types/types';
import { useInfiniteQuery, useQueries, useQueryClient } from '@tanstack/react-query';
import { fetchProduct, fetchProducts } from '@/services/firebaseService';

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
  });
};

export const usePrefetchProducts = (filters: { sortBy?: string, productsState?: boolean, categories?: string[], pageSize?: number }) => {
  const queryClient = useQueryClient();

  const prefetchProducts = async () => {
    await queryClient.fetchInfiniteQuery({
      queryKey: ['products', filters],
      queryFn: ({ pageParam = null }) => fetchProducts(pageParam, filters),
      initialPageParam: null,
    })
  };

  return { prefetchProducts };
};

export const useCartProducts = (cartItems: Cart[]) => {
  const productQueries = useQueries({
    queries: cartItems.map(item => ({
      queryKey: ['product', item.id],
      queryFn: () => fetchProduct(item.id),
      staleTime: 1000 * 60 * 5,
    })),
  });

  const combinedCartProducts = productQueries.map((query, index) => {
    const product = query.data;
    if (product && product.productStatus === true) {
      return { ...cartItems[index], ...product };
    }
    return null;
  }).filter(Boolean) as (Cart & Product)[];

  return {
    cartProducts: combinedCartProducts,
    isLoading: productQueries.some(query => query.isLoading),
    isError: productQueries.some(query => query.isError),
  };
}