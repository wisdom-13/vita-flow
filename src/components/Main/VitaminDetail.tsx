import { useProduct } from '@/hooks/useProduct';
import { Badge } from '@/components/ui/badge';
import SectionCardView from '@/components/Main/SectionCardView';

interface VitaminDetailProp {
  productId: string;
}
const VitaminDetail = ({ productId }: VitaminDetailProp) => {
  const { data, isLoading, error } = useProduct(productId);

  if (isLoading) {
    return
  }

  if (!data || error) {
    return
  }

  const {
    productImage,
    productName,
    productPrice,
    productQuantity,
    productCategory,
    productDescription
  } = data;

  return (
    <>
      <div>
        <div className='flex items-center gap-x-4'>
          <div className='border rounded-md w-36 h-36'>
            <img src={productImage} alt={productName} className='w-full h-full object-cover' />
          </div>
          <div className='space-y-1 text-sm'>
            <div className='flex gap-x-2 mb-2'>
              {productCategory.map((category: string, index: number) => <Badge key={`${index}-${category}`}>{category}</Badge>)}
            </div>
            <h3 className='font-semibold text-2xl'>{productName}</h3>
            <h5 className='font-semibold'>{(productPrice).toLocaleString()}원</h5>
            {productQuantity <= 10 && <h5 className='font-semibold text-red-500'>남은 수량 : {productQuantity}</h5>}

          </div>
        </div>
        <div className='py-6 whitespace-pre-wrap'>
          {productDescription}
          {productDescription}
        </div>
        <SectionCardView
          title='이런 영양제는 어떠세요?'
          filters={{ categories: productCategory, pageSize: 3 }}
        />
      </div>

    </>
  );
}

export default VitaminDetail;