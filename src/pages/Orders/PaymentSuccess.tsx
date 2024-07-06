import MessageContent from '@/components/Shared/MessageContent';
import { useProcessOrder } from '@/hooks/useProcessOrder';

const PaymentSuccessPage = () => {
  const { orderId, isError } = useProcessOrder();

  if (isError) {
    return <MessageContent title='잘못된 접근입니다.' />
  }

  return (
    <div>
      <MessageContent
        title='💊 주문이 완료되었습니다! '
        content={`주문번호 : ${orderId}`}
        linkText='주문내역'
        to='/mypage/history'
      />
    </div>
  )
}

export default PaymentSuccessPage;