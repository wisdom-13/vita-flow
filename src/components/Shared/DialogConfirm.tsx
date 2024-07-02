import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';


interface DialogConfirmProps {
  children: ReactNode;
  title: string;
  content: string;
  buttonText?: string;
  buttonOnClick?: () => void;
}

const DialogConfirm = ({ children, title, content, buttonText, buttonOnClick }: DialogConfirmProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        {children}
      </DialogTrigger>
      <DialogContent hideCloseButton={true} className='sm:max-w-80 text-center'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <p className='text-left text-sm'>{content}</p>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant='secondary'
              size='sm'
              className='w-full'
            >
              취소
            </Button>
          </DialogClose>
          <Button
            size='sm'
            className='w-full'
            onClick={buttonOnClick}
          >
            {buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DialogConfirm;