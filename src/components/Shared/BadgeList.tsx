import { Badge } from '@/components/ui/badge';

interface BadgeList {
  list: string[];
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | null | undefined;
  className?: string;
}

const BadgeList = ({ list, variant = 'default', className }: BadgeList) => {
  return (
    <div className={`flex flex-wrap items-center gap-x-2 ${className}`}>
      {list.map((item) => <Badge key={item} variant={variant}>{item}</Badge>)}
    </div>
  )
}

export default BadgeList;