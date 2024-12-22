import { ButtonKet } from "@/components/ui/button";
import { PlayerHeader } from "./play-header";
import { IconArrowNarrowRight } from "@tabler/icons-react";

export default function PlayerRegisterModule() {
    return (
        <>
            <PlayerHeader />
            <div className="text-6xl absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] text-white text-center font-extrabold">
                <div className="text-center">
                    <h3 className="my-6">Nhập tên của bạn</h3>
                </div>
                <div className="flex items-center space-x-2 justify-center w-full">
                    <input
                        className="text-center text-gray-600 text-4xl shadow-inset-gray-shadow outline-none bg-white border-none px-4 rounded-xl w-[20vw] h-[10vh] pb-3"
                        placeholder="Biệt danh..."
                    />
                    <ButtonKet
                        backgroundColor="white"
                        className="text-black py-[1.9rem] flex-none"
                        heightShadow="-10px"
                    >
                        <IconArrowNarrowRight style={{ width: "2.25rem", height: "2.25rem" }} />
                    </ButtonKet>
                </div>
            </div>
        </>
    )
}