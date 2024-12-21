import { ButtonKet } from "@/components/ui/button";
import { avatars } from "@/constants/avatar";
import Image from "next/image";

export default function UserNav() {
    return (
        <div className="flex items-center gap-4 ">
            <ButtonKet
                className="gap-3 px-4 py-8 bg-white/20 hover:bg-white/30"
            >
                <div className="w-8 h-8 text-primary flex items-center justify-center font-bold">
                    <Image src={avatars["pets"].at(0)?.image ?? ""} width={100} height={100} alt="avatar" className="object-fill" />
                </div>
                <span className="font-medium">highschool_teacher</span>
            </ButtonKet>
        </div>
    )
}