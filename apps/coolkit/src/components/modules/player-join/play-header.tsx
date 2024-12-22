import { IconDashboard } from "@tabler/icons-react";

export function PlayerHeader() {
    return (
        <div className="text-3xl absolute top-1 left-[50%] translate-x-[-50%] z-[100] w-[55vw] flex justify-around items-center bg-primary pt-3 pb-5 text-white rounded-xl my-5 shadow-inset-gray-shadow">
            <div className="font-extrabold">
                Coolket
            </div>
            <div className="text-xl md:text-2xl font-medium">
                Join a game
            </div>
            <div className="flex items-center space-x-2 animation-hover cursor-pointer">
                <IconDashboard size={32} />
                <span>Dashboard</span>
            </div>
        </div>
    )
}