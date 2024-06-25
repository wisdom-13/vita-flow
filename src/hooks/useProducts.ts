import { Product } from '@/types/types';

import { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/config/firebase';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsQuery = query(collection(db, 'products'), orderBy('createAt', 'desc'));
        const querySnapshot = await getDocs(productsQuery);
        const productsList: Product[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];
        setProducts(productsList);

      } catch (error) {
        setError(error as Error);

      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  return { products, loading, error };
};
