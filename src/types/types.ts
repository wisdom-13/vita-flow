import { Timestamp } from 'firebase/firestore';

export interface User {
  uid: string;
  email: string | null;
  nickname: string | null;
  isSeller: boolean;
}

export interface Product {
  id: string;
  productName: string;
  productPrice: number;
  productQuantity: number;           // 재고
  productSales: number;              // 판매량
  productStatus: boolean;
  productCategory: Array<string>;
  productDescription: string;
  productImage: string;
  sellerId: string;
  createAt: Timestamp;
  updateAt: Timestamp;
}

export interface Cart {
  id: string;
  cartId: string;
  productId: string;
  userId?: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  isBuy?: boolean;
  isPayment?: boolean;
}

export interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Order {
  id?: string;
  orderId: string;
  userId: string;
  userName?: string | null;
  totalAmount: number;
  items: OrderItem[];
  status: OrderStatus;
  createAt: Timestamp;
  updateAt?: Timestamp;
}

export type OrderStatus = '주문 완료' | '발송 대기' | '발송 시작' | '주문 취소';


export interface Payment {
  userId: string,
  userName?: string | null;
  orderId: string;
  amount: number;
}
