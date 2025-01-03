import { QuestionResponse } from "@/api/ket/type"
import { ButtonKet } from "@/components/ui/button"
import { renderColorAnswer } from "@/utils/helper-color"
import { motion } from "motion/react"
import { ChartResult } from "./chart-result"
import MinimalCountdown from "@/components/animation/clock/minimal-countdown"

export const ResultQuestionModule = () => {
    const question: QuestionResponse = {
        question: "Apa itu React?Lorem Ipsum is simply dummy text of the printing and typesetting industry. asdasdadasdasdasds",
        answers: ["Library", "Framework", "Platform", "Language"],
        correctAnswer: 0,
        order: 1,
        timeAnswer: 5
    }

    return (
        <div
            className="relative z-10 flex flex-col bg-zinc-100 gap-8"
        >
            <div className="grid grid-cols-[40vw_38vw_auto] p-4 h-[55vh] w-full items-center gap-10">
                <div className="text-3xl h-full flex items-center p-4 justify-center shadow-inset-gray-shadow bg-white rounded-lg">
                    {question.question}
                </div>
                <div className="h-full">
                    <ChartResult className=" h-full" />
                </div>
                <div className="h-full">
                    <div className="px-4 py-2 font-extrabold flex flex-col items-center h-[30vh] justify-around shadow-inset-gray-shadow-md bg-white rounded-lg">
                        <MinimalCountdown
                            initialSeconds={5}
                            onComplete={() => console.log("Countdown complete!")}
                            size={100}
                        />
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
                            disabled={true}
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