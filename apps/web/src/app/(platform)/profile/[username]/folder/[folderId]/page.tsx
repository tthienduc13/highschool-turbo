import { Metadata } from "next";

import FolderDetailModule from "@/components/modules/FolderDetail";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> => {
  const username = (await params).username;

  return {
    title: `Thư mục của ${username}`,
  };
};

function FolderDetail() {
  return <FolderDetailModule />;
}

export default FolderDetail;
