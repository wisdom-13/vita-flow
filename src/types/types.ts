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
  productQuantity: number;
  productStatus: boolean;
  productCategory: Array<string>;
  productDescription: string;
  productImage: string;
  sellerId: string;
  createAt: Date;
  updateAt: Date;
}
