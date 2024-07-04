import MessageContent from '@/components/Shared/MessageContent';
import { useSearchParams } from 'react-router-dom';

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  return (
    <div>
      <MessageContent
        title='주문이 완료되었습니다.'
        content={`주문번호 : ${orderId}`}
        linkText='주문내역'
        to='/mypage/history'
      />
    </div>
  )
}

export default PaymentSuccessPage;