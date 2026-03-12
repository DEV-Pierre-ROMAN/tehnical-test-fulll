import { useContext } from "react";
import type { SelectionState } from "../../hooks/useSelection";
import { SelectionContext } from "./SelectionContext";

export function useSelectionContext(): SelectionState {
  const context = useContext(SelectionContext);
  if (!context)
    throw new Error(
      "useSelectionContext must be used within a SelectionProvider",
    );
  return context;
}
