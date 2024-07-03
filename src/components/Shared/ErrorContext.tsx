import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface ErrorContextProps {
  title: string;
  linkText?: string;
  to?: string;
}

const ErrorContext = ({ title, linkText, to }: ErrorContextProps) => {
  return (
    <div className='flex flex-col justify-center items-center gap-y-6 h-[calc(100vh-200px)]'>
      <div className='text-muted-foreground'>{title}</div>
      <Link to={to ? to : '/'}>
        <Button>{linkText ? linkText : '메인으로'}</Button>
      </Link >
    </div>
  );
}

export default ErrorContext;