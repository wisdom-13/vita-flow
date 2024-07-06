import OrderContent from '@/components/Admin/OrderContent';

const AdminOrdersPage = () => {
  return (
    <>
      <div className='flex justify-between items-center'>
        <h2 className='font-semibold text-xl'>주문 관리</h2>
      </div>
      <div>
        <OrderContent />
      </div>
    </>
  );
}

export default AdminOrdersPage;