import { Metadata } from "next";

import ZoneDetailModule from "@/components/modules/ZoneDetail";

export const metadata: Metadata = {
  title: "Zone",
};

function Page() {
  return <ZoneDetailModule />;
}

export default Page;
