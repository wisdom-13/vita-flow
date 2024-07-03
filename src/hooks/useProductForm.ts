import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';

import { useLoading } from '@/context/LoadingContext';
import { useAuth } from '@/context/AuthContext';
import {
  uploadProductImage,
  deleteProductImage,
} from '@/services/firebaseService';
import { useProduct, useAddProduct, useUpdateProduct } from './useProduct';
import { Product } from '@/types/types';


export const useProductForm = () => {
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  const { id } = useParams();
  const { user } = useAuth();
  const { data: productData } = useProduct(id);
  const { mutate: updateMutate } = useUpdateProduct();
  const { mutate: addMutate } = useAddProduct();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);

  const formSchema = z.object({
    productName: z.string().min(2, { message: '2자 이상의 상품명을 입력해주세요.' }),
    productPrice: z.coerce.number().min(0, { message: '정확한 금액을 입력해주세요' }),
    productQuantity: z.coerce.number().min(0, { message: '정확한 수량을 입력해주세요' }),
    productStatus: z.coerce.boolean(),
    productCategory: z.string(),
    productDescription: z.string().min(1, { message: '상품 설명을 작성해주세요.' }),
    productImage: z.any().refine((file: File[]) => file.length > 0 || id, '상품 이미지를 등록해주세요.')
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: '',
      productPrice: 0,
      productQuantity: 1,
      productStatus: true,
      productDescription: '',
      productCategory: '',
      productImage: undefined,
    },
  });

  const fileRef = form.register('productImage');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      let downloadURL = existingImageUrl;

      if (values.productImage && values.productImage.length > 0) {
        downloadURL = await uploadProductImage(values.productImage[0]);

        if (existingImageUrl) {
          await deleteProductImage(existingImageUrl);
        }
      }

      const productData = {
        ...values,
        productImage: downloadURL,
        productCategory: values.productCategory.split(',').map((v) => v.trim()).filter((v) => v != ''),
        productSales: 0,
        sellerId: user?.uid,
      } as Product;

      if (id) {
        updateMutate({ id, productData })
      } else {
        addMutate({ productData })
      }

      toast.success('성공적으로 상품 정보를 저장했습니다.');
      navigate('/admin/products');

    } catch (error: any) {
      toast.error('상품을 등록하는 중 오류가 발생했습니다.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (productData) {
        console.log(productData.productStatus)
        form.reset({
          ...productData,
          productCategory: productData.productCategory.join(','),
          productImage: undefined,
        });
        setExistingImageUrl(productData.productImage);
        setImagePreview(productData.productImage);
      }
      setLoading(false);
    };

    fetchData();
  }, [productData, form]);

  return {
    form,
    fileRef,
    imagePreview,
    handleImageChange,
    onSubmit,
  };
};
