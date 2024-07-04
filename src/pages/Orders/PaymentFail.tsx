import MessageContent from '@/components/Shared/MessageContent';
import { useSearchParams } from 'react-router-dom';

const PaymentFailPage = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const message = searchParams.get('message');
  return (
    <div>
      <MessageContent
        title='결제를 진행하는 중 문제가 발생했습니다.'
        content={`${code} : ${message}`}
      />
    </div>
  )
}

export default PaymentFailPage;