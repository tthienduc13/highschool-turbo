import { ButtonKet } from "@/components/ui/button"
import { IconCrystalBall } from "@tabler/icons-react"

export const MagicCreateNav = () => {
    return (
        <div className="flex items-center gap-4">
            <ButtonKet
                className="gap-3 px-4 py-8 rounded-xl hover:bg-[#4ECDC477] bg-[#4ECDC4]"
            >
                <IconCrystalBall className="scale-125" />
                <span className="text-[1rem] font-medium">Quick Host</span>
            </ButtonKet>
        </div>
    )
}