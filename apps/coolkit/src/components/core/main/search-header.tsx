import { Input } from "@highschool/ui/components/ui/input";

import { IconSearch } from "@tabler/icons-react";

export const SearchHeader = () => {
  return (
    <div className="animation-hover relative" id="input">
      <Input
        value=""
        placeholder="Tìm kiếm..."
        className="border-primary-foreground focus:outline-primary hover:border-brand-500-secondary- peer block h-[50px] w-[25vw] overflow-hidden overflow-ellipsis text-nowrap rounded-[8px] border-[2px] border-solid bg-white px-4 pr-[48px] text-sm text-slate-900 shadow-xl focus:border-transparent focus:outline focus:outline-2 focus:ring-0"
        type="text"
      />
      <div className="absolute right-3 top-3">
        <IconSearch />
      </div>
    </div>
  );
};
