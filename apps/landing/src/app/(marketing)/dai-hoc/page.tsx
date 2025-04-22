import { Metadata } from "next";

import UniversityCategoryModule from "@/components/modules/UniversityCategory";

export const metadata: Metadata = {
  title: "Danh bạ đại học",
};

function Page() {
  return <UniversityCategoryModule />;
}

export default Page;
