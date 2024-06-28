import ProductForm from '@/components/Admin/ProductForm';

const AdminProductNewPage = () => {
  return (
    <>
      <div className='flex justify-between items-center'>
        <h2 className='font-semibold text-xl'>상품 등록</h2>
      </div>
      <div>
        <ProductForm />
      </div>
    </>
  );
}

export default AdminProductNewPage;