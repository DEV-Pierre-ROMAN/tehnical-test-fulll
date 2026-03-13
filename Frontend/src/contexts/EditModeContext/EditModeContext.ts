import { createContext } from "react";

export type EditModeState = {
  isEditMode: boolean;
  toggleEditMode: () => void;
};

export const EditModeContext = createContext<EditModeState | null>(null);
