import { Button } from '@/components/ui/button';
import ProductList from '@/features/Admin/ProductList';
import { Link } from 'react-router-dom';

const AdminProductsPage = () => {
  return (
    <>
      <div className='flex justify-between items-center'>
        <h2 className='font-semibold text-xl'>상품 목록</h2>
        <Link to='/admin/product/new'>
          <Button>상품 등록</Button>
        </Link>
      </div>
      <div>
        <ProductList />
      </div>
    </>

  );
}

export default AdminProductsPage;