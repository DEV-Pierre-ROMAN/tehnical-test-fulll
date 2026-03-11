import { useState } from "react";

type SelectionState = {
  selectedIds: Set<string>;
  isSelected: (id: string) => boolean;
  toggleSelection: (id: string) => void;
  selectMany: (ids: string[]) => void;
  unselectMany: (ids: string[]) => void;
  clearSelection: () => void;
};

export function useSelection(initialIds: string[] = []): SelectionState {
  const [selectedIds, setSelectedIds] = useState(new Set<string>(initialIds));

  const isSelected = (id: string) => selectedIds.has(id);

  const toggleSelection = (id: string) => {
    setSelectedIds((prevSelectedIds) => {
      const nextSelection = new Set(prevSelectedIds);
      if (prevSelectedIds.has(id)) nextSelection.delete(id);
      else nextSelection.add(id);
      return nextSelection;
    });
  };

  const selectMany = (ids: string[]) => {
    setSelectedIds((prevSelectedIds) => {
      const nextSelection = new Set(prevSelectedIds);
      ids.forEach((id) => nextSelection.add(id));
      return nextSelection;
    });
  };

  const unselectMany = (ids: string[]) => {
    setSelectedIds((prevSelectedIds) => {
      const nextSelection = new Set(prevSelectedIds);
      ids.forEach((id) => nextSelection.delete(id));
      return nextSelection;
    });
  };

  const clearSelection = () => setSelectedIds(new Set<string>());

  return {
    selectedIds,
    isSelected,
    toggleSelection,
    selectMany,
    unselectMany,
    clearSelection,
  };
}
