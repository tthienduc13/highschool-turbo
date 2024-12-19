"use client"

import { useState } from "react"
import { Card } from "@highschool/ui/components/ui/card"
import { IconBadge, IconBrandZapier, IconChevronDown, IconClock, IconEdit, IconHeart, IconLibrary, IconPlayerPlay, IconShare2, IconStar, IconUser, IconUsers } from "@tabler/icons-react"
import Image from "next/image"
import { Button } from "@highschool/ui/components/ui/button"


export interface QuestionSetCard {
    id: number
    title: string
    creator: string
    questions: number
    players: number
    image: string
    category: string
    color: string
    bgColor: string
}

interface RecommendQuestionSetCardProps {
    set: QuestionSetCard
}


export const RecommendCardQuestion = ({ set }: RecommendQuestionSetCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <Card key={set.id}
            className={`w-full overflow-hidden transition-all duration-300 ${isExpanded ? 'h-[500px]' : 'h-[300px]'}`}
        >
            <div
                key={set.id}
                className={`relative w-full h-full bg-gradient-to-br ${set.color}`}
            >
                <Image
                    src={set.image}
                    alt={set.title}
                    fill
                    className="object-cover"
                />
                <div className={`absolute inset-0 p-6 flex flex-col ${isExpanded ? 'backdrop-blur-[4px]' : ''}`}>
                    <div className="flex-1">
                        <span
                            className="px-3 py-1 rounded-md text-sm font-bold shadow-inset-gray-shadow-sm"
                            style={{
                                backgroundColor: set.color,
                                color: 'white'
                            }}
                        >
                            {set.category}
                        </span>
                        <h3 className="text-2xl font-bold text-white mb-2">{set.title}</h3>
                        {isExpanded && (
                            <p
                                className="text-white/90 mb-4"
                            >
                                {set.title}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-between items-center ">
                        <div className="flex items-center space-x-2">
                            <div
                                className="px-3 py-1 rounded-md text-sm font-bold shadow-inset-gray-shadow-sm 
                                backdrop-blur-sm bg-[#FFFFFF33] text-white flex items-center animation-hover"
                            >
                                <IconHeart className="w-4 h-4 mr-1 text-red-400" />
                                <span>{1238}</span>
                            </div>
                            <Button
                                className="px-3 py-1 rounded-md text-sm font-bold shadow-inset-gray-shadow-sm 
                                backdrop-blur-lg bg-[#FFFFFF33] text-white flex items-center animation-hover"
                            >
                                <IconPlayerPlay className="mr-2 h-4 w-4" />
                                Tạo phòng
                            </Button>

                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-white"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            <IconChevronDown className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </Button>
                    </div>

                    {isExpanded && (
                        <div
                            className="mt-4"
                        >
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="flex items-center space-x-2 text-white">
                                    <IconClock className="w-5 h-5" />
                                    <span>{Math.floor(Math.random() * 20) + 5} phút</span>
                                </div>
                                <div className="flex items-center space-x-2 text-white">
                                    <IconLibrary className="w-5 h-5" />
                                    <span>{set.questions} câu hỏi</span>
                                </div>
                                <div className="flex items-center space-x-2 text-white">
                                    <IconUsers className="w-5 h-5" />
                                    <span>{Math.floor(Math.random() * 10000) + 1000} Join</span>
                                </div>
                                <div className="flex items-center space-x-2 text-white">
                                    <IconUser className="w-5 h-5" />
                                    <span>{set.creator}</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Button className="w-full font-bold shadow-inset-gray-shadow-sm">
                                    <IconEdit className="mr-2 h-4 w-4" />
                                    Sửa câu hỏi
                                </Button>
                                <Button variant="secondary" className="w-full bg-white/20 text-white hover:bg-white/30 shadow-inset-gray-shadow-sm">
                                    <IconShare2 className="mr-2 h-4 w-4" />
                                    Chia sẻ
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Card>

    )
}