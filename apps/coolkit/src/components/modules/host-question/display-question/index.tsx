
"use client"

import { ButtonKet } from "@/components/ui/button"
import { QuestionHeader } from "./question-header"
import { QuestionResponse } from "@/api/ket/type"
import MinimalCountdown from "@/components/animation/clock/minimal-countdown"
import { motion } from "motion/react"
import { renderColorAnswer } from "@/utils/helper-color"


export const DisplayQuestionModule = () => {

    const question: QuestionResponse = {
        question: "Apa itu React?",
        answers: ["Library", "Framework", "Platform", "Language"],
        correctAnswer: 0,
        order: 1,
        timeAnswer: 5
    }

    return (
        <div
            className="relative z-10 flex flex-col items-center bg-zinc-100"
        >
            <QuestionHeader />

            <div className="flex p-4 h-[41.5vh] justify-between items-center gap-10">
                <div className="text-3xl flex items-center justify-center w-[55vw] shadow-inset-gray-shadow bg-white h-full rounded-lg">
                    {question.question}
                </div>
                <div className="h-full flex flex-col">
                    <div className="px-4 py-2 font-extrabold flex flex-col items-center h-[30vh] justify-around shadow-inset-gray-shadow-md bg-white rounded-lg">
                        <MinimalCountdown
                            initialSeconds={120}
                            onComplete={() => console.log("Countdown complete!")}
                            size={100}
                        />
                        <span className="text-3xl">0  /  1</span>
                    </div>
                    <ButtonKet className="mt-2">Next</ButtonKet>
                </div>
            </div>

            <div className="flex px-4 pt-6 gap-2 flex-wrap text-white text-center text-2xl ">
                {
                    question.answers?.map((answer, index) => (
                        <motion.button
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            key={index}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-[48vw] h-[17vh] ${renderColorAnswer(index)} pb-5 py-4 rounded-md shadow-inset-gray-shadow`}
                        >
                            {answer}
                        </motion.button>
                    ))
                }
            </div>
        </div>
    )
}