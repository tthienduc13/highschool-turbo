import { useContext } from "react";

import { FolderContext } from "@/components/modules/FolderDetail/hydrate-folder-data";

export const useFolder = () => useContext(FolderContext);
