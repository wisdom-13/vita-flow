import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface MessageContentProps {
  title?: string;
  content?: string;
  linkText?: string;
  to?: string;
  onClick?: () => void;
}

const MessageContent = ({ title, content, linkText, to, onClick }: MessageContentProps) => {
  return (
    <div className='flex flex-col justify-center items-center gap-y-6 h-[calc(100vh-200px)]'>
      {title && <h1 className='font-semibold text-2xl'>{title}</h1>}
      {content && <div className='text-muted-foreground'>{content}</div>}
      <Link to={to ? to : '/'} onClick={onClick}>
        <Button>{linkText ? linkText : '메인으로'}</Button>
      </Link>
    </div>
  );
}

export default MessageContent;