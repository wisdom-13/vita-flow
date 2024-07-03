import { ReactNode, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface DialogConfirmProps {
  children: ReactNode;
  title: string;
  content: string;
  buttonText?: string;
  buttonOnClick?: () => void;
}

const DialogConfirm = ({ children, title, content, buttonText, buttonOnClick }: DialogConfirmProps) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    if (buttonOnClick) {
      buttonOnClick();
    }
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent hideCloseButton={true} className='sm:max-w-80 text-center'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className='text-left text-sm whitespace-pre-line' dangerouslySetInnerHTML={{ __html: content }} />
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
            onClick={handleClick}
          >
            {buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DialogConfirm;