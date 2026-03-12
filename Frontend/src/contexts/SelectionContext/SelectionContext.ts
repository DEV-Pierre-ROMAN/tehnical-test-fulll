import { createContext } from "react";
import type { SelectionState } from "../../hooks/useSelection";

export const SelectionContext = createContext<SelectionState | null>(null);
