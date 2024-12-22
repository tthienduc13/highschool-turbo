import { FolderContext } from "@/components/modules/FolderDetail/hydrate-folder-data";
import { useContext } from "react";

export const useFolder = () => useContext(FolderContext);
