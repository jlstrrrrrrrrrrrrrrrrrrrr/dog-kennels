import { createContext, useContext } from "react";

type EditContextType = {
  isEditing: boolean;
};

export const EditContext = createContext<EditContextType | undefined>(
  undefined
);

export const useEditContext = () => {
  const context = useContext(EditContext);
  if (!context)
    throw new Error("useEditContext must be used within EditProvider");
  return context;
};
