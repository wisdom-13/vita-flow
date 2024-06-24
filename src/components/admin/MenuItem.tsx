// src/components/MenuItem.tsx
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MenuItemProps {
  icon: LucideIcon;
  to: string;
  text: string;
  active?: boolean;
}

const MenuItem = ({
  icon: Icon,
  to,
  text,
  active = false
}: MenuItemProps) => {
  return (
    <Link to={to}>
      <div className={cn(
        'px-4 py-3 rounded-md flex items-center gap-x-2 hover:bg-slate-200/50',
        active && 'bg-slate-200/70 font-semibold'
      )}>
        <Icon size='18' />

        {text}
      </div>
    </Link>
  );
};

export default MenuItem;
