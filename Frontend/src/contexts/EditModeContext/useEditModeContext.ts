import { useContext } from "react";
import { EditModeContext, type EditModeState } from "./EditModeContext";

export function useEditModeContext(): EditModeState {
  const context = useContext(EditModeContext);
  if (!context)
    throw new Error("useEditMode must be used within an EditModeProvider");
  return context;
}
