import { Cart, Product } from '@/types/types';
import { useInfiniteQuery, useQueries, useQueryClient } from '@tanstack/react-query';
import { fetchProduct, fetchProducts } from '@/services/firebaseService';
import { useEffect, useState } from 'react';

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
    })),
  });

  const [cartProducts, setCartProducts] = useState<(Cart & Product)[]>([]);

  useEffect(() => {
    if (productQueries.every(query => query.isSuccess || query.isError)) {
      const products = productQueries.map(query => query.data);
      const combined = cartItems.reduce((acc, cartItem, index) => {
        const product = products[index];
        if (product) {
          acc.push({ ...cartItem, ...product });
        }
        return acc;
      }, [] as (Cart & Product)[]);
      setCartProducts(combined);
    }
  }, [productQueries, cartItems]);

  return {
    cartProducts,
    isLoading: productQueries.some(query => query.isLoading),
    isError: productQueries.some(query => query.isError),
  };
};