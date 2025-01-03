import { MagicCreateNav } from "../common/navigation/magic-create-nav";
import UserNav from "../common/navigation/user-nav";
import { SearchHeader } from "./search-header";

export default function AppHeader() {
  return (
    <header className="bg-primary shadow-inset-gray-shadow sticky top-0 z-10 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-6">
        <div className="flex items-center space-x-4">
          <div className="animation-hover bg-clip-text text-4xl font-extrabold text-transparent text-white">
            CoolKet
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative hidden text-xl md:block">
            <SearchHeader />
          </div>
          <MagicCreateNav />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
