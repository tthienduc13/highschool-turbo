import { Metadata } from "next";

import DocumentLibraryModule from "@/components/modules/DocumentLibrary";

export const metadata: Metadata = {
  title: "Tất cả khoá học",
};

function DocumentLibrary() {
  return <DocumentLibraryModule />;
}

export default DocumentLibrary;
