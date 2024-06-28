import { Link } from 'react-router-dom';
import { Badge } from '../ui/badge';

const CardItem = () => {
  return (
    <Link to='/vitamin/3G1sYgZ6eS25d7SCPgWA'>
      <div className='flex flex-col relative border border-muted bg-gray-100 rounded-md w-full'>
        <div className='absolute top-2 left-2'>
          <Badge>비타민 C</Badge>
        </div>
        <div className='bg-white rounded-md w-full h-36'></div>
        <div className='p-4 py-2 text-sm'>
          <h3 className='font-semibold'>영양제 A</h3>
          <h5 className=''>15,000원</h5>
        </div>
      </div>
    </Link>
  );
}

export default CardItem;