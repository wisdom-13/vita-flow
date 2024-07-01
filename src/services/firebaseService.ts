import { Product } from '@/types/types';

import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Timestamp, addDoc, collection, doc, getDoc, updateDoc, deleteDoc, query, orderBy, limit, startAfter, getDocs, where } from 'firebase/firestore';
import { db, storage } from '@/config/firebase';
import uuid from 'react-uuid';


export const uploadProductImage = async (file: File): Promise<string> => {
  const storageRef = ref(storage, `products/${uuid()}-${file.name}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

export const deleteProductImage = async (imageUrl: string): Promise<void> => {
  const imageRef = ref(storage, imageUrl);
  await deleteObject(imageRef);
};


export const addProduct = async (productData: any) => {
  await addDoc(collection(db, 'products'), {
    ...productData,
    createAt: Timestamp.now(),
    updateAt: Timestamp.now(),
  });
};

export const updateProduct = async (id: string, productData: any) => {
  await updateDoc(doc(db, 'products', id), {
    ...productData,
    updateAt: Timestamp.now(),
  });
};

export const updateProductStatus = async (id: string, status: boolean) => {
  await updateDoc(doc(db, 'products', id), { productStatus: status });
};


export const deleteProduct = async (id: string) => {
  await deleteDoc(doc(db, 'products', id));
};


export const fetchProduct = async (id?: string) => {
  if (!id) return null;

  const docRef = doc(db, 'products', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
};

export const fetchProducts = async (
  pageParam: any,
  filters: { sortBy?: string, productsState?: boolean, categories?: string[], pageSize?: number }
) => {
  let productsQuery = query(
    collection(db, 'products'),
    limit((filters.pageSize) ? filters.pageSize : 10)
  );

  switch (filters.sortBy) {
    case 'byDate':
      productsQuery = query(productsQuery, orderBy('createAt', 'desc'));
      break;
    case 'byPriceLow':
      productsQuery = query(productsQuery, orderBy('productPrice', 'asc'));
      break;
    case 'byPriceHigh':
      productsQuery = query(productsQuery, orderBy('productPrice', 'desc'));
      break;
    case 'bySales':
      productsQuery = query(productsQuery, orderBy('productSales', 'desc'));
      break;
    default:
      break;
  }

  if (pageParam) {
    productsQuery = query(productsQuery, startAfter(pageParam));
  }

  if (filters.productsState !== undefined) {
    productsQuery = query(productsQuery, where('productStatus', '==', filters.productsState));
  }

  if (filters.categories && filters.categories.length > 0) {
    productsQuery = query(productsQuery, where('productCategory', 'array-contains-any', filters.categories));
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
