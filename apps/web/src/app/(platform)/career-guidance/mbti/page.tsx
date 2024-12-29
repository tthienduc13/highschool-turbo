import { Metadata } from "next";

import MBTIModule from "@/components/modules/MBTI";

export const metadata: Metadata = {
  title: "Bài kiểm tra tính cách",
};

function MBTI() {
  return <MBTIModule />;
}

export default MBTI;
