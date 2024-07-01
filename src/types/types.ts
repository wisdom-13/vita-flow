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
  createAt: Date;
  updateAt: Date;
}

export interface Cart {
  id: string;
  name: string;
  price: number;
  quantity: number;
  maxQuantity: number;
  image: string;
  category: string[];
}