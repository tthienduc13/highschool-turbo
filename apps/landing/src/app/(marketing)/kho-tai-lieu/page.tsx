import { Metadata } from "next";

import DocumentLibraryModule from "@/components/modules/DocumentLibrary";

export const metadata: Metadata = {
  title: "Kho tài liệu",
};

function DocumentLibrary() {
  return <DocumentLibraryModule />;
}

export default DocumentLibrary;
