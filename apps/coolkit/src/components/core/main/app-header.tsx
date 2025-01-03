import { MagicCreateNav } from "../common/navigation/magic-create-nav"
import UserNav from "../common/navigation/user-nav"
import { SearchHeader } from "./search-header"

export default function AppHeader() {
    return (
        <header className="sticky top-0 z-10 backdrop-blur-md bg-primary shadow-inset-gray-shadow">
            <div className="container mx-auto px-6 py-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="text-4xl font-extrabold bg-clip-text text-transparent text-white animation-hover">
                        CoolKet
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="relative hidden md:block text-xl">
                        <SearchHeader />
                    </div>
                    <MagicCreateNav />
                    <UserNav />
                </div>
            </div>
        </header>
    )
}