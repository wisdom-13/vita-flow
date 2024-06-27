import { db } from '@/config/firebase';
import { Product } from '@/types/types';
import { getDocs, query, collection, orderBy, limit, startAfter } from 'firebase/firestore';

export const fetchProducts = async (pageParam: any) => {
  const PAGE_SIZE = 10;

  let productsQuery = query(
    collection(db, 'products'),
    orderBy('createAt', 'desc'),
    limit(PAGE_SIZE)
  );

  if (pageParam) {
    productsQuery = query(productsQuery, startAfter(pageParam));
  }

  const querySnapshot = await getDocs(productsQuery);
  const productsList: Product[] = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }) as Product);

  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  return {
    products: productsList,
    nextCursor: lastVisible,
  };
};