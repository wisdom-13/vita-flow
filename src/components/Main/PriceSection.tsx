import { Separator } from '../ui/separator';

interface PriceSectionProps {
  totalPrice: number;
  deliveryPrice: number;
}

const PriceSection = ({ totalPrice, deliveryPrice }: PriceSectionProps) => {

  return (
    <div className='bg-white p-6'>
      <h3 className='mb-3 font-semibold text-xl'>결제 금액</h3>
      <div className='flex flex-col gap-y-2'>
        <dl className='flex justify-between'>
          <dt>상품금액</dt>
          <dd>{totalPrice.toLocaleString()}원</dd>
        </dl>
        <dl className='flex justify-between'>
          <dt>배송비</dt>
          <dd>{deliveryPrice.toLocaleString()}원</dd>
        </dl>
        <Separator className='my-1' />
        <dl className='flex justify-between'>
          <dt className='font-semibold'>총 결제 금액</dt>
          <dd className='font-semibold text-primary text-xl'>{(totalPrice + deliveryPrice).toLocaleString()}원</dd>
        </dl>
      </div>
    </div>
  );
}

export default PriceSection;