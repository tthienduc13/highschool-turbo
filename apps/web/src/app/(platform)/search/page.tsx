import { Metadata } from "next";

import SearchModule from "@/components/modules/Search";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Tìm kiếm",
  };
};

function Search() {
  return <SearchModule />;
}

export default Search;
