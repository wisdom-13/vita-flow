import { Button } from '@/components/ui/button';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.data.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = 'Unknown error';
  }

  return (
    <div className='flex flex-col justify-center items-center gap-y-6 h-[calc(100vh-100px)] main'>
      <div className='font-semibold text-3xl'>
        문제가 발생했어요 😢
      </div>
      <p className='text-muted-foreground'>{errorMessage}</p>
      <Link to='/'>
        <Button>메인으로 돌아가기</Button>
      </Link>
    </div>
  );
}

export default ErrorPage;