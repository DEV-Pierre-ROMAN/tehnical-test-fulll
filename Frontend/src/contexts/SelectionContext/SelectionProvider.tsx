import type { ReactNode } from "react";
import type { SelectionState } from "../../hooks/useSelection";
import { SelectionContext } from "./SelectionContext";

export function SelectionProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: SelectionState;
}) {
  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
}
