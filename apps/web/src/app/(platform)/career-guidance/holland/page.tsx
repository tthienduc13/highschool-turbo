import { Metadata } from "next";

import HollandModule from "@/components/modules/Holland";

export const metadata: Metadata = {
  title: "Xác định nhóm nghề",
};

function Holland() {
  return <HollandModule />;
}

export default Holland;
