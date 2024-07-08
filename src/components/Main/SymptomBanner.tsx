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
      <div className='relative flex flex-col justify-end bg-primary bg-no-repeat p-6 rounded-md h-52 md:h-44 text-white cursor-pointer overflow-hidden'>
        <BadgeList list={symptom.vitamin} className='mb-2' variant='secondary' />
        <h1 className='font-semibold text-2xl md:text-3xl'>{symptom.example}</h1>
        <p className='text-sm md:text-base'>{symptom.answer}</p>
      </div>
    </Link>
  );
}

// bg-size bg-[url("https://firebasestorage.googleapis.com/v0/b/vita-flow.appspot.com/o/banner%2Fvolodymyr-hryshchenko-e8YFkjN2CzY-unsplash.jpg?alt=media&token=73791e7e-ae5d-4533-bba3-600bde265447")] bg-cover

export default SymptomBanner;