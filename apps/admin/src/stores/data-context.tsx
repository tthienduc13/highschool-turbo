"use client";

import React, { useState } from "react";

import useDialogState from "@/hooks/use-dialog-state";

type DataDialogType = "add" | "edit" | "delete" | "view";

export interface DataContextType<T> {
  open: DataDialogType | null;
  setOpen: (str: DataDialogType | null) => void;
  currentRow: T | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<T | null>>;
}

const DataContext = React.createContext<DataContextType<any> | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function DataProvider<T>({ children }: Props) {
  const [open, setOpen] = useDialogState<DataDialogType>(null);
  const [currentRow, setCurrentRow] = useState<T | null>(null);

  return (
    <DataContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </DataContext>
  );
}

export const useData = () => {
  const dataContext = React.useContext(DataContext);

  if (!dataContext) {
    throw new Error("useData has to be used within <UseData>");
  }

  return dataContext;
};
