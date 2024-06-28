import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Timestamp, addDoc, collection, doc, getDoc, updateDoc, deleteDoc, query, orderBy, limit, startAfter, getDocs } from 'firebase/firestore';
import { db, storage } from '@/config/firebase';
import uuid from 'react-uuid';
import { Product } from '@/types/types';


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


export const fetchProduct = async (id: string) => {
  const docRef = doc(db, 'products', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
};

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