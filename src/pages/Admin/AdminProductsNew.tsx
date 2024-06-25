import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useState } from 'react'
import { Image } from 'lucide-react'

// productName: z.string().min(2).max(50),
//   productPrice
//   productQunatity
//   productDescription
//   productCategory
//   productImage
//   createdAt
//   updatedAt

const formSchema = z.object({
  productName: z
    .string()
    .min(2, { message: '2자 이상의 상품명을 입력해주세요.' }),
  productPrice: z
    .number()
    .min(0, { message: '정확한 금액을 입력해주세요' }),
  productQunatity: z
    .number()
    .min(0, { message: '정확한 수량을 입력해주세요' }),
  productStatus: z.boolean(),
  productDescription: z.string(),
  productCategory: z.string(),
  productImage: z.string(),
})

const AdminProductsNewPage = () => {
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: '',
      productPrice: 0,
      productQunatity: 1,
      productStatus: true,
      productDescription: '',
      productCategory: '',
      productImage: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  return (
    <>
      <div className='flex justify-between items-center'>
        <h2 className='font-semibold text-xl'>상품 등록</h2>
      </div>
      <div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='flex md:flex-row flex-col gap-x-8 w-full'>
              <div>
                <FormField
                  control={form.control}
                  name='productImage'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이미지</FormLabel>
                      <FormDescription>
                        <label htmlFor='productImage' className='flex justify-center items-center border-input border rounded-md w-64 h-64 overflow-hidden'>
                          {preview ? (
                            <img src={preview} alt='미리보기' className='w-full h-full object-cover' />
                          ) : (
                            <Image />
                          )}
                        </label>
                      </FormDescription>
                      <FormControl>
                        <Input
                          id='productImage'
                          accept='image/*,.jpeg,.jpg,.png'
                          type='file'
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleFileChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='space-y-4 w-full'>
                <FormField
                  control={form.control}
                  name='productName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>상품명 (비타민 이름)</FormLabel>
                      <FormControl>
                        <Input className='max-w-96' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='productPrice'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>판매가</FormLabel>
                      <FormControl>
                        <div className='flex items-center gap-x-2'>
                          <Input type='number' min='0' className='max-w-96' {...field} />
                          <span className='font-semibold'>원</span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='productQunatity'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>재고 수량</FormLabel>
                      <FormControl>
                        <Input type='number' min='0' className='max-w-96' {...field} />
                      </FormControl>
                      <FormDescription>
                        재고 수량이 0일 경우 상품을 구매할수 없습니다.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='productStatus'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>판매 상태</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue='true'
                          className='flex space-x-4'
                        >
                          <FormItem className='flex items-center space-x-3 space-y-0'>
                            <FormControl>
                              <RadioGroupItem value='true' />
                            </FormControl>
                            <FormLabel className='font-normal'>판매함 (페이지 노출 O)</FormLabel>
                          </FormItem>
                          <FormItem className='flex items-center space-x-3 space-y-0'>
                            <FormControl>
                              <RadioGroupItem value='false' />
                            </FormControl>
                            <FormLabel className='font-normal'>판매안함 (페이지 노출 X)</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name='productCategory'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>카테고리</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    카테고리가 여러개일 경우 콤마(,)로 구분합니다.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name='productDescription'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>상품 소개</FormLabel>
                  <FormControl>
                    <Textarea rows={10} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='float-right'>상품 등록하기</Button>
          </form>
        </Form>
      </div>
    </>
  );
}

export default AdminProductsNewPage;