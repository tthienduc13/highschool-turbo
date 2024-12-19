import { Input } from "@highschool/ui/components/ui/input"
import { IconSearch } from "@tabler/icons-react"

export const SearchHeader = () => {
    return (
        <div className="relative animation-hover" id="input">
            <Input
                value=""
                placeholder="Tìm kiếm..."
                className="block w-[25vw] text-sm h-[50px] px-4 text-slate-900 bg-white rounded-[8px] 
                border-primary-foreground border-solid border-[2px] shadow-xl
                focus:border-transparent focus:outline focus:outline-2 
                focus:outline-primary focus:ring-0 hover:border-brand-500-secondary- peer overflow-ellipsis overflow-hidden text-nowrap pr-[48px]"
                type="text"
            />
            <div className="absolute top-3 right-3">
                <IconSearch />
            </div>
        </div>


    )
}