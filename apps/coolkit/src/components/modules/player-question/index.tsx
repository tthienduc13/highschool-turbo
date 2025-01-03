
"use client"

import { QuestionResponse } from "@/api/ket/type"
import { QuestionHeader } from "./question-header"
import { motion } from "motion/react"

export const PlayerQuestionModule = () => {

    const question: QuestionResponse = {
        question: "Apa itu React?",
        answers: ["Library", "Framework", "Platform", "Language"],
        correctAnswer: 0,
        order: 1,
        timeAnswer: 5
    }

    const renderColor = (index: number) => {
        switch (index) {
            case 0:
                return "#F39C12"
            case 1:
                return "#3498DB"
            case 2:
                return "#2ECC71"
            case 3:
                return "#E74C3C"
            default:
                return "#F39C12"
        }
    }

    return (
        <div
            className="relative z-10 flex flex-col items-center bg-zinc-100"
        >
            <QuestionHeader />

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-3xl flex items-center justify-center rounded-lg mx-6 px-4 h-[41.5vh] bg-white shadow-inset-gray-shadow"
            >
                {question.question}Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since the 1500s
            </motion.div>

            <div className="grid grid-cols-2 px-4 pt-6 gap-2 text-white text-center text-2xl ">
                {
                    question.answers?.map((answer, index) => (
                        <motion.button
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            key={index}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-[48vw] h-[17vh] bg-[${renderColor(index)}] pb-5 py-4 rounded-md shadow-inset-gray-shadow`}
                        >
                            {answer}
                        </motion.button>
                    ))
                }
            </div>
        </div>
    )
}