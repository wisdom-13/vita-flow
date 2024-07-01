import { useCallback, useState } from 'react';

const useSelection = (items: any[]) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(items.map((item) => item.id));

  const toggleItemSelection = useCallback((id: string) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  }, [selectedItems]);

  const toggleAllItemSelection = useCallback(() => {
    if (selectedItems.length === items.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(items.map((item) => item.id))
    }
  }, [selectedItems]);

  return {
    selectedItems,
    setSelectedItems,
    toggleItemSelection,
    toggleAllItemSelection
  }
}

export default useSelection;