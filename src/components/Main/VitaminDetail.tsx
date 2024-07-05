import { Product } from '@/types/types';
import CardViewSection from '@/components/Main/CardViewSection';
import BadgeList from '@/components/Shared/BadgeList';

interface VitaminDetailProps {
  product: Product;
}
const VitaminDetail = ({ product }: VitaminDetailProps) => {
  const {
    productImage,
    productName,
    productPrice,
    productQuantity,
    productCategory,
    productDescription
  } = product;

  return (
    <>
      <div>
        <div className='flex items-center gap-x-4'>
          <div className='border rounded-md w-36 h-36 overflow-hidden shrink-0'>
            <img src={productImage} alt={productName} className='w-full h-full object-cover' />
          </div>
          <div className='space-y-1 text-sm'>
            <div className='flex gap-x-2 mb-2'>
              <BadgeList list={productCategory} />
            </div>
            <h3 className='font-semibold text-2xl'>{productName}</h3>
            <h5 className='font-semibold'>{(productPrice).toLocaleString()}원</h5>
            {productQuantity <= 10 && productQuantity !== 0 && <h5 className='font-semibold text-red-500'>남은 수량 : {productQuantity}</h5>}
            {productQuantity === 0 && <h5 className='font-semibold text-red-500'>품절된 상품입니다.</h5>}
          </div>
        </div>
        <div className='py-6 whitespace-pre-wrap'>
          {productDescription}
        </div>
        <CardViewSection
          title='이런 영양제는 어떠세요?'
          filters={{ categories: productCategory, pageSize: 3 }}
        />
      </div>

    </>
  );
}

export default VitaminDetail;