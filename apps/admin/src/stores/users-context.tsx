import React, { useState } from "react";
import { UserPreview } from "@highschool/interfaces";

import useDialogState from "@/hooks/use-dialog-state";

type UsersDialogType = "add" | "edit" | "delete" | "view";

interface UsersContextType {
  open: UsersDialogType | null;
  setOpen: (str: UsersDialogType | null) => void;
  currentRow: UserPreview | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<UserPreview | null>>;
}

const UsersContext = React.createContext<UsersContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function UsersProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<UsersDialogType>(null);
  const [currentRow, setCurrentRow] = useState<UserPreview | null>(null);

  return (
    <UsersContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </UsersContext>
  );
}

export const useUsers = () => {
  const usersContext = React.useContext(UsersContext);

  if (!usersContext) {
    throw new Error("useUsers has to be used within <UsersContext>");
  }

  return usersContext;
};
