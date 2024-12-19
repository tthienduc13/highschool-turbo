import { avatars } from "@/constants/avatar";
import { Button } from "@highschool/ui/components/ui/button";
import Image from "next/image";

export default function UserNav() {
    return (
        <div className="flex items-center gap-4 ">
            <Button
                className="flex items-center gap-3 px-4 py-8 rounded-xl bg-white/20 text-white hover:bg-white/30 
                animation-hover shadow-inset-gray-shadow-md"
            >
                <div className="w-8 h-8 text-primary flex items-center justify-center font-bold">
                    <Image src={avatars["pets"].at(0)?.image ?? ""} width={100} height={100} alt="avatar" className="object-fill" />
                </div>
                <span className="font-medium">highschool_teacher</span>
            </Button>
        </div>
    )
}