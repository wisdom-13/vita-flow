import { Order, OrderStatus, Product } from '@/types/types';

import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Timestamp, addDoc, collection, doc, getDoc, updateDoc, deleteDoc, query, orderBy, limit, startAfter, getDocs, where, setDoc } from 'firebase/firestore';
import { db, storage } from '@/config/firebase';
import uuid from 'react-uuid';
import imageCompression from 'browser-image-compression';

export const uploadProductImage = async (file: File): Promise<string> => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 200,
    useWebWorker: true,
    fileType: 'image/webp'
  };

  const compressedFile = await imageCompression(file, options);
  const newFileName = `${uuid()}-${file.name.split('.')[0]}.webp`;
  const storageRef = ref(storage, `products/${newFileName}`);

  await uploadBytes(storageRef, compressedFile);
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

export const updateProductQuantity = async (id: string, quantity: number) => {
  const productRef = doc(db, 'products', id);
  const productSnap = await getDoc(productRef);

  if (!productSnap.exists()) {
    throw new Error('상품을 찾을 수 없습니다.');
  }

  const current = productSnap.data();
  const newQuantity = current.productQuantity - quantity;   // 재고
  const newSales = current.productSales + quantity;         // 판매량

  if (newQuantity <= 0) {
    throw new Error('상품 수량이 부족합니다.');
  }

  await updateDoc(productRef, { productQuantity: newQuantity, productSales: newSales });
};


export const deleteProduct = async (id: string) => {
  await deleteDoc(doc(db, 'products', id));
};


export const fetchProduct = async (id?: string): Promise<Product | null> => {
  if (!id) return null;

  const docRef = doc(db, 'products', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as Product;
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
      productsQuery = query(productsQuery, orderBy('createAt', 'desc'));
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


  const querySnap = await getDocs(productsQuery);

  const productsList: Product[] = querySnap.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }) as Product);

  const lastVisible = querySnap.docs[querySnap.docs.length - 1];

  return {
    products: productsList,
    nextCursor: lastVisible,
  };
};

export const saveOrder = async (order: Order) => {
  const orderRef = doc(db, 'orders', order.orderId);
  const orderDoc = await getDoc(orderRef);

  if (orderDoc.exists()) {
    throw new Error('주문 정보를 찾을 수 없습니다.');
  }

  await setDoc(orderRef, order);
};

export const fetchOrders = async (userId?: string) => {
  let ordersQuery = query(collection(db, 'orders'), orderBy('createAt', 'desc'))

  if (userId) {
    ordersQuery = query(ordersQuery, where('userId', '==', userId));
  }

  const querySnap = await getDocs(ordersQuery);

  const orderList = querySnap.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }) as Order);

  return orderList;
};


export const updateStatusOrder = async (orderId: string, status: OrderStatus) => {
  await updateDoc(doc(db, 'orders', orderId), {
    status: status,
    updateAt: Timestamp.now(),
  });
};
