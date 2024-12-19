import { Button } from "@highschool/ui/components/ui/button"
import { IconDeviceGamepad, IconFolder, IconHome, IconPlus, IconStar, IconTrophy } from "@tabler/icons-react"



export const FeatureNav = () => {
    const navItems = [
        { icon: IconHome, label: "Home", color: "#FF6B6B" },
        { icon: IconTrophy, label: "Leaderboard", color: "#4ECDC4" },
        { icon: IconDeviceGamepad, label: "Play", color: "#19a5ff" },
        { icon: IconPlus, label: "Create", color: "#FF8C42" },
        { icon: IconFolder, label: "My Sets", color: "#845EC2" },
        { icon: IconStar, label: "Favorites", color: "#FFB400" },
    ]

    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="container mx-auto px-6 my-2">
                <div className="flex items-center justify-center gap-4 py-2">
                    {navItems.map((item) => (
                        <Button
                            key={item.label}
                            className="relative px-6 py-10 rounded-xl hover:bg-gray-100 animation-hover bg-transparent 
                            shadow-inset-gray-shadow-md border-4 border-slate-100"
                        >
                            <div className="relative flex flex-col items-center gap-2">
                                <item.icon
                                    style={{ color: item.color, scale: "1.8" }}
                                />
                                <span
                                    className="text-[1.1rem] font-medium"
                                    style={{ color: item.color }}
                                >
                                    {item.label}
                                </span>
                            </div>
                        </Button>
                    ))}
                </div>
            </div>
        </nav>
    )
}