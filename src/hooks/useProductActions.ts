import { useState, useCallback } from 'react';
import { deleteProduct, updateProductStatus } from '@/services/firebaseService';
import { toast } from 'sonner';

const useProductActions = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const toggleProductSelection = useCallback((id: string) => {
    setSelectedProducts(prev =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  }, []);

  const deleteSelectedProducts = useCallback(async () => {
    if (selectedProducts.length == 0) {
      toast.error('선택한 상품이 없습니다.');
      return;
    }

    try {
      const deletePromises = selectedProducts.map(id => deleteProduct(id));
      await Promise.all(deletePromises);
      toast.success('선택된 상품이 삭제되었습니다.');
      setSelectedProducts([]);
    } catch (error) {
      toast.error('상품을 삭제하는 중 오류가 발생했습니다.');
      console.error(error);
    }
  }, [selectedProducts]);

  const updateSelectedProductsStatus = useCallback(
    async (status: boolean) => {
      if (selectedProducts.length == 0) {
        toast.error('선택한 상품이 없습니다.');
        return;
      }

      try {
        const updatePromises = selectedProducts.map(id => updateProductStatus(id, status));
        await Promise.all(updatePromises);
        toast.success(
          `선택된 상품의 상태가 [${status ? '판매함' : '판매안함'}]으로 변경되었습니다.`
        );
        setSelectedProducts([]);
      } catch (error) {
        toast.error('상품 상태를 변경하는 중 오류가 발생했습니다.');
        console.error(error);
      }
    },
    [selectedProducts]
  );

  return {
    selectedProducts,
    toggleProductSelection,
    deleteSelectedProducts,
    updateSelectedProductsStatus,
  };
};

export default useProductActions;
