import { Link } from 'react-router-dom';
import BadgeList from '@/components/Shared/BadgeList';

interface SymptomBannerProps {
  symptom: {
    key: string;
    example: string;
    answer: string;
    vitamin: string[];
  }
}

const SymptomBanner = ({ symptom }: SymptomBannerProps) => {
  return (
    <Link to={`/category/${symptom.key}`}>
      <div className='flex flex-col justify-end bg-gray-100 p-6 rounded-md h-44 cursor-pointer'>
        <BadgeList list={symptom.vitamin} className='mb-2' />
        <h1 className='font-semibold text-3xl'>{symptom.example}</h1>
        <p>{symptom.answer}</p>
      </div>
    </Link>
  );
}

export default SymptomBanner;