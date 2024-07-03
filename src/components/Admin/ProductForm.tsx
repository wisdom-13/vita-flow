import { useProductForm } from '@/hooks/useProductForm'
import { Image } from 'lucide-react'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const ProductForm = () => {
  const { form, fileRef, imagePreview, handleImageChange, onSubmit, } = useProductForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <div className='flex md:flex-row flex-col gap-8 w-full'>
          <div>
            <FormField
              control={form.control}
              name='productImage'
              render={() => (
                <FormItem>
                  <FormLabel>이미지</FormLabel>
                  <FormDescription>
                    <label htmlFor='productImage' className='flex justify-center items-center border-input border rounded-md w-64 h-64 overflow-hidden'>
                      {imagePreview ? (
                        <img src={imagePreview} alt='미리보기' className='w-full h-full object-cover' />
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
                      {...fileRef}
                      onChange={handleImageChange}
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
              name='productQuantity'
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
                      onValueChange={(value) => field.onChange(value === 'true')}
                      value={field.value ? 'true' : 'false'}
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
  );
}

export default ProductForm;