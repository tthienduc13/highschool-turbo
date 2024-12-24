import { SetContext } from "@/components/modules/StudySet/hydrate-set-data";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const useSet = () => React.useContext(SetContext)!.data;
// export const useAuthedSet = () =>
//     React.useContext(SetContext)!.data as AuthedData;
