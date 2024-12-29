import React from "react";

import { SetContext } from "@/components/modules/StudySet/hydrate-set-data";

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const useSet = () => React.useContext(SetContext)!.data;
// export const useAuthedSet = () =>
//     React.useContext(SetContext)!.data as AuthedData;
