import { Ket } from "@/api/ket/type";
import { ButtonKet } from "@/components/ui/button";
import webCookieStorage from "@/lib/web-cookie-storage";
import { IconEdit, IconLibrary, IconPlayerPlay, IconUser, IconUsers } from "@tabler/icons-react";
import Image from "next/image";

interface CardQuestionProps {
    set: Ket;
}

export const CardQuestion = ({ set }: CardQuestionProps) => {

    const token = webCookieStorage.getToken()

    return (

        <div
            key={set.id}
            className="group relative hover:scale-[1.02] transition-all duration-300"
        >
            <div className="pb-2 relative bg-white rounded-xl overflow-hidden border border-gray-200 shadow-inset-gray-shadow-md">
                <div className="relative h-40">
                    <Image
                        src={set.thumbnail}
                        alt={set.name}
                        fill
                        className="object-cover"
                    />
                    <div
                        className="absolute inset-0"
                    />
                </div>
                <div
                    className="p-4 space-y-4"
                    style={{ backgroundColor: 'rgb(235, 248, 255)' }}
                >
                    <h3 className="text-xl font-bold text-gray-800 mb-1 text-center">{set.name}</h3>
                    <div className="flex items-center justify-around">
                        <div className="text-gray-600 text-sm flex flex-col items-center"><IconUser /> <span>{set.author.displayName}</span></div>
                        <div className="text-gray-500 text-sm flex flex-col items-center"><IconLibrary /> <span>{set.totalQuestion} Questions</span></div>
                        <div className="text-gray-500 text-sm flex flex-col items-center"><IconUsers /> <span>{set.totalPlay.toLocaleString()} Join</span></div>
                    </div>
                </div>
                {
                    token && (
                        <div className="p-4 bg-white flex gap-2">
                            <ButtonKet
                                heightShadow="-6px"
                                backgroundColor={`rgb(25, 165, 255)`}
                                className="w-1/2 text-sm"
                            >
                                <IconPlayerPlay className="w-5 h-5 scale-125" />
                                Tạo phòng
                            </ButtonKet>
                            <ButtonKet
                                heightShadow="-6px"
                                backgroundColor={`rgb(25, 165, 255)`}
                                className="w-1/2 text-sm"
                            >
                                <IconEdit className="w-5 h-5 scale-125" />
                                Sửa câu hỏi
                            </ButtonKet>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

