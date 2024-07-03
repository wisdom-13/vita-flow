import ProductForm from '@/components/Admin/ProductForm';

const AdminProductModifyPage = () => {
  return (
    <>
      <div className='flex justify-between items-center'>
        <h2 className='font-semibold text-xl'>상품 수정</h2>
      </div>
      <div>
        <ProductForm />
      </div>
    </>
  );
}

export default AdminProductModifyPage;