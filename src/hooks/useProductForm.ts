import { useEffect, useState } from 'react';

import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Timestamp, addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '@/config/firebase';

import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import uuid from 'react-uuid';

import { useLoading } from '@/context/LoadingContext';
import { useAuth } from '@/context/AuthContext';


export const useProductForm = () => {
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  const { id } = useParams();
  const { user } = useAuth();

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
        const storageRef = ref(storage, `products/${uuid()}-${values.productImage[0].name}`);
        await uploadBytes(storageRef, values.productImage[0]);
        downloadURL = await getDownloadURL(storageRef)

        if (existingImageUrl) {
          const existingImageRef = ref(storage, existingImageUrl);
          await deleteObject(existingImageRef);
        }
      }

      if (id) {
        await updateDoc(doc(db, 'products', id), {
          ...values,
          productImage: downloadURL,
          productCategory: values.productCategory.split(',').map((v) => v.trim()).filter((v) => v != ''),
          sellerId: user?.uid,
          updateAt: Timestamp.now(),
        });
      } else {
        await addDoc(collection(db, 'products'), {
          ...values,
          productImage: downloadURL,
          productCategory: values.productCategory.split(',').map((v) => v.trim()).filter((v) => v != ''),
          sellerId: user?.uid,
          createAt: Timestamp.now(),
          updateAt: Timestamp.now(),
        });
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
      setLoading(true);
      if (id) {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const productData = docSnap.data();
          form.reset({
            ...productData,
            productCategory: productData.productCategory.join(','),
            productImage: undefined,
          });
          setExistingImageUrl(productData.productImage);
          setImagePreview(productData.productImage);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [id, form]);

  return {
    form,
    fileRef,
    imagePreview,
    handleImageChange,
    onSubmit,
  };
};
