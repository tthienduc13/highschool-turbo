import { ButtonKet } from "@/components/ui/button";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { PlayerHeader } from "./play-header";

export default function PlayerJoinModule() {
    return (
        <>
            <PlayerHeader />
            <div className="text-6xl absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] text-white text-center font-extrabold">
                <h3 className="my-6">Coolket</h3>
                <div className="flex items-center space-x-2">
                    <input
                        className="text-center text-gray-600 text-4xl shadow-inset-gray-shadow outline-none bg-white border-none px-4 rounded-xl w-[16vw] h-[10vh] pb-3"
                    />
                    <ButtonKet
                        backgroundColor="white"
                        className="text-black py-[1.9rem]"
                        heightShadow="-10px"
                    >
                        <IconArrowNarrowRight style={{ width: "2.25rem", height: "2.25rem" }} />
                    </ButtonKet>
                </div>
            </div>
        </>

    )
}