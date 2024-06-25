import { useState } from 'react';

import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { db, storage } from '@/config/firebase';

import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import uuid from 'react-uuid';

import { useLoading } from '@/context/LoadingContext';
import { useAuth } from '@/context/AuthContext';

const formSchema = z.object({
  productName: z.string().min(2, { message: '2자 이상의 상품명을 입력해주세요.' }),
  productPrice: z.coerce.number().min(0, { message: '정확한 금액을 입력해주세요' }),
  productQunatity: z.coerce.number().min(0, { message: '정확한 수량을 입력해주세요' }),
  productStatus: z.coerce.boolean(),
  productCategory: z.string(),
  productDescription: z.string().min(1, { message: '상품 설명을 작성해주세요.' }),
  productImage: z.any().refine((file: File[]) => file.length > 0, "상품 이미지를 등록해주세요.")
});

export const useProductForm = () => {
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  const { user } = useAuth();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: '',
      productPrice: 0,
      productQunatity: 1,
      productStatus: true,
      productDescription: '',
      productCategory: '',
      productImage: undefined,
    },
  });
  const fileRef = form.register("productImage");

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
      const storageRef = ref(storage, `products/${uuid()}-${values.productImage[0].name}`);
      const uploadTask = uploadBytesResumable(storageRef, values.productImage[0]);
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

      await addDoc(collection(db, 'products'), {
        ...values,
        productImage: downloadURL,
        sellerId: user?.uid,
        createAt: Timestamp.now(),
        updateAt: Timestamp.now(),
      });
      toast.success('성공적으로 상품을 등록했습니다.');
      navigate('/admin/products');

    } catch (error: any) {
      console.log(error);
      toast.error('상품을 등록하는 중 오류가 발생했습니다.');

    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    fileRef,
    imagePreview,
    handleImageChange,
    onSubmit,
  };
};
