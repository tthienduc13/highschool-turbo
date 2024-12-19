import { Button } from "@highschool/ui/components/ui/button"
import { IconCrystalBall } from "@tabler/icons-react"

export const MagicCreateNav = () => {
    return (
        <div className="flex items-center gap-4">
            <Button
                className="flex items-center gap-3 px-4 py-8 rounded-xl hover:bg-[#4ECDC477] bg-[#4ECDC4]
                animation-hover shadow-inset-gray-shadow-md"
            >
                <IconCrystalBall className="scale-125" />
                <span className="text-[1rem] font-medium">Quick Host</span>
            </Button>
        </div>
    )
}